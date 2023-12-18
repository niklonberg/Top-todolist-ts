const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    index: "./src/index.js",
  }, // if you need more entrypoints, add them here
  mode: "development",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true, // cleans directory when we build
  },
  plugins: [
    // if you need more entry points, you would add new HtmlWebpackPlugins as needed
    new HtmlWebpackPlugin({
      title: "Change Me In Webpack.config",
      template: "./src/index-template.html",
      filename: "index.html", // specify name om html file
      inject: "body", // injects js/ts files into end of body,
      // scriptLoading: "defer", | if you set inject to head instead, this will improve page startup perf.
    }),
  ],
  devtool: "inline-source-map",
  devServer: {
    static: "./dist",
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },
  optimization: {
    // consider removing this?
    runtimeChunk: "single",
  },
};
