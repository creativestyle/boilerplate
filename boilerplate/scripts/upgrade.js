const simpleGit = require('simple-git')();
const argv = require('yargs').argv;

const logger = require('../logger');
const project = require('../project');
const packageInfo = require(project.getPath('package.json'));

logger.info('Upgrading boilerplate...');

console.log(argv);
simpleGit.status((_, status) => {
  // if (status.files.length) {
  //   logger.warn(
  //     'There are uncommited files in your repository!\r\nCommit your work before upgrading.'
  //   );
  // } else {
  simpleGit.listRemote(['--tags', 'origin'], console.log);
  // }
});
