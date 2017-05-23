'use strict';

const map = require('map-stream');
const vfs = require('vinyl-fs');
const logger = require('../logger');

/**
 * Copies and optionally minifies images.
 *
 * @param {config} Configuration object.
 * @return {stram} Stream produced by vinyl-fs.
 */
module.exports = config => {
  logger.info('Copying images...');
  let minify = (file, cb) => cb(null, file);

  if (config.minify) {
    logger.debug('Images minification is on.');
    const minifier = require('imagemin');

    minify = (file, cb) => {
      minifier.buffer(file.contents, config.plugins).then(buffer => {
        file.contents = buffer;
        cb(null, file);
      });
    };
  }

  return vfs.src(config.files).pipe(map(minify)).pipe(vfs.dest(config.dest));
};
