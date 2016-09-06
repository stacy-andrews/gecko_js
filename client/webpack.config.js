var webpack = require('webpack');

module.exports = {
  entry: './src/app.js',
  output: { path: __dirname + '/../public/javascripts', filename: 'bundle.js' },
  module: {
    loaders: [
      { test: /\.css$/, loader: "css-loader" },
      {
        test: /.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        },
        progress: true
      }
    ]
  },
  externals: {
    jquery: '$',
    Bloodhound: 'Bloodhound'
  },
  devtool: "source-map"
};
