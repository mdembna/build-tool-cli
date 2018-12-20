const inquirer = require('inquirer');
const prompt = inquirer.createPromptModule();
const log = require('../helpers/log');
const { INFO } = require('../constans/log-types');
const {
  RE_PRO,
  RE_FREE,
  RE_ADMIN,
  RE_BOUNDLE
} = require('../constans/packages-types');

const inquiryAboutSettings = () => {
  log('\n Hi, welcome to mdbpack CLI 🚀 \n', INFO);

  const questions = [
    {
      type: 'confirm',
      name: 'createAllPackages',
      message: 'Do you want to create all four packages?',
      default: true
    },
    {
      type: 'checkbox',
      message: 'What packages do you need?',
      name: 'packagesToCreate',
      choices: [
        {
          name: RE_PRO
        },
        // {
        //   name: RE_FREE
        // },
        {
          name: RE_ADMIN
        },
        {
          name: RE_BOUNDLE
        }
      ],
      validate: answers => {
        if (answers.length < 1) {
          return 'You must choose at least one package.';
        }
        return true;
      },
      when: answers => {
        return answers.createAllPackages === false;
      }
    },
    {
      type: 'text',
      message: 'Which version do you want to generate?',
      name: 'version',
      validate: value => {
        const valid = !!value;
        return valid || 'You have to enter the version number';
      }
    },
    {
      type: 'text',
      message: 'Enter your gitlab login',
      name: 'login',
      validate: value => {
        const valid = !!value;
        return valid || "Don't lie to me, enter your valid gitlab login";
      }
    },
    {
      type: 'password',
      message: 'Enter your gitlab password 🔒 ',
      name: 'password',
      mask: '*',
      validate: value => {
        const valid = !!value;
        return valid || "Don't lie to me, enter your valid gitlab password";
      }
    }
  ];

  return prompt(questions).then(answers => {
    if (answers.createAllPackages) {
      answers.packagesToCreate = [RE_PRO, RE_ADMIN, RE_BOUNDLE];
    }
    return answers;
  });
};

module.exports = inquiryAboutSettings;
