const { buildJs, buildMin } = require( './build-script' );
const { buildEsm, buildCjs } = require( './build-module' );

buildJs();
buildMin();
buildEsm();
buildCjs();
