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
} from '@/lib/aggregate';
import { programs } from '@/lib/dashboard-data';
import type { FilterState } from '@/lib/types';

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
    const f: FilterState = {
      years: years ?? [],
      bus: bus ?? [],
      countries: countries ?? [],
      roles: roles ?? [],
      programs: programCodes ?? [],
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
    };
  },
});

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
- If the question asks about a specific year, business unit (AMBU/DBU), country, role, or program rather than the org-wide totals above, call the queryMetrics tool with those filters instead of guessing or reusing the org-wide numbers. Only use queryMetrics's numbers in your answer once you've called it — never invent a filtered number yourself.
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

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return Response.json(
        { error: 'Invalid messages format' },
        { status: 400 }
      );
    }

    const lastMessage = messages[messages.length - 1]?.content || '';

    try {
      const result = streamText({
        model: chatModel,
        system: METRICS_KNOWLEDGE,
        messages: messages.map((m: any) => ({
          role: m.role as 'user' | 'assistant',
          content: m.content,
        })),
        temperature: 0.4,
        tools: { queryMetrics },
        stopWhen: stepCountIs(6),
        maxRetries: 2,
        onError: ({ error }) => {
          console.error('[chat] streamText error:', error);
        },
      });

      return result.toTextStreamResponse();
    } catch (aiError) {
      console.error(
        '[chat] AI Gateway call failed, using keyword-matched fallback:',
        aiError instanceof Error ? aiError.stack ?? aiError.message : String(aiError)
      );
      const response = generateNaturalResponse(lastMessage);
      return new Response(response, {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
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
