/* eslint-disable prettier/prettier */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const PATHS = {
    src: path.join(__dirname, './src'),
    dist: path.join(__dirname, './dist'),
    assets: 'assets/',
};
module.exports = {
    entry: path.join(__dirname, './src/index.ts'),
    output: {
        path: PATHS.dist,
        filename: `${PATHS.assets}js/[name].[contenthash].js`,
        assetModuleFilename: `${PATHS.assets}img/[name].[contenthash][ext]`,
        clean: true,
        publicPath: './',
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: 'vendors',
                    test: /node_modules/,
                    chunks: 'all',
                    enforce: true,
                },
            },
        },
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.(png|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.svg$/,
                type: 'asset/resource',
                generator: {
                    filename: `${PATHS.assets}icons/[name].[contenthash][ext]`,
                },
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.tsx?$/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true,
                    },
                },
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: `${PATHS.src}/index.html`,
            filename: './index.html',
        }),
        new CopyPlugin({
            patterns: [{ from: `${PATHS.src}/static`, to: PATHS.dist }],
        }),
    ],
};
