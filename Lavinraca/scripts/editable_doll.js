//NOTE: this will NOT work locally
//it needs to be running under a web server (with an apache index)
//to grab doll parts
//if you're running this without that but WITH a server, try just pointing it at  https://laughing.observer/Lavinraca/images/ClownDollParts/
//instead of the relatively urls its using that start with "images/ClownDollParts/etc"


const doll_directories = ["images/ClownDollParts/body/", "images/ClownDollParts/face/", "images/ClownDollParts/hats/", "images/ClownDollParts/extra/"];
const doll_base = "images/ClownDollParts/";
//modified from https://stackoverflow.com/questions/46399223/async-await-in-image-loading
const waitForImage = (image, src) => {
  return new Promise((resolve, reject) => {
    image.onload = () => resolve(true)
    image.onerror = reject
    image.src = src;
  })
}


const makeDollFromDirectories = async (directory_list) => {
  const doll = new Doll(directory_list.map((d) => new Layer(d)));
  await doll.init();
  return doll;
}

const makeSimpleDoll = async () => {
  return await makeDollFromDirectories(doll_directories)
}
//https://archiveofourown.org/works/58111936
class Doll {
  layers = [];
  buffer;
  bufferFilled = false;
  constructor(layers) {
    this.layers = layers;
    //not using an OffScreenCanvas or whatever because I want to be able to render it to debug
    this.buffer = document.createElement("canvas");
    this.buffer.width = 300;
    this.buffer.height = 300;

  }

  init = async () => {
    for (let l of this.layers) {
      await l.init();
    }
  }

  toJSON = () => {
    return this.layers.map((l) => l.current_part.replace(doll_base, ""))
  }

  /*example: 
  ['images/ClownDollParts/body/bigPants.png',
   'images/ClownDollParts/face/leGrowth.png',
    'images/ClownDollParts/hats/leaf.png',
     'images/ClownDollParts/extra/gamerCat.png']
  */
  fromJSON = (json) => {
    let parsedJSON;
    try {
      if (!json[0].includes("ClownDollParts")) {
        //could be an early save where the clowns were stringified (like wigglersim used to, embedded escapes are a nightmare, nipped that in the bud)
        parsedJSON = JSON.parse(json);
      } else {
        parsedJSON = json;
      }
      for (let i = 0; i < parsedJSON.length; i++) {
        this.layers[i].current_part = `${doll_base}${parsedJSON[i]}`;
      }
    } catch (e) {
      console.log(e)
    }
  }

  rerenderBuffer = () => {
    const ctx = this.buffer.getContext("2d");
    ctx.clearRect(0, 0, this.buffer.width, this.buffer.height);
    this.renderDollToInternalBuffer();
  }

  getPrerenderedClown = async () => {
    console.log("JR NOTE: getPrerenderedClown")
    if (this.bufferFilled) {
      return this.buffer;
    } else {
      await this.renderDollToInternalBuffer();
      return this.buffer;
    }
    console.log("JR NOTE: impossible empty return")
  }

  renderDollToInternalBuffer = async () => {
    console.log("JR NOTE: rendering clownsona for first time to canvas");
    for (let layer of this.layers) {
      console.log("JR NOTE: rendering layer")
      await layer.renderJustDoll(this.buffer);
    }
    this.bufferFilled = true;
    console.log("JR NOTE: returning buffer")
    return this.buffer;
  }


