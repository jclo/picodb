/* eslint  one-var: 0, prefer-arrow-callback: 0, import/no-extraneous-dependencies: 0 */

'use strict';

// -- Node modules
const del         = require('del')
    , gulp        = require('gulp')
    , concat      = require('gulp-concat')
    , footer      = require('gulp-footer')
    , header      = require('gulp-header')
    , replace     = require('gulp-replace')
    , runSequence = require('run-sequence')
    ;

// -- Local modules
const config  = require('./config')
    ;

// -- Local constants
const version = require('../package.json').version
    , dist    = config.dist
    , src     = config.src
    , lib     = config.libname
    , license = config.license
    , destlib = `./_${lib}-${version}`
    ;

// -- Local variables


// -- Gulp Tasks

// Remove the previous version:
gulp.task('delemlib', function() {
  return del.sync(destlib);
});

// Copy dist to destlib:
gulp.task('cpdist', function() {
  return gulp.src(`${dist}/**/*`)
    .pipe(gulp.dest(destlib));
});

// Remove js files:
gulp.task('rmjsfiles', function() {
  return del.sync(`${destlib}/*.js`);
});

// Create the full library:
gulp.task('doemlib', function() {
  return gulp.src(src)
    .pipe(concat(`${lib.toLowerCase()}.js`))
    .pipe(header(license))
    .pipe(replace('{{lib:name}}', `${lib}`))
    .pipe(replace('{{lib:version}}', version))
    // indent each line with 2 spaces:
    .pipe(replace(/\n/g, '\n  '))
    // remove the indent added to blanck lines:
    // (we need to add an extra line otherwise the indent isn't removed
    // from the last line!)
    .pipe(footer('\n'))
    .pipe(replace(/\s\s\n/g, '\n'))
    // Fix the indent for the first line:
    .pipe(replace(/\/\*\*\s\*\*\*/, '  /** *'))
    // Remove the extra * to the bottom marker of the comment header:
    .pipe(replace(/\s\s\*\s\*\*\*/, '  * *'))
    // Comment 'use strict' (redondant when the lib is embedded):
    .pipe(replace('\'use strict\';', '//  \'use strict\';'))
    .pipe(gulp.dest(destlib));
});

// -- Gulp Main Task
gulp.task('makenoparentlib', function(callback) {
  runSequence('delemlib', 'cpdist', 'rmjsfiles', 'doemlib', callback);
});
