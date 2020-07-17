const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
	entry: './src/index.js',
	output: {
		filename: '[name].js',
		path: __dirname + '/dist'
	},
	module: {

		rules: [
			// find all scss files apply appropriate loaders
			{
				test: /\.scss$/,
				//webpack reads loaders in reverse order so sass-loader is loaded first then css then style
				use: [
					"style-loader", "css-loader", "sass-loader"
				]
			},
			// find all png/svg/etc files apply file-loader
			{
				test: /\.(png|svg|jpg|gif|jpeg)$/,
				use: [{
					loader: "file-loader",

					// to create the file with same name and ext in dist as defined in src
					options: {
						name: '[name].[ext]',
						outputPath: 'img/',
						publicPath: 'img/'
					}
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
		new HtmlWebpackPlugin({
			template: "./src/index.html",// filename in src
			filename: "index.html" // explicit filename
		}),
		new MiniCssExtractPlugin({
			filename: "[name].css",
			chunkFilename: "[id].css"
		}),
		new CleanWebpackPlugin()
	]
}