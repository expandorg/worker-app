#!/bin/bash

case $1 in
  production)
    subdomain=portal;;
  ropsten)
    subdomain=dev;;
esac

url=gs://${subdomain}.gems.org
old_hash=$(gsutil ls $url | sed -nE "s,${url}/app-(.+)\.js$,\1,p")

rm -rf ./public/static ./public/app-* ./public/index.html
npm install
NODE_ENV=$1 webpack

gsutil cp -r ./public/static ./public/app-* ./public/index.html ${url}/
gsutil rm ${url}/app-${old_hash}*
