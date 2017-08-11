var path = require('path');
var debug = process.env.NODE_ENV !== 'production';
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var entryPath = path.join(__dirname, 'src');
var outputPath = path.join(__dirname, 'dist');

var htmlPlugin = new HtmlWebpackPlugin({
    title: 'js-boilerplate'
});

module.exports = {
    context: entryPath,
    entry: './index.jsx',
    output: {
        path: outputPath,
        filename: 'bundle.js'
    },
    resolve: {
      extensions: [".js", ".jsx"]
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /(node_modules)/,
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: [["es2015", {"modules": false}], 'react'],
                    plugins: ['react-html-attrs', 'transform-class-properties']
                }
            }, {
                loader: 'eslint-loader'
            }]
          }]
    },
    plugins: debug ? [ htmlPlugin ] : [
        htmlPlugin,
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true
        })
    ],
    devtool: debug ? 'inline-source-map' : false,
    devServer: {
        contentBase: outputPath
    }
};
