// Run script for copying files.
'use strict';

const chokidar = require('chokidar');
const project = require('../project');
const copy = require('../helpers/copy');

const isWatching = Boolean(process.env.WATCH);

/**
 * Supported options which can be provided in project.config.js file are:
 * - files {string|array} Glob pattern or array of them.
 * - dest {string} Path to destination directory.
 * - watch {boolean} Tells if script should be run in watch mode, defaults to process.env.WATCH.
 */
const config = Object.assign(
  {
    watch: isWatching,
  },
  project.getConfig().copy
);

copy(config);

if (config.watch) {
  chokidar.watch(config.files).on('all', () => {
    copy(config);
  });
}
