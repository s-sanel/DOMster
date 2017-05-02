var path = require("path");

module.exports = {
  context: __dirname,
  entry: "./lib/main.js",
  output: {
    path: path.resolve(__dirname),
    filename: "domster.js"
	},
	devtool: "source-map"
};
