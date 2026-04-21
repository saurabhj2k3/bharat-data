import { LocaleEngine } from './engines/locale.js';
import { SeedEngine } from './engines/seed.js';

export class Food {
  private static get data() {
    return LocaleEngine.getData('food') as any;
  }

  /** Generates a deterministic Indian snack name */
  static snack(): string {
    return SeedEngine.pick(this.data.snacks);
  }

  /** Generates a deterministic Indian main course name */
  static mainCourse(): string {
    return SeedEngine.pick(this.data.mainCourses);
  }

  /** Generates a deterministic Indian dessert name */
  static dessert(): string {
    return SeedEngine.pick(this.data.desserts);
  }

  /** Generates a deterministic Indian beverage name */
  static beverage(): string {
    return SeedEngine.pick(this.data.beverages);
  }
}
