const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports =  {
    mode: 'production',
    output:{
        filename: '[name].[chunkhash:8].js',
    },
    module:{
        rules: [
            {
                test: /\.(s[ac]|c)ss$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '',
                        },
                    },
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options:{
                            postcssOptions:{
                                plugins: {
                                    "postcss-preset-env": {
                                        browsers: 'last 2 versions',
                                    }
                                }
                            }

                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sassOptions: {
                                outputStyle: "compressed",
                            },
                        },
                    }
                ],
            },
        ]
    },
    plugins:[
        new MiniCssExtractPlugin({
            filename: '[name].[chunkhash:8].css',
        }),
    ]
};
