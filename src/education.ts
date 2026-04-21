import { SeedEngine } from './engines/seed.js';

export class Education {
  private static uniPrefixes = ["Indian Institute of", "National Institute of", "University of", "Central University of", "Mahatma Gandhi"];
  private static uniSuffixes = ["Technology", "Science", "Management", "Design", "Medical Sciences"];
  private static cities = ["Mumbai", "Delhi", "Bengaluru", "Chennai", "Kolkata", "Hyderabad", "Pune", "Ahmedabad"];
  
  private static degrees = [
    { type: "B.Tech", streams: ["Computer Science", "Information Technology", "Mechanical", "Civil", "Electrical"] },
    { type: "B.Sc", streams: ["Physics", "Chemistry", "Mathematics", "Bio-Technology", "Computer Science"] },
    { type: "B.Com", streams: ["Accounting", "Finance", "Banking", "Taxation"] },
    { type: "B.A", streams: ["English", "History", "Political Science", "Sociology"] },
    { type: "MBBS", streams: ["General Medicine"] },
    { type: "MBA", streams: ["Marketing", "Finance", "Operations", "Human Resources"] }
  ];

  /** Generates a deterministic university name */
  static university(): string {
    const p = SeedEngine.pick(this.uniPrefixes);
    const c = SeedEngine.pick(this.cities);
    
    if (p.includes("Institute")) {
        const s = SeedEngine.pick(this.uniSuffixes);
        return `${p} ${s}, ${c}`;
    }
    return `${p} ${c}`;
  }

  /** Generates a deterministic degree and stream */
  static degreeInfo(): { type: string, stream: string } {
    const deg = SeedEngine.pick(this.degrees);
    const str = SeedEngine.pick(deg.streams);
    return { type: deg.type, stream: str };
  }

  /** Generates a deterministic roll number */
  static rollNumber(): string {
    const year = new Date().getFullYear().toString().substring(2);
    const dept = SeedEngine.pick(["CS", "ME", "EE", "CE", "BT"]);
    const id = Math.floor(100 + SeedEngine.next() * 899).toString();
    return `${year}${dept}${id}`;
  }
}
