/* eslint-disable prettier/prettier */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const PATHS = {
    src: path.join(__dirname, './src'),
    dist: path.join(__dirname, './dist'),
    assets: 'assets/'
  }

module.exports = {
    // entry: path.resolve(__dirname, './src/index.ts'),
    entry: PATHS.src,
    devtool: 'inline-source-map',
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.(scss|css)$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                use: ['file-loader']
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
    output: {
        filename: 'index.js',
        path: PATHS.dist,
        clean: true,
        publicPath: '/'
    },
    plugins: [
        new HtmlWebpackPlugin({
            // template: path.resolve(__dirname, 'src/index.html'),
            template: `${PATHS.src}/index.html`,
            filename: './index.html',
        }),
        new CopyPlugin({
            patterns: [
                { from: `${PATHS.src}/comp`, to: 'comp' },
                { from: `${PATHS.src}/assets`, to: 'assets' },
                { from: `${PATHS.src}/templates`, to: 'templates' },
                // { from: `${PATHS.src}/img`, to: `${PATHS.assets}img` },
                // { from: `${PATHS.src}/icons`, to: `${PATHS.assets}icons` },
            ],
        }),
    ],
};
