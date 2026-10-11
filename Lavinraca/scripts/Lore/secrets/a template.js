
//immediately envoked function does't run into namespacign issues
(() => {

    const src = `just a test
    just a multiline test
    dont worry about it`;

    resultsEle.innerHTML = src.split("\n").join("<br>");


})()
