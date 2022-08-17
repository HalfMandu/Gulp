/* 
1. Our default gulp task first runs the sass or less task once when it starts up.
2. It then watches for changes to any SCSS/Less file at the root of our workspace, for example the current folder open in VS Code.
3. It takes the set of SCSS/Less files that have changed and runs them through our respective compiler, 
    for example gulp-sass, gulp-less.
4. We now have a set of CSS files, each named respectively after their original SCSS/Less file. 
    We then put these files in the same directory.
*/

// Sass configuration
var gulp = require('gulp');
var sass = require('gulp-sass')(require('sass'));

// requireTasks({
//     passGulp: true,
//     gulp: gulp
// }); 

//dummy 
gulp.task("myTask", function () {
    console.log("Hello Gulp!");
    return new Promise(function (resolve, reject) {
        console.log("HTTP Server Started");
        resolve();
    });
});

//takes the set of SCSS/Less files that have changed and runs them through our respective compiler
gulp.task('sass', function(cb) {
  gulp
    .src('*.scss')
    .pipe(sass())
    .pipe(
      gulp.dest(function(f) {
        return f.base;
      })
    );
  cb();
});

//run sass then watches for changes to any SCSS/Less file at the root of our workspace
gulp.task(
  'default',
  gulp.series('sass', function(cb) {
    gulp.watch('*.scss', gulp.series('sass'));
    cb();
  })
); 
