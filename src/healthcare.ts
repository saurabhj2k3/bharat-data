import { SeedEngine } from './engines/seed.js';

export class Healthcare {
  private static hospitalPrefixes = ["Apollo", "Fortis", "Max", "AIMS", "Lifeline", "City", "Global", "Heritage"];
  private static medicalSuffixes = ["Hospital", "Clinic", "Medical Center", "Institute of Health", "Nursing Home"];
  private static cities = ["Mumbai", "Delhi", "Bengaluru", "Chennai", "Kolkata", "Pune"];
  
  private static bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  /** Generates a deterministic 14-digit ABHA ID */
  static abhaId(): string {
    const part1 = Math.floor(10 + SeedEngine.next() * 89).toString();
    const part2 = Math.floor(1000 + SeedEngine.next() * 8999).toString();
    const part3 = Math.floor(1000 + SeedEngine.next() * 8999).toString();
    const part4 = Math.floor(1000 + SeedEngine.next() * 8999).toString();
    return `${part1}-${part2}-${part3}-${part4}`;
  }

  /** Generates a deterministic blood group */
  static bloodGroup(): string {
    return SeedEngine.pick(this.bloodGroups);
  }

  /** Generates a deterministic Indian hospital name */
  static hospital(): string {
    const p = SeedEngine.pick(this.hospitalPrefixes);
    const s = SeedEngine.pick(this.medicalSuffixes);
    const c = SeedEngine.pick(this.cities);
    return `${p} ${s}, ${c}`;
  }

  /** Generates a deterministic health insurance policy number */
  static insurancePolicy(): string {
    const prefix = SeedEngine.pick(["LIC", "STAR", "HDFC", "ICICI", "NIVA"]);
    const num = Math.floor(10000000 + SeedEngine.next() * 89999999).toString();
    return `${prefix}-${num}`;
  }
}
