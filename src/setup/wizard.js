const inquirer = require('inquirer');
const prompt = inquirer.createPromptModule();
const log = require('../helpers/log');
const { INFO } = require('../constans/log-types');
const {
  VU_PRO,
  VU_FREE,
  VU_ADMIN,
  VU_BUNDLE,
  VU_PLUGINS,
  VU_EXTENDED
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
          name: VU_PRO
        },
        {
          name: VU_FREE
        },
        {
          name: VU_ADMIN
        },
        {
          name: VU_BUNDLE
        },
        {
          name: VU_PLUGINS
        },
        {
          name: VU_EXTENDED
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
      message: 'Which plugin pack version do you want to generate?',
      name: 'pluginsPackVersion',
      validate: value => {
        const valid = !!value;
        return valid || 'You have to enter the version number';
      },
      when: answers => {
        return answers.createAllPackages || answers.packagesToCreate.indexOf(VU_PLUGINS) !== -1 || answers.packagesToCreate.indexOf(VU_EXTENDED) !== -1;
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
    },
    {
      type: 'confirm',
      name: 'enterCommitMessage',
      message: 'Do you want to enter your custom commit message? ✏️ ',
      default: false
    },
    {
      type: 'text',
      message: 'Enter a commit message: ',
      name: 'commitMessage',
      validate: value => {
        const valid = !!value;
        return valid || 'You have to enter a commit message';
      },
      when: answers => {
        return answers.enterCommitMessage === true;
      }
    }
  ];

  return prompt(questions).then(answers => {
    if (answers.createAllPackages) {
      answers.packagesToCreate = [VU_PRO, VU_ADMIN, VU_BUNDLE, VU_FREE, VU_PLUGINS, VU_EXTENDED];
    }
    return answers;
  });
};

module.exports = inquiryAboutSettings;
