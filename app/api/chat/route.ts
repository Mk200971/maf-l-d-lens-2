import { streamText, tool, stepCountIs } from 'ai';
import { z } from 'zod';
import { metricDocs, metricDocById } from '@/lib/metric-docs';
import { kpis } from '@/lib/dashboard-data';
import {
  filterHours,
  filterCompletion,
  filterFeedback,
  sumBy,
  avgSatRatePct,
  normalizedAvgSat,
  avgNps,
  ALL_COUNTRIES,
  ALL_ROLES,
  emptyFilters,
  programName,
} from '@/lib/aggregate';
import { programs } from '@/lib/dashboard-data';
import type { FilterState } from '@/lib/types';
import { buildChart } from '@/lib/chart-builder';
import type { ChartSpec } from '@/lib/chart-spec';

// In-memory rate limiting map: IP -> { timestamps: number[] }
const rateLimitMap = new Map<string, { timestamps: number[] }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 60 seconds
const RATE_LIMIT_MAX_REQUESTS = 10;

// Cleanup old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of rateLimitMap.entries()) {
    data.timestamps = data.timestamps.filter(t => now - t < RATE_LIMIT_WINDOW_MS);
    if (data.timestamps.length === 0) {
      rateLimitMap.delete(ip);
    }
  }
}, 5 * 60 * 1000);

const bodySchema = z.object({
  messages: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string().min(1).max(2000),
  })).min(1).max(20),
  scope: z.object({
    years: z.array(z.number()).optional(),
    bus: z.array(z.string()).optional(),
    countries: z.array(z.string()).optional(),
    roles: z.array(z.string()).optional(),
    programs: z.array(z.string()).optional(),
  }).optional(),
  // When true, the model MUST call the visualize tool to produce at least
  // one chart before giving its final answer.
  forceChart: z.boolean().optional(),
});

type ChatScope = z.infer<typeof bodySchema>['scope'];

/**
 * Merge user-selected scope with explicit tool args. Explicit args always win
 * — if the user typed "show me 2025 data" while scope has years=[2024,2026],
 * the explicit 2025 wins. If explicit is empty/undefined, fall back to scope.
 */
function mergeScopeAndArgs(
  scope: ChatScope,
  args: {
    years?: number[];
    bus?: string[];
    countries?: string[];
    roles?: string[];
    programs?: string[];
  },
): { years: number[]; bus: string[]; countries: string[]; roles: string[]; programs: string[] } {
  const pick = <T,>(explicit: T[] | undefined, scoped: T[] | undefined): T[] =>
    explicit && explicit.length > 0 ? explicit : (scoped ?? []);
  return {
    years: pick(args.years, scope?.years),
    bus: pick(args.bus, scope?.bus),
    countries: pick(args.countries, scope?.countries),
    roles: pick(args.roles, scope?.roles),
    programs: pick(args.programs, scope?.programs),
  };
}

/**
 * Build the queryMetrics and visualize tools bound to a specific request's scope.
 * Tools are defined inside this factory so each POST gets its own isolated
 * closure — no race conditions between concurrent requests sharing a module-
 * level mutable.
 */
