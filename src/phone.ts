// src/modules/phone.ts (or src/phone.ts)
import phoneData from './data/en-IN/phone.json' with { type: 'json' };
import { SeedEngine } from './engines/seed.js';

export class Phone {
  /**
   * Generates a 10-digit Indian mobile number.
   * Starts with 6, 7, 8, or 9 as per TRAI regulations.
   */
  static mobile(includePrefix: boolean = true): string {
    const prefixes = (phoneData as any).mobilePrefixes;
    const firstDigit = SeedEngine.pick(prefixes);
    
    // Generates 9 deterministic digits
    let rest = "";
    for(let i = 0; i < 9; i++) {
        rest += Math.floor(SeedEngine.next() * 10);
    }
    
    return includePrefix ? `+91 ${firstDigit}${rest}` : `${firstDigit}${rest}`;
  }

  /**
   * Generates a city-accurate Indian landline number with STD code.
   */
  static landline(cityName?: string): string {
    const codes = (phoneData as any).landlineCodes;
    const cityObj = cityName 
      ? codes.find((c: any) => c.city === cityName) || codes[0]
      : SeedEngine.pick(codes);
    
    const number = Math.floor(10000000 + SeedEngine.next() * 89999999);
    return `${cityObj.code}-${number}`;
  }
}