
//immediately envoked function does't run into namespacign issues
(() => {

    const src = `The Harvest SLAMS the internal mute button on her own TV head as she checks in on east_fourth_room2.

Of all the nerve!

This was a LIBRARY!

Who on EARTH thought music was appropriate to add to the theme of a library?

Who would even be able to FOCUS on all the tomes she'd collected over the years. 

Writings from the Faithful, and from the Guests.

It even puts her off her appetite, however temporarily.

All the books laid out on the fine china, candlesticks setting the mood, none of it even matters anymore.

The Harvest hopes that SOMEONE will create a way for books to be read that aren't through gritted teeth while trying to block out loud techno music.

`;

    resultsEle.innerHTML = src.split("\n").join("<br>");


})()
