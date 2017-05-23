'use strict';

const Twig = require('twig');
const replaceExt = require('replace-ext');
const logger = require('../logger');

const map = require('map-stream');
const vfs = require('vinyl-fs');

/**
 * Compiles Twig files using corresponding data files.
 *
 * @param {config} Configuration object.
 * @return {stram} Stream produced by vinyl-fs.
 */
module.exports = config => {
  logger.info('Compiling Twig files...');

  const compile = (file, cb) => {
    let data = {};
    try {
      data = require(`${replaceExt(file.path, '')}.data`);
    } catch (error) {
      logger.debug(`No data file found for "${file.path}".`);
    }

    Twig.renderFile(file.path, data, (error, html) => {
      if (error) {
        logger.log(error);
      }
      file.contents = new Buffer(html);
      file.path = replaceExt(file.path, '.html');
      cb(null, file);
    });
  };

  return vfs
    .src(config.files, { read: false })
    .pipe(map(compile))
    .pipe(vfs.dest(config.dest));
};
