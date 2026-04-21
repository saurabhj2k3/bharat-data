import { SeedEngine } from './engines/seed.js';

export class Commerce {
  private static categories = ["Electronics", "Clothing", "Home & Kitchen", "Books", "Beauty & Personal Care", "Automotive", "Grocery", "Jewelry"];
  private static products = [
    { category: "Electronics", items: ["Smartphone", "Laptop", "Wireless Earbuds", "Smartwatch"] },
    { category: "Clothing", items: ["Kurta", "Saree", "Jeans", "T-shirt", "Sherwani"] },
    { category: "Grocery", items: ["Basmati Rice", "Masala Chai Tea", "Ghee", "Turmeric Powder"] }
  ];

  /** Generates a deterministic INR price */
  static price(min: number = 100, max: number = 50000): string {
    const p = Math.floor(min + SeedEngine.next() * (max - min));
    return `₹${p.toLocaleString('en-IN')}`;
  }

  /** Generates a deterministic product category */
  static category(): string {
    return SeedEngine.pick(this.categories);
  }

  /** Generates a deterministic product name */
  static product(): string {
    const cat = SeedEngine.pick(this.products);
    const item = SeedEngine.pick(cat.items);
    return item;
  }

  /** Generates a deterministic GST rate */
  static gstRate(): string {
    return SeedEngine.pick(["5%", "12%", "18%", "28%"]);
  }
}

export class Hacker {
  private static adjectives = ["Cloud-native", "Distributed", "Scalable", "Resilient", "Serverless", "Agile"];
  private static nouns = ["Microservices", "Blockchain", "AI", "Kubernetes", "Data Lake", "Pipeline"];
  private static verbs = ["Optimizing", "Scaling", "Refactoring", "Deploying", "Integrating"];
  private static hinglish = ["Bilkul sahi", "Jugaad", "Shanti se", "Zabardast", "Ek Number"];

  /** Generates a deterministic Hinglish tech phrase */
  static phrase(): string {
    const v = SeedEngine.pick(this.verbs);
    const a = SeedEngine.pick(this.adjectives);
    const n = SeedEngine.pick(this.nouns);
    const h = SeedEngine.pick(this.hinglish);
    return `${h}! We are ${v} the ${a} ${n}.`;
  }
}
