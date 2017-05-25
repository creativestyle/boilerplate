/**
 * Boilerplate main configuration file. For more detailed information
 * regarding configuration and tasks see boilerplate/README.md file.
 */
const path = require('path');

const src = path.resolve('src'); // Sources directory path relative to this file.
const dest = path.resolve('dist'); // Destination directory path relative to this file.

module.exports = {
  html: {
    // Copies and minifies HTML files.
    files: `${src}/**/*.html`,
    dest,
  },
  images: {
    // Copies and minifies images.
    files: `${src}/assets/images/**/*.{jpg,svg,jpeg,png,gif}`,
    dest: `${dest}/assets/images`,
  },
  copy: {
    // Copies files without doing any changes.
    files: [
      `${src}/**/*.{woff,woff2,ttf}`,
      `${src}/**/*.json`,
      `${src}/**/*.ico`,
      `${src}/**/*.{php,phtml}`,
      `${src}/**/*.{csv,xml}`,
    ],
    dest,
  },
  twig: {
    // Compiles Twig templates.
    files: `${src}/pages/**/*.twig`,
    watchedFiles: [
      `${src}/pages/**/*.twig`,
      `${src}/pages/**/*.data.{js,json}`, // Watch also data files change.
    ],
    dest: `${dest}/pages`,
    base: src,
  },
  clean: {
    // Deletes files.
    files: `${dest}/**/*`,
  },
  svgSprite: {
    // Compiles SVG sprite out of given SVG files.
    files: `${src}/assets/sprites/svg/**/*.svg`,
    spriteName: 'sprite.svg',
    dest: `${dest}/assets/images`,
  },
  serve: {
    // Serves project using Browsersync.
    browserSync: {
      server: {
        baseDir: dest,
      },
      files: [dest],
      open: false,
    },
  },
};
