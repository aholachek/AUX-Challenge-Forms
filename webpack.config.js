var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');


module.exports = {
    entry: [
      './src/app.js',
      'webpack-hot-middleware/client?reload=true',
    ],
    output: {
    filename: "app.js",
    path: path.resolve(__dirname, './build'),
    publicPath: '',
    filename: 'bundle.js'
    },

    plugins: [
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false,
        //     },
        //     output: {
        //         comments: false,
        //     },
        // }),
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

  postcss: function () {
       return [autoprefixer];
   }
};
