const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack')

const exclude = [/elm-stuff/, /node_modules/]

const fromRoot = (pathArg = '.') => path.resolve(__dirname, '../', pathArg)

const PRODUCTION = 'PRODUCTION'

const isProd = process.env.NODE_ENV === PRODUCTION

const distDir = fromRoot('dist')

console.log(fromRoot())

const common = {
  mode: isProd ? 'production' : 'development',
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
        use: {
          loader: 'elm-webpack-loader'
        }
      }
    ],
    noParse: /\.elm$/
  },
  output: {
    filename: '[name].bundle.js',
    path: distDir
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: fromRoot()
    }),
    new HtmlWebpackPlugin({
      template: fromRoot('pages/index.html')
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.elm']
  }
  // externals: {
  //   react: {
  //     root: 'React',
  //     commonjs2: 'react',
  //     commonjs: 'react',
  //     amd: 'react',
  //     umd: 'react'
  //   },
  //   'react-dom': {
  //     root: 'ReactDOM',
  //     commonjs2: 'react-dom',
  //     commonjs: 'react-dom',
  //     amd: 'react-dom',
  //     umd: 'react-dom'
  //   }
  // }
}

module.exports = merge(
  common,
  (() => {
    if (isProd) {
      return {
        plugins: [
          new webpack.DefinePlugin({
            'process.env.PRODUCTION': JSON.stringify(PRODUCTION)
          })
          // new BundleAnalyzerPlugin()
        ],
        optimization: {
          minimizer: [
            new UglifyJsPlugin({
              uglifyOptions: {
                compress: {
                  pure_funcs: [
                    'F2',
                    'F3',
                    'F4',
                    'F5',
                    'F6',
                    'F7',
                    'F8',
                    'F9',
                    'A2',
                    'A3',
                    'A4',
                    'A5',
                    'A6',
                    'A7',
                    'A8',
                    'A9'
                  ],
                  pure_getters: true,
                  keep_fargs: false,
                  unsafe_comps: true,
                  unsafe: true
                }
              }
            }),
            new UglifyJsPlugin({ uglifyOptions: { mangle: true } })
          ]
        }
      }
    }

    return {
      devtool: 'inline-source-map',
      devServer: {
        contentBase: distDir
      }
    }
  })()
)
