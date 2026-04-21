import { SeedEngine } from './engines/seed.js';

export class Business {
  private static entityTypes = [
    { value: "Pvt. Ltd.", weight: 60 },
    { value: "Ltd.", weight: 15 },
    { value: "LLP", weight: 10 },
    { value: "Enterprises", weight: 10 },
    { value: "and Sons", weight: 2 },
    { value: "Group", weight: 1 },
    { value: "Solutions", weight: 1 },
    { value: "Logistics", weight: 1 }
  ];
  private static industries = ["Technology", "Manufacturing", "Finance", "Healthcare", "Logistics", "Retail", "Energy", "Education"];
  private static prefixes = ["Vikas", "Bharat", "Indus", "Surya", "Ocean", "Nexus", "Evergreen", "Apex", "Global"];

  /** Generates a deterministic corporate PAN (4th char 'C' or 'F') */
  static corporatePan(isFirm: boolean = false): string {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
    const prefix = Array.from({ length: 3 }, () => SeedEngine.pick(letters)).join('');
    const status = isFirm ? 'F' : 'C'; // C for Company, F for Firm
    const firstCharOfName = SeedEngine.pick(letters);
    const digits = Math.floor(1000 + SeedEngine.next() * 8999);
    const check = SeedEngine.pick(letters);
    
    return `${prefix}${status}${firstCharOfName}${digits}${check}`;
  }

  /**
   * Generates a realistic and deterministic Indian GSTIN.
   * Structure: StateCode(2) + PAN(10) + EntityCode(1) + Z(1) + Checksum(1)
   */
  static gstin(stateCode: string = "27"): string {
    const pan = this.corporatePan();
    const entity = SeedEngine.pick(["1", "2", "3"]);
    const checksum = SeedEngine.pick("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(''));
    
    return `${stateCode}${pan}${entity}Z${checksum}`;
  }

  /**
   * Generates a deterministic Udyam Registration Number (MSME).
   * Format: UDYAM-XX-00-0000000
   */
  static udyam(stateCode: string = "MH"): string {
    const districtCode = Math.floor(10 + SeedEngine.next() * 89);
    const registration = Math.floor(1000000 + SeedEngine.next() * 8999999).toString();
    return `UDYAM-${stateCode}-${districtCode}-${registration}`;
  }

  /** Generates a deterministic company name */
  static companyName(): string {
    const p = SeedEngine.pick(this.prefixes);
    const i = SeedEngine.pick(this.industries);
    const t = SeedEngine.pickWeighted(this.entityTypes);
    return `${p} ${i} ${t}`;
  }

  /** Generates a random industry sector */
  static industry(): string {
    return SeedEngine.pick(this.industries);
  }
}