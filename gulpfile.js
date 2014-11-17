'use strict';
// generated on 2014-10-31 using generator-gulp-webapp 0.1.0

var gulp = require('gulp');

// load plugins
var $ = require('gulp-load-plugins')();
var compass = require('gulp-compass');
var minifyCSS = require('gulp-minify-css');
var sass = require('gulp-ruby-sass');
var plumber = require('gulp-plumber');
var karma = require('gulp-karma');


gulp.task('views', function () {
    return gulp.src(['app/*.jade', '!app/layout.jade'])
        .pipe(plumber())
        .pipe($.jade({pretty: true}))
        .pipe(gulp.dest('.tmp'));
});

gulp.task('styles', function() {
  gulp.src('app/styles/main.scss')
    .pipe(plumber())
    .pipe(compass({
      css: '.tmp/styles',
      sass: 'app/styles',
      image: 'app/images'
    }))
    .pipe(gulp.dest('.tmp/styles'));
});

gulp.task('scripts', function () {
    return gulp.src(['app/components/**/*.coffee','app/scripts/*.coffee'])
        .pipe(plumber())
        .pipe($.coffee({bare: true}))
        .pipe(gulp.dest('.tmp/scripts'));
});

gulp.task('html', ['views', 'styles', 'scripts'], function () {
    var jsFilter = $.filter('**/*.js');
    var cssFilter = $.filter('**/*.css');

	//return gulp.src('app/*.html')
    return gulp.src('.tmp/*.html')
		.pipe(plumber())
        .pipe($.useref.assets({searchPath: '{.tmp,app}'}))
        .pipe(jsFilter)
        .pipe($.uglify())
        .pipe(jsFilter.restore())
        .pipe(cssFilter)
        .pipe($.csso())
        .pipe(cssFilter.restore())
        .pipe($.useref.restore())
        .pipe($.useref())
        .pipe(gulp.dest('dist'))
        .pipe($.size());
});

gulp.task('images', function () {
    return gulp.src('app/images/**/*')
        .pipe(plumber())
        .pipe($.imagemin({
            optimizationLevel: 4,
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest('dist/images'))
        .pipe($.size());
});

gulp.task('fonts', function () {
    return $.bowerFiles()
        .pipe(plumber())
        .pipe($.filter('**/*.{eot,svg,ttf,woff}'))
        .pipe($.flatten())
        .pipe(gulp.dest('dist/fonts'))
        .pipe($.size());
});

gulp.task('extras', function () {
    return gulp.src(['app/*.*', '!app/*.jade'], { dot: true })
        .pipe(plumber())
        .pipe(gulp.dest('dist'));
});

gulp.task('clean', function () {
    return gulp.src(['.tmp', 'dist'], { read: false }).pipe($.clean());
});

var testFiles = [
   'test/spec/*.js'
];

gulp.task('test', function() {
   // Be sure to return the stream
   return gulp.src(testFiles)

       .pipe(karma({
          configFile: 'karma.conf.js',
          action: 'watch'
       }))
       .pipe(plumber())
       .on('error', function(err) {
          // Make sure failed tests cause gulp to exit non-zero
          throw err;
       });
});

gulp.task('build', ['html', 'images', 'fonts', 'extras']);

gulp.task('default', ['clean'], function () {
    gulp.start('build');
   gulp.src(testFiles)
       .pipe(karma({
          configFile: 'karma.conf.js',
          action: 'watch'
       }));
});

gulp.task('connect', function () {
    var connect = require('connect');
    var app = connect()
        .use(require('connect-livereload')({ port: 35729 }))
		.use(connect.static('app'))
        .use(connect.static('.tmp'))
        .use(connect.directory('app'));

    require('http').createServer(app)
        .listen(9000)
        .on('listening', function () {
            console.log('Started connect web server on http://localhost:9000');
        });
});

gulp.task('serve', ['connect', 'views', 'styles', 'scripts'], function () {
    require('opn')('http://localhost:9000');
});

// inject bower components
gulp.task('wiredep', function () {
    var wiredep = require('wiredep').stream;

    gulp.src('app/styles/*.scss')
        .pipe(plumber())
        .pipe(wiredep({
            directory: 'app/bower_components'
        }))
        .pipe(gulp.dest('app/styles'));

	//gulp.src('app/*.html')
    gulp.src('app/*.jade')
        .pipe(plumber())
        .pipe(wiredep({
            directory: 'app/bower_components',
            exclude: ['bootstrap-sass-official']
        }))
        .pipe(gulp.dest('app'));
});

gulp.task('watch', ['connect', 'serve'], function () {
    var server = $.livereload();

    // watch for changes
    gulp.watch([
        '.tmp/*.html',
        '.tmp/styles/**/*.css',
        '{.tmp,app}/scripts/**/*.js',
        'app/images/**/*'
    ]).on('change', function (file) {
        server.changed(file.path);
    });

	 gulp.watch('app/**/*.jade', ['views']);
    gulp.watch('app/**/*.scss', ['styles']);
    gulp.watch('app/**/*.coffee', ['scripts']);
    gulp.watch('app/images/**/*', ['images']);
    gulp.watch('bower.json', ['wiredep']);
});
