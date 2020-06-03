const path = require("path");

module.exports = {
	entry: "./src/index.ts",
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: "awesome-typescript-loader",
				exclude: ["/node_modules/", path.resolve(__dirname, "dist")]
			}
		]
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js"]
	},
	output: {
		filename: "bundle.js",
		libraryTarget: "umd",
		library: "MyLib",
		umdNamedDefine: true,
		path: path.resolve(__dirname, "dist")
	}
};
