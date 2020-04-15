const config = require( '../global/config' );

module.exports = {
	...config,
	output: {
		filename     : 'splide-extension-grid.esm.js',
		library      : 'Splide',
		libraryTarget: 'umd',
	},
};