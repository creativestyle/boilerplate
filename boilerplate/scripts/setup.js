const simpleGit = require('simple-git')();
const path = require('path');

const logger = require('../logger');
const packageInfo = require(path.resolve('package.json'));

const repository = packageInfo.repository;
if (!repository || !repository.url) {
  logger.warn(
    'Repository information missing in package.json!\r\nMake sure you provide a url during "npm init".'
  );
} else {
  simpleGit.getRemotes(true, (_, remotes) => {
    const originRemote = remotes[0];
    // If boilerplate's Git is origin remote.
    if (originRemote && originRemote.refs.fetch.indexOf('boilerplate' !== -1)) {
      logger.info('Initializing boilerplate for new project...');
      logger.info(`Switching boilerplate's repository to "upgrade" remote.`);
      simpleGit.removeRemote(originRemote.name);
      simpleGit.addRemote('upgrade', originRemote.refs.fetch);
      logger.info(`Adding "${repository.url}" as new "origin" remote.`);
      simpleGit.addRemote('origin', repository.url);
    } else {
      logger.error('Project is already initialized, proper remotes are set!');
    }
  });
}
