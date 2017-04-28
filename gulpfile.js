/* eslint-env node */
/* eslint one-var: 0 */
/* eslint strict: 0 */

'use strict';

// -- Node modules
var del       = require('del')
  , gulp      = require('gulp')
  , header    = require('gulp-header')
  , concat    = require('gulp-concat')
  , replace   = require('gulp-replace')
  , uglify    = require('gulp-uglify')
  ;

// -- Local declarations
var name     = require('./package.json').name
  , release  = require('./package.json').version
  ;

// -- Global variables
var dist       = './lib'
  , watch      = 'src/**/*.js'
  ;

// List of JS files to merge For PicoDB.
var picodb = [
  './src/_header',
  './src/overslash.js',
  './src/event.js',
  './src/geo.js',
  './src/project.js',
  './src/query.js',
  './src/count.js',
  './src/delete.js',
  './src/find.js',
  './src/insert.js',
  './src/update.js',
  './src/picodb.js',
  './src/_footer'
];

// License Header to add to 'picodb.js' file:
var license = ['/**',
  ' * PicoDB v{{lib:version}}',
  ' *',
  ' * @license',
  ' * PicoDB is a tiny in-memory database that stores JSON documents.',
  ' * Copyright (c) 2017 jclo <jclo@mobilabs.fr> (http://www.mobilabs.fr/).',
  ' * Released under the MIT license. You may obtain a copy of the License',
  ' * at: http://www.opensource.org/licenses/mit-license.php).',
  ' */',
  ''].join('\n');

// -- Gulp Tasks

// Remove the previous '_dist':
gulp.task('remove', function() {
  del.sync([dist]);
});

// Create 'dist' and populate it:
gulp.task('create', ['remove'], function() {
  return gulp.src([
  ]).pipe(gulp.dest(dist));
});

// Merge all JS in one:
gulp.task('doJS', ['create'], function() {
  return gulp.src(picodb)
    .pipe(concat(name.toLowerCase() + '.js'))
    .pipe(header(license))
    // .pipe(replace('@#suffix#@', suffixname + ' v' + release))
    .pipe(replace('{{lib:version}}', release))
    .pipe(gulp.dest(dist));
});

// Minify
gulp.task('minify', ['doJS'], function() {
  return gulp.src(dist + '/' + name.toLowerCase() + '.js')
    .pipe(uglify({ preserveComments: 'license' }))
    .pipe(concat(name.toLowerCase() + '-min.js'))
    .pipe(gulp.dest(dist));
});

// Rebuild if a file was modified:
gulp.task('watch', function() {
  gulp.watch(watch, ['minify']);
});

// -- Gulp Build (called when you run `gulp xxx` from cli)
gulp.task('default', ['minify']);
