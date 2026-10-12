
//immediately envoked function does't run into namespacign issues
(() => {

    const src = `The Harvest feels a strange doubling as she checks in on east_first_room3.

Her TV head displays the CCTV feed of a copy of her TV head displaying her favorite slot machine.

The room itself is littered in playing cards. 

A bed is covered in stuffed animals and dolls, and those two creepy mannequins that she STILL has no clue broke into the House are watching an imaginary figure sleep.

A map is and is not upon the wall. 

Spiral. Dolls. Addiction.

A weirdly dense room.

She approves of it, in general.

It's hard to predict what Guests will use it for.

`;

    resultsEle.innerHTML = src.split("\n").join("<br>");


})()
