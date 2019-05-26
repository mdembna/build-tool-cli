const wizard = require('../setup/wizard');
const getLastVersionNumber = require('../helpers/getLastVersionNumber');
const update = require('./update');
const vuPro = require('./vuPro');
const vuFree = require('./vuFree');
const vuAdmin = require('./vuAdmin');
const vuBundle = require('./vuBundle');
const vuPlugins = require('./vuPlugins');
const vuExtended = require('./vuExtended')
const log = require('../helpers/log');
const { INFO } = require('../constans/log-types');
const {
  VU_PRO,
  VU_FREE,
  VU_BUNDLE,
  VU_ADMIN,
  VU_PLUGINS,
  VU_EXTENDED
} = require('../constans/packages-types');

const setup = async () => {
  const { version, packagesToCreate, password, login, commitMessage, pluginsPackVersion } = await wizard();

  update({ login, password, packagesToCreate });

  const lastVersionNumber = getLastVersionNumber('vu-pro');
  
  packagesToCreate.includes(VU_PRO) && await vuPro({ version, lastVersionNumber });
  packagesToCreate.includes(VU_ADMIN) && await vuAdmin({ version, lastVersionNumber });
  packagesToCreate.includes(VU_BUNDLE) && await vuBundle(version);
  packagesToCreate.includes(VU_FREE) && await vuFree({ version, lastVersionNumber, commitMessage });
  packagesToCreate.includes(VU_PLUGINS) && await vuPlugins(pluginsPackVersion);
  packagesToCreate.includes(VU_EXTENDED) && await vuExtended(version, pluginsPackVersion);
};

module.exports = setup;
