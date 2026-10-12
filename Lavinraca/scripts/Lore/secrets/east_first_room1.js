
//immediately envoked function does't run into namespacign issues
(() => {

    const src = `The Harvest tunes to the east_first_room1 CCTV feed and displays it on her TV head.

The moon shines through rotten through boards. 

Strange flowers coat the floor.

Words cover the walls, a strange phrase repeated again and again, related to the Apocalypse.

This is not a place of honor.

Something awful happened here, and the quiet horror of it compels her.

A Change so vast. So powerful, that its effects echo through time. 

And yet, whatever it was, not so terrible that no one is left to witness what remains.

The flowers are so gentle in the pale moonlight. 

They do not care what was lost.

The Harvest, quietly, weeps.

`;

    resultsEle.innerHTML = src.split("\n").join("<br>");


})()