function buildTools(scope: ChatScope) {
  const queryMetrics = tool({
    description:
      'Compute learning metrics (hours, completions, satisfaction, NPS, feedback volume) filtered by year, business unit, country, role, or program. Use this whenever the question asks about a specific slice of the data rather than the org-wide totals.',
    inputSchema: z.object({
      years: z.array(z.number()).optional().describe('e.g. [2026]'),
      bus: z.array(z.enum(['AMBU', 'DBU'])).optional(),
      countries: z.array(z.string()).optional().describe(`One of: ${ALL_COUNTRIES.join(', ')}`),
      roles: z.array(z.string()).optional().describe(`One of: ${ALL_ROLES.join(', ')}`),
      programs: z
        .array(z.string())
        .optional()
        .describe(`Program codes, one of: ${programs.map((p) => p.code).join(', ')}`),
    }),
    execute: async ({ years, bus, countries, roles, programs: programCodes }) => {
      const merged = mergeScopeAndArgs(scope, {
        years,
        bus,
        countries,
        roles,
        programs: programCodes,
      });
      try {
        const f: FilterState = {
          years: merged.years,
          bus: merged.bus,
          countries: merged.countries,
          roles: merged.roles,
          programs: merged.programs,
          sessionIds: [],
          monthRange: null,
        };

        const hours = filterHours(f);
        const completions = filterCompletion(f);
        const fb = filterFeedback(f);

        return {
          matchingLearningHoursRows: hours.length,
          totalLearningHours: Math.round(sumBy(hours, (r) => r.totalHours)),
          totalCompletions: sumBy(hours, (r) => r.completions),
          feedbackResponses: sumBy(fb, (r) => r.responses),
          satisfactionRatePct: Number(avgSatRatePct(fb).toFixed(1)),
          avgSatisfaction: Number(normalizedAvgSat(fb).toFixed(2)),
          avgNps: avgNps(fb) != null ? Number((avgNps(fb) as number).toFixed(1)) : null,
          eligibleCompletionRows: completions.length,
          appliedScope: {
            years: merged.years,
            bus: merged.bus,
            countries: merged.countries,
            roles: merged.roles,
            programs: merged.programs,
          },
        };
      } catch (e) {
        console.error('[queryMetrics] Tool execution failed:', e);
        return { error: 'query failed', reason: String(e) };
      }
    },
  });

  const visualize = tool({
    description:
      'Call this whenever a chart, trend, breakdown, comparison, ranking, or "by country / by program / by month" view would answer the question better than prose. You may call it alongside queryMetrics. Never fabricate the data — this tool computes it.',
    inputSchema: z.object({
      kind: z.enum(['bar', 'line', 'pie', 'kpi']),
      measure: z.enum(['hours', 'completions', 'satisfaction', 'satisfactionRate', 'nps', 'responses', 'completionRate', 'uniqueLearners']),
      dimension: z.enum(['bu', 'country', 'role', 'program', 'month', 'year']),
      filters: z.object({
        years: z.array(z.number()).optional(),
        bus: z.array(z.enum(['AMBU', 'DBU'])).optional(),
        countries: z.array(z.string()).optional(),
        roles: z.array(z.string()).optional(),
        programs: z.array(z.string()).optional(),
      }).optional(),
      topN: z.number().optional(),
    }),
    execute: async ({ kind, measure, dimension, filters, topN }) => {
      const merged = mergeScopeAndArgs(scope, {
        years: filters?.years,
        bus: filters?.bus,
        countries: filters?.countries,
        roles: filters?.roles,
        programs: filters?.programs,
      });
      try {
        const chartSpec = buildChart({
          kind,
          measure,
          dimension,
          filters: {
            years: merged.years,
            bus: merged.bus,
            countries: merged.countries,
            roles: merged.roles,
            programs: merged.programs,
            sessionIds: [],
            monthRange: null,
          },
          topN,
        });
        return chartSpec;
      } catch (e) {
        console.error('[visualize] Tool execution failed:', e);
        return { error: 'chart generation failed', reason: String(e) };
      }
    },
  });

  return { queryMetrics, visualize };
}

// System context with all metrics knowledge
const METRICS_KNOWLEDGE = `
You are an expert analytics assistant for a comprehensive Learning Dashboard. Your role is to:
1. Answer questions about learning metrics, their calculations, and interpretations
2. Explain how the dashboard presents findings
3. Help users understand metric relationships and what they mean for business decisions
4. Provide specific calculations and data insights when asked

Available Metrics:
${metricDocs.map(doc => `
**${doc.title}** (${doc.page})
- Summary: ${doc.summary}
- Calculation: ${doc.calculation}
- Interpretation: ${doc.interpretation}
- Scope: ${doc.scope}
${doc.caveat ? `- Caveat: ${doc.caveat}` : ''}
`).join('\n')}

Current KPIs Data:
- Total Learning Hours: ${kpis.totalLearningHours}
- Total Completions: ${kpis.totalCompletions}
- Unique Learners: ${kpis.uniqueLearners}
- Programs Active: ${kpis.programsCount}
- Completion Rate: ${kpis.completionRatePct.toFixed(1)}%
- Average Satisfaction: ${kpis.avgSatisfaction.toFixed(2)}/5
- Satisfaction Rate: ${kpis.satisfactionRatePct.toFixed(1)}%
- Feedback Responses: ${kpis.feedbackResponses}

Learning Hours by BU:
${Object.entries(kpis.learningHoursByBU).map(([bu, hours]) => `- ${bu}: ${hours} hours`).join('\n')}

When answering:
- Be specific and data-driven
- Reference the calculation method if explaining a metric
- Explain context about why a metric matters
- If asked about trends or comparisons, use the available data
- Clarify any ambiguities in how metrics are measured
- Mention important caveats that affect interpretation
`;

