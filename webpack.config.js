var debug = process.env.NODE_ENV !== 'production';
var webpack = require('webpack');

module.exports = {
  context: __dirname,
  devtool: debug ? 'inline-sourcemap' : null,
  entry: '.\\src\\components\\app\\app.react.jsx',
  output: {
    path: __dirname + '/server/public/js',
    filename: 'app.min.js'
  },
  mode: 'development',
  plugins: debug
    ? []
    : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false })
      ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        loader: 'babel-loader',
        exclude: /node_modules/,
        test: /\.jsx?$/,
      }
    ]
  },
  watch: true
};
