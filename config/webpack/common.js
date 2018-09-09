const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

const exclude = [/elm-stuff/, /node_modules/]

const fromRoot = pathArg => path.resolve(__dirname, '../../', pathArg)

module.exports = {
  fromRoot,
  config: {
    entry: fromRoot('src/index.jsx'),
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
      path: fromRoot('dist')
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: fromRoot('pages/index.html')
      })
    ],
    resolve: {
      extensions: ['.js', '.jsx', '.elm']
    }
  }
}
