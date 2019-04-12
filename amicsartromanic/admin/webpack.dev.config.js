const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');

module.exports = {
  entry: {
    main: [
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
      './src/index.js',
      './src/css/style.scss'
    ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].js'
  },
  mode: 'development',
  target: 'web',
  devtool: '#source-map',
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          emitWarning: true,
          failOnError: false,
          failOnWarning: false
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        // Loads the javacript into html template provided.
        // Entry point is set below in HtmlWebPackPlugin in Plugins
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
            //options: { minimize: true }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: ExtractCssChunks.loader,
            options: {
              hot: true, // if you want HMR - we try to automatically inject hot reloading but if it's not working, add it to the config
              reloadAll: true // when desperation kicks in - this is a brute force HMR flag
            }
          },
          {
            loader: 'css-loader',
            options: {
              url: true
            }
          },
          'resolve-url-loader',
          {
            loader: 'sass-loader',
            options: {}
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      }
    ]
  },
  plugins: [
    new ExtractCssChunks({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
      orderWarning: true // Disable to remove warnings about conflicting order between imports
    }),
    new HtmlWebPackPlugin({
      template: './public/index.html',
      filename: './index.html',
      excludeChunks: ['server']
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
};
