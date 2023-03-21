'use strict';

const gulp = require('gulp');
const less = require('gulp-less');

const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');

gulp.task('less', function () {
    return gulp.src('./src/styles/styles.styl')
        .pipe(less())
        .pipe(cssmin()) // минификация файла
        .pipe(rename({suffix: '.min'})) // добавление суффикса min в название css-файла
        .pipe(gulp.dest('./dist/css'));
});

// отслеживание изменений

gulp.task('watch', function () {
    gulp.watch('./src/styles/styles.styl', gulp.series('less'));
});
