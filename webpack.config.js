const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { merge } = require('webpack-merge');
const ESLintPlugin = require('eslint-webpack-plugin');

const baseConfig = {
    entry: path.join(__dirname, './src/index.ts'),
    output: {
        path: path.join(__dirname, './dist'),
        assetModuleFilename: 'assets/[hash][ext]',
        clean: true,
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
    module: {
        rules: [
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/img/[hash][ext]'
                }
            },
            {
                test: /\.svg/i,
                type: 'assets/icons/[hash][ext]',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.ts?$/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        compilerOptions: { noEmit: false },
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
            template: path.resolve(__dirname, './src/index.html'),
            filename: './index.html',
        }),
        new CopyPlugin({
            patterns: [{ from: `./src/static`, to: './assets' }],
        }),
        new ESLintPlugin({
            extensions: [`js`, `ts`],
            exclude: [`/node_modules/`],
        }),
    ],
};

module.exports = (env, argv) => {
    const buildMode = process.env.NODE_ENV === 'production' ? 'production' : 'development'
    const modeConfig = require(`./webpack.${buildMode}.js`)
    return merge(baseConfig, modeConfig);
};
