# 🇮🇳 Bharat-Data

[![npm version](https://img.shields.io/npm/v/bharat-data.svg)](https://www.npmjs.com/package/bharat-data)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Downloads](https://img.shields.io/npm/dm/bharat-data.svg)](https://www.npmjs.com/package/bharat-data)

> **Bharat-Data** is the most comprehensive, enterprise-ready data generation engine for the Indian ecosystem. Generate valid government IDs, regional names, and context-aware profiles in seconds.

---

## 📦 Installation

```bash
npm install -g bharat-data
```

---

## 🛠️ Usage (The Wizard Pattern)

### 1. Generate SQL (PostgreSQL / MySQL)
```bash
bharat-data sql users "name, age, phone, balance, city" 100
```

### 2. Generate JSON (MongoDB / Firebase)
```bash
bharat-data json products "product, price, description" 50
```

### 3. Generate CSV (Excel / Spreadsheets)
```bash
bharat-data csv employees "name, job, email, pan" 100
```

---

## 🚀 How it helps Developers

*   **⚡ Seed Databases in Seconds**: Stop manually typing "Test User 1". Generate 1,000+ realistic SQL records with one command to populate your local Postgre, MySQL, or MongoDB.
*   **🏦 Validate Financial Workflows**: Test your KYC or Fintech onboarding flows with mathematically valid **Aadhaar, PAN, and GSTIN** numbers that pass format validation.
*   **🎨 Build Stunning UI Mocks**: Create prototypes that look real. Use regional names, addresses, and avatars to show stakeholders exactly how your app handles Indian context.
*   **🧠 Logic Consistency**: Test "Smart" features with linked data—where generated emails and PAN cards dynamically match the person's name for realistic data relationships.

---

## ✨ Why Bharat-Data?

| Feature | Description |
|---|---|
| 🧙‍♂️ **Wizard Mode** | Generate `.sql`, `.json`, or `.csv` using a single command. |
| 🇮🇳 **Indian Locale** | Valid **Aadhaar, PAN, GSTIN**, and regional addresses. |
| 🧠 **Smart Linking** | Context-aware logic: Names match Emails and PAN cards. |
| 📊 **Progress Dashboard** | Real-time progress bars for massive datasets (1k+ records). |
| 🔧 **Zero Config** | Just pass the keywords you need — no schema files required. |

---

## 🗝️ Available Data Keywords

| Category | Keywords |
|---|---|
| **👤 Personal** | `name`, `email`, `phone` *(+91)*, `age`, `gender`, `avatar` |
| **📍 Location** | `city`, `address`, `state`, `pincode`, `zip` |
| **💼 Business** | `balance`, `company`, `job`, `gstin`, `price`, `product` |
| **🏛️ Identity** | `aadhaar`, `pan`, `voterid`, `license` |
| **☕ Lifestyle** | `dish`, `cuisine`, `mobile`, `laptop`, `bloodgroup` |
| **⚙️ System** | `id`, `date`, `password`, `description`, `boolean` |

---

## 🗺️ Roadmap (Upcoming Features)

*   **🌏 Native Language Support**: Direct generation in Hindi, Marathi, Bengali, Tamil, etc. (Regional scripts/Unicode).
*   **🕸️ Browser Bundle**: A high-performance CDN-ready package for purely frontend mocking.
*   **☁️ Cloud Sync**: One-click direct seeding connectors for Firebase, Supabase, and Prisma.
*   **🧬 Custom Schemas**: Load your own `.json` schema files to define custom data relationships.

---

## 📖 Deep Documentation
For advanced usage and detailed documentation:
*   [🧙‍♂️ **CLI Wizard Manual**](./docs/CLI_WIZARD.md)
*   [🏛️ **Identity Guide**](./docs/IDENTITY_GUIDE.md)
*   [📚 **Modules Reference**](./docs/MODULES.md)
*   [🛠️ **Developer Guide**](./docs/DEVELOPER_GUIDE.md)

---

## 🏗️ Interactive Mode
For granular field selection, just run: `bharat-data`

---

## 📄 License

MIT © [Saurabh Jadhav](https://github.com/saurabhj2k3)
