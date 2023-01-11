const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  output:{
    filename: '[name].js',
},
  devtool: 'inline-source-map',
  devServer: {
    port: 8015,
    static: {
      directory: path.join(__dirname, '../dist'),
    },
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
                                "postcss-preset-env": {browsers: 'last 2 versions'}
                            }
                        }

                    }
                },
                {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true,
                        sassOptions: {outputStyle: "expanded"},
                    },
                }
            ],
        },
    ]
},
plugins:[
    new MiniCssExtractPlugin({
        filename: '[name].css',
    }),
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map'
  }),
]
}
