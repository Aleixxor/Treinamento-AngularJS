const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = env => {
  return {
    mode: env.prod ? 'production' : 'development',

    entry: {
      app: './src/app.js'
    },
    output: {
      path: path.resolve(__dirname, 'dist/'),
      filename: 'bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [{ loader: 'babel-loader', options: { cacheDirectory: true } }]
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.html$/,
          loader: 'html-loader',
          options: {
            minimize: true
          }
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'src/index.html'),
        hash: true,
        minify: {
          html5: true,
          minifyJS: true
        }
      })
    ],
    devtool: env.prod ? 'nosources-source-map' : 'eval-source-map',
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      port: 8080,
      hot: true,
      open: true
    }
  };
};
