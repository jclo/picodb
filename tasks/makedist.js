/* eslint one-var: 0, import/no-extraneous-dependencies: 0, semi-style: 0,
  object-curly-newline: 0 */


// -- Vendor Modules
const { src, dest, series, parallel } = require('gulp')
    , del     = require('del')
    , concat  = require('gulp-concat')
    , header  = require('gulp-header')
    , replace = require('gulp-replace')
    , uglify  = require('gulp-uglify-es').default
    ;


// -- Local Modules
const config = require('./config')
    ;


// -- Local Constants
const { dist }    = config
    , { libdir }  = config
    , { name }    = config
    , { license } = config
    ;


// -- Local Variables


// -- Gulp Private Tasks

// Removes the previous dist.
function deldist(done) {
  del.sync(dist);
  done();
}

// Copies README and LICENSE.
function doskeleton() {
  return src(['README.md', 'LICENSE.md'])
    .pipe(dest(dist))
  ;
}

// Copies the development version.
function copydev() {
  return src(`${libdir}/${name}.js`)
    .pipe(header(license))
    .pipe(dest(`${dist}/lib`))
  ;
}

// Copies the module development version.
function copydevm() {
  return src(`${libdir}/${name}.mjs`)
    .pipe(header(license))
    .pipe(dest(`${dist}/lib`))
  ;
}

// Creates the minified version.
function makeminified() {
  return src(`${libdir}/${name}.js`)
    .pipe(replace('/*! ***', '/** ***'))
    .pipe(uglify())
    .pipe(header(license))
    .pipe(concat(`${name}.min.js`))
    .pipe(dest(`${dist}/lib`))
  ;
}

// Creates the module minified version.
function makeminifiedm() {
  return src(`${libdir}/${name}.mjs`)
    .pipe(replace('/*! ***', '/** ***'))
    .pipe(uglify())
    .pipe(header(license))
    .pipe(concat(`${name}.min.mjs`))
    .pipe(dest(`${dist}/lib`))
  ;
}


// -- Gulp Public Task(s):

module.exports = series(
  deldist,
  parallel(doskeleton, copydev, copydevm, makeminified, makeminifiedm),
);
