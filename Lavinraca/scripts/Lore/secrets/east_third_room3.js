
//immediately envoked function does't run into namespacign issues
(() => {

    const src = `
Nope.

No.

Absolutely not.

The Harvest is done looking at east_third_room3. 

That is.

Unquestionably.

The Harvest's head, dissected in that room.

It may only be a copy of her head.

It may not harm her in any way.

But she is simply done.

`;

    resultsEle.innerHTML = src.split("\n").join("<br>");


})()