// Generate natural responses based on context
function generateNaturalResponse(query: string): string {
  const lowerQuery = query.toLowerCase();

  // Completion Rate
  if (lowerQuery.includes('completion')) {
    return `Completion rate is one of the most important metrics for evaluating program effectiveness. It measures what percentage of enrollees actually finish the program they started.\n\nIn your dashboard, you have ${kpis.totalCompletions.toLocaleString()} total completions with a completion rate of ${kpis.completionRatePct.toFixed(1)}%. This tells us that roughly ${kpis.completionRatePct.toFixed(0)}% of people who start a learning program actually see it through to the end.\n\nWhy it matters: Completion rate directly impacts the ROI of your L&D programs. Higher completion rates mean:\n• Better knowledge transfer to your workforce\n• More people developing the targeted skills\n• Better return on your training investment\n• Stronger engagement in your learning culture\n\nIf your completion rate is lower than desired, it might signal issues with program difficulty, relevance, engagement, or learner motivation. If it's high, it suggests your programs are well-designed and meeting learner needs.`;
  }

  // Learning Hours
  if (lowerQuery.includes('learning hour') || lowerQuery.includes('learning hours')) {
    return `Learning hours represent the total amount of time your organization is investing in employee development. You currently have ${kpis.totalLearningHours.toLocaleString()} total learning hours across your programs.\n\nBreakdown by Business Unit:\n${Object.entries(kpis.learningHoursByBU).map(([bu, hours]) => `• ${bu}: ${hours.toLocaleString()} hours`).join('\n')}\n\nWhat this means: Learning hours is a volume metric that shows the scale of your learning investment. Higher learning hours suggest:\n• More employees getting trained\n• More comprehensive skill development\n• Greater organizational capability building\n• Better preparedness for future challenges\n\nUsing this metric: Don't just focus on maximizing hours—quality matters more than quantity. Use learning hours alongside completion rate and satisfaction to get a complete picture. Benchmark your hours against industry standards for similar organizations.`;
  }

  // Satisfaction & NPS
  if (lowerQuery.includes('satisfaction') || lowerQuery.includes('nps')) {
    return `Satisfaction is a key indicator of learning program quality and learner engagement. Your current metrics show:\n• Average Satisfaction: ${kpis.avgSatisfaction.toFixed(2)}/5\n• Satisfaction Rate: ${kpis.satisfactionRatePct.toFixed(1)}% (top-box respondents)\n• Feedback Responses: ${kpis.feedbackResponses}\n\nWhat satisfaction means: Learners who are satisfied with programs are more likely to:\n• Complete what they started\n• Apply what they learned on the job\n• Recommend programs to peers\n• Participate in future learning opportunities\n\nInterpreting your data: A satisfaction score of ${kpis.avgSatisfaction.toFixed(1)} suggests learners find your programs valuable and well-executed. The ${kpis.satisfactionRatePct.toFixed(1)}% satisfaction rate (those giving top ratings) shows strong program quality.\n\nHow to improve: Collect qualitative feedback about what's working well and what could improve. Focus on program relevance, delivery quality, and practical applicability.`;
  }

  // Learners/Reach
  if (lowerQuery.includes('learner') || lowerQuery.includes('reach')) {
    return `You're reaching ${kpis.uniqueLearners.toLocaleString()} unique learners across ${kpis.programsCount} active programs. This is your learning audience—the employees actively engaged with your L&D initiatives.\n\nKey insights about your reach:\n• Unique Learners: ${kpis.uniqueLearners.toLocaleString()}\n• Total Completions: ${kpis.totalCompletions.toLocaleString()}\n• Completion Ratio: ${(kpis.totalCompletions / kpis.uniqueLearners).toFixed(2)} completions per learner on average\n\nWhat reach tells us: Growing your reach means expanding who's participating in learning. Consider:\n• Are there employee segments not yet engaged?\n• Which programs attract the most learners?\n• How can you make learning more accessible and relevant across different roles?\n\nStrategy: Reach is important, but so is depth. Balance expanding your audience with ensuring existing learners get quality experiences and demonstrate skill application back on the job.`;
  }

  // Default helpful response
  return `I'd be happy to help you understand your learning metrics! Here's what your dashboard is currently showing:\n\n📊 Overall Performance\n• Total Learning Hours: ${kpis.totalLearningHours.toLocaleString()}\n• Unique Learners: ${kpis.uniqueLearners.toLocaleString()}\n• Total Completions: ${kpis.totalCompletions.toLocaleString()}\n• Active Programs: ${kpis.programsCount}\n\n✅ Quality Metrics\n• Completion Rate: ${kpis.completionRatePct.toFixed(1)}%\n• Average Satisfaction: ${kpis.avgSatisfaction.toFixed(2)}/5\n• Satisfaction Rate: ${kpis.satisfactionRatePct.toFixed(1)}%\n\nTry asking me about:\n• "What does completion rate mean?"\n• "Why do learning hours matter?"\n• "How should I interpret satisfaction scores?"\n• "Who are our learners?"\n• "How are we doing with completion and satisfaction?"\n\nI can provide context on any metric and help you understand what it means for your L&D strategy.`;
}

