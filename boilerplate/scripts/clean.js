// Run script for cleaning files.
'use strict';

const project = require('../project');
const clean = require('../helpers/clean');

/**
 * Supported options which can be provided in project.config.js file are:
 * - files {string|array} Glob pattern or array of them.
 * - del {object} Custom configuration for del package.
 */
const config = Object.assign({}, project.getConfig().clean);

clean(config);
