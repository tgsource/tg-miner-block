'use strict';

const merge = require('webpack-merge');

const NODE_ENV = process.env.NODE_ENV || 'development';

const baseConfig = require('./config/webpack.base.config.js');
const envConfig = require(`./config/webpack.${NODE_ENV}.config.js`);

module.exports = merge(
    baseConfig(__dirname, NODE_ENV),
    envConfig(__dirname)
);
