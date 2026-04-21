import { SeedEngine } from './engines/seed.js';
import rtoData from './data/en-IN/rto.json' with { type: 'json' };

export class Transport {
  /**
   * Generates an RTO vehicle number matching the state.
   * Format: State (2) + District (2) + Series (2) + Digits (4).
   */
  static vehicleNumber(stateCode?: string): string {
    const codes = (rtoData as any).registration_codes;
    const availableStates = Object.keys(codes);
    
    const sc = stateCode && availableStates.includes(stateCode) 
        ? stateCode 
        : SeedEngine.pick(availableStates);
    
    const districtCode = SeedEngine.pick(codes[sc]);
    
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
    const s1 = SeedEngine.pick(letters);
    const s2 = SeedEngine.pick(letters);
    const digits = Math.floor(1000 + SeedEngine.next() * 8999);

    return `${sc}-${districtCode}-${s1}${s2}-${digits}`;
  }

  static dlNumber(stateCode: string = "MH"): string {
    const year = new Date().getFullYear() - Math.floor(SeedEngine.next() * 10);
    const id = Math.floor(1000000 + SeedEngine.next() * 8999999);
    return `${stateCode}${year}${id}`;
  }
}
