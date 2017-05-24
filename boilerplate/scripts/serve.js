'use strict';

const browserSync = require('browser-sync');
const project = require('../project');
const logger = require('../logger');

const config = project.getConfig().serve;

logger.info('Starting Browsersync server in 2s...');

setTimeout(() => browserSync.init(config.browserSync), 2000); // Wait a little for other tasks to complete.
