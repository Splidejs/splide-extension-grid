module.exports = {
	entry: './src/js/splide-extension-grid.js',
	output: {
		filename     : 'splide-extension-grid.js',
		library      : 'Splide',
		libraryTarget: 'umd',
	},
	module: {
		rules: [
			{
				test   : /.js$/,
				loader : 'babel-loader',
				exclude: /node_modules/,
			},
		],
	},
	optimization: {
		minimize: false,
	},
	mode: 'production',
};