  render = async (parent, dollContainer) => {
    const fuckery = isItFriday();
    if (!dollContainer) {
      dollContainer = createElementWithClassAndParent("div", parent, "doll-container section");
    } else {
      dollContainer.innerHTML = ""; //clear it out for a rerender
    }
    const dollWrapper = createElementWithClassAndParent("div", dollContainer, "doll-wrapper");
    const doll = createElementWithClassAndParent("div", dollWrapper, "doll");


    const controls = createElementWithClassAndParent("div", dollContainer, "controls");

    let canvas = document.createElement("canvas");
    const funCanvas = document.createElement("canvas");
    funCanvas.className = "fun-canvas";

    canvas.width = 0;
    canvas.height = 0;
    if (fuckery) {
      canvas.alt = "Press Me For A Surprise :o)"
      canvas.title = "Press Me For A Surprise :o)";
    }

    for (let layer of this.layers) {
      await layer.render(doll, controls, canvas, funCanvas, fuckery, dollContainer, this.render);
    }

    doll.append(canvas);
    //upscale for maximum aliasing
    if (fuckery) {
      const funContext = funCanvas.getContext("2d");
      funContext.imageSmoothingEnabled = true; //glitch it out as much as you can please :)
      funContext.drawImage(funCanvas, 0, 0, canvas.width * 3, canvas.height * 3);
      funContext.clearRect(0, 0, canvas.width / 3, canvas.height / 3); //remove tiny version left for anti aliasing purposes

      doll.append(funCanvas);
    }

    const randomButton = createElementWithClassAndParent("button", doll, "randomize-whole-doll-button");
    randomButton.innerText = "Randomize Whole Doll";

    randomButton.onclick = () => {
      for (let l of this.layers) {
        l.chooseRandomPart();
      }
      this.render(parent, dollContainer); //rerender over the last container
    }

    const downloadButton = createElementWithClassAndParent("button", doll, "randomize-whole-doll-button");
    downloadButton.innerText = "Download Doll";

    downloadButton.onclick = () => {
      const data = canvas.toDataURL();
      const link = document.createElement("a");
      link.download = "doll.png";
      link.href = data;
      link.click();
    }



    if (fuckery) {
      canvas.onmouseenter = () => {
        funCanvas.style.display = "block";
      }

      funCanvas.onmouseleave = () => {
        funCanvas.style.display = "none";
      }
      haveFunGlitchingCanvas(funCanvas); //:) :) ;)

    }

  }
}

class Layer {
  directory = "http://farragofiction.com/404";
  parts = []; //loaded from directory (it has to have an apache file structure type list)
  current_part = ""; //what has been chosen?
  allowPartsPreview = false; //slow machines or large doll parts could make this a problem, less mobile friendly
  constructor(directory) {
    this.directory = directory;
  }

  init = async () => {
    try {
      this.parts = await getImages(this.directory);
    } catch (e) {
      console.error("JR NOTE: error fetching doll, this probably means you're trying to run locally and don't have a server, so it'll always fail security (CORS), check the comments for details on how to resolve this , but probably you're gonna want to be having a server AND pointing it at laughing.observer since it has the apache index its looking for to understand file structures", e)
    }
    this.chooseRandomPart();
  }

  chooseRandomPart = () => {
    return this.choosePart(pickFrom(this.parts));
  }

  choosePart = (part) => {
    this.current_part = this.directory + part;
    //this is SPECIFIC to lavinraca 2026 so uh, remove this if i reuse it
    //of note, lavinraca 2026 assumes only a single doll at a time can have parts chosen.
    if (clownsona) {
      saveClownsona();
      clownsona.rerenderBuffer();
    }

    return this.current_part;
  }

