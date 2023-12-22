const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.ts',
  }, // if you need more entrypoints, add them here
  mode: 'development',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true, // cleans directory when we build
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [
    // if you need more entry points, you would add new HtmlWebpackPlugins as needed
    new HtmlWebpackPlugin({
      title: 'Todolist Typescript',
      template: './src/index-template.html',
      filename: 'index.html', // specify name om html file
      inject: 'body', // injects js/ts files into end of body,
      // scriptLoading: "defer", | if you set inject to head instead, this will improve page startup perf.
    }),
  ],
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
      },
      {
        test: /\.js$/,
        use: ['source-map-loader'],
        enforce: 'pre',
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
};
