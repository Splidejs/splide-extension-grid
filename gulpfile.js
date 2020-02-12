'use strict';

/*
 * Dependencies.
 */
const gulp          = require( 'gulp' );
const webpackStream = require( 'webpack-stream' );

/*
 * Webpack config paths.
 */
const js = {
	global: {
		path: './build/global/config',
		dest: './dist/js',
	},
	module: {
		path: './build/module/config',
		dest: './dist/js',
	},
};

/*
 * Build a script file.
 */
gulp.task( 'build:js', done => {
	Object.values( js ).forEach( settings => {
		webpackStream( { config: require( settings.path ) } )
			.pipe( gulp.dest( settings.dest ) );
	} );

	done();
} );