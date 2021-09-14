const HtmlWebpackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge');
const Dotenv = require('dotenv-webpack');
const common = require('./webpack.common.js');
const path = require('path');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        static: './dist',
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Rubic Widget',
            template: './src/assets/dev.index.html',
            scriptLoading: 'defer'
        }),
        new Dotenv({
            path: './src/environment/dev.env'
        })
    ],
    output: {
        filename: 'bundle.dev2.min.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    }
});
