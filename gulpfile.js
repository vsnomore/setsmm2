const gulp        = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass')(require('sass'));
const rename = require("gulp-rename");
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "dist"
        }
    });
});

gulp.task('styles', function() {
    return gulp.src("src/scss/**/*.+(scss|sass)")
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(rename({
        prefix: "",
        suffix: ".min",
    }))
    .pipe(autoprefixer())
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
});

//my own addition to gulp.js

gulp.task('styles-css-only', function() {
    return gulp.src('src/css/**/*.css')
    .pipe(gulp.dest('dist/css'));
});

gulp.task('watch', function() {
    gulp.watch("src/scss/**/*.+(scss|sass|css)", gulp.parallel('styles'));
    gulp.watch("src/*.html", gulp.parallel('html'));
    gulp.watch("src/js/**/*.js", gulp.parallel('scripts'));
});

gulp.task('html', function() {
    return gulp.src('src/*.html')
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.stream());
});

gulp.task('scripts', function() {
    return gulp.src('src/js/**/*.js')
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream());
});

gulp.task('fonts', function() {
    return gulp.src('src/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('icons', function() {
    return gulp.src('src/icons/**/*')
    .pipe(gulp.dest('dist/icons'));
});

gulp.task('images', function() {
    return gulp.src('src/img/**/*')
    .pipe(gulp.dest('dist/img'));
});

gulp.task('default', gulp.parallel('browser-sync', 'styles', 'watch', 'html', 'scripts', 'fonts', 'icons', 'images', 'styles-css-only'));