// src/engines/seed.ts
export class SeedEngine {
  private static seed: number = 123456789; // Default seed

  /**
   * Sets the global seed for the library.
   */
  static setSeed(value: number): void {
    this.seed = value;
  }

  /**
   * Generates the next pseudo-random number between 0 and 1.
   */
  static next(): number {
    let t = (this.seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  /**
   * Helper to pick a random index from an array length using the seeded value.
   */
  static pickIndex(length: number): number {
    return Math.floor(this.next() * length);
  }

  /**
   * Helper to pick a random item from an array using the seeded value.
   */
  static pick<T>(array: T[]): T {
    const index = this.pickIndex(array.length);
    return array[index];
  }

  /**
   * Helper to pick a random item from a weighted array.
   * Expects array of objects with value and weight properties.
   */
  static pickWeighted<T>(options: { value: T, weight: number }[]): T {
    const totalWeight = options.reduce((sum, item) => sum + item.weight, 0);
    const randomValue = this.next() * totalWeight;
    
    let currentWeight = 0;
    for (const item of options) {
        currentWeight += item.weight;
        if (randomValue <= currentWeight) {
            return item.value;
        }
    }
    return options[options.length - 1].value; // Fallback to last item
  }
}