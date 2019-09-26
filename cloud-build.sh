#!/bin/bash
rm -rf ./public/static ./public/app-* ./public/index.html
NODE_ENV=ropsten webpack

_OLD_VERSION=`cat version`
VERSION=`ls ./public/ | sed -nE "s,app-(.+)\.js$,\1,p"`
echo $VERSION > version