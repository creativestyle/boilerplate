'use strict';

const chokidar = require('chokidar');
const project = require('../project');
const twig = require('../helpers/twig');

const isWatching = Boolean(process.env.WATCH);

/**
 * Supported options which can be provided in project.config.js file are:
 * - files {string|array} Glob pattern or array of them.
 * - dest {string} Path to destination directory.
 * - watch {boolean} If should run in watch mode, defaults to process.env.WATCH.
 * - functions {array} Array of custom Twig.js functions.
 * - filters {array} Array of custom Twig.js filters.
 */
const config = Object.assign(
  {
    watch: isWatching,
    functions: [],
    filters: [],
  },
  project.getConfig().twig
);
// Watch patterns provided in "files" property by default.
config.watchedFiles = config.watchedFiles ? config.watchedFiles : config.files;

if (config.watch) {
  chokidar.watch(config.watchedFiles).on('all', () => {
    twig(config);
  });
} else {
  twig(config);
}
