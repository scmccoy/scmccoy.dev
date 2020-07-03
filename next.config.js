const {parsed: localEnv } = require('dotenv').config();
const webpack = require('webpack');

module.exports = {
  webpack(config) {
    // access to current webpack config used by nextjs // 
    config.plugins.push( new webpack.EnvironmentPlugin(localEnv));
    return config;
  }
}
