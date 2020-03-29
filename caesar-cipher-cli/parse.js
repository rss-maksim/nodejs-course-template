const process = require('process');
const { program } = require('commander');

program
  .requiredOption('-s|--shift <number>', 'a shift', value =>
    parseInt(value, 10)
  )
  .requiredOption('-a|--action <string>', 'an action encode/decode')
  .option('-i|--input <string>', 'an input file')
  .option('-o|--output <string>', 'an output file')
  .parse(process.argv);

const { action, shift, output, input } = program;

module.exports = { action, shift, output, input };
