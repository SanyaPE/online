const webpack = require('webpack');
const path = require('path');
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PATHS = {
    src: path.join(__dirname, './src'),
    dist: path.join(__dirname, './dist'),
    assets: 'assets/',
};

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        historyApiFallback: true,
        open: true,
        compress: true,
        hot: true,
        port: 9000,
    },
    watchOptions: {
        ignored: /node_modules/,
        poll: 1000,
    },

    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: { sourceMap: true, importLoaders: 1, modules: false },
                    },

                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                            sassOptions: { outputStyle: 'expanded' },
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new webpack.SourceMapDevToolPlugin({
            filename: '[file].map',
        }),
    ],
};
