/* eslint-disable max-len */
/*
1. default gulp task first runs the sass or less task once when it starts up.
2. It then watches for changes to any SCSS/Less file at the root of our workspace, for example the current folder open in VS Code.
3. It takes the set of SCSS/Less files that have changed and runs them through our respective compiler,
    for example gulp-sass, gulp-less.
4. We now have a set of CSS files, each named respectively after their original SCSS/Less file.
    We then put these files in the same directory.
*/

// Sass configuration
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const gulpIf = require('gulp-if');
const eslint = require('gulp-eslint-new');
//const eslint = require('gulp-eslint');
//const { argv } = require('yargs');

// new lint and fix task 
gulp.task('eslint', () => gulp.src('./index.js')
	.pipe(eslint())
	.pipe(eslint.format())
	.pipe(eslint.failAfterError())); // new function added to check if ESLint has run the fix 

function isFixed(file){
	return file.eslint !== null && file.eslint.fixed;
}

gulp.task('eslint-fix', () => gulp.src('./index.js')
	.pipe(eslint({ fix: true }))
	.pipe(eslint.format()) 	// if running fix - replace existing file with fixed one 
	.pipe(gulpIf(isFixed, gulp.dest('./')))
	.pipe(eslint.failAfterError()));

// takes the set of SCSS/Less files that have changed and runs them through our respective compiler
gulp.task('mySass', (cb) => {
	gulp
		.src('*.scss')
		.pipe(sass())
		.pipe(
			gulp.dest((f) => f.base),
		);
	cb();
});
    
// run sass then watches for changes to any SCSS/Less file at the root of our workspace
gulp.task(
	'default',
	gulp.series('mySass', 'eslint', (cb) => {
		gulp.watch('*.scss', gulp.series('mySass'));
		cb();
	}),
);
