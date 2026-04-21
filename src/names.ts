import { LocaleEngine } from './engines/locale.js';
import { SeedEngine } from './engines/seed.js';

export type Region = 'North' | 'South' | 'East' | 'West';
export type Gender = 'male' | 'female';

export class Names {
  private static get data() {
    return LocaleEngine.getData() as any;
  }

  public static getRandomRegion(): Region {
    const regions: Region[] = ['North', 'South', 'East', 'West'];
    return SeedEngine.pick(regions);
  }

  /**
   * Generates a first name and its index, optionally filtered by region, gender and locale.
   */
  static firstNameWithIndex(region?: Region, gender?: Gender, locale?: any): { name: string, index: number } {
    const r = region || this.getRandomRegion();
    const data = LocaleEngine.getData('names', locale);
    const regionData = data.regions[r];
    
    let list: string[] = [];
    if (gender && regionData[gender]) {
      list = regionData[gender];
    } else {
      list = regionData.firstNames || [];
    }
    
    const index = SeedEngine.pickIndex(list.length > 0 ? list.length : regionData.firstNames.length);
    const name = list.length > 0 ? list[index] : regionData.firstNames[index];
    return { name, index };
  }

  static lastNameWithIndex(region?: Region, locale?: any): { name: string, index: number } {
    const r = region || this.getRandomRegion();
    const data = LocaleEngine.getData('names', locale);
    const list = data.regions[r].lastNames;
    const index = SeedEngine.pickIndex(list.length);
    return { name: list[index], index };
  }

  /**
   * Generates a first name, optionally filtered by region, gender and locale.
   */
  static firstName(region?: Region, gender?: Gender, locale?: any): string {
    return this.firstNameWithIndex(region, gender, locale).name;
  }

  static lastName(region?: Region, locale?: any): string {
    return this.lastNameWithIndex(region, locale).name;
  }

  static firstNameByIndex(index: number, region: Region, gender?: Gender, locale?: any): string {
    const data = LocaleEngine.getData('names', locale);
    const regionData = data.regions[region];
    let list: string[] = [];
    if (gender && regionData[gender]) {
      list = regionData[gender];
    } else {
      list = regionData.firstNames || [];
    }
    const finalList = list.length > 0 ? list : regionData.firstNames;
    return finalList[index % finalList.length];
  }

  static lastNameByIndex(index: number, region: Region, locale?: any): string {
    const data = LocaleEngine.getData('names', locale);
    const list = data.regions[region].lastNames;
    return list[index % list.length];
  }

  static middleName(): string {
    const middleNames = this.data.middleNames || [];
    return middleNames.length > 0 ? SeedEngine.pick(middleNames) : "";
  }

  /**
   * Generates a full name with optional middle name, considering state-specific nuances.
   */
  static fullName(region?: Region, gender?: Gender, stateCode?: string, overrideFirst?: string, overrideLast?: string): string {
    const r = region || this.getRandomRegion();
    const first = overrideFirst || this.firstName(r, gender);
    const last = overrideLast || this.lastName(r);
    let middle = this.middleName();

    // State-specific nuances
    if (stateCode === 'GJ') { // Gujarat
      middle = gender === 'female' ? "Ben" : "Bhai";
    } else if (stateCode === 'AP' || stateCode === 'TG') { // Andhra/Telangana
      middle = "Rao";
    } else if (stateCode === 'MH' && gender === 'male') { // Maharashtra
      middle = this.firstName(r, 'male'); // Use father's name as middle name
    }

    // Naming patterns: 
    // GJ, MH often use [First] [Middle] [Last]
    // Others might skip it
    const forceMiddle = ['GJ', 'MH', 'AP', 'TG'].includes(stateCode || "");
    const includeMiddle = middle && (forceMiddle || SeedEngine.next() > 0.8);
    
    return includeMiddle ? `${first} ${middle} ${last}` : `${first} ${last}`;
  }
}