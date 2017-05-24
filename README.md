# Frontend starter

This is the documentation about project based on frontend boilerplate.

If you would like to get
more information about boilerplate itself head to `boilerplate/README.md` file.

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
* JavaScript bundling, spliting and minifying using Webpack.
* Sass + PostCSS compilation with minification.
* Twig templates compilation.
* HTML copying and minifying.
* Images copying and minifying.
* SVG sprites generation and minification.
* Copying of .WOFF, .WOFF2, .TTF, .JSON, .ICO, .PHP, .PHTML, .CSV, .XML files.

Your app is ready to be deployed from the `dist` folder.

## Configuration
There are many options supported by the boilerplate which can be configured. For more information head to `boilerplate/README.md` file.
