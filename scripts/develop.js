const watch = require( 'glob-watcher' );
const { buildJs } = require( './build-script' );

watch( [ './src/js/**/*.ts', '!*.test.ts' ], async () => {
  console.log( '[Starting] buildJS' );
  await buildJs();
  console.log( '[Finished] buildJs' );
} );
