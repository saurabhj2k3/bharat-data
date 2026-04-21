# 🇮🇳 Bharat Data

[![npm version](https://img.shields.io/npm/v/bharat-data.svg)](https://www.npmjs.com/package/bharat-data)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A powerful, **deterministic**, and enterprise-grade data generation library specifically for the Indian context. Generate millions of realistic records including Names, Addresses, Identity Documents (Aadhaar, PAN, GSTIN), and more—formatted for CLI, Spreadsheet (CSV), or SQL.

---

## ⚡ Quick Start: CLI (No Code Required)

The easiest way to use **Bharat-Data** is directly from your terminal. No installation needed if you have Node.js.

### 🧙‍♂️ 1. Open the Interactive Wizard
Generate bulk data or single records step-by-step using our beautiful TUI:
```bash
npx bharat-data
```
*Follow the on-screen prompts to export data to JSON, CSV, or SQL.*

### 🏃 2. Use 1-Word Aliases
Quickly get data for common entities:
```bash
npx bharat-data user       # Single full profile
npx bharat-data users 10   # 10 full profiles
npx bharat-data pan        # Valid PAN Card
npx bharat-data gstin      # Valid GST Number
npx bharat-data address    # Valid Indian Address
```

### 💾 3. Exporting to Files (CSV / SQL / JSON)
Perfect for populating databases or sharing spreadsheets:
```bash
# Generate 100 users to a CSV file (Excel-ready)
npx bharat-data users 100 --out users.csv

# Generate 500 users to a SQL insert file for a specific table
npx bharat-data users 500 --out seeds.sql --table users_table

# Select specific fields only
npx bharat-data users 50 --fields name,pan,phone --out mini_leads.json
```

---

## 🚀 Programmatic Usage (SDK)

Install it in your project:
```bash
npm install bharat-data
```

### Basic Generation
```javascript
import { bharat } from 'bharat-data';

// Generate a random individual profile
const user = bharat.person.generate();
console.table(user); 

// Generate bulk users
const batch = bharat.person.bulk(100);
```

### 🎯 Determinism (Seeding)
Produce the exact same data every time by providing a seed. Perfect for testing and reproducibility.
```javascript
import { bharat } from 'bharat-data';

// Set a global seed
bharat.SeedEngine.setSeed(42);

const user1 = bharat.person.generate();
bharat.SeedEngine.setSeed(42);
const user2 = bharat.person.generate();

// user1 === user2
```

### 🏛️ Regional & Contextual Accuracy
Bharat-Data intelligently syncs data points. If a user is from "Maharashtra", their:
- **Aadhaar** prefix matches the state code.
- **RTO License** is MH-specific (e.g., MH-12-AX-1234).
- **GSTIN** prefix matches the state code.
- **Address** and Pincode are logically grouped.

```javascript
// Generate a profile specifically from South India
const vishnu = bharat.person.generate('South');
```

---

## 🛠️ Available Modules

| Module | Description | Key Methods |
| :--- | :--- | :--- |
| `person` | Full Profile Orchestrator | `generate()`, `bulk(n)` |
| `identity` | Official Documents | `aadhaar()`, `pan()`, `passport()`, `voterId()` |
| `business` | Corporate Data | `companyName()`, `gstin()`, `udyam()`, `corporatePan()` |
| `address` | Context-Aware Address | `fullAddress()`, `state()`, `pincode()` |
| `finance` | Banking & Payments | `upi()`, `accountNumber()`, `ifsc()`, `creditCard()` |
| `transport` | Vehicle & Licensing | `vehicleNumber()`, `dlNumber()` |
| `healthcare` | Medical ID | `abhaId()`, `bloodGroup()`, `hospital()` |
| `education` | Academic Data | `university()`, `degree()`, `rollNumber()` |

---

## 📄 License

MIT © [Saurabh Jadhav](https://github.com/saurabhj2k3)
