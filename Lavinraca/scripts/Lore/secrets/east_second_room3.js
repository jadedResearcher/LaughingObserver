
//immediately envoked function does't run into namespacign issues
(() => {

    const src = `The Harvest's TV head tunes to east_second_room3.   

A soothing melody plays.

Dolls crowd around the 'camera' of her eyesight, moving only when there is no Observer but her.

They show her the speakers playing the music and glowing gently blue.

They show her the 8 balls.

They take down the posters on the wall and hold each one up to her eye and she is pleased.

They show her the mechanism by which the Guests can customize one of the many, many clown dolls that make up her body. 

It is strange, these Guests.

Lacking bodies in this Universe at all, they must make do with borrowing some of hers. 

She hopes the Guests like the dolls she gives them so that they can walk around the Manor. 

She hopes they smile.

Some part of her very much hopes they smile.

She does not think deeply about which part.

`;

    resultsEle.innerHTML = src.split("\n").join("<br>");


})()
