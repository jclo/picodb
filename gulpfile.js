/* *****************************************************************************
 *
 * Note: run-sequence doesn't work with arrow function. Use the old fashion!
 *
 * ****************************************************************************/
/* eslint-env node */
/* eslint one-var: 0 */

'use strict';

// -- Node modules
const gulp        = require('gulp')
    , runSequence = require('run-sequence')
    ;

// -- Local modules

// Include all build files:
require('require-dir')('./tasks');

// -- Local constants
const watch = 'src/**/*.js'
    ;

// -- Local variables

// -- Gulp Tasks
gulp.task('watch', () => {
  gulp.watch(watch, ['makejs']);
});

gulp.task('build', (callback) => {
  runSequence('makejs', callback);
});

gulp.task('default', (callback) => {
  runSequence('makejs', 'makedist', callback);
});
