﻿const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const helpers = require('./helpers');

module.exports = {
    entry: {
        'polyfills': './config/polyfills.ts',
        'vendors': './config/vendors.ts',
        'app': './app/main.ts'
    },

    resolve: {
        extensions: ['.ts', '.js'] // Try .ts first, otherwise map will reference .js file.
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    'awesome-typescript-loader',
                    'angular2-template-loader',
                ]
            },
            {
                test: /\.html$/,
                use: { loader: 'html-loader' }
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: 'assets/[name].[hash].[ext]'
                    }
                }
            },
            {
                test: /\.css$/,
                exclude: helpers.root('app'),
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    "css-loader"
                ],
            },
            {
                test: /\.css$/,
                include: helpers.root('app'),
                use: [
                    'to-string-loader',
                    'css-loader',
                ]
            }
        ]
    },

    plugins: [
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core/,
            __dirname
        ),

        new HtmlWebpackPlugin({
            template: './index.html',
            favicon: './favicon.ico',
        }),

        new OpenBrowserPlugin({ url: 'http://localhost:5000' }),
    ],

    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    name: "vendors",
                    test: "vendors",
                    enforce: true,
                },
            }
        }
    }
};