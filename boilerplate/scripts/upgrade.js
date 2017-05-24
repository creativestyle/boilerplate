const simpleGit = require('simple-git')();

const logger = require('../logger');

logger.info('Upgrading boilerplate...');

simpleGit.status((_, status) => {
  if (status.files.length) {
    logger.warn(
      'There are uncommited files in your repository!\r\nCommit your work before upgrading.'
    );
  } else {
    simpleGit.fetch(['--tags', 'upgrade'], error => {
      if (error) {
        logger.error(error);
      }
      logger.info('Fetching tags from "upgrade" remote.');

      simpleGit.listRemote(['--tags', 'upgrade'], (error, rawTags) => {
        if (error) {
          logger.error(error);
        }
        const tags = rawTags
          .split('\n')
          .filter(Boolean)
          .map(ref => ref.match(/tags\/([^\\]+)/)[1])
          .reverse();
        logger.debug('Found following tags:', tags);
        const newestTag = tags[0];
        logger.info(`Merging newest tag "${newestTag}"...`);
        simpleGit.raw(['merge', newestTag], (error, info) => {
          if (error) {
            logger.error(error);
          }
          logger.info(info);
        });
      });
    });
  }
});
