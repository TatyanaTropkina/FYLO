const { src, dest, watch, series} = require('gulp'),
  sass = require('gulp-sass')(require('sass')),
  postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer'),
  cssnano = require('cssnano'),
  babel = require('gulp-babel'),
  terser = require('gulp-terser'),
  browsersync = require('browser-sync').create();


// Use dart-sass for @use
sass.compiler = require('dart-sass')

// Sass Task
function scssTask() {
  return src('src/scss/main.scss', { sourcemaps: true })
    .pipe(sass())
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(dest('dist/css', { sourcemaps: '.' }))
	.pipe(browsersync.stream())
}

// JavaScript Task
function jsTask() {
	return src('src/js/script.js', { sourcemaps: true })
    .pipe(babel({ presets: ['@babel/preset-env'] }))
    .pipe(terser())
    .pipe(dest('dist/js', { sourcemaps: '.' }))
	.pipe(browsersync.stream())
}
// html Task
function htmlTask() {
	return src('src/*.html')
	.pipe(dest('dist/'))
	.pipe(browsersync.stream())
}
// Images Task
function imagesTask() {
	return src('src/images/*.*')
	.pipe(dest('dist/images'))
	.pipe(browsersync.stream())
}
function browserSyncServe(cb) {
	browsersync.init({
	server: {
		baseDir: './dist/',
	},
	notify: {
		styles: {
		  top: 'auto',
		  bottom: '0',
		},
	  },
	})
  cb()
}
function browserSyncReload(cb) {
  browsersync.reload()
  cb()
}

// Watch Task
function watchTask() {
  watch('src/*.html', htmlTask, browserSyncReload)
  watch(['src/scss/**/*.scss', 'src/**/*.js', 'src/**/*.png', 'src/**/*.jpg'], series(scssTask, jsTask, imagesTask, browserSyncReload))
}

// Default Gulp Task
exports.default = series(imagesTask, scssTask, jsTask, htmlTask, browserSyncServe, watchTask)

// Build Gulp Task
exports.build = series(scssTask, jsTask, htmlTask, imagesTask)