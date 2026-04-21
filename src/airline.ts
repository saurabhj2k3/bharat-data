import { SeedEngine } from './engines/seed.js';

export class Airline {
  private static airlines = ["IndiGo", "Air India", "Air India Express", "SpiceJet", "Akasa Air", "Alliance Air", "Vistara", "Fly91"];
  private static airports = [
    { name: "Indira Gandhi International Airport", city: "Delhi", code: "DEL" },
    { name: "Chhatrapati Shivaji Maharaj International Airport", city: "Mumbai", code: "BOM" },
    { name: "Kempegowda International Airport", city: "Bengaluru", code: "BLR" },
    { name: "Chennai International Airport", city: "Chennai", code: "MAA" },
    { name: "Netaji Subhash Chandra Bose International Airport", city: "Kolkata", code: "CCU" },
    { name: "Rajiv Gandhi International Airport", city: "Hyderabad", code: "HYD" }
  ];

  /** Generates a deterministic Indian airline name */
  static airline(): string {
    return SeedEngine.pick(this.airlines);
  }

  /** Generates a deterministic Indian airport name and code */
  static airport(): { name: string, city: string, code: string } {
    return SeedEngine.pick(this.airports);
  }

  /** Generates a deterministic flight number */
  static flightNumber(): string {
    const codes = ["6E", "AI", "IX", "SG", "QP", "9I", "UK"];
    const code = SeedEngine.pick(codes);
    const num = Math.floor(100 + SeedEngine.next() * 899).toString();
    return `${code}-${num}`;
  }

  /** Generates a deterministic PNR (Passenger Name Record) */
  static pnr(): string {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split('');
    let res = "";
    for(let i = 0; i < 6; i++) {
        res += SeedEngine.pick(chars);
    }
    return res;
  }
}
