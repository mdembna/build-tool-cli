#!/usr/bin/env node

const wielkaMaszynoPakujaca = require('commander');
const { version } = require('../package.json');

const setup = require('./commands/setup');
const update = require('./commands/update');
const pack = require('./commands/pack');
const rePro = require('./commands/rePro');
const reFree = require('./commands/reFree');
const reAdmin = require('./commands/reAdmin');
const reBoundle = require('./commands/reBoundle');

wielkaMaszynoPakujaca.version(version);

wielkaMaszynoPakujaca
  .command('setup')
  .description('run a wizard to assist you with creating a setup')
  .action(setup);

wielkaMaszynoPakujaca
  .command('update')
  .description('update avaliable repositories')
  .action(update);

wielkaMaszynoPakujaca
  .command('pack')
  .description('create all packages automaticly')
  .action(pack);

wielkaMaszynoPakujaca
  .command('rePro')
  .description('creates MDB-React-Pro-npm package')
  .action(rePro);

wielkaMaszynoPakujaca
  .command('reFree')
  .description('creates MDB-React-Free-npm package')
  .action(reFree);

wielkaMaszynoPakujaca
  .command('reAdmin')
  .description('creates MDB-React-Admin-Pro package')
  .action(reAdmin);

wielkaMaszynoPakujaca
  .command('reBoundle')
  .description('creates MDB-React-Small-Bundle package')
  .action(reBoundle);

wielkaMaszynoPakujaca.command('*').action(() => wielkaMaszynoPakujaca.help());

wielkaMaszynoPakujaca.parse(process.argv);
if (!process.argv.slice(2).length) {
  mdbpack.help();
}
