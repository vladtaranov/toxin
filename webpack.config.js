const Path = require('path');
const FS = require('fs');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const PATHS = {
  dev: './src',
  prod: './dist',
  assets: './assets'
};

const PAGES_DIR = `${PATHS.dev}/pug/pages`;
const PAGES = FS.readdirSync(PAGES_DIR)
  .filter((filename) => filename.endsWith('.pug'));

module.exports = (env) => {
  const { mode = 'production' } = env;
  const isProduction = mode === 'production';
  const isDevelopment = mode === 'development';

  const getPlugins = () => {
    const plugins = [
      new CleanWebpackPlugin(),
      ...PAGES.map((page) => {
        return new HtmlWebpackPlugin({
          template: `${PAGES_DIR}/${page}`,
          filename: `./${page.replace(/\.pug$/, '.html')}`
        })
      })
    ];

    if (isProduction) {
      plugins.push(
        new MiniCssExtractPlugin({
          filename: `${PATHS.assets}/styles/main-[hash:5].css`
        })
      );
    }

    return plugins;
  };

  const getStyleLoaders = () => {
    return [
      isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
      'css-loader',
      'postcss-loader',
      'sass-loader'
    ]
  };

  return {
    mode: isDevelopment ? 'development' : 'production',
    devtool: isDevelopment ? 'inline-source-map' : 'source-map',
    entry: `${PATHS.dev}/js/index.js`,
    output: {
      path: Path.join(__dirname, PATHS.prod),
      filename: isProduction
        ? `${PATHS.assets}/js/main-[hash:5].js`
        : undefined
    },
    devServer: {
      contentBase: Path.join(__dirname, PATHS.dev),
      port: 9000,
      historyApiFallback: true,
      compress: true,
      open: true
    },
    plugins: getPlugins(),
    module: {
      rules: [

        // Loading Pug
        {
          test: /\.pug$/,
          use: 'pug-loader'
        },

        // Loading JS
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: 'babel-loader'
        },

        // Loading styles
        {
          test: /\.(sass|scss)$/,
          use: getStyleLoaders()
        },

        // Loading fonts
        {
          test: /\.(woff2|woff|ttf)$/,
          loader: 'file-loader',
          options: {
            outputPath: `${PATHS.assets}/fonts`
          }
        }
      ]
    }
  };
};
