const htmlWebpackPlugin = require("html-webpack-plugin");
const miniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
	module: {
		rules: [
             // find all scss files apply appropriate loaders
            {
				test: /\.scss$/,
				use: [
					"style-loader", "css-loader", "sass-loader"
				]
            },
            // find all png/svg/etc files apply file-loader
			{
				test: /\.(png|svg|jpg|gif|jpeg)$/,
				use: [{
					loader: "file-loader"
				}]
            },
            // find all js files apply babel-loader 
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [{
					loader: "babel-loader"
				}]
			},
			// find all html files apply loader and minimize
			{
				test: /\.html$/,
				use: [{
					loader: "html-loader",
					options: {
						minimize: true
					}
				}]
			},

		]
	},
	plugins: [

        // plugins for webpack
		new htmlWebpackPlugin({
			template: "./src/index.html",// filename in src
			filename: "./index.html" // filename for dist folder
		}),
		new miniCssExtractPlugin({
			filename: "[name].css",
			chunkFilename: "[id].css"
		})
	]
}