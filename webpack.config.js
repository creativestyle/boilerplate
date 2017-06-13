const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const env = process.env.NODE_ENV;
const isProduction = env === 'production';

module.exports = {
  watch: Boolean(process.env.WATCH),
  entry: {
    'pages/homepage/homepage': './src/pages/homepage/homepage.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    // All non-relative imports will be searched for in below directories.
    modules: [path.resolve('src'), path.resolve('node_modules')],
    extensions: [
      '.js',
      '.jsx',
      '.ts',
      '.tsx',
      '.json',
      '.css',
      '.sass',
      '.scss',
    ],
  },
  devtool: isProduction ? false : 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'ts-loader',
          },
        ],
      },
      {
        test: /\.js(x?)$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'babel-loader', // Check .babelrc file for babel configuration.
          },
        ],
      },
      {
        test: /\.s?css$/,
        // Allows importing of (S)CSS files in JavaScript that are later extracted to separate CSS files.
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: !isProduction,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [
                  // Don't use old flexbox syntax, @see https://developers.google.com/web/tools/lighthouse/audits/old-flexbox
                  require('autoprefixer')({ flexbox: 'no-2009' }),
                  ...(isProduction ? [require('cssnano')()] : []),
                ],
                sourceMap: !isProduction,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                // S(CSS) files can also be imported relatively to directories below.
                // includePaths: [
                //   path.resolve('src'),
                //   path.resolve('node_modules'),
                // ],
                sourceMap: !isProduction,
                sourceMapContents: true,
                outputStyle: 'expanded',
              },
            },
          ],
        }),
      },
    ],
  },
  plugins: [
    // Extract CSS imported within JavaScript files.
    new ExtractTextPlugin({
      filename: '[name].css',
      disable: false,
      allChunks: true,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function(module) {
        return module.context && module.context.indexOf('node_modules') !== -1;
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity,
    }),
    new webpack.DefinePlugin({
      // Expose current environment name to bundled JavaScript as ENV variable.
      ENV: JSON.stringify(env),
    }),
    ...(isProduction
      ? [
          new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false,
          }),
          new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            mangle: {
              screw_ie8: true,
              keep_fnames: true,
            },
            compress: {
              screw_ie8: true,
            },
            comments: false,
          }),
        ]
      : []),
  ],
  stats: { children: false },
};
