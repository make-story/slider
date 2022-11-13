const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, "src", "index.js"),
  resolve: { extensions: ["*", ".js", ".jsx"] },
  module: {
    rules: [
      {
		test: /\.(js)$/,
		exclude: /node_modules/,
		use: {
			loader: "babel-loader",
		}
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ]
  },
  output: {
    path:path.resolve(__dirname, "dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "index.html"),
    }),
  ],
}