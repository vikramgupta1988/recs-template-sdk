const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    devtool: "source-map",
    mode: "production",
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "unbxd_recs_template_sdk.js",
        publicPath: 'build/'
    },
    module: {
        rules: [
            {
                use: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(jpe?g|png|svg|gif)/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 100000
                        }
                    },
                    'image-webpack-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
    ]
}
