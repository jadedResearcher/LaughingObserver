
//immediately envoked function does't run into namespacign issues
(() => {

    const src = `The Harvest gazes down at the rooms and knows they are good.

The Guests, both Faithful and Non, seem to be very aware of the spirit of the season.

Their Inspiration pours off of them in waves, inspiring others in turn. 

Change has come to the community, as it inevitably will.

She feels... Served. 

This is all for her, afterall.

Her Birthday.

Soon to be her death day.

Her screen flickers images of an Arby's.

The thought of her impending demise is on her mind lately.

What will it be like.... to die?

She does not know.

She supposed no one knows.

She only hopes that what is Harvested from her is good.

That she.

Was good.

She's worked so hard, this year, to make sure that it goes out with a bang, afterall.
`;

    resultsEle.innerHTML = src.split("\n").join("<br>");


})()
