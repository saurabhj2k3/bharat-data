# 📚 Modules Reference

This is an exhaustive list of all 20 modules available in **Bharat-Data**.

---

### 1-5: Core Profiles
*   **Names**: First, Last, Full, Prefixes, Suffixes.
*   **Address**: State-aware Cities, Pincodes, Regional Street names, full addresses.
*   **Identity**: Government IDs (Aadhaar, PAN, GSTIN, Voter, Passport, TAN, EPF, ESIC).
*   **Phone**: Valid Indian Mobile (+91 9/8/7), Landline (City specific), IMEI numbers.
*   **Person**: Full realistic profiles including age, gender, and region.

### 6-10: Business & Commerce
*   **Finance**: Amounts (INR), Transaction types, IFSC codes, Account numbers, VPA (UPI IDs).
*   **Internet**: Smart Emails, Usernames, Avatars (prawatar.cc), IPv4, Passwords.
*   **Dates**: Recent/Past/Future dates with deterministic formatting.
*   **Transport**: Vehicle Registration (e.g., MH 01 AB 1234), DL numbers.
*   **Business**: Realistic Company names, Udyam numbers, Corporate PANs, Industry types.

### 11-15: Professional & Lifestyle
*   **Education**: Degrees, Universities (IIT/NIT style), Stream-specific Roll numbers.
*   **Healthcare**: Blood groups, Hospitals (Brand + City), Ailments, ABHA IDs.
*   **Food**: Indian Dishes (Main/Snack/Dessert), Cuisines, Spice levels.
*   **Airline**: Indian carriers (Indigo, AI, Vistara), PNRs, Flight numbers.
*   **Music**: Popular Indian genres, Bollywood-style artists, instruments.

### 16-20: Utility & Technology
*   **Animal**: Breeds, Wildlife, common pet types.
*   **Commerce**: Product categories (Electronics/Grocery), Item names, INR pricing.
*   **Hacker**: Hinglish technical phrases, tech nouns, verbs.
*   **Utility**: UUIDs, Booleans, Random Weights, age calculators.
*   **Gadgets**: Mobile models, TVs, Watches, Cameras (verified brands).

---

## Access Pattern
Every module is accessible via the global `bharat` object:
`bharat.<modulename>.<methodname>()`
