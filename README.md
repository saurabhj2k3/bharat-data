# 🇮🇳 Bharat Data

A lightweight, deterministic data generation library specifically for the Indian context. Generate realistic names, addresses, phone numbers, and identity documents (Aadhaar, PAN, Voter ID) with ease.

## ✨ Features

- **Deterministic**: Use a seed to generate the exact same data every time.
- **Regional Accuracy**: Generate names and addresses for specific Indian regions (North, South, East, West).
- **Multilingual**: Supports English (`en_IN`) and Hindi (`hi_IN`).
- **Enterprise-Ready**: Generates valid formats for PAN, Aadhaar, GSTIN, TAN, and more.
- **Zero Dependencies**: Lightweight and fast.
- **Works Everywhere**: Compatible with Node.js and modern browsers.

## 🚀 Installation

```bash
npm install bharat-data
```

## 📖 Usage

### Basic Example

```javascript
import { bharat } from 'bharat-data';

// Generate a random person profile
const user = bharat.person.generate();
console.log(user.name);    // e.g., "Arjun Sharma"
console.log(user.phone);   // e.g., "+91 9876543210"
console.log(user.pan);     // e.g., "ABC P D 1234 F"
```

### Seeding for Determinism

```javascript
import { bharat } from 'bharat-data';

bharat.seed(12345);
const profile1 = bharat.person.generate();

bharat.seed(12345);
const profile2 = bharat.person.generate();

// profile1 and profile2 will be identical!
```

### Regional & Localization

```javascript
// Generate a South Indian profile in Hindi
bharat.setLocale('hi_IN');
const user = bharat.person.generate('South');

console.log(user.name);    // e.g., "वेंकटेश नायडू"
console.log(user.address); // e.g., "फ्लैट नं. 42, मेन रोड, कर्नाटक, भारत - 560001"
```

### Identity & Enterprise Documents

```javascript
import { Identity } from 'bharat-data';

console.log(Identity.aadhaar()); // 12-digit Aadhaar
console.log(Identity.pan());     // PAN Card (with 'P' status for individuals)
console.log(Identity.gstin());   // GST Number
console.log(Identity.epf());     // EPF Number
```

### 💰 Finance & Banking

```javascript
import { bharat } from 'bharat-data';

console.log(bharat.finance.upi());           // e.g. "arjun.sharma@okaxis"
console.log(bharat.finance.accountNumber()); // Deterministic account number
console.log(bharat.finance.ifsc());          // Valid Indian Bank IFSC code
console.log(bharat.finance.creditCard());    // Mock Visa/Mastercard
```

### 🏢 Corporate & Business

```javascript
console.log(bharat.business.companyName());  // e.g. "Vikas Logistics Pvt. Ltd."
console.log(bharat.business.gstin());        // State-accurate Corporate GSTIN
console.log(bharat.business.udyam());        // Udyam Registration (MSME)
console.log(bharat.business.corporatePan()); // PAN with 'C' status
```

### 🍔 Food & ✈️ Airline

```javascript
console.log(bharat.food.snack());            // e.g. "Samosa" or "समोसा"
console.log(bharat.airline.airline());       // e.g. "IndiGo"
console.log(bharat.airline.flightNumber());  // e.g. "6E-456"
```

### 🎸 Culture & 🐯 Animals

```javascript
console.log(bharat.music.instrument());      // e.g. "Sitar"
console.log(bharat.animal.nativeSpecies());  // e.g. "Bengal Tiger"
```

### 💻 Hacker & 💰 Commerce

```javascript
console.log(bharat.hacker.phrase());         // e.g. "Jugaad! We are Optimizing the AI Pipeline."
console.log(bharat.commerce.price());        // e.g. "₹1,450"
```

### 🎓 Education & 🏥 Healthcare

```javascript
console.log(bharat.education.university());   // e.g. "Indian Institute of Technology, Mumbai"
console.log(bharat.education.rollNumber());   // e.g. "24CS456"

console.log(bharat.healthcare.abhaId());      // 14-digit ABHA ID (xx-xxxx-xxxx-xxxx)
console.log(bharat.healthcare.bloodGroup());  // e.g. "O+"
```

### 🌐 Internet & Dates

```javascript
console.log(bharat.internet.email());        // e.g. "arjun_sharma@gmail.com"
console.log(bharat.internet.password(12));   // Fake secure password

const dob = bharat.dates.dob('pro');         // Date of Birth (25-60 age group)
console.log(bharat.dates.format(dob));       // DD/MM/YYYY
```

### 🚗 Transport

```javascript
console.log(bharat.transport.vehicleNumber('MH')); // e.g. "MH-12-AX-1234"
console.log(bharat.transport.dlNumber());         // Driving License format
```

## 🛠️ Modules

- `names`: Region and gender-specific names with state-specific nuances.
- `address`: National coverage (36 units) with capitals and pincode logic.
- `food`: Localized Indian snacks, mains, and desserts.
- `airline`: Indian airlines, airports, and flight numbers.
- `music`: Traditional instruments and genres.
- `animal`: Native Indian species.
- `commerce`: Indian pricing (INR), categories, and GST.
- `hacker`: Hinglish tech jargon.
- `identity`: Aadhaar, PAN, GSTIN, TAN, EPF, ESIC, Voter ID, Passport.
- `finance`: UPI, Bank Accounts, IFSC, Credit Cards.
- `business`: Company Names, Udyam, Corporate PAN.
- `education`: Universities, Degrees, Streams, Roll Numbers.
- `healthcare`: ABHA ID, Blood Groups, Hospital Names.
- `internet`: Emails, Usernames, Passwords, URLs.
- `dates`: DOB generation with age filtering.
- `transport`: RTO registration numbers, Driving Licenses.
- `person`: All-in-one full user profile generator.

## 📄 License

MIT © Bharat-Data Contributors
