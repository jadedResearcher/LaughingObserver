#!/bin/bash



#redhawk animation, as a final step (after warping something in da vinci or similar, if you give it just a random video you'll get weird ghosts) will create a continuous flow
#by having a single video clip doubled, with the second one starting at the midway point of the first
#then the first clip will fade to 0 by the time it hits midway
# and the second will fade in from 0 to 100 by the time it hits its midway
#then you chop off the whole thing such that you always have the overlapped videos (and its the same duration as the original clip)
#i used google and gemini to figure out how to do it by hand, but the final step seemed easy enough to get working in ffmpeg, if requiring a lot of temporary files
#i asked gemini to try to make a bash script (while i was in bed last night, should have just made a note for future me),
# now its finally time to review what it did and see if literally any of its usable
#i do find coding fun, but not bash scripts. but if i can't salvage the code it made at least it might give me
#search terms to look up
# and worst case doing it by hand isn't that bad, but it DOES require you to eyeball midway points in clipstudio which i find annoying
#with my bad eyes
#yeah im already massaging this, just to make it match the bash format i'm more familiar with
#and also to give me a context to look at it DEEPLY (translating)
#instead of just shrugging and running it and letting whatever happens happens
#this is the most comments ive ever put into a bash file lol
#this is my absolute favorite thing gemini did:     echo "Original length: ${duration}s | Final output length: ${duration}s"
#what an innane but seemingly useful console log. Damn, you sure did make sure you didn't change the duration my dude
#that is definitely getting ripped out
#got gemini to give me some source: https://stackoverflow.com/questions/60043174/cross-fade-video-to-itself-with-ffmpeg-for-seamless-looping


for f in *.mp4
do
  tempfile="${f##*/}"

  ## display filename
  fileName="${f%.*}"
  echo "Processing $f file...I think it should be ${fileName}"

  # take action on each file. $f store current file name 


  # 1. Get the total duration of the original video (e.g., 2.0s)
duration=$(ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "$f" | cut -d'.' -f1)

# 2. STRICT CHECK: Stop right here if ffprobe returned a blank string
if [ -z "$duration" ] || [ "$duration" = "N/A" ]; then
    echo "ERROR: ffprobe could not read the duration of file: '$f'"
    echo "Please check if the file path is correct or if the video is corrupted."
    exit 1
fi

  # 2. Calculate half the duration for the offset and fade window (e.g., 1.0s)
  #the original thing here didn't work cuz gemini didn't know i use gitbash for windows (local) instead of ubuntu (remote)
  # so it used bc, which I don't have. i had never even HEARD of bc (and didn't know that bash by default can't handle decimals)
  #so i learned something here, and gemini taught me about awk too (which i independently confirmed i DID have)
  #i do like llm (even shitty stupid ones) as custom documentation generators (which you immediately verify by trying to use)


# 3. Use the -v flag to pass the variable safely into awk
half_duration=$(awk -v dur="$duration" 'BEGIN {printf "%.4f", dur / 2}')


fade=half_duration

echo "Duration: ${duration}s |  Half Duration: ${duration}s"



#4 Split and crossfade the two halves
#gemini kept getting this wrong (kept makingsomething that generate the original file but encoded wrong)
#and eventually gave up and sent me here: https://stackoverflow.com/questions/60043174/cross-fade-video-to-itself-with-ffmpeg-for-seamless-looping



ffmpeg -y -i "$f" -filter_complex \
"[0:v]trim=start=0:end=${half_duration},setpts=PTS-STARTPTS[first_half]; \
 [0:v]trim=start=${half_duration}:end=${duration},setpts=PTS-STARTPTS[second_half]; \
 [second_half][first_half]xfade=transition=fade:duration=${half_duration}:offset=0,format=yuv420p" \
 -c:v libx264 -an "redhawk_$f"



    echo "Saved output as: redhawk_${f}"
    

done
