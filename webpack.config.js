const webpack = require('webpack');
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: path.resolve(__dirname, 'src', 'renderer', 'index.js'),
	mode: 'none',
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/, // checks for .js or .jsx files
				exclude: /(node_modules)/,
				loader: 'babel-loader',
				options: { presets: ['@babel/env'] },
			},
			{
				test: /\.css$/, //checks for .css files
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				type: 'asset/resource',
			},
		],
	},
	resolve: {
		extensions: ['.*', '.js', '.jsx'],
		fallback: {
			path: require.resolve('path-browserify'),
		},
		alias: {
			Components: path.resolve(__dirname, 'src/renderer/components'),
			Contexts: path.resolve(__dirname, 'src/renderer/contexts'),
			Hooks: path.resolve(__dirname, 'src/renderer/hooks'),
			Assets: path.resolve(__dirname, 'src/renderer/assets'),
			Utils: path.resolve(__dirname, 'src/renderer/utils'),
		},
	},
	output: {
		path: path.resolve(__dirname, 'dist', 'renderer'),
		filename: 'bundle.js',
	},
	plugins: [
		new webpack.ProvidePlugin({
			process: 'process/browser',
		}),
		new HTMLWebpackPlugin({
			template: path.resolve(__dirname, 'src', 'renderer', 'index.html'),
		}),
	],
};
