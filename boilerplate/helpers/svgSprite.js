'use strict';

const SVGSpriter = require('svg-sprite');

const map = require('map-stream');
const Vinyl = require('vinyl');
const vfs = require('vinyl-fs');

const logger = require('../logger');

/**
 * Compiles SVG sprite out of provided SVGs.
 *
 * @param {config} Configuration object.
 * @return {stram} Stream produced by vinyl-fs.
 */
module.exports = config => {
  logger.info('Compiling SVG sprite...');

  const spriter = new SVGSpriter(config);

  let firstFile = true;
  const addToSprite = (file, cb) => {
    spriter.add(file);
    if (firstFile) {
      firstFile = false;
      cb(null, null);
    }
    cb();
  };

  const compileSprite = (file, cb) => {
    spriter.compile((error, result) => {
      if (error) {
        logger.error(error);
      }

      cb(
        null,
        new Vinyl({
          path: config.spriteName,
          contents: result.defs.sprite.contents,
        })
      );
    });
  };

  return vfs
    .src(config.files)
    .pipe(map(addToSprite))
    .pipe(map(compileSprite))
    .pipe(vfs.dest(config.dest));
};
