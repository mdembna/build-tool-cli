#!/usr/bin/env node
//poczytac o komanderze start dziala
const wielkaMaszynoPakujaca = require('commander');
const { version } = require('../package.json');

const start = require('./commands/start');
const update = require('./commands/update');
const pack = require('./commands/pack');
const vuPro = require('./commands/vuPro');
const vuFree = require('./commands/vuFree');
const vuAdmin = require('./commands/vuAdmin');
const vuBundle = require('./commands/vuBundle');

wielkaMaszynoPakujaca.version(version);

wielkaMaszynoPakujaca
  .command('start')
  .description('run a wizard to assist you with creating a setup')
  .action(start);

wielkaMaszynoPakujaca
  .command('update')
  .description('update avaliable repositories')
  .action(update);

wielkaMaszynoPakujaca
  .command('pack')
  .description('create all packages automaticly')
  .action(pack);

wielkaMaszynoPakujaca
  .command('vuPro')
  .description('creates MDB-Vue-Pro-npm package')
  .action(vuPro);

wielkaMaszynoPakujaca
  .command('vuFree')
  .description('creates MDB-Vue-Free-npm package')
  .action(vuFree);

wielkaMaszynoPakujaca
  .command('vuAdmin')
  .description('creates MDB-Vue-Admin-Pro package')
  .action(vuAdmin);

wielkaMaszynoPakujaca
  .command('vuBundle')
  .description('creates MDB-Vue-Small-Bundle package')
  .action(vuBundle);

wielkaMaszynoPakujaca.command('*').action(() => wielkaMaszynoPakujaca.help());

wielkaMaszynoPakujaca.parse(process.argv);
if (!process.argv.slice(2).length) {
  mdbpack.help();
}
