
//immediately envoked function does't run into namespacign issues
(() => {

    const src = `Something shifts inside the Harvest, under her cloak the dozens of clown dolls honk and caper merrily.

She wonders, for the first time since she was a child, who she is.

Is she the face on the tv? The fox head with the eye patch?

Is she the tv head itself, with its large horns.

Is she any of these clown dolls within her, that she graciously is letting the Guests borrow.

When she dies... 

When the next Harvest is built from the Sacrifices to come.

What part of her, exactly will be the thing that dies?

Or will instead some essential part remain, to be refashioned into whatever image pleases the Guests of 2027?

Is she special, for having such an inscrutable, changeable nature?

Or do the Guests also shift faces and identity so easily?
`;

    resultsEle.innerHTML = src.split("\n").join("<br>");


})()
