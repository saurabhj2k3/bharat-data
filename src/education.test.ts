import { describe, it, expect } from 'vitest';
import { Education } from './education.js';

describe('Education Module Validation', () => {

  it('should generate a non-empty university name', () => {
    const uni = Education.university();
    expect(typeof uni).toBe('string');
    expect(uni.length).toBeGreaterThan(5);
  });

  it('should generate degree information with type and stream', () => {
    const degree = Education.degreeInfo();
    expect(degree).toHaveProperty('type');
    expect(degree).toHaveProperty('stream');
    expect(typeof degree.type).toBe('string');
    expect(typeof degree.stream).toBe('string');
  });

  it('should generate a valid roll number format', () => {
    const roll = Education.rollNumber();
    // typically year(2) + dept(2) + id(3)
    expect(roll).toMatch(/^\d{2}[A-Z]{2}\d{3}$/);
  });
});
