const path = require("path");

module.exports = {
  mode: "production",
  entry: ["./client/index.js"],
  plugins: [
    new webpack.DefinePlugin({
      "process.env.SOCKET": JSON.stringify(process.env.SOCKET),
    }),
  ],
  output: {
    path: path.join(__dirname, "public"),
    filename: "bundle.js",
    publicPath: "/public/",
  },
  stats: {
    errorDetails: true,
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-react"],
        },
      },
    ],
  },
  resolve: {
    alias: {
      buffer: "buffer", // Add this line
    },
    fallback: {
      path: require.resolve("path-browserify"),
      fs: false, // No browser-based alternative
      stream: require.resolve("stream-browserify"),
      util: require.resolve("util/"),
    },
  },
};
