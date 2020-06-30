const gulp = require('gulp')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const cleanCSS = require('gulp-clean-css')
const rename = require('gulp-rename')
const purgecss = require('gulp-purgecss')
const htmlmin = require('gulp-htmlmin')
const browserSync = require('browser-sync').create()

function css() {
    return gulp.src('./src/sass/*.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(rename(function (path) {
            path.extname = ".min.css"
        }))
        // .pipe(
        //     purgecss({
        //         content: ['public/**/*.html']
        //     })
        // )
        .pipe(gulp.dest('./public/assets/css/'))
        .pipe(browserSync.stream())
}

function html() {
    return gulp.src('./src/**/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('./public/'))
}

function img() {
    return gulp.src('./src/img/*')
        .pipe(gulp.dest('./public/img/'))
}

function serve() {
    browserSync.init({
        server: {
            baseDir: './public'
        }
    })
}

gulp.watch('./src/sass/**/*.sass', css)
gulp.watch('./src/*.html', html).on('change', browserSync.reload)

exports.default = gulp.parallel(html, css, serve, img)