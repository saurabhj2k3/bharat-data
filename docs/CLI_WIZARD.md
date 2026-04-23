# 🧙‍♂️ CLI Wizard Guide

The Bharat-Data CLI is designed for speed and flexibility. It offers two primary ways to work: the **Quick Wizard** (for bulk files) and the **Smart Launcher** (for single methods).

---

## 1. Quick Wizard (Export to File)
The quickest way to seed a database or generate a mock spreadsheet.

### Syntax
`bharat-data <format> <filename> "<columns>" <count>`

| Argument | Description |
| :--- | :--- |
| `<format>` | `sql`, `json`, or `csv`. |
| `<filename>` | The name of the file to create (e.g., `users`). |
| `"<columns>"` | Comma-separated list of keywords. |
| `<count>` | Number of records to generate (default 10). |

### Real-World Examples
```bash
# Generate 1,000 Employees for an HR portal
bharat-data csv employees "name, job, email, phone, city" 1000

# Seed an 'inventory' table for a POS system
bharat-data sql items "product, price, description" 50
```

---

## 2. 🗝️ The Keyword System
Keywords are smart aliases that map to library functions.

### ✨ Smart Linking Feature
When using the Wizard, certain keywords are "Context-Aware":
- **`name` + `email`**: The email will always be based on the person's generated name.
- **`name` + `pan`**: The 5th character of the PAN will strictly match the holder's surname.
- **`pan` + `gstin`**: The GSTIN will correctly reuse the generated PAN.

### Full Keyword List
| Category | Aliases |
| :--- | :--- |
| **Personal** | `name`, `email`, `phone`, `age`, `gender`, `avatar` |
| **Location** | `city`, `address`, `state`, `pincode`, `zip`, `country` |
| **Business** | `company`, `job`, `gstin`, `balance`, `price`, `product` |
| **Identity** | `aadhaar`, `pan`, `voterid` |
| **Education** | `education`, `university`, `rollnumber` |
| **System** | `id`, `date`, `password`, `description`, `boolean` |

---

## 3. Interactive Mode
If you prefer a UI-based approach:
```bash
bharat-data
```
This mode allows you to pick specific methods from every module using an interactive multi-select checkbox interface.

---

## 4. Advanced Flags
| Flag | Example | Description |
| :--- | :--- | :--- |
| `--seed` | `--seed 555` | Forces deterministic generation. |
| `--out` | `--out test.sql` | Directs output to a file. |
| `--fields` | `--fields "a,b"` | Filters JSON output properties. |
| `--table` | `--table users` | Sets the SQL table name. |
