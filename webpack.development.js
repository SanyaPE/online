const webpack = require('webpack');

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        port: 8081,
        static: './dist',
    },
    plugins: [
        new webpack.SourceMapDevToolPlugin({
            filename: '[file].map',
        }),
    ],
};
