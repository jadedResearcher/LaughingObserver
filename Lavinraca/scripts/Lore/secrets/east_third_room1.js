
//immediately envoked function does't run into namespacign issues
(() => {

    const src = `The Harvest switches her TV head to show the CCTV footage of east_third_room1.  

The censorship within feels...right, somehow.

Knowledge forever lost is very much in the spirit of Lavinraca.

Some part of her, some troublesome parasite rebels at the idea but with a well practiced thought she simply discards its dismay.

Language, too, feels right, but in a way more personal. 

Books, or at least Libraries, ARE her Domain, after all. 

It's a shame they're all censored, of course, but she's sure the Guests can find some other way to read whatever tomes are revealed. 

That annoying loud library probably has copies.

The Quests... ah they feel so familiar to her.

Last year, when she and the Guests discovered how FUN it was to hide things from each other, to constantly leave surprises...

She's glad that the spirit remains.

`;

    resultsEle.innerHTML = src.split("\n").join("<br>");


})()
