//figured out how to do this last lavinraca, very nice being able to do it again
const runSecret = async (fileName) => {
    fileName = fileName.toLowerCase(); //all lowercase
    updateURLParams("importantWords=" + fileName)
    console.log("JR NOTE: runSecret being called", fileName)
    const body = document.querySelector("body");
    const scriptTag = document.createElement("script")
    scriptTag.src = `scripts/Lore/secrets/${fileName}.js`;
    scriptTag.onerror = () => {
        resultsEle.innerHTML = "haha whoops, that's not a real password, lulz"
    }
    scriptTag.onload = () => {
        if (!globalDataObject.passwordsDugInto) {
            globalDataObject.passwordsDugInto = [];
        }
        globalDataObject.passwordsDugInto.push(fileName);
        globalDataObject.passwordsDugInto = uniq(globalDataObject.passwordsDugInto);
        globalDataObject.fallenIntoRabbitHole = true;
        save("rabbit hole password found");
    }
    body.append(scriptTag);

}