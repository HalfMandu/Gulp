import Gulp from"gulp";import gulpSass from"gulp-sass";import mySass from"sass";import GulpIf from"gulp-if";import eslint from"gulp-eslint-new";import sassLint from"gulp-sass-lint";import autoprefixer from"gulp-autoprefixer";import uglify from"gulp-uglify";import pump from"pump";const sass=gulpSass(mySass),isFixed=(Gulp.task("sass-lint",()=>Gulp.src("*.scss").pipe(sassLint({configFile:"config/.sass-lint.yml"})).pipe(sassLint.format()).pipe(sassLint.failOnError())),Gulp.task("styles",()=>Gulp.src("*.scss").pipe(sass().on("error",sass.logError)).pipe(autoprefixer()).pipe(Gulp.dest(s=>s.base))),Gulp.task("eslint",()=>Gulp.src("*.js").pipe(eslint()).pipe(eslint.format()).pipe(eslint.failAfterError())),s=>null!==s.eslint&&s.eslint.fixed);Gulp.task("eslint-fix",()=>Gulp.src("*.js").pipe(eslint({fix:!0})).pipe(eslint.format()).pipe(GulpIf(isFixed,Gulp.dest("./"))).pipe(eslint.failAfterError())),Gulp.task("compress",s=>pump([Gulp.src("*.js"),uglify(),Gulp.dest("dist")],s)),Gulp.task("sass:watch",()=>{Gulp.watch("*.scss",Gulp.series("styles"))}),Gulp.task("default",Gulp.series("sass-lint","styles","eslint","compress","sass:watch"));