import { generateText } from 'ai';
import { metricDocs, metricDocById } from '@/lib/metric-docs';
import { kpis } from '@/lib/dashboard-data';

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

// Find metric documentation for smart answers
function getMetricInfo(query: string): string | null {
  const lowerQuery = query.toLowerCase();
  for (const doc of metricDocs) {
    const titleMatch = doc.title.toLowerCase();
    const keywordMatch = [
      doc.title.toLowerCase(),
      ...doc.title.toLowerCase().split(' '),
    ].some(word => lowerQuery.includes(word));

    if (keywordMatch) {
      return `${doc.title}\n\nSummary: ${doc.summary}\n\nCalculation: ${doc.calculation}\n\nInterpretation: ${doc.interpretation}\n\nScope: ${doc.scope}${doc.caveat ? `\n\nCaveat: ${doc.caveat}` : ''}`;
    }
  }
  return null;
}

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
    
    // First try to get metric documentation info
    const metricInfo = getMetricInfo(lastMessage);
    if (metricInfo) {
      return new Response(metricInfo, {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
        },
      });
    }

    // Fall back to AI for general questions
    try {
      const response = await generateText({
        model: 'meta/llama-3.3-70b',
        system: METRICS_KNOWLEDGE,
        messages: messages.map((m: any) => ({
          role: m.role as 'user' | 'assistant',
          content: m.content,
        })),
        temperature: 0.7,
        max_tokens: 1024,
      });

      return new Response(response.text, {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
        },
      });
    } catch (aiError) {
      // If AI fails, return a helpful default response
      console.error('[v0] AI Generation error:', aiError);
      const defaultResponse = `I can help explain your learning metrics! Based on your dashboard:\n\n• Total Learning Hours: ${kpis.totalLearningHours.toLocaleString()}\n• Total Completions: ${kpis.totalCompletions.toLocaleString()}\n• Unique Learners: ${kpis.uniqueLearners.toLocaleString()}\n• Average Satisfaction: ${kpis.avgSatisfaction.toFixed(2)}/5\n\nAsk me specifically about any metric like "learning hours", "satisfaction", "completion rate", or "NPS" to get detailed explanations of how they're calculated and what they mean.`;
      return new Response(defaultResponse, {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
        },
      });
    }
  } catch (error) {
    console.error('[v0] Chat API Error:', error instanceof Error ? error.message : String(error));
    return Response.json(
      { error: 'Failed to process your question.' },
      { status: 500 }
    );
  }
}
