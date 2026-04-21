import { SeedEngine } from './engines/seed.js';

export class Finance {
  private static upiHandles = ["okaxis", "okhdfcbank", "okicici", "ybl", "paytm", "apl"];
  private static bankPrefixes = [
    { name: "State Bank of India", ifsc: "SBIN", accountLen: 11 },
    { name: "HDFC Bank", ifsc: "HDFC", accountLen: 12 },
    { name: "ICICI Bank", ifsc: "ICIC", accountLen: 12 },
    { name: "Axis Bank", ifsc: "UTIB", accountLen: 15 },
    { name: "Punjab National Bank", ifsc: "PUNB", accountLen: 16 },
    { name: "Bank of Baroda", ifsc: "BARB", accountLen: 14 }
  ];

  /** Generates a deterministic UPI ID */
  static upi(name?: string): string {
    const handle = SeedEngine.pick(this.upiHandles);
    const username = name 
        ? name.toLowerCase().replace(/\s/g, '.') 
        : `user${Math.floor(SeedEngine.next() * 10000)}`;
    return `${username}@${handle}`;
  }

  /** Generates a deterministic IFSC code */
  static ifsc(bankName?: string): string {
    const bank = bankName 
        ? this.bankPrefixes.find(b => b.name.includes(bankName)) || this.bankPrefixes[0]
        : SeedEngine.pick(this.bankPrefixes);
    
    // Format: 4 letters + '0' + 6 digits/letters
    let branch = "";
    for(let i = 0; i < 6; i++) {
        branch += Math.floor(SeedEngine.next() * 10);
    }
    return `${bank.ifsc}0${branch}`;
  }

  /** Generates a deterministic account number based on bank standards */
  static accountNumber(bankName?: string): string {
    const bank = bankName 
        ? this.bankPrefixes.find(b => b.name.includes(bankName)) || this.bankPrefixes[0]
        : SeedEngine.pick(this.bankPrefixes);
    
    let acc = "";
    for(let i = 0; i < bank.accountLen; i++) {
        acc += Math.floor(SeedEngine.next() * 10);
    }
    return acc;
  }

  /** Generates a deterministic Indian Credit Card Number (Visa/Mastercard) */
  static creditCard(): string {
    // Basic Luhn-compliant or similar randomized generator
    // Visa starts with 4, Mastercard starts with 51-55
    const isVisa = SeedEngine.next() > 0.5;
    let cc = isVisa ? "4" : SeedEngine.pick(["51", "52", "53", "54", "55"]);
    
    while(cc.length < 15) {
        cc += Math.floor(SeedEngine.next() * 10);
    }
    
    // Add a simple check digit (not full Luhn for mock but looks real)
    cc += Math.floor(SeedEngine.next() * 10);
    return cc.match(/.{1,4}/g)?.join(' ') || cc;
  }
}