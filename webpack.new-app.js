const { merge } = require('webpack-merge');
const Dotenv = require('dotenv-webpack');
const common = require('./webpack.common.js');
const path = require("path");

module.exports = merge(common, {
    mode: 'production',
    plugins: [
        new Dotenv({
            path: './src/environment/new-app.env'
        }),
    ],
    output: {
        filename: 'bundle.new-app.min.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    }
});
