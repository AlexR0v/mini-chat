const HtmlWebPackPlugin = require('html-webpack-plugin')
const htmlTemplate = require('html-webpack-template')

module.exports = {
  entry: ['./src/index'],
  output: {
    publicPath: '/',
  },

  resolve: {
    extensions: ['.jsx', '.js', '.json'],
  },

  devServer: {
    port: 8080,
    open: true,
    hot: true
  },

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },

  plugins: [
    new HtmlWebPackPlugin({
      title: 'Mini chat',
      template: htmlTemplate,
      lang: 'ru',
      appMountId: 'root',
    }),
  ],
}
