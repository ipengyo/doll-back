const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    entry: {
        main: './src/index.tsx',
        vendor: './src/vendor.ts',
        login: './src/login.tsx'
    },
    output: {
        path: path.resolve('./dist/medicine_console'),
        filename: 'js/[name].js'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    devtool: 'source-map',
    module: {
        rules: [{
            test: /\.ts$/,
            exclude: /node_modules/,
            loader: 'ts-loader'
        }, {
            test: /\.tsx$/,
            exclude: /node_modules/,
            loader: 'babel-loader?plugins[]=transform-vue-jsx!ts-loader'
        }, {
            test: /\.styl$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'stylus-loader']
            })
        }, {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: 'css-loader'
            })
        }, {
            test: /\.(png|jpg|jpeg|gif)$/,
            loader: 'file-loader',
            options: {
                publicPath: '../',
                name: 'img/[name].[ext]'
            }
        }, {
            test: /\.(eot|svg|ttf|woff)$/,
            loader: 'file-loader',
            options: {
                publicPath: '../',
                name: 'css/fonts/[name].[ext]'
            }
        }]
    },
    plugins: [
        new ExtractTextPlugin('css/[name].css'),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor']
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            chunks: ['vendor', 'main']
        }),
        new HtmlWebpackPlugin({
            filename: 'login.html',
            template: './src/login.html',
            chunks: ['vendor', 'login']
        })
    ]
}