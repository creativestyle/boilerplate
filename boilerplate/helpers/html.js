'use strict';

const map = require('map-stream');
const vfs = require('vinyl-fs');
const logger = require('../logger');

/**
 * Copies HTML files with optional minification.
 *
 * @param {object} Configuration object.
 * @return {stream} Stream produced by vinyl-fs.
 */
module.exports = config => {
  logger.info('Copying HTML...');
  let minify = (file, cb) => cb(null, file);

  if (config.minify) {
    logger.debug('HTML minification is on.');
    const minifier = require('html-minifier').minify;
    minify = (file, cb) => {
      file.contents = new Buffer(
        minifier(file.contents.toString(), config.minifierOptions)
      );
      cb(null, file);
    };
  }

  return vfs.src(config.files).pipe(map(minify)).pipe(vfs.dest(config.dest));
};
