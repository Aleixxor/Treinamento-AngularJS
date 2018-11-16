const path = require('path');
module.exports = {
  // entry: path.resolve(__dirname, './src/app.js'),
  entry: {
    app: './src/app.js'
  },
  output: {
      path: path.resolve(__dirname, 'src/'),
      filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
}