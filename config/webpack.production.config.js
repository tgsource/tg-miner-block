'use strict';

const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const Crx = require("crx-webpack-plugin");
const ZipPlugin = require('zip-webpack-plugin');

const version = '0.1.0';

const debugDir = '/built/debug';
const builtDir = '/built';

module.exports = (dirname) => ({
    plugins: [
        new UglifyJSPlugin({
            compress: {
                warnings: true,
                drop_console: false,
                unsafe: true
            }
        }),
        new Crx({
            keyFile: path.join(dirname, './keys/key.pem'),
            contentPath: path.join(dirname, debugDir),
            outputPath: path.join(dirname, `/${builtDir}/chromium`),
            name: `tg-miner-block-${version}`
        }),
        new ZipPlugin({
            path: path.join(dirname, `/${builtDir}/chrome`),
            filename: `tg-miner-block-${version}.zip`,
        })
    ]
});
