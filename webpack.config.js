const path = require('path')
const debug = process.env.NODE_ENV !== 'production'
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const entryPath = path.join(__dirname, 'src')
const outputPath = path.join(__dirname, 'dist')

const htmlPlugin = new HtmlWebpackPlugin({
  title: 'js-boilerplate'
})

module.exports = {
  context: entryPath,
  entry: './index.jsx',
  output: {
    path: outputPath,
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /(node_modules)/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [['env', {'modules': false}], 'react'],
          plugins: ['react-html-attrs', 'transform-class-properties']
        }
      }, {
        loader: 'eslint-loader'
      }]
    }]
  },
  plugins: debug ? [htmlPlugin] : [
    htmlPlugin,
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true
    })
  ],
  devtool: debug ? 'inline-source-map' : false,
  devServer: {
    contentBase: outputPath
  }
}
