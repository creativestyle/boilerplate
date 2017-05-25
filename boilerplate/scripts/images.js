'use strict';

const chokidar = require('chokidar');
const project = require('../project');
const images = require('../helpers/images');

const jpegtran = require('imagemin-jpegtran');
const gifsicle = require('imagemin-gifsicle');
const optipng = require('imagemin-optipng');
const svgo = require('imagemin-svgo');

const isWatching = Boolean(process.env.WATCH);
const isProduction = process.env.NODE_ENV === 'production';

/**
 * Supported options which can be provided in project.config.js file are:
 * - files {string|array} Glob pattern or array of them.
 * - dest {string} Path to destination directory.
 * - minify {boolean} If images should be minified, defaults to false for dev and true for production.
 * - plugins {object} Custom imagemin plugins.
 * - watch {boolean} If should run in watch mode, defaults to process.env.WATCH.
 */
const config = Object.assign(
  {
    plugins: [
      jpegtran({
        progressive: true,
      }),
      gifsicle(),
      optipng(),
      svgo(),
    ],
    watch: isWatching,
    minify: isProduction,
  },
  project.getConfig().images
);
// Watch patterns provided in "files" property by default.
config.watchedFiles = config.watchedFiles ? config.watchedFiles : config.files;

if (config.watch) {
  chokidar.watch(config.watchedFiles).on('all', () => {
    images(config);
  });
} else {
  images(config);
}
