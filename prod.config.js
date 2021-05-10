const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var ContentReplacePlugin = require('content-replace-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    entry: {
        'unbxd_recs_template_sdk': './src/index.js',
        'unbxd_recs_template_sdk_uk': './src/index.js',
        'unbxd_recs_template_sdk_apac': './src/index.js',
        'unbxd_recs_template_sdk_anz': './src/index.js'
    },
    devtool: "source-map",
    mode: "production",
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "[name].js",
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
        new ContentReplacePlugin({
            rules: {
              'unbxd_recs_template_sdk_uk.js': content => content.replace('/recommendations.unbxd.io', '/uk-recommendations.unbxd.io'),
              'unbxd_recs_template_sdk_apac.js': content => content.replace('/recommendations.unbxd.io', '/apac-recommendations.unbxd.io'),
              'unbxd_recs_template_sdk_anz.js': content => content.replace('/recommendations.unbxd.io', '/anz-recommendations.unbxd.io')
            }
          })
    ],
}
