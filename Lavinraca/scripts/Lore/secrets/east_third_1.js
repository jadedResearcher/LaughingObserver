
//immediately envoked function does't run into namespacign issues
(() => {

    const src = `
The Harvest is so, so proud that this Wasted Faithful has managed to modify a hallway, of all things. 

east_third_1 is now filled with pianos. 

The sheer excitement that courses through her screen as she tunes to the hallway, rotating around each piano in turn.

She never can predict what the Faithful will do.

She is so glad she is spreading the knowledge of hacking into reality into them.

`;

    resultsEle.innerHTML = src.split("\n").join("<br>");


})()
