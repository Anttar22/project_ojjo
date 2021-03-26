const { reload } = require('browser-sync')

const { src, dest, watch, series, parallel } = require('gulp'),
    browserSync = require('browser-sync').create(),
    sass = require('gulp-sass'),
    mediaGroup = require('gulp-group-css-media-queries');

function browser() {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        port: 8000,
        notify: false
    })
}

function css() {
    return src('./scss/style.scss')
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(mediaGroup())
        .pipe(dest('./css'))
        .pipe(browserSync.stream())
}

function watcher() {
    watch('./scss/**/*.scss', css)
    watch('./index.html').on('change', browserSync.reload)
}

exports.default = parallel(browser, css, watcher)
