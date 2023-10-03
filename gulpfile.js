const gulp = require("gulp");
const webpack = require("webpack-stream");
const sass = require("gulp-sass")(require("sass"));
// const autoprefixer = require('autoprefixer');
// const cleanCSS = require('gulp-clean-css');
// const postcss = require('gulp-postcss');
const browsersync = require("browser-sync");

const htmlmin = require("gulp-htmlmin");

gulp.task("minify-html", function () {
  gulp
    .src("./src/index.html")
    .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
    .pipe(gulp.dest(dist))
    .pipe(browsersync.stream());
});

const dist = "./dist";
gulp.task("copy-html", function () {
  return gulp
    .src("./src/index.html")
    .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
    .pipe(gulp.dest(dist))
    .pipe(browsersync.stream());
});

gulp.task("copy-ico", () => {
  return gulp.src("./src/favicon.ico").pipe(gulp.dest(dist));
});

gulp.task("build-js", () => {
  return gulp
    .src("./src/js/index.js")
    .pipe(
      webpack({
        mode: "development",
        output: {
          filename: "bundle.js",
        },
        watch: false,
        devtool: "source-map",
        module: {
          rules: [
            {
              test: /\.m?js$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                loader: "babel-loader",
                options: {
                  presets: [
                    [
                      "@babel/preset-env",
                      {
                        debug: true,
                        corejs: 3,
                        useBuiltIns: "usage",
                      },
                    ],
                  ],
                },
              },
            },
          ],
        },
      })
    )
    .pipe(gulp.dest(dist + "/js"))
    .pipe(browsersync.stream());
});

gulp.task("build-sass", () => {
  return gulp
    .src("./src/scss/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest(dist + "/css"))
    .pipe(browsersync.stream());
});

gulp.task("copy-assets", () => {
  gulp.src("./src/imgs/**/*.*").pipe(gulp.dest(dist + "/imgs"));
  return gulp
    .src("./src/imgs/**/*.*")
    .pipe(gulp.dest(dist + "/imgs"))
    .pipe(browsersync.stream());
});

gulp.task("watch", () => {
  browsersync.init({
    server: "./dist/",
    port: 4000,
    notify: true,
  });

  gulp.watch("./src/imgs/**/*.*", gulp.parallel("copy-assets"));
  gulp.watch("./src/scss/**/*.scss", gulp.parallel("build-sass"));
  gulp.watch("./src/js/**/*.js", gulp.parallel("build-js"));
  gulp.watch("./src/favicon.ico", gulp.parallel("copy-ico"));
  gulp.watch("./src/index.html", gulp.parallel("copy-html"));
});

gulp.task(
  "build",
  gulp.parallel(
    "copy-html",
    "copy-ico",
    "copy-assets",
    "build-sass",
    "build-js"
  )
);

gulp.task("prod", () => {
  gulp.src("./src/index.html").pipe(gulp.dest(dist));
  gulp.src("./src/img/**/*.*").pipe(gulp.dest(dist + "/img"));
  gulp.src("./src/icons/**/*.*").pipe(gulp.dest(dist + "/icons"));

  gulp
    .src("./src/js/index.js")
    .pipe(
      webpack({
        mode: "production",
        output: {
          filename: "bundle.js",
        },
        module: {
          rules: [
            {
              test: /\.m?js$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                loader: "babel-loader",
                options: {
                  presets: [
                    [
                      "@babel/preset-env",
                      {
                        debug: false,
                        corejs: 3,
                        useBuiltIns: "usage",
                      },
                    ],
                  ],
                },
              },
            },
          ],
        },
      })
    )
    .pipe(gulp.dest(dist + "/js"));

  return gulp
    .src("./src/scss/style.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest(dist + "/css"));
});

gulp.task("default", gulp.parallel("watch", "build"));
