const wizard = require('../setup/wizard');
const getLastVersionNumber = require('../helpers/getLastVersionNumber');
const update = require('./update');
const rePro = require('./rePro');
const reFree = require('./reFree');
const reAdmin = require('./reAdmin');
const reBoundle = require('./reBoundle');
const log = require('../helpers/log');
const {INFO} = require('../constans/log-types');
const {RE_PRO, RE_FREE, RE_BOUNDLE, RE_ADMIN} = require('../constans/packages-types');

const setup =  async () => {
  const { version, packagesToCreate, password, login } = await wizard();


    update({ login, password, packagesToCreate })



  const lastVersionNumber = getLastVersionNumber('re-pro');

  packagesToCreate.includes(RE_PRO) && rePro({version, lastVersionNumber});

  /*
  packagesToCreate.includes(RE_FREE) && reFree();
  packagesToCreate.includes(RE_ADMIN) && reAdmin();
  packagesToCreate.includes(RE_BOUNDLE) && reBoundle();
  */



  /*
  filesToEditArray = ;

  replaceStringInFile(filesToEditArray, './re-pro/', lastVersionNumber, version);



  */


};

module.exports = setup;
