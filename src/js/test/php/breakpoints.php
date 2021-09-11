<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width,initial-scale=1">
	<title>Grid</title>

  <link rel="stylesheet" href="../../../../node_modules/@splidejs/splide/dist/css/themes/splide-default.min.css">

	<script type="text/javascript" src="../../../../node_modules/@splidejs/splide/dist/js/splide.js"></script>
  <script type="text/javascript" src="../../../../dist/js/splide-extension-grid.js"></script>

	<script>
		document.addEventListener( 'DOMContentLoaded', function () {
			var splide01 = new Splide( '#splide01', {
        height: 300,
        grid  : false,

        breakpoints: {
          1100: {
            grid: {
              rows: 2,
              cols: 2,
              gap : {
                row: '1rem',
                col: '1rem',
              }
            },
          },
          1000: {
            grid: false,
          },
          900: {
            grid: {
              dimensions: [ [ 2, 1 ], [ 2, 2 ], [ 2, 1 ], [ 2, 2 ] ],
            },
          },
          800: {
            grid: {
              rows: 2,
              cols: 2,
              dimensions: [],
            },
          },
          700: {
            destroy: true,
          },
        }
			} );

			splide01.mount( window.splide.Extensions );

      var splide02 = new Splide( '#splide02', {
        type  : 'loop',
        height: 300,
        grid  : false,

        breakpoints: {
          1100: {
            grid: {
              rows: 2,
              cols: 2,
              gap : {
                row: '1rem',
                col: '1rem',
              }
            },
          },
          1000: {
            grid: false,
          },
          900: {
            grid: {
              dimensions: [ [ 2, 1 ], [ 2, 2 ] ],
            },
          },
        },
      } );

      splide02.mount( window.splide.Extensions );
		} );
	</script>

  <style>
    .splide__slide {
      font-size: 3rem;
    }

    .splide__page.is-active {
      background: deepskyblue;
    }

    .splide__slide--col {
      border: 2px solid deepskyblue;
    }
  </style>
</head>
<body>

<div id="splide01" class="splide">
	<div class="splide__track">
		<ul class="splide__list">
      <?php
      for ( $i = 0; $i < 10; $i ++ ) {
        echo '<li class="splide__slide">';
        echo $i + 1;
        echo '</li>' . PHP_EOL;
      }
      echo '</ul>';
      ?>
		</ul>
	</div>
</div>

<div id="splide02" class="splide">
  <div class="splide__track">
    <ul class="splide__list">
      <?php
      for ( $i = 0; $i < 10; $i ++ ) {
        echo '<li class="splide__slide">';
        echo $i + 1;
        echo '</li>' . PHP_EOL;
      }
      echo '</ul>';
      ?>
    </ul>
  </div>
</div>

</body>
</html>
