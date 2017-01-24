var gulp = require('gulp'),
	  sass = require('gulp-sass'),
	  maps = require('gulp-sourcemaps'),
	  concat = require('gulp-concat-css')
	  clean = require('gulp-clean-css')
	  rename = require('gulp-rename')
	  del = require('gulp-clean-old');

gulp.task('sass', () => {
	return gulp.src('scss/style.scss')
				     .pipe(maps.init())
				     .pipe(sass())
				     .pipe(maps.write('./'))
				     .pipe(gulp.dest('css'))
});

gulp.task('minifyCss', ['compileCss'], () => {
	return gulp.src('css/styles.css')
						 .pipe(clean())
						 .pipe(rename('styles.min.css'))
						 .pipe(gulp.dest('css'))
});

gulp.task('concatCss', ['sass'], () => {
	return gulp.src('css/**/*.css')
						 .pipe(concat('styles.css'))
						 .pipe(gulp.dest('css'))
});

gulp.task('clean', () => {
	del(['css/style.css', 'css/style.css.map'])
})

gulp.task('watch', () => {
	gulp.watch('scss/**/*.scss', ['sass'])
});

gulp.task('production', ['minifyCss']);