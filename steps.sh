##########################################################################################	
# Steps

# libs:
#	gulp
#	eslint
#	gulp-eslint
#	airbnb config
#	gulp-if
#	gulp-sass
#	gulp-less

	# gulp-csslint
	# gulp-sass-lint
	
npm init --yes

npm install gulp-sass-lint --save-dev

npm install gulp gulp-eslint eslint-config-airbnb eslint eslint-plugin-import gulp-if gulp gulp-sass gulp-less --save-dev

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




	
	
	
	
	
	
	
	