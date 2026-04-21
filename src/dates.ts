import { SeedEngine } from './engines/seed.js';

export type AgeGroup = 'youth' | 'pro' | 'senior' | 'any';

export class Dates {
  /**
   * Generates a deterministic Date of Birth based on age groups.
   * youth: 18-25
   * pro: 25-60
   * senior: 60-90
   */
  static dob(ageGroup: AgeGroup = 'any'): Date {
    const currentYear = new Date().getFullYear();
    let minAge = 18;
    let maxAge = 90;

    if (ageGroup === 'youth') { maxAge = 25; }
    else if (ageGroup === 'pro') { minAge = 25; maxAge = 60; }
    else if (ageGroup === 'senior') { minAge = 60; }

    const age = Math.floor(minAge + SeedEngine.next() * (maxAge - minAge));
    const year = currentYear - age;
    const month = Math.floor(SeedEngine.next() * 12);
    const day = Math.floor(1 + SeedEngine.next() * 28); // Safe day for all months

    return new Date(year, month, day);
  }

  /** Formats a date to Indian DD/MM/YYYY format */
  static format(date: Date): string {
    const d = date.getDate().toString().padStart(2, '0');
    const m = (date.getMonth() + 1).toString().padStart(2, '0');
    const y = date.getFullYear();
    return `${d}/${m}/${y}`;
  }

  /** Generates a recent date (last 30 days) */
  static recent(days: number = 30): Date {
    const now = new Date().getTime();
    const past = days * 24 * 60 * 60 * 1000;
    const randomPast = SeedEngine.next() * past;
    return new Date(now - randomPast);
  }
}
