const rollup   = require( 'rollup' ).rollup;
const esbuild  = require( 'rollup-plugin-esbuild' ).default;
const babel    = require( '@rollup/plugin-babel' );
const resolve  = require( '@rollup/plugin-node-resolve' ).nodeResolve;
const path     = require( 'path' );
const banner   = require( './constants/banner' );
const name     = 'splide-extension-grid';


function buildScript( minify ) {
  return rollup( {
    input: './src/js/build/default.ts',
    plugins: [
      resolve(),
      esbuild( {
        experimentalBundling: true,
        minify              : false,
      } ),
      babel.getBabelOutputPlugin( {
        configFile: path.resolve( __dirname, '../.babelrc' ),
        allowAllFormats: true,
      } ),
      esbuild( { minify } ),
    ]
  } ).then( bundle => {
    return bundle.write( {
      banner,
      file     : `./dist/js/${ name }${ minify ? '.min' : '' }.js`,
      format   : 'umd',
      sourcemap: minify,
    } );
  } );
}

buildScript();

exports.buildJs  = () => buildScript();
exports.buildMin = () => buildScript( true );
