const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: `${__dirname}/src/app/index.js`,
  output: {
    path: `${__dirname}/dist`,
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: [
          /node_modules/,
        ],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        { from: './src/app/gif/gif.worker.js', to: "" },
        { from: './src/app/gif/gif.worker.js.map', to: "" },
        { from: './src/app/gif/gif.js.map', to: "" },
        { from: './src/app/gif/gif.js', to: "" },
      ],
    }),
    new HtmlWebpackPlugin({
      template: `${__dirname}/src/public/index.html`,
      inject: 'body',
    }),
  ],
  devServer: {
    contentBase: './src/public',
    port: 7700,
  },
};
