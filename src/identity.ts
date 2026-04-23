// src/identity.ts
import { SeedEngine } from './engines/seed.js';
import voterData from './data/en-IN/voter.json' with { type: 'json' };

export class Identity {
  /**
   * Generates a deterministic 12-digit Aadhaar number.
   */
  static aadhaar(opts?: { mode?: 'valid' | 'invalid' }): string {
    let aadhaar = Array.from({ length: 12 }, (_, i) => {
      // First digit should not be 0 or 1
      if (i === 0) return SeedEngine.pick([2, 3, 4, 5, 6, 7, 8, 9]);
      return SeedEngine.pick([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    }).join('');

    if (opts?.mode === 'invalid') {
        // Intentionally corrupt the length (make it 11 characters or add an alphabet character)
        aadhaar = aadhaar.substring(0, 11) + 'X';
    }

    return `${aadhaar.substring(0, 4)} ${aadhaar.substring(4, 8)} ${aadhaar.substring(8, 12)}`;
  }

  /**
   * Generates a deterministic PAN Card Number.
   * Format: 3 Letters + [P] (Person Status) + 1 Letter (Surname) + 4 Digits + 1 Letter.
   */
  static pan(opts?: { mode?: 'valid' | 'invalid', surnameFirstLetter?: string }): string {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
    const firstThree = Array.from({ length: 3 }, () => SeedEngine.pick(letters)).join('');
    // PAN status type, typically 'P' for individual
    const status = 'P';
    // First character of surname (or random letter if undefined)
    const surnameChar = opts?.surnameFirstLetter ? opts.surnameFirstLetter.toUpperCase() : SeedEngine.pick(letters);
    
    // 4 random digits
    const digits = Math.floor(1000 + SeedEngine.next() * 8999);
    // 1 check digit letter
    const checkDigit = SeedEngine.pick(letters);
    
    let result = `${firstThree}${status}${surnameChar}${digits}${checkDigit}`;

    if (opts?.mode === 'invalid') {
        // Corrupt by replacing a digit slot with a letter
        result = `${firstThree}${status}${surnameChar}X${digits.toString().substring(1)}${checkDigit}`;
    }

    return result;
  }

  /**
   * Generates a deterministic Indian GSTIN.
   * Format: State Code (2) + PAN (10) + Entity (1) + Z (1) + Check Digit (1).
   */
  static gstin(stateCode: string = "27", pan?: string): string {
    const panToUse = pan ? pan.substring(0, 10) : this.pan().substring(0, 10);
    const entity = Math.floor(1 + SeedEngine.next() * 9);
    const check = SeedEngine.pick("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split(''));
    return `${stateCode}${panToUse}${entity}Z${check}`;
  }

  /**
   * Generates a deterministic TAN (Tax Deduction Account Number).
   * Format: 4 Letters + 5 Digits + 1 Letter.
   */
  static tan(): string {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
    const prefix = Array.from({ length: 4 }, () => SeedEngine.pick(letters)).join('');
    const digits = Math.floor(10000 + SeedEngine.next() * 89999);
    const suffix = SeedEngine.pick(letters);
    return `${prefix}${digits}${suffix}`;
  }

  /**
   * Generates a state-accurate and deterministic Voter ID.
   */
  static voterId(stateName?: string): string {
    const states = (voterData as any).statePrefixes;
    const selectedState = stateName 
      ? states.find((s: any) => s.state === stateName) || states[0]
      : SeedEngine.pick(states);

    const prefix = SeedEngine.pick(selectedState.prefixes);
    const digits = Math.floor(1000000 + SeedEngine.next() * 8999999);
    
    return `${prefix}${digits}`;
  }

  /**
   * Generates a deterministic Indian Passport Number.
   */
  static passport(): string {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
    const firstLetter = SeedEngine.pick(letters);
    const digits = Math.floor(1000000 + SeedEngine.next() * 8999999);
    
    return `${firstLetter}${digits}`;
  }

  /**
   * Generates a deterministic Employee Provident Fund (EPF) Number.
   * Format: Region (2) + Office (3) + Establishment (7) + Extension (3) + Member (7).
   */
  static epf(): string {
    const region = SeedEngine.pick(["MH", "KA", "DL", "TN", "WB"]);
    const office = SeedEngine.pick(["BAN", "MUM", "DEL", "CHE", "KOL"]);
    const establishment = Math.floor(1000000 + SeedEngine.next() * 8999999);
    const ext = "000";
    const member = Math.floor(1000000 + SeedEngine.next() * 8999999);
    return `${region}${office}${establishment}${ext}${member}`;
  }

  /**
   * Generates a deterministic ESIC (Employees' State Insurance) Number.
   * Format: 17 Digits.
   */
  static esic(): string {
    let res = "";
    for(let i = 0; i < 17; i++) {
        res += Math.floor(SeedEngine.next() * 10);
    }
    return res;
  }
}