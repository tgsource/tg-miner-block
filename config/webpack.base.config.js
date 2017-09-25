'use strict';

const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const srcDir = '/src';
const debugDir = '/built/debug';

module.exports = (dirname, NODE_ENV) => ({
    context: path.join(dirname, `${srcDir}/js`),
    entry: {
        core: './core.js'
    },
    output: {
        path: path.join(dirname, debugDir),
        filename: 'resources/libs/[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        ['es2015', { modules: false }],
                        'stage-2'
                    ],
                    plugins: [
                        'transform-object-rest-spread'
                    ]
                },
                exclude: [
                    path.join(dirname, '/node_modules/')
                ]
            }
        ]
    },
    resolve: {
        modules: [
            'node_modules',
            path.join(dirname, srcDir)
        ],
        extensions: ['.js']
    },
    plugins: [
        new CleanWebpackPlugin(['built'], {
            root: path.join(dirname, './'),
            verbose: true,
            dry: false,
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(NODE_ENV)
            }
        }),
        new CopyWebpackPlugin([
            {
                from: path.join(dirname, '/src/manifest.json'),
                to: path.join(dirname, debugDir)
            },
            {
                from: path.join(dirname, '/src/icons'),
                to: path.join(dirname, `/${debugDir}/resources/icons`)
            }
        ])
    ]
});
