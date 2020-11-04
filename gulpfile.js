/* eslint one-var: 0, semi-style: 0 */


// -- Vendor Modules
const { watch, series } = require('gulp')
    , connect = require('gulp-connect')
    , open    = require('open')
    ;


// -- Local Modules


// -- Local Constants
const filesToWatch = ['src/**/*.js']
    ;


// -- Local Variables


// -- Gulp Private Tasks
const build    = require('./tasks/makejs')
    , makedist = require('./tasks/makedist')
    ;


// -- Gulp watch
function fwatch() {
  watch(filesToWatch, series(build));
}

// -- Gulp connect dev
function devserver(done) {
  connect.server({
    host: '0.0.0.0', // (allows remote access)
    root: './',
    port: 8888,
    livereload: true,
  });
  open('http://localhost:8888/');
  done();
}

// -- Gulp connect prod
function appserver(done) {
  connect.server({
    host: '0.0.0.0', // (allows remote access)
    root: './_dist',
    port: 8889,
    livereload: true,
  });
  open('http://localhost:8889/');
  done();
}


// Gulp Public Tasks:
exports.build = build;
exports.watch = fwatch;
exports.rundev = devserver;
exports.makedist = makedist;
exports.runapp = appserver;
exports.default = series(build, makedist);
