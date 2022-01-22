const rollup  = require( 'rollup' ).rollup;
const resolve = require( '@rollup/plugin-node-resolve' ).nodeResolve;
const esbuild = require( 'rollup-plugin-esbuild' ).default;
const banner  = require( './constants/banner' );
const name    = 'splide-extension-grid';


function buildModule( type ) {
  rollup( {
    input: './src/js/index.ts',
    plugins: [
      resolve(),
      esbuild( { experimentalBundling: true } ),
    ]
  } ).then( bundle => {
    return bundle.write( {
      banner,
      file     : `./dist/js/${ name }.${ type }.js`,
      format   : type,
      sourcemap: false,
    } );
  } );
}

buildModule( 'cjs' );
buildModule( 'esm' );

exports.buildCjs = () => buildModule( 'cjs' );
exports.buildEsm = () => buildModule( 'esm' );
