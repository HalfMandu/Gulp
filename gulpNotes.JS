https://medium.com/devux/minifying-your-css-js-html-files-using-gulp-2113d7fcbd16
	
//////////////////////////////////////
	
Gulp Libs

	//demo'd in a project 

		gulp
		eslint					//linting JS
		gulp-eslint				//gulp connector to eslint to allow Gulp to run lint tasks
		eslint-config-airbnb	//or, Google...
		eslint-plugin-import
		gulp-if
		gulp-sass
		gulp-less
		gulp-sass-lint
	
	//others I haven't tried yet 
	
		autoprefixer 	 // Parse CSS and add vendor prefixes to rules by Can I Use.
		gulp-uglify 	 // also minifies code (which types?) ...except this uglifies and obfuscates it too
		gulp-minify 	 // minify code, but also might still uglify() ? ...
		gulp-htmlmin	 // html minfiying...needed, or what does html?
		gulp-load-plugins 
			-Rather than have to specify each plugin, gulp-load-plugins will search your packages.json file and automatically include them
		gulp-cache 	
			-A temp file based caching proxy task for gulp.
			-saving the package data and reuse it when you install the same package again
		gulp-htmlhint 
		gulp-util 		 //Set of useful utilities.
		gulp-uncss 	 	 // Remove unused CSS selectors with UnCSS.
		gulp-check-unused-css // Check your HTML templates for unused CSS classes.
		gulp-livereload  // Gulp plugin for livereload.
		gulp-changed 	 // Only pass through changed files.
		gulp-cached 	 // A simple in-memory file cache.
		gulp-notify 	 // Notification plugin for gulp.
		gulp-beer 	 	 
			-Better Error Reporting with interactive system notifications and custom server for error displaying.
		gulp-<mocha/jasmine/karma/protractor/etc>// Run tests.
		gulp-git 		 // Run Git commands with gulp.
		browser-sync 	 // Keep multiple browsers & devices in sync when building websites (recipes).

	//Minifying vs Uglifying 
	
		-Minifying JavaScript not only makes the source smaller
			-it also makes the code less readable, or obfuscates it.
		-With JS it is possible to not only remove whitespace, but also to make transformations to the code 
			-such as truncating variable names to single characters
				-CSS minification involves only removing whitespace - the original code remains intact.
		-Minifying is just removing unnecessary white-space and redundant like comments and semicolons. 
			-And it can be reversed back when needed.
		-Uglifying is transforming the code into an "unreadable" form by changing variable names, function names, etc, to hide the original content. 
			-Once it is used there's no way to reverse it back.
			
		-UglifyJS 
			-does minification when used, by removing unnecessary parts. 
				-But in general Uglifying is making the code unreadable.
			-*security*
				-"It can be copied by someone, but it won't be in a readable format"
					-obfuscation
						-e.g. variable or function names become single letters
						-If the JS file size is too big, it's nearly impossible to understand it unless the entire code is re-written
						
		-Minifying your code speeds up your page loading
			-making visitors and search engines happy 
			-Reduced file-size 
			-also readable. 
			-Most major browsers minify the code before execution. 	//true??
			
		-Neither minifying nor obfuscating alter the execution time by any perceivable amount
		-use cases
			-Minifying multiple scripts together (like jQuery and its plugins) 
			-very large codebases minifying could yield a noticeable result.

