/* eslint-disable max-len */

// Sass configuration
const Gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const GulpIf = require('gulp-if');
const eslint = require('gulp-eslint-new');
const sassLint = require('gulp-sass-lint');
const autoprefixer = require('gulp-autoprefixer');
//const { argv } = require('yargs');	

// Declaring supported browsers
const AUTOPREFIXER_BROWSERS = [
	'ie >= 10',
	'ie_mob >= 10',
	'ff >= 30',
	'chrome >= 34',
	'safari >= 7',
	'opera >= 23',
	'ios >= 7',
	'android >= 4.4',
	'bb >= 10',
];

// autoprefixer
Gulp.task('styles', () => Gulp.src('*.scss')
	// Compile SASS files
	.pipe(
		sass({
			outputStyle: 'nested',
			precision: 10,
			includePaths: ['.'],
			onError: console.error.bind(console, 'Sass error:'),
		}),
	)
	// Auto-prefix css styles for cross browser compatibility
	.pipe(autoprefixer({ browsers: AUTOPREFIXER_BROWSERS }))
	// Minify the file
	//.pipe(csso())
	// Output
	.pipe(Gulp.dest('./dist/css')));
  
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

// takes the set of SCSS/Less files that have changed and runs them through compiler
Gulp.task('sass', () => Gulp.src('*.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(Gulp.dest((f) => f.base)));

// lint all scss files
Gulp.task('sass-lint', () => Gulp.src('*.scss')
	.pipe(sassLint({ configFile: 'config/.sass-lint.yml' }))
	.pipe(sassLint.format())
	.pipe(sassLint.failOnError()));

// watch for any scss changes 
Gulp.task('sass:watch', () => {
	Gulp.watch('*.scss', Gulp.series('sass'));
});
  
// run tasks then watch for changes to any SCSS/Less files
Gulp.task(
	'default',
	Gulp.series('sass-lint', 'sass', 'eslint', 'sass:watch'),
	//Gulp.series('sass-lint', 'eslint'),
);
