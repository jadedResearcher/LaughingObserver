#!/bin/bash
for f in Source/*.mp4
do
  tempfile="${f##*/}"

  ## display filename
  fileName="${f%.*}"
  echo "Processing $f file...I think it should be ${fileName}"

  # take action on each file. $f store current file name 
ffmpeg -i "$f" -f lavfi -i anullsrc=channel_layout=stereo:sample_rate=44100 -c:v copy -c:a aac -shortest "Finished/${fileName}_audio.mp4"
done