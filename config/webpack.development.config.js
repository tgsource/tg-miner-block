'use strict';

const path = require('path');
const webpack = require('webpack');

module.exports = (dirname) => ({
    devtool: 'source-map',
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    }
});
