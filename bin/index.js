#!/usr/bin/env node

const path = require('path');
const parser = require('../');
const generate = require('../lib/generate');

let program = {};
const args = process.argv.slice(2);

args.forEach((arg, i) => {
  switch (arg) {
    case '-v':
    case '--version':
    case 'version':
      console.log(`v${require('../package.json').version}`); // eslint-disable-line
      process.exit(0);
    break;
    case '-h':
    case '--help':
    case 'help':
      console.log(`` + // eslint-disable-line
        `
Usage: tap-html [options]

Commands:
  -h, --help, help                Output usage information
  -v, --version, version          Output the version number

Options:
  -o, --outFile [path]            If instead of piping content you want it to be written to an html file locally please specify the relative path
`);
      process.exit(0);
    break;
    case '-o':
    case '--out':
      program['out'] = path.resolve(process.cwd(), args[i + 1]);
    break;
  }
});

const { out } = program;

process.stdin
  .pipe(parser((res) => {
    // generate the html report
    if(out) {
      // write the output to the specified location
      generate(res, out);
    } else {
      generate(res);
    }
  }))
  .pipe(process.stdout);
