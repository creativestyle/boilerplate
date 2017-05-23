'use strict';

const vfs = require('vinyl-fs');

/**
 * Copies files from given glob patterns to destination directory.
 * @return {stream} Stream produced by vinyl-fs.
 */
module.exports = config => vfs.src(config.files).pipe(vfs.dest(config.dest));
