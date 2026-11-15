/**
 * Returns the calendar date of `date` in the user's local time zone as `YYYY-MM-DD`.
 *
 * Do not use `toISOString()` for this: it converts to UTC, so just after local
 * midnight in time zones ahead of UTC it returns the previous day (#19).
 */
export function toLocalDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
