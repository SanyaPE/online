const webpack = require('webpack')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        port:8081,
        static: './dist',
    },
    plugins:[
        new webpack.SourceMapDevToolPlugin({
            filename: '[file].map'
        })
    ],
    module: {
        rules: [
            {
            test: /\.s[ac]ss$/i,
            use: ['style-loader', "css-loader", 'postcss-loader','sass-loader'],
            },
        ],
    },
};
