import { LocaleEngine } from './engines/locale.js';
import { SeedEngine } from './engines/seed.js';
import { type Region } from './names.js';
import cityData from './data/en-IN/cities.json' with { type: 'json' };

export class Address {
  private static get data() {
    return LocaleEngine.getData('address') as any;
  }

  /**
   * Returns a random state object, optionally filtered by region.
   */
  static state(region?: Region): any {
    const states = this.data.states as any[];
    const filtered = region 
      ? states.filter(s => s.region === region) 
      : states;
    
    return SeedEngine.pick(filtered.length > 0 ? filtered : states);
  }

  /**
   * Returns a random city, optionally filtered by state.
   */
  static city(stateCode?: string): any {
    const cities = cityData.cities as any[];
    const filtered = stateCode 
        ? cities.filter(c => c.stateCode === stateCode)
        : cities;
    
    return SeedEngine.pick(filtered.length > 0 ? filtered : cities);
  }

  /**
   * Generates a realistic pincode based on the selected state's prefixes.
   */
  static pincode(stateNameOrCode?: string): string {
    const states = this.data.states as any[];
    // Find state by name or code
    const state = stateNameOrCode 
      ? states.find(s => s.name === stateNameOrCode || s.code === stateNameOrCode) || states[0]
      : SeedEngine.pick(states);
    
    const prefix = SeedEngine.pick(state.pin_prefixes) as string;
    const remainingLen = 6 - prefix.length;
    
    // Generate the remaining digits
    const min = Math.pow(10, remainingLen - 1);
    const max = Math.pow(10, remainingLen) - 1;
    const suffixNum = Math.floor(min + SeedEngine.next() * (max - min));
    
    return `${prefix}${suffixNum}`;
  }

  /**
   * Generates a logically consistent full Indian address.
   */
  static fullAddress(region?: Region, stateCode?: string): string {
    const stateObj = stateCode 
      ? this.data.states.find((s: any) => s.code === stateCode) || this.state(region)
      : this.state(region);
    
    const cityObj = this.city(stateObj.code);
    const streets = this.data.streets || ["Main Road"];
    const street = SeedEngine.pick(streets);
    
    const houseNum = Math.floor(SeedEngine.next() * 999) + 1;
    const pincode = this.pincode(stateObj.code);

    const labels = this.data.labels || { flat: "Flat No.", india: "India" };

    return `${labels.flat} ${houseNum}, ${street}, ${cityObj.name}, ${stateObj.name}, ${labels.india} - ${pincode}`;
  }
}