var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');

const config = {
  entry: [
      './src/app.js'
        ],
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'bundle.js'
  },

  plugins: [
      //this provides process.env.NODE_ENV to the client side code
      //if you want to run different bits of code based on the NODE_ENV
      // which is otherwise unreachable for client code
        new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    })
    ],

  module: {
    loaders: [
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass", "postcss"]
      },
      {
        test: /\.html$/,
        loader: 'file?name=[name].[ext]'
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=8192'
      } // inline base64 URLs for <=8k images, direct URLs for the rest

    ]
  },

  postcss: function() {
    return [autoprefixer];
  }
};

//conditional plugins
if (process.env.NODE_ENV === 'production') {

  [].push.apply(config.plugins, [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      mangle: false,
      sourcemap: false
    })
  ]);

} else {

  [].push.apply(config.plugins, [
    new webpack.HotModuleReplacementPlugin()
  ]);


}

module.exports = config;
