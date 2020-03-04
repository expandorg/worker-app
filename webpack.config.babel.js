import path from 'path';
import webpack from 'webpack';

import DotenvWebpackPlugin from 'dotenv-webpack';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import { envFilePath } from './config';

import { dependencies as deps } from './package.json';

class EmptyPlugin {
  apply() {}
}

const entry = {
  app: ['core-js/stable', 'regenerator-runtime/runtime', './index'],
};

const babelPlugins = [
  '@babel/plugin-proposal-class-properties',
  '@babel/plugin-proposal-export-default-from',
  '@babel/plugin-proposal-export-namespace-from',
  '@babel/plugin-proposal-throw-expressions',
  '@babel/plugin-syntax-dynamic-import',
  '@babel/plugin-syntax-import-meta',
];

export default (env = {}) => {
  const dev = !!env.dev;
  const port = env.port || 3000;

  const gemsBuildInfo = {
    components: JSON.stringify(deps['@expandorg/components']),
    modules: JSON.stringify(deps['@expandorg/modules']),
    buildDate: JSON.stringify(new Date().toUTCString()),
  };

  return {
    context: path.join(__dirname, 'src'),
    entry,
    mode: dev ? 'development' : 'production',
    output: {
      filename: dev ? '[name].js' : '[name]-[chunkhash].js',
      publicPath: '/',
      path: path.join(__dirname, 'public'),
      pathinfo: dev,
      hotUpdateChunkFilename: '[hash].hot-update.js',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'eslint-loader',
          enforce: 'pre',
          options: {
            configFile: './.eslintrc',
            emitError: !dev,
          },
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: [
              [
                '@babel/preset-env',
                {
                  modules: false,
                  useBuiltIns: 'entry',
                  corejs: 3,
                },
              ],
              '@babel/preset-flow',
              '@babel/preset-react',
            ],
            cacheDirectory: true,
            plugins: dev
              ? babelPlugins.concat('react-hot-loader/babel')
              : babelPlugins,
          },
          exclude: /node_modules\/(?!(@expandorg)\/).*/,
        },
        {
          test: /^((?!\.module).)*\.styl$/,
          use: [
            dev ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                importLoaders: 2,
              },
            },
            'postcss-loader?sourceMap',
            'stylus-loader?paths[]=src',
          ],
          exclude: /node_modules\/(?!(@expandorg)\/).*/,
        },
        {
          test: /\.module\.styl$/,
          use: [
            dev ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                importLoaders: 2,
                modules: {
                  localIdentName: dev
                    ? '[local]__[path][name]__[hash:base64:5]'
                    : '[hash:base64:5]',
                },
              },
            },
            'postcss-loader?sourceMap',
            'stylus-loader?paths[]=src',
          ],
          exclude: /node_modules\/(?!(@expandorg)\/).*/,
        },
        {
          test: /\.svg$/,
          issuer: {
            test: /\.js$/,
          },
          use: ['@svgr/webpack', 'file-loader?name=static/[hash].[ext]'],
        },
        {
          test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff2?$|\.eot$|\.otf$|\.ttf$/,
          loader: 'file-loader?name=static/[hash].[ext]',
          exclude: /node_modules\/(?!(@expandorg)\/).*/,
        },
      ],
    },
    plugins: [
      new webpack.LoaderOptionsPlugin({
        options: {
          minimize: !dev,
          context: __dirname,
        },
      }),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(!dev ? 'production' : 'development'),
        },
        gemsBuildInfo,
      }),
      new MiniCssExtractPlugin({
        filename: dev ? '[name].css' : '[name]-[chunkhash].css',
      }),
      new DotenvWebpackPlugin({ path: envFilePath }),
      new HTMLWebpackPlugin({
        filename: 'index.html',
        template: 'template.html',
      }),
      dev ? new webpack.HotModuleReplacementPlugin() : new EmptyPlugin(),
    ],
    optimization: {
      minimize: !dev,
    },
    resolve: {
      modules: [path.resolve('./src'), 'node_modules'],
      extensions: ['.js', '.json'],
      symlinks: false,
    },
    devtool: dev ? 'cheap-module-eval-source-map' : 'source-map',
    bail: !dev,
    devServer: {
      port,
      contentBase: './public',
      historyApiFallback: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      hot: true,
      quiet: false,
      noInfo: false,
      overlay: true,
      stats: {
        colors: true,
        version: true,
      },
    },
  };
};