  handlePartsPicking = (controls, dollContainer, callback) => {
    const label = createElementWithClassAndParent("h2", controls, "part-label");
    const select = createElementWithClassAndParent("select", controls);
    select.disabled = this.parts.length <= 1;
    const row = createElementWithClassAndParent("div", controls, "part-row");

    this.handleAllowingPartsPreview(controls, dollContainer, callback);

    const customSelect = this.allowPartsPreview ? createElementWithClassAndParent("div", row, "custom-select") : null;

    //const select = createElementWithClassAndParent("select", row);
    if (this.allowPartsPreview) {
      customSelect.disabled = this.parts.length <= 1;
    }
    let index = 0;

    const createOption = (part, index) => {
      let customOption;
      if (this.allowPartsPreview) {
        customOption = createElementWithClassAndParent("div", customSelect, "custom-option");
        customOption.value = part;
        customOption.innerHTML = `${index}<img src='${this.directory + part}'>`;
        customOption.setAttribute("selected", this.current_part.includes(part));
      }

      const option = createElementWithClassAndParent("option", select);
      option.value = part;
      option.innerText = part;
      option.selected = this.current_part.includes(part)
      return customOption;
    }


    //show what was selected at top
    if (this.allowPartsPreview) {
      const option = createOption(this.current_part.replaceAll(this.directory, ""), "&#10003;");
      option.style.cursor = "auto";
      option.style.pointerEvents = "none";
    }

    for (let part of this.parts) {
      index++;
      const customOption = createOption(part, index);
      if (customOption) { //only do for looped parts, not currently selected part
        customOption.onclick = () => {
          this.choosePart(part);
          callback(parent, dollContainer); //rerender over the last container
        }
      }
    }

    select.onchange = () => {
      this.choosePart(select.value);
      callback(parent, dollContainer, select); //rerender over the last container
    }

    const parts = this.directory.split("/");
    label.innerText = titleCase(parts[parts.length - 2]);
    const randomButton = createElementWithClassAndParent("button", controls);
    randomButton.innerText = "Randomize";
    randomButton.style.marginTop = "5px";
    randomButton.onclick = () => {
      this.chooseRandomPart();
      callback(parent, dollContainer, randomButton); //rerender over the last container
    }
  }


  renderJustDoll = async (canvas) => {
    const layerImage = document.createElement("img");
    await waitForImage(layerImage, this.current_part);
    if (canvas.width == 0) {
      canvas.width = layerImage.width;
      canvas.height = layerImage.height;
    }

    const context = canvas.getContext("2d");
    context.imageSmoothingEnabled = false;
    context.drawImage(layerImage, 0, 0, canvas.width, canvas.height);

  }

  handleActualRendering = (controls, layerImage, doll, canvas, funCanvas, fuckery) => {
    if (canvas.width == 0) {
      canvas.width = layerImage.width;
      canvas.height = layerImage.height;
      funCanvas.width = canvas.width;
      funCanvas.height = canvas.height;
      doll.style.width = layerImage.width + "px";
      doll.parentElement.style.width = layerImage.width + "px";

      controls.style.width = document.querySelector("body").clientWidth - layerImage.width + "px";
    }

    const context = canvas.getContext("2d");
    context.imageSmoothingEnabled = false;

    context.drawImage(layerImage, 0, 0, canvas.width, canvas.height);

    if (fuckery) {
      const funContext = funCanvas.getContext("2d");
      funContext.imageSmoothingEnabled = true; //glitch it out as much as you can please :)

      funContext.drawImage(layerImage, 0, 0, canvas.width / 3, canvas.height / 3); //downscale for maximum aliasing
    }
    layerImage.remove();
  }


  handleAllowingPartsPreview = (controls, dollContainer, callback) => {
    const checkBoxContainer = createElementWithClassAndParent("div", controls);
    const checkBox = createElementWithClassAndParent("input", checkBoxContainer);
    checkBox.type = "checkbox";
    checkBox.checked = this.allowPartsPreview;

    const checkLabel = createElementWithClassAndParent("span", checkBoxContainer);
    checkLabel.innerText = "Allow Parts Preview (slow)"
    checkBox.onchange = () => {
      this.allowPartsPreview = !this.allowPartsPreview;
      callback(parent, dollContainer, false); //rerender over the last container but dont scroll (they want to change color)
    }
  }

  render = async (doll, controls, canvas, funCanvas, fuckery, dollContainer, callback) => {
    const layer_controls = createElementWithClassAndParent("div", controls, "layer-controls sub-section");


    this.handlePartsPicking(layer_controls, dollContainer, callback);

    const layerImage = createElementWithClassAndParent("img", doll, "doll-layer");
    await waitForImage(layerImage, this.current_part);



    this.handleActualRendering(controls, layerImage, doll, canvas, funCanvas, fuckery); //has to happen after we get the image
  }
}

