import { SeedEngine } from './engines/seed.js';

export class Internet {
  private static domains = ["gmail.com", "yahoo.co.in", "outlook.com", "hotmail.com", "rediffmail.com", "icloud.com"];
  private static separators = [".", "_", "", "-"];

  /** Generates a deterministic email address */
  static email(firstName?: string, lastName?: string): string {
    const f = firstName ? firstName.toLowerCase() : "user";
    const l = lastName ? lastName.toLowerCase() : Math.floor(SeedEngine.next() * 1000).toString();
    const sep = SeedEngine.pick(this.separators);
    const domain = SeedEngine.pick(this.domains);
    
    return `${f}${sep}${l}@${domain}`;
  }

  /** Generates a deterministic username */
  static userName(firstName?: string, lastName?: string): string {
    const f = firstName ? firstName.toLowerCase() : "user";
    const l = lastName ? lastName.toLowerCase() : "";
    const sep = SeedEngine.pick(this.separators);
    const suffix = Math.floor(SeedEngine.next() * 999);
    
    return l ? `${f}${sep}${l}${suffix}` : `${f}${suffix}`;
  }

  /** Generates a deterministic URL for a personal profile */
  static url(firstName?: string): string {
    const host = firstName ? firstName.toLowerCase() : "user";
    return `https://${host}.me`;
  }

  /** Generates a deterministic fake password */
  static password(length: number = 10): string {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    let retVal = "";
    for (let i = 0; i < length; ++i) {
        retVal += SeedEngine.pick(charset.split(''));
    }
    return retVal;
  }
}
