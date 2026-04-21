import { describe, it, expect } from 'vitest';
import { Business } from './business.js';

describe('Business Module Validation', () => {

  it('should generate a valid Corporate PAN (10 chars, 4th char is C/F)', () => {
    const panC = Business.corporatePan(false);
    expect(panC).toMatch(/^[A-Z]{3}C[A-Z][0-9]{4}[A-Z]$/);

    const panF = Business.corporatePan(true);
    expect(panF).toMatch(/^[A-Z]{3}F[A-Z][0-9]{4}[A-Z]$/);
  });

  it('should generate a valid GSTIN (15 chars)', () => {
    const gstin = Business.gstin("27");
    // Matches: 2 digits State, 10 chars PAN, 1 digit Entity, 1 Z, 1 alphanumeric checksum
    expect(gstin).toMatch(/^27[A-Z]{3}[CF][A-Z][0-9]{4}[A-Z][1-3]Z[0-9A-Z]$/);
  });

  it('should generate a valid Udyam Registration Number', () => {
    const udyam = Business.udyam("MH");
    expect(udyam).toMatch(/^UDYAM-MH-\d{2}-\d{7}$/);
  });

  it('should generate a non-empty company name', () => {
    const name = Business.companyName();
    expect(typeof name).toBe('string');
    expect(name.length).toBeGreaterThan(5);
  });

  it('should generate a non-empty industry', () => {
    const industry = Business.industry();
    expect(typeof industry).toBe('string');
    expect(industry.length).toBeGreaterThan(3);
  });
});
