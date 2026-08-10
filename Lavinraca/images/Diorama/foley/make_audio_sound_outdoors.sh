#!/bin/bash
for f in *.mp3
do
  tempfile="${f##*/}"

  ## display filename
  fileName="${f%.*}"
  echo "Processing $f file...I think it should be ${fileName}"

  # take action on each file. $f store current file name 

ffmpeg -i ${f} -i cornfield_impulse.wav -filter_complex "[0:a][1:a]afir,loudnorm"  ${fileName}_outside.mp3


done