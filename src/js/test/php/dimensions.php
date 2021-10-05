<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width,initial-scale=1">
	<title>Dimensions</title>

  <link rel="stylesheet" href="../../../../node_modules/@splidejs/splide/dist/css/themes/splide-default.min.css">

	<script type="text/javascript" src="../../../../node_modules/@splidejs/splide/dist/js/splide.js"></script>
  <script type="text/javascript" src="../../../../dist/js/splide-extension-grid.js"></script>

	<script>
		document.addEventListener( 'DOMContentLoaded', function () {
			var splide = new Splide( '#splide01', {
        type   : 'loop',
        cover  : true,
        height : '20rem',
        gap    : '1em',
        perPage: 2,
        grid: {
          dimensions: [ [ 2, 2 ], [ 2, 1 ], [ 1, 2 ], [ 2, 2 ], [ 3, 2 ] ],
          gap : {
            row: '0.5rem',
            col: '0.5rem',
          }
        },
			} );

			splide.mount( window.splide.Extensions );
		} );
	</script>
</head>
<body>

<div id="splide01" class="splide">
	<div class="splide__track">
		<ul class="splide__list">
      <?php
      for ( $i = 0; $i < 20; $i ++ ) {
        echo '<li class="splide__slide">';
        printf( '<img src="../assets/images/pics/slide%02d.jpg">', $i + 1 );
        echo '</li>' . PHP_EOL;
      }
      echo '</ul>';
      ?>
		</ul>
	</div>
</div>

</body>
</html>
