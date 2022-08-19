##########################################################################################	
# Gulp

# libs:

#	gulp
#	eslint
#	gulp-eslint
#	eslint-config-airbnb
#	eslint-plugin-import
#	gulp-if
#	gulp-sass
#	gulp-less
#   gulp-sass-lint

# others:

	# gulp-minify 
	# gulp-uglify 
	# gulp-htmlhint 
	# gulp-util - Set of useful utilities.
	# gulp-uncss - Remove unused CSS selectors with UnCSS.
	# gulp-check-unused-css - Check your HTML templates for unused CSS classes.
	# autoprefixer - Parse CSS and add vendor prefixes to rules by Can I Use.
	# browser-sync - Keep multiple browsers & devices in sync when building websites (recipes).
	# gulp-livereload - Gulp plugin for livereload.
	# gulp-changed - Only pass through changed files.
	# gulp-cached - A simple in-memory file cache.
	# gulp-notify - Notification plugin for gulp.
	# gulp-beer - Better Error Reporting with interactive system notifications and custom server for error displaying.
	# gulp-<mocha/jasmine/karma/protractor/etc>- Run tests.
	# gulp-git - Run Git commands with gulp.
	
npm init --yes

npm install gulp gulp-eslint eslint-config-airbnb eslint eslint-plugin-import gulp-if gulp gulp-sass gulp-less gulp-sass-lint --save-dev

eslint --init	# creates .eslintrc.json file

# Create tasks.json
#	Terminal -> Configure tasks -> create tasks.json
	
# update ESLint configuration file, which will tell our linting process the rules
#	JSON file named .eslintrc in the root of our user folder
	
# create gulpfile.js and add gulp task(s) 
#	e.g. gulp.task('eslint'...), gulp.task('eslint-fix'...), etc...
	
##########################################################################################	
# Helpful commands

gulp --tasks 

eslint .\index.js  
eslint .\index.js  --fix

	
	
	
	
	
	
	
	
	
	
	