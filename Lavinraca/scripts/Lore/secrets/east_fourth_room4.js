
//immediately envoked function does't run into namespacign issues
(() => {

    const src = `The Harvest's TV head tunes to a room covered in newspapers. Missing person's pictures. Print outs of sketchy news sites.  A single chair sits under a bare lightbulb.

The bulb flickers. 

A scraping noise echoes from the vent near the floor (was there always a vent there?)

Then, the chair suddenly ...

Suddenly there has always been a body in the chair, eyes staring sightlessly out. Caked on, old blood staining its shirt around a gleaming knife. 

east_fourth_room4 is a strange room.

The Harvest's screen zooms in on the body.

Any sufficiently large maze attracts a Wanderer.

This is a law of Zampanio.

And while the Harvest is, strictly speaking, not part of that Universe, she can not deny the tendrils of it within her.

(she's so hungry.)

No one can die permanently anywhere a Wanderer has declared a maze.

Everyone knows this as well.

The Guests will be perfectly safe here. 

The Harvest is pleased.

`;

    resultsEle.innerHTML = src.split("\n").join("<br>");


})()
