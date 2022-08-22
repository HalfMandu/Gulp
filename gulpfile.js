/* eslint-disable max-len */

// Sass configuration
const Gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const GulpIf = require('gulp-if');
const eslint = require('gulp-eslint-new');
const sassLint = require('gulp-sass-lint');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const pump = require('pump');

// lint all scss files
Gulp.task('sass-lint', () => Gulp.src('*.scss')
	.pipe(sassLint({ configFile: 'config/.sass-lint.yml' }))
	.pipe(sassLint.format())
	.pipe(sassLint.failOnError()));

// compile to css and autoprefix styles for cross browser compatibility
Gulp.task('styles', () => Gulp.src('*.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(autoprefixer())
	.pipe(Gulp.dest((f) => f.base)));
  
// new lint and fix task 
Gulp.task('eslint', () => Gulp.src('*.js')
	.pipe(eslint())
	.pipe(eslint.format())
	.pipe(eslint.failAfterError())); // new function added to check if ESLint has run the fix 

// boolean check if file has passed as valid yet
const isFixed = (file) => file.eslint !== null && file.eslint.fixed;

// fix any fixable errors
Gulp.task('eslint-fix', () => Gulp.src('*.js')
	.pipe(eslint({ fix: true }))
	.pipe(eslint.format()) 	// if running fix - replace existing file with fixed one 
	.pipe(GulpIf(isFixed, Gulp.dest('./')))
	.pipe(eslint.failAfterError()));

// uglify the js
Gulp.task('compress', (cb) => pump(
	[
		Gulp.src('*.js'),
		uglify(),
		Gulp.dest('dist'),
	],
	cb,
));

// watch for any scss changes 
Gulp.task('sass:watch', () => {
	Gulp.watch('*.scss', Gulp.series('styles'));
});

////////////////////////////////////////////////////////////////////////////////

// run tasks then watch for changes to any SCSS/Less files
Gulp.task(
	'default',
	Gulp.series('sass-lint', 'styles', 'eslint', 'compress', 'sass:watch'),
);
