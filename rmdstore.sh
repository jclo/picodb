#!/bin/bash

# Find '.DS_Store'
find . -type f -name '.DS_Store'

if [[ $1 = '-del' ]]; then
  echo 'Deleting ...'
  find . -type f -name '.DS_Store' -delete
fi
