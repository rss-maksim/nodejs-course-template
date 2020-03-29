const process = require('process');
const fs = require('fs');
const path = require('path');
const { pipeline } = require('stream');
const readline = require('readline');

const { CaesarCipherTransform } = require('./transform-stream');
const { action, shift, output } = require('./parse');
let { input } = require('./parse');

if (Number.isNaN(shift)) {
  console.error('Shift parameter should be provided as number');
  /* eslint-disable */ 
  process.exit(1);
}

if (typeof action !== 'string') {
  console.error('Action parameter should be provided');
  /* eslint-disable */ 
  process.exit(1);
}

if (!input) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question(
    `Input file is not provided so enter string to ${action} manually: `,
    inputString => {
      input = inputString;
      console.log('program', { action, shift, input, output });
      rl.close();
    }
  );
}

const transformStream = new CaesarCipherTransform({ shift, action });

pipeline(
  fs.createReadStream(path.resolve(__dirname, input)),
  transformStream,
  fs.createWriteStream(path.resolve(__dirname, output)),
  pipelineCallback
);

function pipelineCallback(error) {
  if (error) {
    return console.error('Pipeline failed.', error);
  }
  console.log('Pipeline succeeded.');
}

process.on('uncaughtException', (err, origin) => console.error(err));