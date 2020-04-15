const config = require( '../global/config' );

module.exports = {
	...config,
	entry: './src/js/splide-extension-grid.js',
	output: {
		filename     : 'splide-extension-grid.esm.js',
		library      : 'Splide',
		libraryTarget: 'umd',
	},
};