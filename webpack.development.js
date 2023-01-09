const webpack = require('webpack')
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PATHS = {
    src: path.join(__dirname, './src'),
    dist: path.join(__dirname, './dist'),
    assets: 'assets/'
}

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        port:8081,
        static: './dist',
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true,
                            sassOptions: {
                                outputStyle: "expanded",
                            },
                        },
                    },
                ],
            },
        ],
    },
    plugins:[
        new webpack.SourceMapDevToolPlugin({
            filename: '[file].map'
        }),
        new MiniCssExtractPlugin({
            filename:  `${PATHS.assets}css/[name].[contenthash].css`,
        }),
    ],
};
