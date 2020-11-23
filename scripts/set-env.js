#!/bin/node
const fs = require('fs');
const path = require('path');
const { argv } = require('yargs');

const { env } = argv;

// Accepted environment params, they are directly related to the name of the folders created before.
const acceptedEnvs = ['debug', 'staging', 'release'];

// Function that writes on the file.
function writeFile(file, string) {
  if (fs.existsSync(file)) {
    fs.writeFileSync(file, string);
    return true;
  }

  console.log(`File "${file}" not found.`);
  process.exit(1);
}

// Function that validate if the param passed to the script is a valid environment.
function validateParams() {
  console.log('Validating params...');
  if (!env) {
    console.log(
      `Error.  Please inform a valid environment: ${acceptedEnvs.join(', ')}.`,
    );
    process.exit(1);
  }

  if (!acceptedEnvs.includes(env)) {
    console.log(
      `Error. Wrong environment, choose one of those: ${acceptedEnvs.join(
        ', ',
      )}.`,
    );
    process.exit(1);
  }
}

// Function that replaces the file content with the right content.
function setEnvironment() {
  console.log(`Setting environment to ${env}...`);

  // String that will override the current export string
  const importerString = `export { env } from './${env}';\n`;

  // Env index file location that will be overridden
  const envIndexFileLocation = path.resolve(
    __dirname,
    '..',
    'app',
    'config',
    'env',
    'index.js',
  );

  // Writes right content inside the environment file
  writeFile(envIndexFileLocation, importerString);
  console.log(`Environment successfully setted to ${env}.`);
  process.exit(0);
}

// Script initialization
validateParams();
setEnvironment();
