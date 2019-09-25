#!/bin/bash

url=gs://cloud_build_testing
old_hash=$(gsutil ls $url | sed -nE "s,${url}/app-(.+)\.js$,\1,p")

cp -r ./public/static ./public/app-* ./public/index.html ${url}/
rm ${url}/app-${old_hash}*


