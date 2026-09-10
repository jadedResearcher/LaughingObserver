#!/bin/bash
for f in Source/*.mp4
do
  tempfile="${f##*/}"

  ## display filename
  fileName="${f%.*}"
  echo "Processing $f file...I think it should be ${fileName}"

  # take action on each file. $f store current file name 
ffmpeg -i "${f}" -vf "scale=720:1280" -c:a copy "Finished/${fileName}_720x780.mp4"
done