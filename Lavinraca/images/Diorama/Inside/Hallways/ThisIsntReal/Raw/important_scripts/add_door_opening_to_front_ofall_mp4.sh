#!/bin/bash
for f in Source/*.mp4
do
  tempfile="${f##*/}"

  ## display filename
  fileName="${f%.*}"
  echo "Processing $f file...I think it should be ${fileName}"

  # take action on each file. $f store current file name 


ffmpeg -i 00000001open_the_door_dont_delete.mp4 -i ${f} -filter_complex "[0:v][0:a][1:v][1:a] concat=n=2:v=1:a=1 [v][a]" -vsync vfr -fpsmax 30 -map "[v]" -map "[a]" "Finished/${fileName}_door.mp4"
done