export const runtime = 'nodejs';
export const maxDuration = 60;

const TOOL_MODEL_CHAIN = [
  'alibaba/qwen-3-235b',
  'alibaba/qwen3.7-flash',
];

const TEXT_MODEL_CHAIN = [
  'mistral/ministral-3b',
  'meta/llama-3.1-8b',
];

const chatModel = process.env.CHAT_MODEL || 'alibaba/qwen3.7-flash';

// Helper function to stream with fallback across model chains
async function streamWithFallback(
  messages: Array<{ role: string; content: string }>,
  systemPrompt: string,
  useToolModel: boolean,
  overrideModel: string | undefined,
  tools: NonNullable<Parameters<typeof streamText>[0]['tools']>,
  forceChart: boolean,
): Promise<Response> {
  const modelChain = useToolModel ? [...TOOL_MODEL_CHAIN, ...TEXT_MODEL_CHAIN] : TEXT_MODEL_CHAIN;
  // De-duplicate: if overrideModel is already in the chain, don't try it twice.
  // The previous implementation always prepended overrideModel, so modelsToTry
  // started with the same model twice (e.g. ['alibaba/qwen3.7-flash',
  // 'alibaba/qwen3.7-flash', 'alibaba/qwen-3-235b', ...]).
  const modelsToTry = overrideModel && !modelChain.includes(overrideModel)
    ? [overrideModel, ...modelChain]
    : modelChain;

  for (const model of modelsToTry) {
    const isToolModel = TOOL_MODEL_CHAIN.includes(model);
    const shouldUseTools = useToolModel && isToolModel;

    try {
      console.log(`[chat] Trying model: ${model}${shouldUseTools ? ' (with tools)' : ' (no tools)'}`);

      let modelSystemPrompt = systemPrompt;
      if (!shouldUseTools && !TOOL_MODEL_CHAIN.includes(model)) {
        modelSystemPrompt += '\n\nYou have no data tools available. Answer only from the org-wide KPI figures given above, and say plainly that you cannot break the numbers down further.';
      }

      const result = streamText({
        model: model,
        system: modelSystemPrompt,
        messages: messages.map((m) => ({
          role: m.role as 'user' | 'assistant',
          content: m.content,
        })),
        temperature: 0.4,
        tools: shouldUseTools ? tools : undefined,
        stopWhen: stepCountIs(forceChart ? 8 : 6),
        maxRetries: 2,
        maxOutputTokens: 1500,
        abortSignal: AbortSignal.timeout(45_000),
        onError: ({ error }) => {
          console.error(`[chat] streamText error for ${model}:`, error);
        },
      });

      // Probe: advance the iterator until we see a substantive event
      // (text-delta, tool-call, tool-result, or error). The first element of
      // result.fullStream in AI SDK v7 is a { type: 'start' } control event
      // emitted BEFORE the provider is contacted — so the previous "first
      // event check" always succeeded and a real provider failure surfaced
      // as an in-stream error instead of falling through to the next model.
      const iterator = result.fullStream[Symbol.asyncIterator]();
      type SubstantiveEvent =
        | { type: 'text-delta'; text: string }
        | { type: 'tool-call' }
        | { type: 'tool-result'; toolName: string; output: unknown }
        | { type: 'error'; error: unknown };
      let firstSubstantive: SubstantiveEvent | null = null;
      while (true) {
        const next = await iterator.next();
        if (next.done) break;
        const ev = next.value as { type: string } & Record<string, unknown>;
        if (ev.type === 'text-delta' || ev.type === 'tool-call' || ev.type === 'tool-result' || ev.type === 'error') {
          firstSubstantive = ev as unknown as SubstantiveEvent;
          break;
        }
        // Skip 'start', 'step-start', 'step-finish', etc.
      }

      if (firstSubstantive === null) {
        console.warn(`[chat] Model ${model} returned no substantive event, trying next`);
        continue;
      }

      // If the first substantive event is an error, the provider failed —
      // try the next model in the chain instead of committing to this one.
      if (firstSubstantive.type === 'error') {
        console.warn(`[chat] Model ${model} emitted an error event, trying next:`, firstSubstantive.error);
        continue;
      }

      // Create a ReadableStream that emits the first substantive event then pipes the rest
      const encoder = new TextEncoder();
      const stream = new ReadableStream({
        async start(controller) {
          try {
            // Emit the first substantive event (already pulled from the iterator).
            // Tool-call events don't emit text — they're handled when the matching
            // tool-result arrives.
            if (firstSubstantive!.type === 'text-delta') {
              controller.enqueue(encoder.encode(JSON.stringify({ type: 'text', value: (firstSubstantive as { type: 'text-delta'; text: string }).text }) + '\n'));
            } else if (firstSubstantive!.type === 'tool-result' && firstSubstantive.toolName === 'visualize') {
              const chartResult = (firstSubstantive as { output: ChartSpec | { error: string; reason: string } }).output;
              if ('error' in chartResult) {
                controller.enqueue(encoder.encode(JSON.stringify({ type: 'error', value: chartResult.reason }) + '\n'));
              } else {
                controller.enqueue(encoder.encode(JSON.stringify({ type: 'chart', value: chartResult }) + '\n'));
              }
            }

            // Pipe the rest of the stream
            while (true) {
              const { done, value } = await iterator.next();
              if (done) break;

              if (value.type === 'text-delta') {
                controller.enqueue(encoder.encode(JSON.stringify({ type: 'text', value: value.text }) + '\n'));
              } else if (value.type === 'tool-result' && value.toolName === 'visualize') {
                const chartResult = (value as { output: ChartSpec | { error: string; reason: string } }).output;
                if ('error' in chartResult) {
                  controller.enqueue(encoder.encode(JSON.stringify({ type: 'error', value: chartResult.reason }) + '\n'));
                } else {
                  controller.enqueue(encoder.encode(JSON.stringify({ type: 'chart', value: chartResult }) + '\n'));
                }
              } else if (value.type === 'error') {
                // B3: value.error is an Error instance, which JSON.stringify
                // turns into {} — extract .message before serialising.
                const errPayload = value.error;
                const errMsg = errPayload instanceof Error ? errPayload.message : String(errPayload);
                controller.enqueue(encoder.encode(JSON.stringify({ type: 'error', value: errMsg }) + '\n'));
                break;
              }
            }

            controller.enqueue(encoder.encode(JSON.stringify({ type: 'done' }) + '\n'));
            controller.close();
          } catch (e) {
            console.error(`[chat] Stream error for ${model}:`, e);
            controller.error(e);
          }
        },
      });

      console.log(`[chat] Successfully streaming from model: ${model}`);
      return new Response(stream, {
        headers: {
          'Content-Type': 'application/x-ndjson',
          'X-Accel-Buffering': 'no',
        },
      });
    } catch (e) {
      console.error(`[chat] Model ${model} failed:`, e instanceof Error ? e.message : String(e));
      // Continue to next model
    }
  }

  // All models failed
  throw new Error('All models in chain failed');
}

