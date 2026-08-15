/**
 * Privacy utilities for suppressing small cells to prevent re-identification
 * 
 * When aggregate data contains cells with very few individuals (e.g., uniqueLearners: 1),
 * those individuals can potentially be identified by combining with other known information.
 * 
 * This module implements suppression rules to mask or drop such cells.
 */

export const MIN_CELL_SIZE = 5;

/**
 * Check if a count should be suppressed (fewer than MIN_CELL_SIZE individuals)
 */
export function isSuppressed(count: number): boolean {
  return count > 0 && count < MIN_CELL_SIZE;
}

/**
 * Suppress small cells in an array of rows
 * 
 * @param rows - Array of data rows
 * @param countFn - Function that extracts the count field from a row
 * @returns New array with small cells suppressed (count replaced with -1 to indicate '<5')
 */
export function suppressSmallCells<T extends Record<string, unknown>>(
  rows: T[],
  countFn: (r: T) => number
): T[] {
  return rows.map((row) => {
    const count = countFn(row);
    if (isSuppressed(count)) {
      // Create a new object with the count field suppressed
      const suppressedRow = { ...row };
      // Find the count key and replace it with -1 (meaning '<5')
      const entries = Object.entries(suppressedRow);
      for (const [key, value] of entries) {
        if (value === count && typeof value === 'number') {
          suppressedRow[key as keyof T] = -1 as unknown as T[keyof T];
        }
      }
      return suppressedRow;
    }
    return row;
  });
}
