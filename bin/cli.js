#!/usr/bin/env node

import { bharat, SeedEngine } from '../dist/index.js';
import { select, checkbox, input } from '@inquirer/prompts';
import chalk from 'chalk';
import cliProgress from 'cli-progress';
import fs from 'fs';
import path from 'path';

const originalArgs = process.argv.slice(2);
let args = [];
let seedValue = null;
let fields = null;
let outFile = null;
let tableName = 'bharat_data';

// Detection for the new "Bharat-Data Wizard" CLI pattern
const isWizardPattern = (originalArgs.length >= 4) && (originalArgs[0] === 'sql' || originalArgs[0] === 'json' || originalArgs[0] === 'csv');

if (isWizardPattern) {
    const mode = originalArgs[0];
    const target = originalArgs[1];
    const columnStr = originalArgs[2];
    const count = parseInt(originalArgs[3], 10) || 10;
    const requestedFields = columnStr.split(',').map(f => f.trim());
    
    tableName = target;
    outFile = path.resolve(process.cwd(), `${target}.${mode}`);

    const keywordMap = {
        // Personal
        name: () => bharat.names.fullName(),
        email: (name) => {
            if (name) {
                const parts = name.split(' ');
                return bharat.internet.email(parts[0], parts[parts.length - 1]);
            }
            return bharat.internet.email();
        },
        phone: () => bharat.phone.mobile(true),
        age: () => bharat.utility.age(),
        gender: () => SeedEngine.pick(['male', 'female']),
        avatar: () => bharat.internet.avatar(),
        // Location
        city: () => bharat.address.city().name,
        address: () => bharat.address.fullAddress(),
        state: () => bharat.address.state(),
        pincode: () => bharat.address.pincode(),
        zip: () => bharat.address.pincode(),
        country: () => "India",
        // Business
        balance: () => bharat.commerce.price(1000, 100000),
        company: () => bharat.business.companyName(),
        job: () => bharat.business.industry(),
        price: () => bharat.commerce.price(),
        product: () => bharat.commerce.product(),
        gstin: (pan) => bharat.identity.gstin("27", pan),
        // Identity
        aadhaar: () => bharat.identity.aadhaar(),
        pan: (name) => {
            if (name) {
                const parts = name.split(' ');
                const surname = parts.length > 1 ? parts[parts.length - 1] : '';
                return bharat.identity.pan({ surnameFirstLetter: surname ? surname[0] : '' });
            }
            return bharat.identity.pan();
        },
        voterid: () => bharat.identity.voterId(),
        // Education
        education: () => bharat.education.degreeInfo().type,
        university: () => bharat.education.university(),
        rollnumber: () => bharat.education.rollNumber(),
        // Healthcare
        bloodgroup: () => bharat.healthcare.bloodGroup(),
        doctor: () => bharat.names.fullName(),
        hospital: () => bharat.healthcare.hospital(),
        // Food
        dish: () => bharat.food.mainCourse(),
        cuisine: () => SeedEngine.pick(["North Indian", "South Indian", "Punjabi", "Bengali", "Gujarati"]),
        // Airline
        airline: () => bharat.airline.airline(),
        flight: () => bharat.airline.flightNumber(),
        // Transport
        vehicle: () => bharat.transport.vehicleNumber(),
        license: () => bharat.transport.drivingLicense(),
        // Gadgets
        mobile: () => bharat.gadget.mobile(),
        laptop: () => "MacBook Pro M3",
        // System
        id: () => bharat.utility.id(),
        date: () => bharat.dates.format(bharat.dates.recent()),
        password: () => bharat.internet.password(),
        description: () => bharat.hacker.phrase(),
        boolean: () => bharat.utility.boolean()
    };

    console.log(chalk.bold.hex('#FF9933')('\n🇮🇳  Bharat-Data') + chalk.bold.hex('#FFFFFF')(' Wizard:') + chalk.bold.hex('#138808')(` Generating ${count} ${mode.toUpperCase()} records for '${target}'...\n`));
    
    const data = Array.from({ length: count }, () => {
        const obj = {};
        let currentName = null;
        let currentPan = null;

        // Context Setup
        const hasName = requestedFields.some(f => f.toLowerCase().replace(/\s/g, '') === 'name');
        const hasEmail = requestedFields.some(f => f.toLowerCase().replace(/\s/g, '') === 'email');
        const hasPan = requestedFields.some(f => f.toLowerCase().replace(/\s/g, '') === 'pan');
        const hasGstin = requestedFields.some(f => f.toLowerCase().replace(/\s/g, '') === 'gstin');

        // Priority 1: Name (for Email and PAN)
        if (hasName || hasEmail || hasPan) {
            currentName = bharat.names.fullName();
        }

        // Priority 2: PAN (for GSTIN)
        if (hasPan || hasGstin) {
            currentPan = keywordMap.pan(currentName);
        }

        requestedFields.forEach(f => {
            const key = f.toLowerCase().replace(/\s/g, '');
            if (key === 'email') {
                obj[f] = keywordMap.email(currentName);
            } else if (key === 'pan') {
                obj[f] = currentPan;
            } else if (key === 'name') {
                obj[f] = currentName;
            } else if (key === 'gstin') {
                obj[f] = keywordMap.gstin(currentPan);
            } else if (keywordMap[key]) {
                obj[f] = keywordMap[key]();
            } else {
                obj[f] = `[Unknown: ${f}]`;
            }
        });
        return obj;
    });

    let dataString = '';
    if (mode === 'sql') {
        const keys = requestedFields;
        dataString += `INSERT INTO ${tableName} (${keys.join(', ')}) VALUES\n`;
        const valueStrs = data.map(item => {
            const vals = keys.map(k => {
                let v = item[k];
                if (v === null || v === undefined) return 'NULL';
                if (typeof v === 'string') return `'${v.replace(/'/g, "''")}'`;
                if (typeof v === 'object') return `'${JSON.stringify(v).replace(/'/g, "''")}'`;
                return v;
            });
            return `(${vals.join(', ')})`;
        });
        dataString += valueStrs.join(',\n') + ';';
    } else if (mode === 'csv') {
        const keys = requestedFields;
        dataString += keys.join(',') + '\n';
        const rowStrs = data.map(item => {
            return keys.map(k => {
                let v = item[k];
                if (v === null || v === undefined) return '';
                if (typeof v === 'object') v = JSON.stringify(v);
                v = String(v).replace(/"/g, '""');
                return `"${v}"`;
            }).join(',');
        });
        dataString += rowStrs.join('\n');
    } else {
        dataString = JSON.stringify(data, null, 2);
    }

    fs.writeFileSync(outFile, dataString);
    console.log(chalk.green(`✅ Magic complete! Data successfully written to: ${outFile}\n`));
    process.exit(0);
}

// Fallback to existing CLI logic
for (let i = 0; i < originalArgs.length; i++) {
  if (originalArgs[i] === '--seed' && originalArgs[i + 1]) {
    seedValue = parseInt(originalArgs[i + 1], 10);
    i++; 
  } else if (originalArgs[i].startsWith('--seed=')) {
    seedValue = parseInt(originalArgs[i].split('=')[1], 10);
  } else if (originalArgs[i] === '--fields' && originalArgs[i + 1]) {
    fields = originalArgs[i + 1].split(',').map(f => f.trim());
    i++;
  } else if (originalArgs[i].startsWith('--fields=')) {
    fields = originalArgs[i].split('=')[1].split(',').map(f => f.trim());
  } else if (originalArgs[i] === '--out' && originalArgs[i + 1]) {
    outFile = path.resolve(process.cwd(), originalArgs[i + 1]);
    i++;
  } else if (originalArgs[i].startsWith('--out=')) {
    outFile = path.resolve(process.cwd(), originalArgs[i].split('=')[1]);
  } else if (originalArgs[i] === '--table' && originalArgs[i + 1]) {
    tableName = originalArgs[i + 1];
    i++;
  } else if (originalArgs[i].startsWith('--table=')) {
    tableName = originalArgs[i].split('=')[1];
  } else {
    args.push(originalArgs[i]);
  }
}

if (seedValue !== null && !isNaN(seedValue)) {
    SeedEngine.setSeed(seedValue);
}

async function runInteractive() {
  console.log(chalk.bold.hex('#FF9933')('\n🇮🇳  Welcome to ') + chalk.bold.hex('#FFFFFF')('Bharat-Data ') + chalk.bold.hex('#138808')('Interactive CLI\n'));
  
  const initialChoice = await select({
    message: 'What would you like to do?',
    choices: [
      { name: '🏃 Quick Generate (Print to Terminal)', value: 'quick' },
      { name: '🧙‍♂️ Export Wizard (Generate Bulk Data to File)', value: 'wizard' }
    ]
  });

  const moduleChoice = await select({
    message: 'Select a data module:',
    choices: [
      { name: '👤 Person (Full Profile)', value: 'person' },
      { name: '🏛️ Identity (Aadhaar, PAN, etc.)', value: 'identity' },
      { name: '🏢 Business (GSTIN, Udyam, etc.)', value: 'business' },
      { name: '🌍 Address', value: 'address' },
      { name: '🏥 Healthcare', value: 'healthcare' },
      { name: '🎓 Education', value: 'education' },
      { name: '🚗 Transport', value: 'transport' },
      { name: '🛠️ Utility / System', value: 'utility' }
    ]
  });

  let selectedFields = [];
  let isBulk = false;

  if (initialChoice === 'wizard') {
    isBulk = true;
    if (moduleChoice === 'person') {
        const availableFields = ['name', 'gender', 'region', 'state', 'email', 'phone', 'address', 'pan', 'aadhaar', 'drivingLicense', 'vehicle', 'gstin'];
        selectedFields = await checkbox({
            message: 'Select fields to include in your export:',
            choices: availableFields.map(f => ({ name: f, value: f }))
        });
    } else {
        const availableMethods = Object.getOwnPropertyNames(bharat[moduleChoice]).filter(prop => 
            typeof bharat[moduleChoice][prop] === 'function' && prop !== 'constructor' && prop !== 'length' && prop !== 'name' && prop !== 'prototype'
        );
        selectedFields = await checkbox({
            message: `Select fields from ${moduleChoice} to export:`,
            choices: availableMethods.map(m => ({ name: m, value: m }))
        });
    }
    
    if (selectedFields.length === 0) {
        console.log(chalk.yellow('\n⚠️ No fields selected. Aborting.\n'));
        return;
    }
  } else {
    // Quick generate - pick one
    if (moduleChoice === 'person') {
        selectedFields = ['generate'];
    } else {
        const availableMethods = Object.getOwnPropertyNames(bharat[moduleChoice]).filter(prop => 
            typeof bharat[moduleChoice][prop] === 'function' && prop !== 'constructor' && prop !== 'length' && prop !== 'name' && prop !== 'prototype'
        );
        const choice = await select({
            message: `Select a generation method for ${moduleChoice}:`,
            choices: availableMethods.map(m => ({ name: m, value: m }))
        });
        selectedFields = [choice];
    }
  }

  // Execution
  if (isBulk) {
     const amtStr = await input({ message: 'How many records to generate?', default: '100' });
     const amount = parseInt(amtStr, 10) || 100;
     
     const format = await select({
        message: 'Select export format:',
        choices: [
          { name: 'Excel / Spreadsheet (.csv)', value: 'csv' },
          { name: 'SQL Database Insert (.sql)', value: 'sql' },
          { name: 'Raw JSON API (.json)', value: 'json' }
        ]
     });

     const fileName = await input({ message: `Filename (e.g. mock_data.${format}):`, default: `mock_data.${format}` });
     outFile = path.resolve(process.cwd(), fileName);
     
     console.log(chalk.bold.blue(`\nInitializing Context Engine... Generating ${amount} records...`));
     
     const data = Array.from({ length: amount }, () => {
        if (moduleChoice === 'person') {
            const fullProfile = bharat.person.generate();
            const filtered = {};
            selectedFields.forEach(f => { filtered[f] = fullProfile[f]; });
            return filtered;
        } else {
            const record = {};
            selectedFields.forEach(m => {
                const val = bharat[moduleChoice][m]();
                record[m] = val;
            });
            return record;
        }
     });
     
     let dataString = '';
     const items = Array.isArray(data) ? data : [data];
     
     if (outFile.endsWith('.sql')) {
        if (items.length > 0) {
            const isPrimitive = typeof items[0] !== 'object' || items[0] === null;
            const keys = isPrimitive ? ['value'] : Object.keys(items[0]);
            dataString += `INSERT INTO ${tableName} (${keys.join(', ')}) VALUES\n`;
            const valueStrs = items.map(item => {
                const vals = keys.map(k => {
                    let v = isPrimitive ? item : item[k];
                    if (v === null || v === undefined) return 'NULL';
                    if (typeof v === 'string') return `'${v.replace(/'/g, "''")}'`;
                    if (typeof v === 'object') return `'${JSON.stringify(v).replace(/'/g, "''")}'`;
                    return v;
                });
                return `(${vals.join(', ')})`;
            });
            dataString += valueStrs.join(',\n') + ';';
        }
     } else if (outFile.endsWith('.csv')) {
        if (items.length > 0) {
            const isPrimitive = typeof items[0] !== 'object' || items[0] === null;
            const keys = isPrimitive ? ['value'] : Object.keys(items[0]);
            dataString += keys.join(',') + '\n';
            const rowStrs = items.map(item => {
                return keys.map(k => {
                    let v = isPrimitive ? item : item[k];
                    if (v === null || v === undefined) return '';
                    if (typeof v === 'object') v = JSON.stringify(v);
                    v = String(v).replace(/"/g, '""');
                    return `"${v}"`;
                }).join(',');
            });
            dataString += rowStrs.join('\n');
        }
     } else {
        dataString = JSON.stringify(data, null, 2);
     }
     
     fs.writeFileSync(outFile, dataString);
     console.log(chalk.green(`\n✅ Magic complete! Data successfully written to: ${outFile}\n`));
  } else {
     // Quick single result
     let result;
     if (moduleChoice === 'person') {
         result = bharat.person.generate();
     } else {
         result = bharat[moduleChoice][selectedFields[0]]();
     }
     console.log(chalk.green('\n✅ Result successfully generated:\n'));
     console.log(chalk.cyan(JSON.stringify(result, null, 2)));
  }
}

if (args.length === 0) {
  runInteractive().catch(err => {
    console.error('CLI aborted or errored:', err);
  });
} else if (args[0] === '--help' || args[0] === '-h') {
  console.log(`
Usage: bharat-data [--seed <number>] [--fields <list>] [--out <file>] [--table <name>] <module.method> [args...]
   OR: bharat-data <sql|json|csv> <target> "<columns>" <count>

Options:
  --seed <number>      Force deterministic generation globally.
  --fields <a,b,c>     Filter JSON output to only show specific properties.
  --out <file.*>       Save output directly into a local file. Supports .json, .csv, and .sql extensions.
  --table <name>       If exporting as .sql, sets the table name (default 'bharat_data').

Bharat-Data Wizard Examples:
  bharat-data sql users "name, age, email" 100
  bharat-data csv employees "name, job, phone" 50
  bharat-data json products "product, price, description" 50
`);
  process.exit(0);
} else {
  // Smart 1-Word Aliases
  const aliasMap = {
    'user': 'person.generate',
    'users': 'person.bulk',
    'pan': 'identity.pan',
    'aadhaar': 'identity.aadhaar',
    'gstin': 'business.gstin',
    'company': 'business.companyName',
    'udyam': 'business.udyam',
    'address': 'address.fullAddress',
    'name': 'names.fullName'
  };

  const commandStr = aliasMap[args[0]] || args[0];
  const commandPath = commandStr.split('.');
  
  let target = bharat;
  let context = null;

  for (const prop of commandPath) {
    if (target[prop] !== undefined) {
      context = target;
      target = target[prop];
    } else {
      console.error(`Error: Command, Alias, or method '${args[0]}' not found.`);
      process.exit(1);
    }
  }

  try {
    if (typeof target === 'function') {
      const methodArgs = args.slice(1).map(arg => {
        if (!isNaN(arg) && arg.trim() !== '') return Number(arg);
        if (arg === 'true') return true;
        if (arg === 'false') return false;
        return arg;
      });

      const result = target.apply(context, methodArgs);
      
      const printResult = () => {
          let outputData = result;

          if (typeof result === 'object' && result !== null) {
              if (fields !== null && Array.isArray(result)) {
                  outputData = result.map(obj => {
                     const newObj = {};
                     fields.forEach(f => { if (obj[f] !== undefined) newObj[f] = obj[f]; });
                     return newObj;
                  });
              } else if (fields !== null) {
                  outputData = {};
                  fields.forEach(f => { if (result[f] !== undefined) outputData[f] = result[f]; });
              }
          }
           
          // Output routing (File vs Terminal)
          if (outFile) {
              let dataString = '';
              const items = Array.isArray(outputData) ? outputData : [outputData];
              
              if (outFile.endsWith('.sql')) {
                  if (items.length > 0) {
                      const isPrimitive = typeof items[0] !== 'object' || items[0] === null;
                      const keys = isPrimitive ? ['value'] : Object.keys(items[0]);
                      dataString += `INSERT INTO ${tableName} (${keys.join(', ')}) VALUES\n`;
                      const valueStrs = items.map(item => {
                          const vals = keys.map(k => {
                              let v = isPrimitive ? item : item[k];
                              if (v === null || v === undefined) return 'NULL';
                              if (typeof v === 'string') return `'${v.replace(/'/g, "''")}'`;
                              if (typeof v === 'object') return `'${JSON.stringify(v).replace(/'/g, "''")}'`;
                              return v;
                          });
                          return `(${vals.join(', ')})`;
                      });
                      dataString += valueStrs.join(',\n') + ';';
                  }
              } else if (outFile.endsWith('.csv')) {
                  if (items.length > 0) {
                      const isPrimitive = typeof items[0] !== 'object' || items[0] === null;
                      const keys = isPrimitive ? ['value'] : Object.keys(items[0]);
                      dataString += keys.join(',') + '\n';
                      const rowStrs = items.map(item => {
                          return keys.map(k => {
                              let v = isPrimitive ? item : item[k];
                              if (v === null || v === undefined) return '';
                              if (typeof v === 'object') v = JSON.stringify(v);
                              v = String(v).replace(/"/g, '""');
                              return `"${v}"`;
                          }).join(',');
                      });
                      dataString += rowStrs.join('\n');
                  }
              } else {
                  dataString = JSON.stringify(outputData, null, 2);
              }
              
              fs.writeFileSync(outFile, dataString);
              console.log(chalk.green(`\n✅ Data successfully written to: ${outFile}\n`));
          } else {
              if (typeof outputData === 'object' && outputData !== null) {
                   console.log(chalk.cyan(JSON.stringify(outputData, null, 2)));
              } else {
                   console.log(chalk.yellow(outputData));
              }
          }
      };

      if (Array.isArray(result) && result.length > 1) {
          console.log(chalk.bold.blue(`\nInitializing Context Engine... Generating ${result.length} objects`));
          const bar = new cliProgress.SingleBar({
              format: chalk.magenta('{bar}') + chalk.bold(' | {percentage}% | ETA: {eta}s | {value}/{total} Mocks'),
              barCompleteChar: '\u2588',
              barIncompleteChar: '\u2591',
              hideCursor: true
          });
          
          bar.start(result.length, 0);
          
          let progress = 0;
          const timer = setInterval(() => {
              const increment = Math.ceil(result.length / 10);
              progress += increment;
              if (progress >= result.length) progress = result.length;
              bar.update(progress);
              
              if (progress >= result.length) {
                  clearInterval(timer);
                  bar.stop();
                  console.log(chalk.green('\n✅ Bulk Generation Complete:\n'));
                  printResult();
              }
          }, 30);
      } else {
          console.log(chalk.green('\n✅ Result successfully generated:\n'));
          printResult();
      }
    } else {
      console.log(target);
    }
  } catch (err) {
    console.error(`Error executing ${args[0]}: ${err.message}`);
  }
}
