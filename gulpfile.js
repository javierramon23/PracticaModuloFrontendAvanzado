// Se importan librerias necesarias.
var gulp = require("gulp");
var sass = require("gulp-sass");
var browserSync = require("browser-sync").create();
var notify = require("gulp-notify");
var htmlImport = require("gulp-html-import");

// Sentencias WATCH.
gulp.watch(["src/scss/*.scss","src/scss/**/*.scss"],["sass"]);
gulp.watch(["src/html/*.html","src/html/**/*.html"],["html"]);
gulp.watch(["src/js/*.js","src/js/**/*.js"],["js"]);

// Default Task.
gulp.task("default",["sass", "html", "js"], function() {
    browserSync.init({
        server: "dist/",
        browser: "google chrome"
    })
})

// Sass Task.
gulp.task("sass", function() {
    gulp.src("src/scss/style.scss")
    .pipe(sass().on("error", function(error) {
        console.log("Se ha producido un error.")
    }))
    .pipe(gulp.dest("dist/"))
    .pipe(browserSync.stream())
    .pipe(notify("CSS generado con exito."));
});

// HTML Task.
gulp.task("html", function() {
    gulp.src("src/html/*.html")
    .pipe(htmlImport("src/html/components/"))
    .pipe(gulp.dest("dist/"))
    .pipe(browserSync.stream())
    .pipe(notify("HTML generado con exito."));
})

// JS Task.
gulp.task("js", function() {
    gulp.src("src/js/main.js")
    .pipe(gulp.dest("dist/"))
    .pipe(browserSync.stream())
    .pipe(notify("JS generado con exito."))
});