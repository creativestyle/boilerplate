'use strict';

const winston = require('winston');
const config = require('./project').getConfig('logger');

const isWatching = Boolean(process.env.WATCH);
const isTest = process.env.NODE_ENV === 'test';

// Configuration for project's logger.
const logger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      /**
       * Let users provide custom config log level.
       * @see https://www.npmjs.com/package/winston#logging-levels
       */
      level: config && config.logLevel ? config.logLevel : 'info',
      colorize: 'all',
      silent: isTest || isWatching,
      timestamp: () => {
        // Show nice timestamp for every log.
        const date = new Date();
        return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
      },
      handleExceptions: true,
      humanReadableUnhandledException: true,
      emitErrs: !isWatching, // Don't emmit or exit when in watch mode.
      exitOnError: !isWatching,
    }),
  ],
});

logger.on('logging', (transport, level, msg) => {
  if (level == 'error' && logger.exitOnError) {
    setImmediate(() => {
      // Used to break out of Promise.catch trap to stop the process.
      throw new Error(msg);
    });
  }
});

module.exports = logger;
