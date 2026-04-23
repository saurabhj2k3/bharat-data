# 🏛️ Indian Identity Data Guide

Bharat-Data provides high-fidelity, mathematically accurate representations of Indian identity documents. Our generators follow official government formatting rules.

---

## 1. Aadhaar Number (`identity.aadhaar`)
Generates a 12-digit numeric string formatted as `XXXX XXXX XXXX`.
*   **Validation**: The first digit is strictly between `2` and `9`.
*   **Mode**: Supports `valid` and `invalid` modes for testing validation logic.

---

## 2. PAN Card (`identity.pan`)
Generates a 10-character alphanumeric string.
*   **Format**: `AAAAA1111A` (5 Letters, 4 Digits, 1 Letter).
*   **Status Code (4th Char)**: Default is `P` (Person/Individual).
*   **Surname Initial (5th Char)**: Dynamically calculated based on the person's last name.

---

## 3. GSTIN (`identity.gstin`)
Generates a 15-character Goods and Services Tax Identification Number.
*   **Format**: `StateCode` (2) + `PAN` (10) + `EntityCode` (1) + `Z` (1) + `CheckDigit` (1).
*   **Smart Linking**: If a PAN is provided, it is reused within the GSTIN.

---

## 4. Voter ID (`identity.voterId`)
Generates a state-accurate Voter identity number (EPIC).
*   **State Detection**: Supports specific prefixes for major Indian states.
*   **Format**: `3-letter Prefix` + `7 Digits`.

---

## 5. Other Identity Types
*   **Passport**: Standard 8-character Indian passport format (1 Letter + 7 Digits).
*   **TAN**: 10-character Tax Deduction Account Number.
*   **EPF**: Full Employee Provident Fund number with Region/Office/Establishment codes.
*   **ESIC**: 17-digit Social Security number.

---

## Usage in Code
```javascript
import { bharat } from 'bharat-data';

const pan = bharat.identity.pan({ surnameFirstLetter: 'M' });
const gstin = bharat.identity.gstin("27", pan);
```
