const path = require('path');

module.exports = {
  resolve: {
    extensions: ['.ts'],
    modules: ['node_modules'],
  },
  entry: './spec/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundled.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
};