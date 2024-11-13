/* eslint-disable node/no-unpublished-require */
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  context: __dirname,
  mode: 'production',
  devtool: 'source-map',
  entry: './src/index.ts',
  resolve: {
    extensions: ['.ts'],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  },
  target: 'node',
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.(tsx?)$/,
        loader: 'ts-loader',
        exclude: [path.resolve(__dirname, 'node_modules')],
        options: {
          transpileOnly: true,
        },
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [{from: './config/**', to: './'}],
    }),
  ],
};
