'use strict';

const SVGSpriter = require('svg-sprite');

const map = require('map-stream');
const vfs = require('vinyl-fs');
const mkdirp = require('mkdirp');
const fs = require('fs');
const path = require('path');

const logger = require('../logger');

/**
 * Compiles SVG sprite out of provided SVGs.
 *
 * @param {config} Configuration object.
 * @return {stream} Stream produced by vinyl-fs.
 */
module.exports = config => {
  logger.info('Compiling SVG sprite...');

  const spriter = new SVGSpriter(config);

  const addToSprite = (file, cb) => {
    spriter.add(file);
    cb();
  };

  return vfs.src(config.files).pipe(map(addToSprite)).on('end', () => {
    spriter.compile((error, result) => {
      if (error) {
        logger.error(error);
      }
      mkdirp.sync(config.dest);

      // Write the generated resource to disk
      fs.writeFileSync(
        path.join(config.dest, config.spriteName),
        result.defs.sprite.contents
      );
    });
  });
};
