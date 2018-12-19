const { SUCCESS, INFO, WARNING, ERROR } = require('../constans/log-types.js');
const chalk = require('chalk');

const log = (message, type) => {
  let colorMessage;

  switch (type) {
    case SUCCESS:
      colorMessage = chalk.green(message);
      break;
    case INFO:
      colorMessage = chalk.blue(message);
      break;
    case WARNING:
      colorMessage = chalk.yellow(message);
      break;
    case ERROR:
      colorMessage = chalk.red(message);
      break;
  }

  console.log(colorMessage);
};

module.exports = log;
