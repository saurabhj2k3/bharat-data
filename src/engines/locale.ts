import { names as hiNames } from '../data/hi-IN/names.js';
import { names as enNames } from '../data/en-IN/names.js';
import { address as hiAddress } from '../data/hi-IN/address.js';
import { address as enAddress } from '../data/en-IN/address.js';
import { food as hiFood } from '../data/hi-IN/food.js';
import { food as enFood } from '../data/en-IN/food.js';

export type Locale = 'en_IN' | 'hi_IN' | 'te_IN' | 'mr_IN' | 'bn_IN';
export type DataType = 'names' | 'address' | 'food';

export class LocaleEngine {
  private static currentLocale: Locale = 'en_IN';

  static setLocale(locale: Locale) {
    this.currentLocale = locale;
  }

  static getLocale(): Locale {
    return this.currentLocale;
  }

  static getData(type: DataType = 'names', locale?: Locale): any {
    const targetLocale = locale || this.currentLocale;

    if (type === 'address') {
      if (targetLocale === 'hi_IN') return hiAddress;
      return enAddress;
    }
    if (type === 'food') {
      if (targetLocale === 'hi_IN') return hiFood;
      return enFood;
    }
    
    if (targetLocale === 'hi_IN') return hiNames;
    return enNames;
  }
}