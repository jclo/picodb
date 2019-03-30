/* eslint one-var: 0, import/no-extraneous-dependencies: 0, semi-style: 0,
  object-curly-newline: 0 */

'use strict';

// -- Node modules
const { src, dest, series, parallel } = require('gulp')
    , del     = require('del')
    , concat  = require('gulp-concat')
    , header  = require('gulp-header')
    , replace = require('gulp-replace')
    , uglify  = require('gulp-uglify')
    ;


// -- Local modules
const config = require('./config')
    , pack   = require('../package.json')
    ;


// -- Local constants
const { dist }     = config
    , { libdir }   = config
    , { libname }  = config
    , { noparent } = config
    , name         = libname.replace(/\s+/g, '').toLowerCase()
    , { license }  = config
    ;


// -- Local variables


// -- Gulp Private Tasks

// Removes the previous dist.
function deldist(done) {
  del.sync(dist);
  done();
}

// Copies README and LICENSE.
function doskeleton() {
  return src(['README.md', 'LICENSE.md'])
    .pipe(dest(dist));
}

// Copies the development version.
function copydev() {
  return src(`${libdir}/${name}.js`)
    .pipe(header(license))
    .pipe(replace('{{lib:name}}', `${libname}`))
    .pipe(replace('{{lib:version}}', pack.version))
    .pipe(replace('{{lib:description}}', pack.description))
    .pipe(replace('{{lib:author}}', pack.author.name))
    .pipe(replace('{{lib:email}}', pack.author.email))
    .pipe(replace('{{lib:url}}', pack.author.url))
    .pipe(dest(dist));
}

// Copies the development version without parent.
function makenoparentlib() {
  return src(`${libdir}/${name}${noparent}.js`)
    .pipe(header(license))
    .pipe(replace('{{lib:name}}', `${libname}`))
    .pipe(replace('{{lib:version}}', pack.version))
    .pipe(replace('{{lib:description}}', pack.description))
    .pipe(replace('{{lib:author}}', pack.author.name))
    .pipe(replace('{{lib:email}}', pack.author.email))
    .pipe(replace('{{lib:url}}', pack.author.url))
    .pipe(replace(/ {2}'use strict';\n\n/g, ''))
    .pipe(dest(dist));
}

// Creates the minified version.
function makeminified() {
  return src(`${libdir}/${name}.js`)
    .pipe(uglify())
    .pipe(header(license))
    .pipe(replace('{{lib:name}}', `${libname}`))
    .pipe(replace('{{lib:version}}', pack.version))
    .pipe(replace('{{lib:description}}', pack.description))
    .pipe(replace('{{lib:author}}', pack.author.name))
    .pipe(replace('{{lib:email}}', pack.author.email))
    .pipe(replace('{{lib:url}}', pack.author.url))
    .pipe(concat(`${name}.min.js`))
    .pipe(dest(dist));
}


// -- Gulp Public Task(s):

module.exports = series(
  deldist,
  parallel(doskeleton, copydev, makenoparentlib, makeminified),
);
