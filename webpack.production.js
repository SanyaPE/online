const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports =  {
    mode: 'production',
    devtool: 'source-map',
    plugins: [
        new MiniCssExtractPlugin({
            filename: "style.css",
            chunkFilename: "[id].css"
          }),
    ],
    module: {
        rules: [
            {
            test: /\.s[ac]ss$/i,
            use: [MiniCssExtractPlugin.loader, "css-loader", {
                loader: "sass-loader",
                options: {
                    sourceMap: true,
                    sassOptions: {
                    outputStyle: "compressed",
                    },
                },
                },
                ],
            },
        ],
    },
};
