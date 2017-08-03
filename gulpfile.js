// Se importan librerias necesarias.
var gulp = require("gulp");
var sass = require("gulp-sass");
var browserSync = require("browser-sync").create();
var notify = require("gulp-notify");
var htmlImport = require("gulp-html-import");

//
var tap = require("gulp-tap");
var buffer = require("gulp-buffer");
var browserify = require("browserify");

// Para identificar errores de código.
var sourcemaps = require("gulp-sourcemaps");

// Para Minificar el código.
// Minificar CSS.
var postcss = require("gulp-postcss")
var autoprefixer =require("autoprefixer");
var cssnano = require("cssnano");
// Mini
var htmlMin = require("gulp-htmlmin");

var uglify = require("gulp-uglify");

// Sentencias WATCH.
gulp.watch(["src/scss/*.scss","src/scss/**/*.scss"],["sass"]);
gulp.watch(["src/html/*.html","src/html/**/*.html"],["html"]);
gulp.watch(["src/js/*.js","src/js/**/*.js"],["js"]);

// Default Task.
gulp.task("default",["sass", "html", "js", "img"], function() {
    browserSync.init({
        server: "dist/",
        browser: "google chrome"
    })
})

// Sass Task.
gulp.task("sass", function() {
    gulp.src("src/scss/style.scss")
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", function(error) {
        console.log("Se ha producido un error.")
    }))
    .pipe(postcss([
        autoprefixer(),
        cssnano()
    ]))
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest("dist/"))
    .pipe(browserSync.stream())
    .pipe(notify("CSS generado con exito."));
});

// HTML Task.
gulp.task("html", function() {
    gulp.src("src/html/*.html")
    .pipe(htmlImport("src/html/components/"))
    .pipe(htmlMin({collapseWhitespace: true}))
    .pipe(gulp.dest("dist/"))
    .pipe(browserSync.stream())
    .pipe(notify("HTML generado con exito."));
})

// JS Task.
gulp.task("js", function() {
    gulp.src("src/js/main.js")
    /*
     */
    .pipe(tap(function(file) {
        file.contents = browserify(file.path, {debug: true})
                        // Para hacer el código ES6 compatible con ES5.
                        .transform("babelify", {presets: ["es2015"]})
                        .bundle().on("error", function(error) {
                            return notify().write(error);
                        })
    }))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify())
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest("dist/"))
    .pipe(browserSync.stream())
    .pipe(notify("JS generado con exito."))
});

// Images Task.
gulp.task("img", function() {
    gulp.src("src/img/*")
    .pipe(gulp.dest("dist/"))
    .pipe(browserSync.stream())
    .pipe(notify("Imagenes cargadas con exito."))
});