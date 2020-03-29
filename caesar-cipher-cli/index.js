const process = require('process');
const fs = require('fs');
const path = require('path');
const { pipeline } = require('stream');

const { CaesarCipherTransform } = require('./transform-stream');
const { action, input, output, shift } = require('./parse');

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

const transformStream = new CaesarCipherTransform({ shift, action });

pipeline(
  Boolean(input) ? fs.createReadStream(path.resolve(__dirname, input)) : process.stdin,
  transformStream,
  Boolean(output) ? fs.createWriteStream(path.resolve(__dirname, output)) : process.stdout,
  pipelineCallback
);

function pipelineCallback(error) {
  if (error) {
    return console.error('Pipeline failed.', error);
  }
  console.log('Pipeline succeeded.');
}

process.on('uncaughtException', (err, origin) => console.error(err));