const path = require('path')

const exclude = [/elm-stuff/, /node_modules/]

module.exports = {
  entry: './src/index.jsx',
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude,
        loader: 'babel-loader'
      },
      {
        test: /\.elm$/,
        exclude,
        loader: 'elm-webpack-loader'
      }
    ],
    noParse: /\.elm$/
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.js', '.jsx', '.elm']
  }
}
