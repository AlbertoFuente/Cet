var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch'),
    babel = require("gulp-babel"),
    sass = require('gulp-sass'),
    minifyCSS = require('gulp-minify-css'),
    jslint = require('gulp-jslint'),
    rename = require('gulp-rename');

gulp.task('default', function () {

    gulp.src([
        'app/components/table/plugins/downloads/tableDownloads.js',
        'app/components/table/plugins/graphs/tableGraphs.js',
        'app/components/table/listTableOptions.js',
        'app/components/table/tableServices.js',
        'app/components/table/tableEffects.js',
        'app/components/table/createTable.js'
    ])
        .pipe(concat('cet.min.js'))
        .pipe(babel())
        /*.pipe(jslint({
            node: true,
            evil: true,
            nomen: true,
            vars: true,
            global: [],
            predef: [],
            reporter: 'default',
            errorsOnly: false
        }))*/
        /*.on('error', function (error) {
            console.error(String(error));
        })*/
        .pipe(uglify())
        .pipe(gulp.dest('js/'))
});

gulp.task('sass', function () {
    gulp.src('styles/styles.scss')
        .pipe(sass())
        .pipe(minifyCSS({keepBreaks:true}))
        .pipe(rename('styles.min.css'))
        .pipe(gulp.dest('css'))
});

gulp.task('watch', function () {

    gulp.watch([
        'app/components/table/createTable.js',
        'app/components/table/tableEffects.js',
        'app/components/table/tableServices.js',
        'app/components/table/listTableOptions.js',
        'app/components/table/plugins/graphs/tableGraphs.js',
        'app/components/table/plugins/downloads/tableDownloads.js'
    ], function() {
        gulp.start('default');
    });

    gulp.watch([
        'styles/styles.scss'
    ], function() {
        gulp.start('sass');
    });
});