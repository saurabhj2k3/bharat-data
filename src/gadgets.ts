import { gadgets } from './data/en-IN/gadgets.js';
import { SeedEngine } from './engines/seed.js';

export class Gadget {
  /** Generates a deterministic mobile phone name */
  static mobile(): string {
    const brand = SeedEngine.pick(gadgets.mobiles);
    const model = SeedEngine.pick(brand.models);
    return `${brand.brand} ${model}`;
  }

  /** Generates a deterministic Smart TV name */
  static tv(): string {
    const brand = SeedEngine.pick(gadgets.tvs);
    const model = SeedEngine.pick(brand.models);
    return `${brand.brand} ${model}`;
  }

  /** Generates a deterministic Smartwatch name */
  static watch(): string {
    const brand = SeedEngine.pick(gadgets.watches);
    const model = SeedEngine.pick(brand.models);
    return `${brand.brand} ${model}`;
  }

  /** Generates a deterministic Camera name */
  static camera(): string {
    const brand = SeedEngine.pick(gadgets.cameras);
    const model = SeedEngine.pick(brand.models);
    return `${brand.brand} ${model}`;
  }

  /** Generates a deterministic gadget category */
  static category(): string {
    return SeedEngine.pick(gadgets.categories);
  }

  /** Generates a deterministic gadget brand name */
  static brand(): string {
    const all = [...gadgets.mobiles, ...gadgets.tvs, ...gadgets.watches, ...gadgets.cameras];
    return SeedEngine.pick(all).brand;
  }
}
