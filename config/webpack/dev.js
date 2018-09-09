const merge = require('webpack-merge')

const { config, fromRoot } = require('./common.js')

module.exports = merge(config, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: fromRoot('dist')
  }
})
