/* eslint one-var: 0, import/no-extraneous-dependencies: 0, semi-style: 0,
  object-curly-newline: 0 */


// -- Vendor Modules
const { src, dest, series, parallel } = require('gulp')
    , del     = require('del')
    , concat  = require('gulp-concat')
    , Kadoo   = require('kadoo')
    , replace = require('gulp-replace')
    ;


// -- Local Modules
const pack   = require('../package.json')
    , config = require('./config')
    ;


// -- Local Constants
const destination = config.libdir
    , { ES6GLOB } = config
    , { source }  = config
    , { libname } = config
    , { name }    = config
    , { version } = pack
    ;


// -- Local Variables


// -- Gulp Private Tasks

// Removes the previous version.
function clean(done) {
  del.sync(destination);
  done();
}

// Creates the library.
function dogenericlib() {
  const kadoo = Kadoo(source, { type: 'generic' });

  return kadoo.bundle()
    .pipe(replace('{{lib:name}}', libname))
    .pipe(replace('{{lib:version}}', version))

    // Remove extra global.
    // (keep the first global only)
    .pipe(replace(/\/\* global/, '/* gloobal'))
    .pipe(replace(/\/\* global[\w$_\s,]+\*\//g, '/* - */'))
    .pipe(replace(/\/\* gloobal/, '/* global'))

    // Remove extra 'use strict'.
    // (keep the two first only)
    .pipe(replace(/use strict/, 'use_strict'))
    .pipe(replace(/use strict/, 'use_strict'))
    .pipe(replace(/'use strict';/g, '/* - */'))
    .pipe(replace(/use_strict/g, 'use strict'))

    .pipe(concat(`${'generic'}.js`))
    .pipe(dest(destination))
  ;
}

// Create the UMD Module.
function doumdlib() {
  return src(`${destination}/${'generic'}.js`)
    .pipe(replace('{{lib:es6:define}}\n', ''))
    .pipe(replace('{{lib:es6:link}}', 'this'))
    .pipe(replace('{{lib:es6:export}}\n', ''))
    .pipe(concat(`${name}.js`))
    .pipe(dest(destination))
  ;
}

// Creates the ES6 module.
function domodule() {
  let exportM = '\n// -- Export\n';
  exportM += `export default ${ES6GLOB}.${libname};`;

  return src(`${destination}/${'generic'}.js`)
    .pipe(replace('{{lib:es6:define}}', `const ${ES6GLOB} = {};`))
    .pipe(replace('{{lib:es6:link}}', ES6GLOB))
    .pipe(replace('{{lib:es6:export}}', exportM))
    .pipe(concat(`${name}.mjs`))
    .pipe(dest(destination))
  ;
}

// Removes the temp file(s).
function delgeneric(done) {
  del.sync(`${destination}/generic.js`);
  done();
}


// -- Gulp Public Task(s)
module.exports = series(
  clean, dogenericlib,
  parallel(doumdlib, domodule),
  delgeneric,
);
