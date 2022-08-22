/* eslint-disable max-len */

// Sass configuration
import Gulp from 'gulp';
import gulpSass from 'gulp-sass';
import Sass from 'sass';
import GulpIf from 'gulp-if';
import eslint from 'gulp-eslint-new';
import sassLint from 'gulp-sass-lint';
import autoprefixer from 'gulp-autoprefixer';
import uglify from 'gulp-uglify';
import pump from 'pump';
import htmlmin from 'gulp-htmlmin';
import htmlhint from 'gulp-htmlhint';

const sass = gulpSass(Sass);

// lint + minify HTML
Gulp.task('html', () => Gulp.src('*.html')
	.pipe(htmlhint())
	.pipe(htmlmin({ collapseWhitespace: true }))
	.pipe(Gulp.dest('dist')));

// lint scss
Gulp.task('sass-lint', () => Gulp.src('*.scss')
	.pipe(sassLint({ configFile: 'config/.sass-lint.yml' }))
	.pipe(sassLint.format())
	.pipe(sassLint.failOnError()));

// compile to css and autoprefix styles for cross browser compatibility
Gulp.task('styles', () => Gulp.src('*.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(autoprefixer())
	.pipe(Gulp.dest((f) => f.base)));
  
// lint js 
Gulp.task('eslint', () => Gulp.src('*.js')
	.pipe(eslint())
	.pipe(eslint.format())
	.pipe(eslint.failAfterError())); // new function added to check if ESLint has run the fix 

// boolean check if file has passed as valid yet
const isFixed = (file) => file.eslint !== null && file.eslint.fixed;

// fix any fixable js errors
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
// Default 

// run tasks then watch for changes to any SCSS/Less files
Gulp.task(
	'default',
	Gulp.series('html', 'sass-lint', 'styles', 'eslint', 'compress', 'sass:watch'),
);
