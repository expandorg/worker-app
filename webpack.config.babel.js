import path from 'path';
import webpack from 'webpack';

import DotenvWebpackPlugin from 'dotenv-webpack';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import { envFilePath } from './config';

import packageJson from './package.json';

class EmptyPlugin { apply = () => {} }

const entry = {
  app: ['./index'],
};

export default (env = {}) => {
  const dev = !!env.dev;
  const port = env.port || 3000;

  Reflect.ownKeys(entry).forEach((name) => {
    entry[name].unshift('babel-polyfill');
    if (dev) {
      entry[name].unshift(
        `webpack-dev-server/client?http://localhost:${port}`,
        'webpack/hot/only-dev-server',
      );
    }
  });
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
              ['env', {
                es2015: {
                  modules: false,
                },
              }],
              'react',
              'stage-0',
            ],
            plugins: dev ? ['react-hot-loader/babel'] : [],
          },
          exclude: /node_modules\/(?!(@gemsorg)\/).*/,
        },
        {
          test: /^((?!\.module).)*\.styl$/,
          use: [
            dev ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader?sourceMap&importLoaders=2',
            'postcss-loader?sourceMap',
            'stylus-loader?paths[]=src',
          ],
          exclude: /node_modules\/(?!(@gemsorg)\/).*/,
        },
        {
          test: /\.module\.styl$/,
          use: [
            dev ? 'style-loader' : MiniCssExtractPlugin.loader,
            `css-loader?sourceMap&importLoaders=2&modules&localIdentName=${dev ? '[local]__[path][name]__' : ''}[hash:base64:5]`,
            'postcss-loader?sourceMap',
            'stylus-loader?paths[]=src',
          ],
          exclude: /node_modules\/(?!(@gemsorg)\/).*/,
        },
        {
          test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff2?$|\.eot$|\.otf$|\.ttf$/,
          loader: 'file-loader?name=static/[hash].[ext]',
          exclude: /node_modules/,
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
        gemsBuildInfo: {
          components: JSON.stringify(packageJson.dependencies['@gemsorg/components']),
          buildDate: JSON.stringify(new Date().toUTCString()),
        },
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
      modules: [
        path.resolve('./src'),
        path.resolve('node_modules'),
      ],
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
