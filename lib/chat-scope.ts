/**
 * Chat scope — the filter selection a user makes in the AI composer.
 *
 * Mirrors the relevant subset of `FilterState` (everything except sessionIds
 * and monthRange, which aren't surfaced in the chat composer).
 *
 * Server-side, this is merged into `FilterState` for `queryMetrics` and into
 * `buildChart` for the visualize tool, with explicit tool args always winning
 * over scope.
 */
export type ChatScope = {
  years?: number[];
  bus?: string[];
  countries?: string[];
  roles?: string[];
  programs?: string[];
};

/** True if every array in the scope is empty or undefined. */
export function isScopeEmpty(scope: ChatScope | undefined | null): boolean {
  if (!scope) return true;
  return (
    (scope.years?.length ?? 0) === 0 &&
    (scope.bus?.length ?? 0) === 0 &&
    (scope.countries?.length ?? 0) === 0 &&
    (scope.roles?.length ?? 0) === 0 &&
    (scope.programs?.length ?? 0) === 0
  );
}

/** Total count of selected items across all dimensions. */
export function scopeCount(scope: ChatScope | undefined | null): number {
  if (!scope) return 0;
  return (
    (scope.years?.length ?? 0) +
    (scope.bus?.length ?? 0) +
    (scope.countries?.length ?? 0) +
    (scope.roles?.length ?? 0) +
    (scope.programs?.length ?? 0)
  );
}

/** Human-readable summary like "AMBU · 2026" — used in chart subtitles. */
export function scopeSummary(scope: ChatScope | undefined | null): string | undefined {
  if (!scope || isScopeEmpty(scope)) return undefined;
  const parts: string[] = [];
  if (scope.years?.length) parts.push(scope.years.map(String).join('/'));
  if (scope.bus?.length) parts.push(scope.bus.join('/'));
  if (scope.countries?.length) parts.push(scope.countries.join('/'));
  if (scope.roles?.length) parts.push(scope.roles.join('/'));
  if (scope.programs?.length) parts.push(`${scope.programs.length} program${scope.programs.length > 1 ? 's' : ''}`);
  return parts.length > 0 ? parts.join(' · ') : undefined;
}

/** Empty scope — useful for clearing. */
export const EMPTY_SCOPE: ChatScope = {
  years: [],
  bus: [],
  countries: [],
  roles: [],
  programs: [],
};
