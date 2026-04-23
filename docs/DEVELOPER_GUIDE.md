# 🛠️ Developer Guide

Welcome to the development side of Bharat-Data! We aim for high determinism and strict localization.

---

## 1. Setup & Build
The project is built on TypeScript (ESM).
```bash
git clone <repo>
npm install
npm run build # Compiles TS to dist/
```

## 2. Import & Usage
You can import the library using standard ES Modules (ESM).

### Javascript/TypeScript API
```javascript
import { bharat } from 'bharat-data';

// Basic Usage
const name = bharat.names.fullName();
const pan = bharat.identity.pan();

// Deterministic Seeding (Critical for Tests)
bharat.seed(12345);
console.log(bharat.names.fullName()); // Will always be the same result
```

### Tree Shaking
The library supports tree-shaking. If you only need specific modules (e.g., in a frontend bundle), import them directly:
```javascript
import { Identity, Names } from 'bharat-data';

const id = Identity.aadhaar();
```

## 3. Running Tests
We use **Vitest** for our test suite.
```bash
npm test          # Run all tests
npm run test:ui   # Launch Vitest UI
```

## 3. Adding Data
Localized data is stored in `src/data/en-IN/`. 
To add new localized data:
1. Create/Modify the relevant JSON in `src/data/en-IN/`.
2. Ensure any new categories are reflected in the TypeScript classes.

## 4. Determinism (The Seed Engine)
Everything in the library MUST be deterministic. 
*   **NEVER** use `Math.random()`.
*   **ALWAYS** use `SeedEngine.next()` or `SeedEngine.pick()`.
This ensures that `bharat.seed(123)` produces identical results every time.

## 5. Adding Keywords to CLI
New keywords should be added to the `keywordMap` inside `bin/cli.js`.

---

## Coding Standards
*   Use camelCase for methods.
*   Document public methods with JSDoc.
*   Ensure 100% localization to the Indian context.
