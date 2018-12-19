#!/usr/bin/env node

const mdbpack = require('commander');
const { version } = require('../package.json');

const setup = require('./commands/setup');
const update = require('./commands/update');
const pack = require('./commands/pack');
const rePro = require('./commands/rePro');
const reFree = require('./commands/reFree');
const reAdmin = require('./commands/reAdmin');
const reBoundle = require('./commands/reBoundle');

mdbpack.version(version);

mdbpack
  .command('setup')
  .description('run a wizard to assist you with creating a setup')
  .action(setup);

mdbpack
  .command('update')
  .description('update avaliable repositories')
  .action(update);

mdbpack
  .command('pack')
  .description('create all packages automaticly')
  .action(pack);

mdbpack
  .command('rePro')
  .description('creates MDB-React-Pro-npm package')
  .action(rePro);

mdbpack
  .command('reFree')
  .description('creates MDB-React-Free-npm package')
  .action(reFree);

mdbpack
  .command('reAdmin')
  .description('creates MDB-React-Admin-Pro package')
  .action(reAdmin);

mdbpack
  .command('reBoundle')
  .description('creates MDB-React-Small-Bundle package')
  .action(reBoundle);

mdbpack.command('*').action(() => mdbpack.help());

mdbpack.parse(process.argv);
if (!process.argv.slice(2).length) {
  mdbpack.help();
}
