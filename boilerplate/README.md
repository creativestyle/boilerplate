# Frontend starter boilerplate

[![Greenkeeper badge](https://badges.greenkeeper.io/creativestyle/boilerplate.svg)](https://greenkeeper.io/) [![Build Status](https://travis-ci.org/creativestyle/boilerplate.svg?branch=master)](https://travis-ci.org/creativestyle/boilerplate) [![David](https://img.shields.io/david/creativestyle/boilerplate.svg)](https://david-dm.org/creativestyle/boilerplate) [![David](https://img.shields.io/david/dev/creativestyle/boilerplate.svg)](https://david-dm.org/creativestyle/boilerplate?type=dev) [![GitHub tag](https://img.shields.io/github/tag/creativestyle/boilerplate.svg)](https://github.com/creativestyle/boilerplate/releases)

Boilerplate starter kit used in creativestyle for frontend parts of the projects.

**Note:** Some parts of this documentation rely on default boilerplate configuration and it may be the case that some parts of it were customized for certain project, so keep that in mind if something doesn't check out. Also, be sure to update both main and this README files to align with your custom configuration.

## Getting started
### Requirements
1. `nodejs >= 5`,
2. `yarn`(recommended) or `npm >= 3`.
### Installation
Download or clone the repository into desired directory:
```bash
git clone https://github.com/creativestyle/boilerplate.git my-project-name
```
Install dependencies:
```bash
yarn install
# or
npm install
```
Initialize the project(**only do this when setting up project for the first time**):
```bash
yarn setup
# or
npm run setup
```
Make sure you provide requested information, especially new repository Git URL for your project.

Once the setup is done, you can run some commands inside the project folder:

### `npm start` or `yarn start`

Runs the app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits, **it will also inject styles once you change them without reloading the whole page**.<br>

### `npm run build` or `yarn build`

Builds the app for production to the `dist` folder.<br>
It will do the following optimizations:
* JavaScript bundling, splitting and minifying using Webpack.
* Sass + PostCSS compilation with minification.
* Twig templates compilation.
* HTML copying and minifying.
* Images copying and minifying.
* SVG sprites generation and minification.
* Copying of `.WOFF`, `.WOFF2`, `.TTF`, `.JSON`, `.ICO`, `.PHP`, `.PHTML`, `.CSV`, `.XML` files.

Your app is ready to be deployed from the `dist` folder.

## Project structure
```
your-project-name/
  project.config.js
  webpack.config.js
  dist/
  boilerplate/
  src/
    assets/
    components/
    config/
    layouts/
    pages/
```
### `project.config.js`
Main configuration files for the entire project. Most of the following directories' names and locations can be customized there. You can also configure each of the available scripts provided by the boilerplate there.
### `webpack.config.js`
Webpack configuration file. If you want to customize anything connected with JavaScript or Sass styles you should probably look there.
### `src/`
Contains all of your source code, assets and configuration. Here you can create additional subdirectories and find provided ones:
#### `src/assets/`
This directory is meant for all of your static assets like images, fonts, sprites etc.
### `src/config/`
Here you should keep all of your project-wide configuration that doesn't belong to certain component e.g. Sass breakpoints, colors, but also environment specific settings etc.
### `src/components/`
Here you should keep all of your components, each in its own subdirectory. Components are the smallest building blocks of every website or app.
### `src/layouts/`
Layouts can be considered blueprints or skeletons for actual pages, e.g. you can have a `CMS` layout which is extended by company info, FAQ and other pages.
### `src/pages/`
Final building blocks of every website, which just represent every single page available on the site. Every page should extend predefined layout.
