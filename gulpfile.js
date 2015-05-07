var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch'),
    babel = require("gulp-babel"),
    sass = require('gulp-sass'),
    minifyCSS = require('gulp-minify-css'),
    jslint = require('gulp-jslint'),
    rename = require('gulp-rename'),
    karma = require('gulp-karma'),
    testFiles = ['js/cet.min.js', 'spec/test.js'];

gulp.task('default', function() {

    gulp.src([
        'app/config/config.js',
        'app/components/table/createTable.js',
        'app/components/table/tableServices.js',
        'app/components/table/tableEffects.js',
        'app/components/table/listTableOptions.js',
        'app/components/table/plugins/graphs/tableGraphs.js',
        'app/components/table/plugins/downloads/tableDownloads.js',
        'app/components/table/plugins/searcher/tableSearcher.js'
    ])
        .pipe(concat('cet.min.js'))
        .pipe(babel())
        .pipe(uglify())
        .pipe(gulp.dest('js/'));

    gulp.src('styles/styles.scss')
        .pipe(sass())
        .pipe(minifyCSS({
            keepBreaks: true
        }))
        .pipe(rename('styles.min.css'))
        .pipe(gulp.dest('css'))

    gulp.src(testFiles)
        .pipe(karma({
            configFile: 'karma.conf.js',
            action: 'run'
        }))
        .on('error', function(err) {
            throw err;
        });
});


gulp.task('watch', function() {

    gulp.watch([
        'app/config/config.js',
        'app/components/table/createTable.js',
        'app/components/table/tableEffects.js',
        'app/components/table/tableServices.js',
        'app/components/table/listTableOptions.js',
        'app/components/table/plugins/graphs/tableGraphs.js',
        'app/components/table/plugins/downloads/tableDownloads.js',
        'app/components/table/plugins/searcher/tableSearcher.js',
        'spec/test.js'
    ], function() {
        gulp.start('default');
    });

    gulp.watch([
        'styles/styles.scss'
    ], function() {
        gulp.start('default');
    });
});
