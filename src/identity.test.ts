// src/identity.test.ts
import { describe, it, expect } from 'vitest';
import { Identity } from './identity.js';

describe('Identity Module Validation', () => {
  
  it('should generate a valid PAN (5 Letters, 4 Digits, 1 Letter)', () => {
    const pan = Identity.pan();
    expect(pan).toMatch(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/);
  });

  it('should generate a valid Aadhaar (12 digits with spaces)', () => {
    const aadhaar = Identity.aadhaar();
    // Matches: 4 digits, space, 4 digits, space, 4 digits
    expect(aadhaar).toMatch(/^[2-9][0-9]{3}\s[0-9]{4}\s[0-9]{4}$/);
  });

  it('should generate a valid Passport (1 Letter + 7 Digits)', () => {
    const passport = Identity.passport();
    expect(passport).toMatch(/^[A-Z][0-9]{7}$/);
  });

  it('should generate a valid Voter ID format', () => {
    const voterId = Identity.voterId();
    expect(voterId.length).toBeGreaterThanOrEqual(10);
  });

  it('should generate invalid corrupt PAN when mode is invalid', () => {
    const invalidPan = Identity.pan({ mode: 'invalid' });
    // An valid PAN has 4 digits. The invalid mode injects an X.
    expect(invalidPan).not.toMatch(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/);
    expect(invalidPan).toContain('X');
  });

  it('should generate invalid corrupt Aadhaar when mode is invalid', () => {
    const invalidAadhaar = Identity.aadhaar({ mode: 'invalid' });
    // Since it's corrupted, it shouldn't match standard spacing or length
    expect(invalidAadhaar).not.toMatch(/^[2-9][0-9]{3}\s[0-9]{4}\s[0-9]{4}$/);
    expect(invalidAadhaar.replace(/\s/g, '')).toContain('X');
  });
});