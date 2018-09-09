const exclude = [/elm-stuff/, /node_modules/]

module.exports = {
  mode: 'development',

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
    filename: 'bundle.js'
  },

  resolve: {
    extensions: ['.js', '.jsx', '.elm']
  }
}
