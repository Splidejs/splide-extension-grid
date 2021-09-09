const { parallel } = require( 'gulp' );
const { develop } = require( './gulp/develop' );
const { buildScript, buildModule } = require( './gulp/build-script' );


exports[ 'develop' ]      = develop;
exports[ 'build:js' ]     = buildScript;
exports[ 'build:module' ] = buildModule;
exports[ 'build:all' ]    = parallel( buildScript, buildModule );
