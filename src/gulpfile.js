/**
 * Created by chenjiajun on 2017/12/15.
 */
const gulp = require('gulp');

//转换Javascript

gulp.task('webpack', () => {
	const webpack = require('webpack-stream');
	const config = require('./webpack.config.js');
	gulp.src('./js/**/*.js')
		.pipe(webpack(config))
		.pipe(gulp.dest('../www/js'));
});

//翻译 less -> css

gulp.task('less', () => {
	const less = require('gulp-less');
	gulp.src('./less/*.less')
		.pipe(less())
		.pipe(gulp.dest('../www/css'));
});

gulp.task("watch", () => {
	gulp.watch("less/**/*.less",["less"]);
	gulp.watch("js/**/*.js",["webpack"]);
});

gulp.task('default', ['webpack', 'less']);