const simpleGit = require('simple-git')();

const logger = require('../logger');
const project = require('../project');
const packageInfo = require(project.getPath('package.json'));

logger.info('Initializing boilerplate for new project...');

const repository = packageInfo.repository;
if (!repository || !repository.url) {
  logger.warn(
    'Repository information missing in package.json!\r\nMake sure you provide a url during "npm init".'
  );
} else {
  simpleGit.getRemotes(true, (_, remotes) => {
    const originRemote = remotes[0];
    if (originRemote && originRemote.refs.fetch.indexOf('boiler' !== -1)) {
      logger.info(`Switich boilerplate's repository to "upgrade" remote.`);
      simpleGit.removeRemote(originRemote.name);
      simpleGit.addRemote('upgrade', originRemote.refs.fetch);
      logger.info(`Adding "${repository.url}" as new "origin" remote.`);
      simpleGit.addRemote('origin', repository.url);
    }
  });
}
