
//immediately envoked function does't run into namespacign issues
(() => {

    const src = `The Harvest's TV head tunes to east_second_room2. 

Ah yes.

The break room.

One of her head copies rests gently on a pool table as several traffic cones take a load off on several benches.

It's peaceful here, the Harvest thinks to herself.

There is meat.

There is safety.

All is right in the world.

`;

    resultsEle.innerHTML = src.split("\n").join("<br>");


})()
