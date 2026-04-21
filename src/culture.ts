import { SeedEngine } from './engines/seed.js';

export class Music {
  private static instruments = ["Sitar", "Tabla", "Veena", "Sarod", "Shehnai", "Mridangam", "Bansuri", "Santoor", "Dholak", "Tanpura", "Harmonium"];
  private static genres = ["Hindustani Classical", "Carnatic Classical", "Bollywood", "Sufi", "Bhangra", "Ghazal", "Indipop", "Baul"];

  /** Generates a deterministic Indian musical instrument name */
  static instrument(): string {
    return SeedEngine.pick(this.instruments);
  }

  /** Generates a deterministic Indian music genre */
  static genre(): string {
    return SeedEngine.pick(this.genres);
  }
}

export class Animal {
  private static species = ["Bengal Tiger", "Asiatic Lion", "Indian Elephant", "Indian Rhinoceros", "Snow Leopard", "Ganges River Dolphin", "Nilgiri Tahr", "Lion-tailed Macaque", "Great Indian Bustard", "Indian Peafowl"];

  /** Generates a deterministic native Indian animal species */
  static nativeSpecies(): string {
    return SeedEngine.pick(this.species);
  }
}
