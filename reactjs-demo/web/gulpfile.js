var gulp = require('gulp'),
	connect = require('gulp-connect'),
    proxy = require('http-proxy-middleware'),
    minimist = require('minimist'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    bebelify = require('babelify');


// External dependencies you do not want to rebundle while developing,
// but include in your application deployment
var dependencies = [
	'react',
  	'react-dom'
];

gulp.task('scripts', function () {
    bundleApp(false);
});


// Private Functions
// ----------------------------------------------------------------------------
function bundleApp(isProduction) {
	// Browserify will bundle all our js files together in to one and will let
	// us use modules in the front end.
	var appBundler = browserify({
    	entries: './app/src/js/app.js',
    	debug: true
  	})


  	appBundler
  		// transform ES6 and JSX to ES5 with babelify
	  	.transform("babelify", {presets: ["es2015", "react"]})
	    .bundle()
	    .on('error',function(err){ console.error(err.message)})
	    .pipe(source('bundle.js'))
	    .pipe(gulp.dest('./app/dist/js'));
}

var defaultOptions = {
    default: {
        serverUrl: 'http://127.0.0.1:8081',
        connectPort: 8000,
        app: 'app/',
        output: 'app/',
    }
};

var options = minimist(process.argv.slice(2), defaultOptions);

gulp.task('watch', function() {
	gulp.watch([options.app + '/dist/js/**/*.js', options.app + 'styles/**/*.css', options.app + 'views/**/*.html', options.app + 'index.html'], ['reload']);
});

gulp.task('watch-scripts', ['scripts'], function(){
	gulp.watch(options.app + './dist/js/**/*.js', ['scripts']);
});

gulp.task('reload', function() {
	gulp.src(options.app + '**')
		.pipe(connect.reload());
});

gulp.task('default', ['connect', 'watch-scripts']);

gulp.task('serve', ['watch', 'connect']);

gulp.task('connect', function() {
  connect.server({
    root: ['.'],
    livereload: true,
    port: options.connectPort,
    middleware: function(conn, opt) {
        return [
            proxy('!/app/**', {
                target: options.serverUrl,
                changeOrigin : false,
                ws: true
            })
        ];
    }
  });
});
