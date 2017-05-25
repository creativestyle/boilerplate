'use strict';

const chokidar = require('chokidar');
const project = require('../project');
const svgSprite = require('../helpers/svgSprite');

const isWatching = Boolean(process.env.WATCH);

/**
 * Supported options which can be provided in project.config.js file are:
 * - files {string|array} Glob pattern or array of them.
 * - dest {string} Path to destination directory.
 * - spriteName {string} Name for the sprite file including extension.
 * - watch {boolean} If should run in watch mode, defaults to process.env.WATCH.
 * - other options supported by svg-sprite package.
 */
const config = Object.assign(
  {
    mode: {
      defs: true,
    },
    watch: isWatching,
  },
  project.getConfig().svgSprite
);
// Watch patterns provided in "files" property by default.
config.watchedFiles = config.watchedFiles ? config.watchedFiles : config.files;

if (config.watch) {
  chokidar.watch(config.watchedFiles).on('all', () => svgSprite(config));
} else {
  svgSprite(config);
}
