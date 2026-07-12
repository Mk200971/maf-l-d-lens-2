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

    // First try AI Gateway if available
    try {
      const response = await generateText({
        model: 'meta/llama-3.3-70b',
        system: METRICS_KNOWLEDGE,
        messages: messages.map((m: any) => ({
          role: m.role as 'user' | 'assistant',
          content: m.content,
        })),
        temperature: 0.8,
        max_tokens: 1500,
      });

      return new Response(response.text, {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
        },
      });
    } catch (aiError) {
      // Fallback to natural responses when AI Gateway isn't available
      console.log('[v0] AI Gateway unavailable, using intelligent fallback');
      const response = generateNaturalResponse(lastMessage);
      return new Response(response, {
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
