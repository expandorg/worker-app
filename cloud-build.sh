#!/bin/bash
rm -rf ./public/static ./public/app-* ./public/index.html
NODE_ENV=ropsten webpack
