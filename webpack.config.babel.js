import path from 'path';
import webpack from 'webpack';

import Dotenv from 'dotenv-webpack';
import HTMLWebpackPlugin from 'html-webpack-plugin';

class EmptyPlugin { apply = () => {} }

let envPath;
switch (process.env.NODE_ENV) {
  case 'production':
    envPath = './production.env';
    break;
  case 'ropsten':
    envPath = './ropsten.env';
    break;
  default:
    envPath = './local.env';
}

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
      path: path.join(__dirname, 'build'),
      publicPath: `${dev ? `http://localhost:${port}` : ''}/`,
      pathinfo: dev,
      hotUpdateChunkFilename: '[hash].hot-update.js',
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'eslint-loader',
          enforce: 'pre',
          options: {
            configFile: './.eslintrc',
            emitError: !dev,
          },
        },
        {
          test: /\.jsx?$/,
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
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          loader: ['style-loader', 'css-loader'],
        },
        {
          test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff2?$|\.eot$|\.otf$|\.ttf$/,
          exclude: /node_modules/,
          loader: 'file-loader',
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
      }),
      new Dotenv({ path: envPath }),
      new HTMLWebpackPlugin({
        template: '../public/index.html',
      }),
      dev ? new webpack.HotModuleReplacementPlugin() : new EmptyPlugin(),
    ],
    optimization: {
      minimize: !dev,
      splitChunks: {
        cacheGroups: {
          commons: {
            name: 'app-common',
            chunks: 'initial',
            minChunks: 2,
          },
        },
      },
    },
    resolve: {
      modules: [path.resolve('./src'), 'node_modules'],
      extensions: ['.js', '.json', '.jsx'],
    },
    devtool: dev ? 'cheap-module-eval-source-map' : 'source-map',
    bail: !dev,
    devServer: {
      hot: true,
      port,
      historyApiFallback: true,
      // publicPath: `${dev ? `http://localhost:${port}` : ''}/build/`,
      // contentBase: './public',
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
