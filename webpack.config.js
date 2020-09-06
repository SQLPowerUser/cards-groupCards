const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  entry: __dirname + '/src/app/app.js',
  output: {
    path: __dirname + '/out',
    filename: 'app.js'
  },
  module: {
      rules: [
          {
            test: /\.(sass|scss|css)$/i,
            use: [{
              loader: "style-loader"
            }, {
              loader: "css-loader"
            }, {
              loader: "sass-loader"
            }],
          },
          {
            test: /\.(png|woff|woff2)$/i,
            use: [{
              loader: 'file-loader',
              options: {
                name: 'public/[name].[ext]',
              },
            }],
          },
          {
            test: /\.vue$/,
            loader: 'vue-loader'
          },
          {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
          },
      ]
  },
  plugins: [
      new HtmlWebpackPlugin({
          template: __dirname + "/src/index.html",
          inject: 'body'
      }),
      new VueLoaderPlugin()
  ],
  devServer: {
      contentBase: './src',
      port: 7700,
  }
};
