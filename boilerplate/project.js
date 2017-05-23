'use strict';

const path = require('path');
const config = require(path.resolve('project.config.js'));

/**
 * Returns project configuration.
 *
 * @return {object} Project configuration.
 */
const getConfig = () => config;

module.exports = {
  getConfig,
};
