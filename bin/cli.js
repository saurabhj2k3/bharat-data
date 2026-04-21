#!/usr/bin/env node

import { bharat } from '../dist/index.js';
import { select } from '@inquirer/prompts';
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
    bharat.SeedEngine.setSeed(seedValue);
}

async function runInteractive() {
  console.log(chalk.bold.hex('#FF9933')('🇮🇳  Welcome to ') + chalk.bold.hex('#FFFFFF')('Bharat-Data ') + chalk.bold.hex('#138808')('Interactive CLI\n'));
  
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
      { name: '🚗 Transport', value: 'transport' }
    ]
  });

  let methodChoice;
  if (moduleChoice === 'person') {
    methodChoice = initialChoice === 'wizard' ? 'bulk' : 'generate';
  } else if (moduleChoice === 'identity') {
    methodChoice = await select({
      message: 'Select an identity document:',
      choices: [
        { name: 'Aadhaar (Valid)', value: 'aadhaar' },
        { name: 'PAN Card (Valid)', value: 'pan' },
        { name: 'Passport', value: 'passport' },
        { name: 'Voter ID', value: 'voterId' }
      ]
    });
  } else if (moduleChoice === 'business') {
    methodChoice = await select({
      message: 'Select business data:',
      choices: [
        { name: 'Company Name', value: 'companyName' },
        { name: 'GSTIN', value: 'gstin' },
        { name: 'Udyam Registration', value: 'udyam' },
        { name: 'Corporate PAN', value: 'corporatePan' }
      ]
    });
  } else {
    const availableMethods = Object.getOwnPropertyNames(bharat[moduleChoice]).filter(prop => 
        typeof bharat[moduleChoice][prop] === 'function' && prop !== 'constructor' && prop !== 'length' && prop !== 'name' && prop !== 'prototype'
    );
    methodChoice = await select({
      message: `Select a generation method for ${moduleChoice}:`,
      choices: availableMethods.map(m => ({ name: m, value: m }))
    });
  }

  // Execution
  if (initialChoice === 'wizard') {
     let amount = 100;
     if (methodChoice === 'bulk') {
          const { input } = await import('@inquirer/prompts');
          const amtStr = await input({ message: 'How many records to generate?', default: '100' });
          amount = parseInt(amtStr, 10);
     }
     
     const format = await select({
        message: 'Select export format:',
        choices: [
          { name: 'Excel / Spreadsheet (.csv)', value: 'csv' },
          { name: 'SQL Database Insert (.sql)', value: 'sql' },
          { name: 'Raw JSON API (.json)', value: 'json' }
        ]
     });

     const { input } = await import('@inquirer/prompts');
     const fileName = await input({ message: `Filename (e.g. mock_data.${format}):`, default: `mock_data.${format}` });
     
     // Route variables directly back to the main file-handler engine
     args = ['wizard_call']; // Bypass strict length checks
     outFile = path.resolve(process.cwd(), fileName);
     
     // Injecting process
     console.log(chalk.bold.blue(`\nInitializing Context Engine... Generating...`));
     const result = methodChoice === 'bulk' ? bharat[moduleChoice][methodChoice](amount) : bharat[moduleChoice][methodChoice]();
     
     // Emulate the print function safely
     let outData = result;
     let dataString = '';
     if (outFile.endsWith('.sql')) {
        const isArray = Array.isArray(outData);
        const items = isArray ? outData : [outData];
        if (items.length > 0) {
            const keys = Object.keys(items[0]);
            dataString += `INSERT INTO bharat_data (${keys.join(', ')}) VALUES\n`;
            const valueStrs = items.map(item => {
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
        }
     } else if (outFile.endsWith('.csv')) {
        const isArray = Array.isArray(outData);
        const items = isArray ? outData : [outData];
        if (items.length > 0) {
            const keys = Object.keys(items[0]);
            dataString += keys.join(',') + '\n';
            const rowStrs = items.map(item => {
                return keys.map(k => {
                    let v = item[k];
                    if (v === null || v === undefined) return '';
                    if (typeof v === 'object') v = JSON.stringify(v);
                    v = String(v).replace(/"/g, '""');
                    return `"${v}"`;
                }).join(',');
            });
            dataString += rowStrs.join('\n');
        }
     } else {
        dataString = JSON.stringify(outData, null, 2);
     }
     
     fs.writeFileSync(outFile, dataString);
     console.log(chalk.green(`\n✅ Magic complete! Data successfully written to: ${outFile}\n`));
  } else {
     const result = bharat[moduleChoice][methodChoice]();
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
(Or run simply 'bharat-data' for interactive mode)

Options:
  --seed <number>      Force deterministic generation globally.
  --fields <a,b,c>     Filter JSON output to only show specific properties.
  --out <file.*>       Save output directly into a local file. Supports .json, .csv, and .sql extensions.
  --table <name>       If exporting as .sql, sets the table name (default 'bharat_data').

Examples (Using 1-word Aliases):
  bharat-data user --out user.json
  bharat-data users 100 --out ./database/mock_data.csv
  bharat-data users 100 --out ./database/seeds.sql --table users
  bharat-data pan
  bharat-data company

Advanced Examples (Using exact module paths):
  bharat-data --seed 123 identity.pan
  bharat-data --fields name,pan,aadhaar person.generate
  bharat-data names.fullName West female
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
              if (outFile.endsWith('.sql')) {
                  if (typeof outputData === 'object' && outputData !== null) {
                      const isArray = Array.isArray(outputData);
                      const items = isArray ? outputData : [outputData];
                      if (items.length > 0) {
                          const keys = Object.keys(items[0]);
                          dataString += `INSERT INTO ${tableName} (${keys.join(', ')}) VALUES\n`;
                          const valueStrs = items.map(item => {
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
                      }
                  } else {
                      dataString = `-- Scalar generation does not serialize well to SQL:\n${String(outputData)}`;
                  }
              } else if (outFile.endsWith('.csv')) {
                  if (typeof outputData === 'object' && outputData !== null) {
                      const isArray = Array.isArray(outputData);
                      const items = isArray ? outputData : [outputData];
                      if (items.length > 0) {
                          const keys = Object.keys(items[0]);
                          dataString += keys.join(',') + '\n';
                          const rowStrs = items.map(item => {
                              return keys.map(k => {
                                  let v = item[k];
                                  if (v === null || v === undefined) return '';
                                  if (typeof v === 'object') v = JSON.stringify(v);
                                  v = String(v).replace(/"/g, '""'); // Escape inner quotes
                                  return `"${v}"`; // Always quote for safety
                              }).join(',');
                          });
                          dataString += rowStrs.join('\n');
                      }
                  } else {
                      dataString = String(outputData);
                  }
              } else {
                  dataString = typeof outputData === 'object' ? JSON.stringify(outputData, null, 2) : String(outputData);
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
          
          // Fake generation visual loop
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
          }, 30); // Animates very quickly (300ms total)
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
