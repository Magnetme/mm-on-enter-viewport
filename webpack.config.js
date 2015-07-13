var ExtractTextPlugin = require('extract-text-webpack-plugin');
var LessPluginNpmImport = require('less-plugin-npm-import');

module.exports = {
	context : __dirname + '/src',
	entry : './index.js',
	output : {
		path : __dirname + '/out/',
		filename : 'mm-on-enter-viewport.bundle.js'
	},
	module: {
		noParse : [
			/\.min\.js$/
		],
		loaders: [
			{
				test: /\.js/,
				loader: "babel"
			},
			{
				test: /\.less$/,
				loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
			},
			{
				test: /\.(woff|woff2|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
				loader: "file?name=style/fonts/[name]-[md5:hash:base64:8].[ext]"
			},
			{
				test : /\.html$/,
				loader: "html"
			}

		]
	},
	plugins: [
		new ExtractTextPlugin("style/styles.css")
	],
	lessLoader : {
		lessPlugins : [
			new LessPluginNpmImport()
		]
	},
	devtool : '#inline-source-map'
};
