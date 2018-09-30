/* ————————————————————————————————————————————————————————————————————————————
	"gulp" –– watch, process sass/js
	"gulp sync" –– stream sass, reload js/markup
	"gulp build" –– process sass/js
	"gulp prod" –– process sass/js and optimize, wo/ sass silent error
—————————————————————————————————————————————————————————————————————————————*/

const utils = require('./gulp.config')
const config = utils.config


const gulp = require('gulp')
const sass = require('gulp-sass')
const cssnano = require('cssnano')
const mqpacker = require('css-mqpacker')
const uglify = require('gulp-uglify')
const eslint = require('gulp-eslint')
const rename = require('gulp-rename')
const postcss = require('gulp-postcss')
const plumber = require('gulp-plumber')
const include = require('gulp-include');
const pxtorem = require('postcss-pxtorem')
const babel = require('rollup-plugin-babel')
const rollup = require('gulp-better-rollup')
const autoprefixer = require('autoprefixer')
const sourcemaps = require('gulp-sourcemaps')
const customMedia = require('postcss-custom-media')
const browserSync = require('browser-sync').create()
const cjsResolve = require('rollup-plugin-commonjs')
const nodeResolve = require('rollup-plugin-node-resolve')
const svgSprite	= require('gulp-svg-sprite')
const notifier = require('node-notifier')
const chalk = require('chalk')



/* html —————————————————————————————————————————————————————————————————————*/
gulp.task('html', () => {
	return gulp.src(config.views.src)
		.pipe(include())
		.pipe(gulp.dest(config.views.dest));
});

/* sass —————————————————————————————————————————————————————————————————————*/
gulp.task('sass:dev', () => {
	return gulp.src(config.sass.src)
		.pipe(plumber(utils.sassReporter))
		.pipe(sourcemaps.init())
		.pipe(sass(config.sass.options))
		.pipe(postcss([
//			pxtorem(),
			customMedia(),
			autoprefixer(config.sass.autoprefixer),
			mqpacker
		]))
		.pipe(sourcemaps.write())
		.pipe(rename({ dirname: '' }))
		.pipe(gulp.dest(config.sass.dest))
		.pipe(browserSync.stream({ match: '**/*.css' }))
})

gulp.task('sass:prod', () => {
	return gulp.src(config.sass.src)
		.pipe(sass(config.sass.options))
		.pipe(postcss([
//			pxtorem(),
			customMedia(),
			autoprefixer(config.sass.autoprefixer),
			mqpacker,		
			cssnano()
		]))
		.pipe(rename({ dirname: '' }))
		.pipe(gulp.dest(config.sass.dest))
})

/* js ———————————————————————————————————————————————————————————————————————*/
gulp.task('js:dev', () => {
	return gulp.src(config.js.src)
		.pipe(plumber(utils.jsReporter))
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint({ configFile: '.eslintrc' }))
		.pipe(rollup({
			plugins: [
				cjsResolve(),
				nodeResolve(),
				babel(config.js.babel)
			]
		}, 'iife'))
		.pipe(rename({ dirname: '' }))
		.pipe(gulp.dest(config.js.dest))
})

gulp.task('js:prod', () => {
	return gulp.src(config.js.src)
		.pipe(rollup({
			plugins: [
				cjsResolve(),
				nodeResolve(),
				babel(config.js.babel)
			]
		}, 'iife'))
		.pipe(uglify())
		.pipe(gulp.dest(config.js.dest))
})

/* svg sprite
---------------------------------------------------------------------*/


gulp.task('svgsprite', function() {
	return gulp.src('./img/icons/src/*.svg')
		.pipe(plumber())
		.pipe(svgSprite(config.svgsprite))
			.on('error', function(error){
				let title = 'SVG Sprite Error -> \n There is an error in your SVG source files (useless error message will follow)'
				console.log( chalk.bold(chalk.red(title)), '\n', error)
			})
		.pipe(gulp.dest('./img/icons/dest'));
});





/* Bootstrap 4 ———————————————————————————————————————————————————————————————————*/

//Sass

gulp.task('bs-sass', function() {
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest(config.sass.dest))
        .pipe(browserSync.stream());
});


//JS

// Move the javascript files into our /src/js folder
gulp.task('bs-js', function() {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/tether/dist/js/tether.min.js'])
        .pipe(gulp.dest(config.js.dest))
        .pipe(browserSync.stream());
});



/* builds ———————————————————————————————————————————————————————————————————*/
// gulp.task('dev', ['svgsprite', 'sass:dev', 'js:dev', 'html'])
gulp.task('dev', ['svgsprite', 'bs-sass','bs-js', 'sass:dev', 'js:dev', 'html'])
gulp.task('prod', ['svgsprite', 'sass:prod', 'js:prod', 'html'])

/* dev ——————————————————————————————————————————————————————————————————————*/
gulp.task('default', ['dev'], () => {
	gulp.watch(config.watch.views, ['html']);
	gulp.watch(config.watch.sass, ['sass:dev'])
	gulp.watch(config.watch.js, ['js:dev'])
})

/* browser sync —————————————————————————————————————————————————————————————*/
gulp.task('sync', ['default'], () => {
	browserSync.init(utils.bsConfig)
	gulp.watch(`${config.js.dest}/*.js`).on('change', browserSync.reload)
	gulp.watch(config.watch.views).on('change', browserSync.reload);
})



