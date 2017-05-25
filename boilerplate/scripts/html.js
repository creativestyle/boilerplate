'use strict';

const chokidar = require('chokidar');
const project = require('../project');
const html = require('../helpers/html');

const isWatching = Boolean(process.env.WATCH);
const isProduction = process.env.NODE_ENV === 'production';

/**
 * Supported options which can be provided in project.config.js file are:
 * - files {string|array} Glob pattern or array of them.
 * - dest {string} Path to destination directory.
 * - minify {boolean} If HTML should be minified, defaults to false for dev and true for production.
 * - htmlMinifier {object} Custom html-minifier.minify method options.
 * - watch {boolean} If should run in watch mode, defaults to process.env.WATCH.
 */
const config = Object.assign(
  {
    minify: isProduction,
    watch: isWatching,
  },
  project.getConfig().html
);
// Watch patterns provided in "files" property by default.
config.watchedFiles = config.watchedFiles ? config.watchedFiles : config.files;

if (config.watch) {
  chokidar.watch(config.watchedFiles).on('all', () => {
    html(config);
  });
} else {
  html(config);
}
