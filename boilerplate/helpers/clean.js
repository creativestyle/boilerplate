'use strict';

const del = require('del');
const logger = require('../logger');

/**
 * Deletes files in provided paths.
 *
 * @param {object} config Configuration object.
 * @return {Promise} Promise returned by del function.
 */
module.exports = config => {
  logger.info('Cleaning files...');
  logger.debug('Cleaning files from:', config.files);
  return del(config.files, config.del);
};
