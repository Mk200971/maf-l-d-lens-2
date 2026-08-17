/**
 * Privacy utilities for suppressing small cells to prevent re-identification.
 *
 * A "small cell" is an aggregate bucket whose support count (the number of
 * individuals behind it) is below MIN_CELL_SIZE. Such cells are dropped
 * before being returned to the client because a tiny cohort can be
 * re-identified by combining it with other known information.
 *
 * IMPORTANT: suppression MUST be based on the support count `n`, never on
 * the measured `value`. A satisfaction bar showing 4.2/5 for a cohort of
 * 300 people is fine; a bar showing 5.0/5 for a cohort of 1 person must be
 * suppressed — even though its value (5.0) is the maximum. The previous
 * implementation suppressed on `value` and silently deleted every country
 * scoring below 5.0 in satisfaction, every negative NPS, etc. That was a
 * bug. Use `isSuppressed(n)` with the support count, not the value.
 */

export const MIN_CELL_SIZE = 5;

/**
 * True when `n` (the support count) is greater than 0 but below the
 * minimum-cell threshold. `n === 0` is treated as "no data" rather than
 * "suppressed", and is left to the caller to render as an empty state.
 */
export function isSuppressed(n: number): boolean {
  return n > 0 && n < MIN_CELL_SIZE;
}
