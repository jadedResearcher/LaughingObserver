#!/bin/bash
for f in *.mp4
do
  tempfile="${f##*/}"

  ## display filename
  fileName="${f%.*}"
  echo "Processing $f file...I think it should be ${fileName}"

  # take action on each file. $f store current file name 
ffmpeg -i ${f} -vf "setdar=9/16" -c:a copy  ${fileName}_9_16.mp4


done