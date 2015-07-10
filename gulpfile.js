var gulp = require('gulp');
var gutil = require('gulp-util');
var ngDocs = require('gulp-ngdocs');
var httpServer = require('http-server');
var spawn = require('child_process').spawn;

gulp.task('docs', function(done) {
  return gulp.src('src/**/*.js')
    .pipe(ngDocs.process({
      scripts : [
        __dirname + '/node_modules/babel-core/browser.js',
        __dirname + '/es6Eval.js',
        __dirname + '/out/mm-on-enter-viewport.bundle.js'
      ],
      html5Mode : false //html5 mode makes the web server a lot more complicated
    }))
    .pipe(gulp.dest('docs'));
});

gulp.task('live-docs', ['docs'], function() {
  //We watch out here such that the compilation can finish before the docs are updated
  gulp.watch('out/**/*.js', ['docs']);
  httpServer.createServer({
    root : './docs'
  })
  .listen(8080, function() {
    gutil.log("Docs are live at http://localhost:8080");
  });
  spawn('webpack', ['--progress', '--colors', '--watch'], { stdio : 'inherit' });
});
