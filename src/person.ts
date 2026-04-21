import { Names, type Region, type Gender } from './names.js';
import { Address } from './address.js';
import { Identity } from './identity.js';
import { Phone } from './phone.js';
import { Internet } from './internet.js';
import { Transport } from './transport.js';
import { Business } from './business.js';
import { SeedEngine } from './engines/seed.js';

export interface UserProfile {
  name: string;
  gender: Gender;
  region: Region;
  state: string;
  country: string;
  nationality: string;
  email: string;
  phone: string;
  address: string;
  pan: string;
  aadhaar: string;
  drivingLicense: string;
  vehicle: string;
  gstin: string;
}

export interface EntityContext {
  region?: Region;
  stateCode?: string;
  gender?: Gender;
}

export class Person {
  static generate(context?: EntityContext): UserProfile {
    const r = context?.region || Names.getRandomRegion();
    const gender = context?.gender || SeedEngine.pick(['male', 'female'] as Gender[]);
    
    // Determine state Object (ensuring it matches region)
    // If context provided a strict stateCode, we use that if Address.stateByCode exists, else we pick state in region.
    // Address.state(r) randomly picks a state within region r.
    const stateObj = Address.state(r);
    
    // Pick indices once
    const firstData = Names.firstNameWithIndex(r, gender);
    const lastData = Names.lastNameWithIndex(r);
    
    // Get English versions using the same indices for email/PAN
    const firstNameEn = Names.firstNameByIndex(firstData.index, r, gender, 'en_IN');
    const lastNameEn = Names.lastNameByIndex(lastData.index, r, 'en_IN');
    
    // Localized names for the display profile
    const firstNameLocal = firstData.name;
    const lastNameLocal = lastData.name;
    const fullNameLocal = Names.fullName(r, gender, stateObj.code, firstNameLocal, lastNameLocal); 
    
    return {
      name: fullNameLocal,
      gender: gender,
      region: r,
      state: stateObj.name,
      country: "India",
      nationality: "Indian",
      email: Internet.email(firstNameEn, lastNameEn),
      phone: Phone.mobile(),
      address: Address.fullAddress(r, stateObj.code),
      pan: Identity.pan({ surnameFirstLetter: lastNameEn[0] }),
      aadhaar: Identity.aadhaar(),
      drivingLicense: Transport.dlNumber(stateObj.code),
      vehicle: Transport.vehicleNumber(stateObj.code),
      gstin: Business.gstin(stateObj.code)
    };
  }

  static bulk(count: number = 10, context?: EntityContext): UserProfile[] {
    return Array.from({ length: count }, () => this.generate(context));
  }
}