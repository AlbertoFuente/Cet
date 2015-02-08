
var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch');

gulp.task('default', function () {

    gulp.src([
        'app/components/table/createTable.js',
        'app/components/table/tableEffects.js',
        'app/components/table/tableEvents'
    ])
        .pipe(concat('cet.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('js/'))
});

gulp.task('watch', function () {

    gulp.watch([
        'app/components/table/createTable.js',
        'app/components/table/tableEffects.js',
        'app/components/table/tableEvents'
    ], function() {
        gulp.start('default');
    });

});

