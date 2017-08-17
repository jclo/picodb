#!/bin/bash

if [[ $1 -eq 5 ]]
then
  rm .eslintrc;
  ln -s eslintrc-es5 .eslintrc;
  echo 'eslint is now configured for checking ES5 compliance!';
elif [[ $1 -eq 6 ]]
then
  rm .eslintrc;
  ln -s eslintrc-es6 .eslintrc;
  echo 'eslint is now configured for checking ES6 compliance!';
else
  echo 'Well, you need to specifiy the ESx standard you want to comply with.';
  echo 'Argument 5 means ES5 and argument 6 means ES6.';
fi
