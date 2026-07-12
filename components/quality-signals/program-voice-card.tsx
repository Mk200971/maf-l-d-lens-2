'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { VoiceOfLearnerRow } from '@/lib/types'
import { cn } from '@/lib/utils'

interface ProgramVoiceCardProps {
  row: VoiceOfLearnerRow | null
  isPlaceholder?: boolean
  npsScore?: number
}

export function ProgramVoiceCard({ row, isPlaceholder, npsScore }: ProgramVoiceCardProps) {
  const [expandedThemes, setExpandedThemes] = useState(false)
  const [expandedQuotes, setExpandedQuotes] = useState(false)

  if (isPlaceholder) {
    return (
      <Card className="border-l-4 border-l-blue-400 bg-blue-50/30">
        <CardContent className="flex items-center gap-4 py-6">
          <div className="text-3xl">ℹ️</div>
          <div className="flex flex-col gap-1">
            <p className="font-semibold text-foreground">Self Leadership Program</p>
            <p className="text-sm text-muted-foreground">
              Qualitative feedback not captured for this program&apos;s survey format.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!row) return null

  const hasStrengthsAndImprovements = row.themes.strengths.length > 0 || row.themes.improvements.length > 0
  const hasAllSentiment = row.themes.allSentiment && row.themes.allSentiment.length > 0
  const allThemes = hasAllSentiment 
    ? row.themes.allSentiment 
    : [
        ...(row.themes.strengths || []),
        ...(row.themes.improvements || []),
      ]
  const totalThemes = allThemes?.length ?? 0
  const displayedThemes = expandedThemes && allThemes ? allThemes : allThemes?.slice(0, 3) ?? []
  
  const totalQuotes = row.highlightQuotes.length
  const displayedQuotes = expandedQuotes ? row.highlightQuotes : row.highlightQuotes.slice(0, 1)

  const truncateQuote = (text: string, maxLength: number = 300) => {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text
  }

  return (
    <Card className="border-l-4 border-l-amber-400 bg-amber-50/30">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle className="text-lg">{row.programName}</CardTitle>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
              <span>{row.totalComments} total comments</span>
              <span>•</span>
              <span>{row.nonTrivialComments} non-trivial</span>
            </div>
          </div>
          {npsScore !== undefined && npsScore !== null && (
            <Badge variant="outline" className="whitespace-nowrap">
              NPS: {npsScore > 0 ? '+' : ''}{npsScore}%
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-6">
        {/* Themes Section */}
        {hasStrengthsAndImprovements && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Strengths */}
            {row.themes.strengths.length > 0 && (
              <div className="flex flex-col gap-2">
                <p className="text-xs font-medium uppercase tracking-wider text-green-700">
                  🟢 Top Strength Themes
                </p>
                <div className="flex flex-col gap-1">
                  {row.themes.strengths.slice(0, 3).map((theme, idx) => (
                    <div
                      key={`strength-${idx}`}
                      className="flex items-center justify-between gap-2 rounded-sm bg-green-50 px-2.5 py-1.5"
                    >
                      <span className="text-sm text-green-900">{theme.theme}</span>
                      <Badge variant="secondary" className="text-xs">
                        {theme.count}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Improvements */}
            {row.themes.improvements.length > 0 && (
              <div className="flex flex-col gap-2">
                <p className="text-xs font-medium uppercase tracking-wider text-amber-700">
                  🟠 Top Improvement Themes
                </p>
                <div className="flex flex-col gap-1">
                  {row.themes.improvements.slice(0, 3).map((theme, idx) => (
                    <div
                      key={`improvement-${idx}`}
                      className="flex items-center justify-between gap-2 rounded-sm bg-amber-50 px-2.5 py-1.5"
                    >
                      <span className="text-sm text-amber-900">{theme.theme}</span>
                      <Badge variant="secondary" className="text-xs">
                        {theme.count}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* All Sentiment (for SLII/PATH/L2H) */}
        {hasAllSentiment && (
          <div className="flex flex-col gap-2">
            <p className="text-xs font-medium uppercase tracking-wider text-blue-700">
              🔵 Learner Mentions
            </p>
            <div className="flex flex-col gap-1">
              {row.themes.allSentiment!.slice(0, 3).map((theme, idx) => (
                <div
                  key={`sentiment-${idx}`}
                  className="flex items-center justify-between gap-2 rounded-sm bg-blue-50 px-2.5 py-1.5"
                >
                  <span className="text-sm text-blue-900">{theme.theme}</span>
                  <Badge variant="secondary" className="text-xs">
                    {theme.count}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Expand themes button */}
        {totalThemes > 3 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setExpandedThemes(!expandedThemes)}
            className="w-full justify-center text-xs"
          >
            <ChevronDown className={cn('mr-1 size-4 transition-transform', expandedThemes && 'rotate-180')} />
            {expandedThemes ? 'Show fewer' : `Show ${totalThemes - 3} more themes`}
          </Button>
        )}

        {/* Highlight Quotes */}
        {row.highlightQuotes.length > 0 && (
          <div className="flex flex-col gap-3">
            <p className="text-xs font-medium uppercase tracking-wider text-foreground">
              ✨ Highlight Quotes
            </p>
            {displayedQuotes.map((quote, idx) => (
              <div
                key={`highlight-${idx}`}
                className="rounded-lg border-l-4 border-l-red-800 bg-white p-3 shadow-sm"
              >
                <p className="text-sm italic text-foreground">
                  &quot;{truncateQuote(quote.text)}&quot;
                </p>
                {quote.sessionLabel && (
                  <p className="mt-2 text-xs text-muted-foreground">
                    — {quote.sessionLabel} {quote.month && `• ${quote.month}`}
                  </p>
                )}
              </div>
            ))}
            {totalQuotes > 1 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setExpandedQuotes(!expandedQuotes)}
                className="w-full justify-center text-xs"
              >
                {expandedQuotes ? 'Show fewer' : `Show ${totalQuotes - 1} more quote${totalQuotes - 1 > 1 ? 's' : ''}`}
              </Button>
            )}
          </div>
        )}

        {/* Concern Quotes */}
        {row.concernQuotes.length > 0 && (
          <div className="flex flex-col gap-3">
            <p className="text-xs font-medium uppercase tracking-wider text-red-700">
              ⚠️ Concerns
            </p>
            {row.concernQuotes.map((quote, idx) => (
              <div
                key={`concern-${idx}`}
                className="rounded-lg border-l-4 border-l-red-500 bg-red-50/50 p-3"
              >
                <div className="flex items-start gap-2">
                  <p className="flex-1 text-sm text-red-900">
                    &quot;{truncateQuote(quote.text, 200)}&quot;
                  </p>
                  {quote.score !== null && (
                    <Badge variant="destructive" className="ml-2 whitespace-nowrap text-xs">
                      {quote.score}/10
                    </Badge>
                  )}
                </div>
                {quote.sessionLabel && (
                  <p className="mt-2 text-xs text-red-700/70">
                    — {quote.sessionLabel}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
