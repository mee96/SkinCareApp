import { toLocalDateKey } from './local-date';

describe('toLocalDateKey', () => {
  beforeEach(() => {
    // Europe/Madrid is ahead of UTC, so just after local midnight
    // it is still the previous day in UTC (see #19).
    vi.stubEnv('TZ', 'Europe/Madrid');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('runs with the Europe/Madrid offset', () => {
    // Guard: if the time zone is not applied, the regression tests below would pass in UTC.
    expect(new Date(2026, 10, 15, 0, 30).getTimezoneOffset()).toBe(-60);
  });

  it('returns the local date just after midnight in winter time (regression #19)', () => {
    expect(toLocalDateKey(new Date(2026, 10, 15, 0, 30))).toBe('2026-11-15');
  });

  it('returns the local date just after midnight in summer time (regression #19)', () => {
    expect(toLocalDateKey(new Date(2026, 6, 1, 1, 30))).toBe('2026-07-01');
  });

  it('pads single-digit months and days', () => {
    expect(toLocalDateKey(new Date(2026, 0, 5, 12, 0))).toBe('2026-01-05');
  });

  it('returns the new year just after midnight on 1 January', () => {
    expect(toLocalDateKey(new Date(2027, 0, 1, 0, 15))).toBe('2027-01-01');
  });
});
