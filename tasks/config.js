/* eslint */

'use strict';

module.exports = {
  dist: './_dist',
  libdir: './lib',
  libname: 'PicoDB',
  parent: 'this',
  noparent: '-noparent',
  index: './index.js',
  // These are the Javascript files required to build the library.
  src: [
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
    './src/_footer',
  ],
  license: ['/** ****************************************************************************',
    ' * {{lib:name}} v{{lib:version}}',
    ' *',
    ' * {{lib:description}}.',
    ' * (you can download it from npm or github repositories)',
    ' * Copyright (c) 2019 {{lib:author}} <{{lib:email}}> ({{lib:url}}).',
    ' * Released under the MIT license. You may obtain a copy of the License',
    ' * at: http://www.opensource.org/licenses/mit-license.php).',
    ' * ************************************************************************** */',
    ''].join('\n'),
};
