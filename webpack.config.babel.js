import { optimize, DefinePlugin, HotModuleReplacementPlugin } from 'webpack';
import Dotenv from 'dotenv-webpack';
import HTMLWebpackPlugin from 'html-webpack-plugin';

const envPath = process.env.NODE_ENV === 'production' ? './production.env' : './local.env';

const entry = {
  vendor: [
    'auto-bind',
    'bluebird',
    'glamor',
    'prop-types',
    'react',
    'react-clipboard.js',
    'react-dom',
    'react-redux',
    'react-router',
    'react-router-redux',
    'react-slick',
    'redux',
    'redux-actions',
    'redux-thunk',
    'isomorphic-fetch',
  ],
  app: ['babel-polyfill', './index'],
};
const commons = ['vendor'];
const plugins = [
  new DefinePlugin({
    'process.env.NODE_ENV': `'${process.env.NODE_ENV}'`,
  }),
  new Dotenv({
    path: envPath,
  }),
  new HTMLWebpackPlugin({
    template: '../public/index.html',
  }),
  new optimize.CommonsChunkPlugin({ names: commons }),
  new HotModuleReplacementPlugin(),
];

const cwd = process.cwd();
export default {
  context: `${cwd}/src`,
  entry,
  output: {
    path: `${cwd}/build`,
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'eslint-loader',
      enforce: 'pre',
      options: {
        configFile: './.eslintrc',
        emitError: process.env.NODE_ENV === 'production',
      },
    }, {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }, {
      test: /\.css$/,
      exclude: /node_modules/,
      loader: ['style-loader', 'css-loader'],
    }, {
      test: /\.png$/,
      exclude: /node_modules/,
      loader: 'file-loader',
    }],
  },
  plugins,
  devServer: {
    contentBase: './public',
    hot: true,
    historyApiFallback: true,
  },
};
