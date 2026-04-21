import { SeedEngine } from './engines/seed.js';
import { LocaleEngine, type Locale } from './engines/locale.js';
import { Names } from './names.js';
import { Address } from './address.js';
import { Identity } from './identity.js';
import { Phone } from './phone.js';
import { Person } from './person.js';
import { Finance } from './finance.js';
import { Internet } from './internet.js';
import { Dates } from './dates.js';
import { Transport } from './transport.js';
import { Business } from './business.js';
import { Education } from './education.js';
import { Healthcare } from './healthcare.js';
import { Food } from './food.js';
import { Airline } from './airline.js';
import { Music, Animal } from './culture.js';
import { Commerce, Hacker } from './utility.js';
import { Gadget } from './gadgets.js';

export { 
  Names, 
  Address, 
  Identity, 
  Phone, 
  Person, 
  Finance, 
  Internet, 
  Dates, 
  Transport,
  Business,
  Education,
  Healthcare,
  Food,
  Airline,
  Music,
  Animal,
  Commerce,
  Hacker,
  Gadget,
  SeedEngine, 
  LocaleEngine 
};

export const bharat = {
  /** Sets the global seed for deterministic data */
  seed: (value: number) => SeedEngine.setSeed(value),
  
  /** Sets the localization for the library */
  setLocale: (locale: Locale) => LocaleEngine.setLocale(locale),
  
  names: Names,
  address: Address,
  identity: Identity,
  phone: Phone,
  person: Person,
  finance: Finance,
  internet: Internet,
  dates: Dates,
  transport: Transport,
  business: Business,
  education: Education,
  healthcare: Healthcare,
  food: Food,
  airline: Airline,
  music: Music,
  animal: Animal,
  commerce: Commerce,
  hacker: Hacker,
  gadget: Gadget
};

export default bharat;