export async function POST(request: Request) {
  // Origin check for CSRF protection
  const origin = request.headers.get('origin');
  const host = request.headers.get('host') || 'localhost:3000';
  const isDev = process.env.NODE_ENV !== 'production';
  
  if (origin && !isDev) {
    const originUrl = new URL(origin);
    if (originUrl.host !== host) {
      return new Response('Forbidden', { status: 403 });
    }
  }

  // Rate limiting by IP
  const forwardedFor = request.headers.get('x-forwarded-for');
  const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : 'unknown';
  const now = Date.now();
  
  const rateLimitData = rateLimitMap.get(ip) || { timestamps: [] };
  rateLimitData.timestamps = rateLimitData.timestamps.filter(t => now - t < RATE_LIMIT_WINDOW_MS);
  
  if (rateLimitData.timestamps.length >= RATE_LIMIT_MAX_REQUESTS) {
    rateLimitMap.set(ip, rateLimitData);
    return new Response('Too Many Requests', { 
      status: 429,
      headers: { 'Retry-After': '60' }
    });
  }
  
  rateLimitData.timestamps.push(now);
  rateLimitMap.set(ip, rateLimitData);

  try {
    const rawBody = await request.json();
    
    const parseResult = bodySchema.safeParse(rawBody);
    if (!parseResult.success) {
      return Response.json(
        { error: 'Invalid request' },
        { status: 400 }
      );
    }
    
    const { messages, scope, forceChart } = parseResult.data;

    const lastMessage = messages[messages.length - 1]?.content || '';

    // Determine which model chain to use
    const useToolModel = TOOL_MODEL_CHAIN.includes(chatModel);
    const activeModel = chatModel;

    // Build per-request tools bound to this user's scope.
    const tools = buildTools(scope);

    // Build system prompt with scope context if provided
    let systemPrompt = METRICS_KNOWLEDGE;
    if (scope && Object.keys(scope).length > 0) {
      systemPrompt += `\n\nThe user's current scope is: ${JSON.stringify(scope)}. Apply it as the default filter for every tool call unless they explicitly name a different slice in their question, and mention the applied scope in your answer.`;
    }

    // Strengthen system prompt with hard rule about tool usage
    systemPrompt += `\n\nAfter calling any tool you MUST produce a final natural-language answer that states the numbers the tool returned. Never end your turn on a tool call. Never state a filtered number you did not obtain from a tool.`;

    // "Chart it" mode: force the model to call visualize at least once.
    // Pick a sensible measure + dimension if the user's question doesn't name one.
    if (forceChart) {
      systemPrompt += `\n\nThe user has enabled 'Chart it' mode. You MUST call the visualize tool at least once before giving your final answer, even if the question seems purely textual. If the user did not name a specific measure or dimension, default to measure='hours' and dimension='bu'. Never skip the visualize call in this mode.`;
    }

    try {
      const result = await streamWithFallback(messages, systemPrompt, useToolModel, activeModel, tools, forceChart === true);
      return result;
    } catch (aiError) {
      console.error(
        '[chat] All models failed, using keyword-matched fallback:',
        aiError instanceof Error ? aiError.stack ?? aiError.message : String(aiError)
      );
      // Emit the fallback as NDJSON so the client parser can decode it.
      // The previous implementation returned plain text with Content-Type:
      // text/plain, which the client parser silently discarded (every line
      // failed JSON.parse) — so the user always saw "I couldn't reach the
      // analysis service." ~120 lines of fallback content were dead code.
      const fallbackText = generateNaturalResponse(lastMessage);
      const encoder = new TextEncoder();
      const stream = new ReadableStream({
        start(controller) {
          // Split into reasonable chunks so the client streams progressively.
          const sentences = fallbackText.match(/[^.!?]+[.!?]+|\S+$/g) ?? [fallbackText];
          for (const sentence of sentences) {
            controller.enqueue(
              encoder.encode(JSON.stringify({ type: 'text', value: sentence }) + '\n')
            );
          }
          controller.enqueue(encoder.encode(JSON.stringify({ type: 'done' }) + '\n'));
          controller.close();
        },
      });
      return new Response(stream, {
        headers: {
          'Content-Type': 'application/x-ndjson',
          'X-Accel-Buffering': 'no',
        },
      });
    }
  } catch (error) {
    console.error('[chat] Chat API Error:', error instanceof Error ? error.stack ?? error.message : String(error));
    return Response.json(
      { error: 'Failed to process your question.' },
      { status: 500 }
    );
  }
}
