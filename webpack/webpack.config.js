const webpack = require('webpack');
const dotenv = require('dotenv').config();
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = {
    resolve: {
        alias: {
            handlebars: 'handlebars/dist/handlebars.js',
        },
        extensions: ['.ts', '.js', '.json'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            configFile: path.resolve(__dirname, '../tsconfig.json'),
                            transpileOnly: true,
                        },
                    },
                ],
                exclude: /(node_modules)/,
            },
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                config: path.resolve(__dirname, '../.postcssrc'),
                            },
                        },
                    },
                ],
            },
            {
                test: /\.svg$/,
                use: 'file-loader',
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            baseUrl: '/',
            template: 'src/index.html',
            templateParameters(compilation, assets, options) {
                return {
                    compilation,
                    webpack: compilation.getStats().toJson(),
                    webpackConfig: compilation.options,
                    htmlWebpackPlugin: {
                        files: assets,
                        options,
                    },
                    process,
                };
            },
            chunksSortMode: 'auto',
            minify: {
                collapseWhitespace: false,
            },
            cache: true,
        }),
        new MiniCssExtractPlugin(),
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
        new webpack.DefinePlugin({
            'process.env': JSON.stringify(dotenv.parsed),
        }),
    ],
};

module.exports = config;
