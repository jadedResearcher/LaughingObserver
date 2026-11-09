/*

a bunch of functions multiple interactions will find useful
*/



//bespoke functions can use this to ask if a state has been set
const checkForState = (state_name) => {
  const values = Object.values(globalDataObject.state_changes)
  return values.includes(state_name);
}

const resumePlayingRegularVideoOnEndOfTemporaryOne = () => {
  const json = hallways[globalDataObject.current_room_id];

  video.onended = () => {
    video.onended = null;
    video.src = hallwayDir + json.src + ".mp4";
    video.loop = true;
    window.requestAnimationFrame(() => video.play().catch(() => { }))
  }
}

//displays a button that asks if you want to use a key (if you have one)
// if you do, it adds a state replacement for the two ids and transitions to the new
//(presumably unlocked) state
const normalKeyLockedDoor = (current_id, unlock_id, autoMoveToNextRoom = false) => {
  video.pause();
  if (globalDataObject.keys > 0) {
    const textEle = story.querySelector("#room-text");

    const c = createElementWithClassAndParent("div", textEle);
    const button = createElementWithClassAndParent("button", c);
    button.innerText = "Use Key?"
    button.onclick = () => {
      globalDataObject.state_changes[current_id] = unlock_id;
      keyLose(); //will handle saving

      //usually the new state will have unlockDoorForwards so will auto move you, but if you don't want that to happen (say you dont want to play the door graphic), do it here
      if (autoMoveToNextRoom) {
        //console.log("JR NOTE: skip normal door opening")
        const json = hallways[unlock_id];
        renderID(json.forwards)
      } else {
        renderID(unlock_id);

      }

    }
  } else {
    const textEle = story.querySelector("#room-text");
    const c = createElementWithClassAndParent("div", textEle);
    c.innerText = "You need a key to pass through here."

  }

}

//easy way to apply friction
const comboLock = (parent, callback, one, two, three, four) => {
  //const createNumberInputWithLabel = (parent, id, labelText, initialValue, max = 113, min = -113) => {

  const one_ele = createNumberInputWithLabel(parent, "one-lock", null, 1, 1, 9);
  one_ele.input.focus();
  const two_ele = createNumberInputWithLabel(parent, "two-lock", null, 1, 1, 9);
  const three_ele = createNumberInputWithLabel(parent, "three-lock", null, 1, 1, 9);
  const four_ele = createNumberInputWithLabel(parent, "four-lock", null, 1, 1, 9);

  const checkWin = () => {
    console.log("JR NOTE: checking win ", one, two, three, four)
    let onewin = one_ele.input.value == one;
    let twowin = two_ele.input.value == two;
    let threewin = three_ele.input.value == three;
    let fourwin = four_ele.input.value == four;
    if (onewin && twowin && threewin && fourwin) {
      const audio = new Audio("images/Diorama/foley/ready_effects/Inside/combo_lock_open.mp3");
      audio.play();
      closeThePopup();
      callback();
    } else {
      //console.log("JR NOTE: did not win", onewin, twowin, threewin, fourwin)
    }

  }
  one_ele.input.oninput = checkWin;
  two_ele.input.oninput = checkWin;
  three_ele.input.oninput = checkWin;
  four_ele.input.oninput = checkWin;
}



const normalUnlockedDoor = (current_id, next_id, canGaslight = false) => {
  video.pause();
  youKnowEternalDarknessDoThatThingForDoors(next_id, canGaslight);
}

const harvestPointsGet = (amount = 1) => {
  globalDataObject.harvestPoints += amount;
  save();
  const contentEle = document.createElement("div");
  contentEle.innerHTML = `You got ${amount === 1 ? "a" : amount} Harvest Point${amount === 1 ? "" : "s"}!<br><br><img src='images/Diorama/Inside/Hallways/harvest_spin_smol.gif'>`;

  showExistingPopup(contentEle, "Gotcha")
}

const keyGet = (amount = 1) => {
  globalDataObject.keys += amount;
  save();
  const contentEle = document.createElement("div");
  contentEle.innerHTML = `You got ${amount === 1 ? "a" : amount} Key${amount === 1 ? "" : "s"}!<br><br><img src='images/Diorama/Inside/Hallways/key.gif'>`;

  showExistingPopup(contentEle, "Gotcha")
}

const maskGet = (amount = 1) => {
  globalDataObject.masks += amount;
  save();
  const contentEle = document.createElement("div");
  contentEle.innerHTML = `You got ${amount === 1 ? "a" : amount} Mask${amount === 1 ? "" : "s"}!<br><br><img src='images/Diorama/Inside/Hallways/mask_spin.gif'>`;

  showExistingPopup(contentEle, "Gotcha")
}


const fruitGet = () => {
  const contentEle = document.createElement("div");
  const filters = ["grayscale(1)", "blur(3px)", "blur(13px)", "brightness(2.2)", "brightness(10.2)", "brightness(0.2)", "hue-rotate(180deg)", "contrast(0.5)", "contrast(1.5)", "sepia()", "invert(1)", "saturate(0.3)", "saturate(4.13)", "saturate(10.5)"]

  const banana = () => {
    //true random pick of seeds but the seeds themselves are limited. lets us have a few possible options and weighting
    const seeds = [1031, 413, 113, 13, 11082026, 10312026]
    const r = new SeededRandom(pickFrom(seeds));
    contentEle.innerHTML = `You got a tantalizing taste of HARVEST FRUIT! (not enough to get you fully Wasted, just enough to see Beyond the Veil)<br><br><img src='images/Diorama/Inside/Hallways/banana.gif'>`;
    canvas.style.filter = r.pickFrom(filters);
  }

  const strawberry = () => {
    const seeds = [stringtoseed("strawberry"), stringtoseed("strazzleberry"), stringtoseed("scarecrow"), stringtoseed("harvest")]
    const r = new SeededRandom(pickFrom(seeds));
    contentEle.innerHTML = `You got a miniscule taste of HARVEST FRUIT! (not enough to get you fully Wasted, just enough to see Beyond the Veil)<br><br><img src='images/Diorama/Inside/Hallways/strawberry.gif'>`;
    canvas.style.filter = r.pickFrom(filters);
  }

  const apple = () => {
    const seeds = [stringtoseed("apples are so derivative"), stringtoseed("seriously"), stringtoseed("didn't mean to invoke the bible"), stringtoseed("and teh forbidden fruit"), stringtoseed("but here we are"), stringtoseed("i worked my ass off so nidhogg wouldn't be the serpant int eh garden too", stringtoseed("oh well"))]
    const r = new SeededRandom(pickFrom(seeds));
    contentEle.innerHTML = `You got a tiny taste of HARVEST FRUIT (not enough to get you fully Wasted, just enough to see Beyond the Veil)!<br><br><img src='images/Diorama/Inside/Hallways/apple_pixel.gif'>`;
    canvas.style.filter = r.pickFrom(filters);

  }

  //different fruit offer differet options cuz of thei rseed. and different odds
  const options = [banana, strawberry, apple, banana, strawberry, banana]
  pickFrom(options)();


  showExistingPopup(contentEle, "Gotcha")
}



//meat is simple-eustace
////even tho the event is never used need to hold it cuz events can call this and if i do the event will be considered an indexa nd it crashes whoops, thanks catalyst for catching this

const meatGet = (event, index) => {

  closeThePopup();
  const contentEle = document.createElement("div");
  //{comment, lore}
  let lore = meat_lore[(globalDataObject.meat) % meat_lore.length];

  //you only get meat for NEW books, not reading at the bookcase
  if (index) {
    lore = meat_lore[index];
  } else {
    globalDataObject.meat++;

  }
  console.log("JR NOTE: meat lore is", lore, index)


  const mainText = createElementWithClassAndParent("div", contentEle, "simple-eustace");
  mainText.innerHTML = `${lore.guest ? "A Guest Writes:" : ""}` + lore.lore.split("\n").map((i) => `<p>${i}</p>`).join("")
  if (lore.guest) {
    mainText.classList.add("simple-guest")
  }

  if (globalDataObject.current_room_id.includes("east_third_room1")) {
    mainText.classList.add('censored')
  }

  const intro = createElementWithClassAndParent("div", contentEle, "simple-terri");
  intro.innerHTML = "Terri Tip: " + lore.comment.split("\n").map((i) => `<p>${i}</p>`).join("")
  intro.style.marginTop = "31px"

  if (globalDataObject.current_room_id.includes("east_third_room1")) {
    intro.classList.add('censored')
  }

  showExistingPopup(contentEle, "Gotcha")
  save();
}

//https://yolkdump.neocities.org/zampaniodiscordarchive
//candy is simple-terri or simple-camellia (camellia will be in the lore itself, overriding the terri class)
//even tho the event is never used need to hold it cuz events can call this and if i do the event will be considered an indexa nd it crashes whoops, thanks catalyst for catching this
const candyGet = (event, index) => {
  //candy cultsists never let her sleep
  const contentEle = document.createElement("div");

  if (dreaming) {
    dreaming = false;
    hallways = { ...backup_hallways }
    contentEle.innerText = "You wake from the dream with a sickly sweet taste on your lips."
  }

  closeThePopup();
  //{comment, lore}
  let lore = candy_lore[(globalDataObject.candy) % candy_lore.length];
  //console.log("JR NOTE: candy lore is", lore)
  //you only get candy for NEW books, not reading at the bookcase

  if (index) {
    lore = candy_lore[index];
  } else {
    globalDataObject.candy++;

  }

  const mainText = createElementWithClassAndParent("div", contentEle, "simple-terri");
  if (lore.guest) {
    mainText.classList.add("simple-guest")
  }
  if (globalDataObject.current_room_id.includes("east_third_room1")) {
    mainText.classList.add('censored')
  }
  mainText.innerHTML = `${lore.guest ? "A Guest Writes:" : ""}` + lore.lore.split("\n").map((i) => `<p> ${i}</p> `).join("")

  const intro = createElementWithClassAndParent("div", contentEle, "simple-eustace");
  intro.style.marginTop = "31px"
  intro.innerHTML = "Eustace Says: " + lore.comment.split("\n").map((i) => i.trim() ? `<p>${i}</p>` : "").join("")
  if (globalDataObject.current_room_id.includes("east_third_room1")) {
    intro.classList.add('censored')
  }
  showExistingPopup(contentEle, "Gotcha")
  save();

}

//more complicated than most things you can get.
const bookGet = (amount = 1) => {
  globalDataObject.books += amount;
  save();
  const contentEle = document.createElement("div");
  contentEle.innerHTML = `You got ${amount === 1 ? "a" : amount} Book${amount === 1 ? "" : "s"}! <br> <br><img src='images/Diorama/Inside/Hallways/book_spin.gif'><br><Br>Inside the book, you are given a choice between Meat and Candy!`;
  const meatOrCandy = createElementWithClassAndParent("div", contentEle, "meatorcandy");

  const meatImg = createElementWithClassAndParent("img", meatOrCandy);
  meatImg.src = "images/Diorama/Inside/Hallways/meat.png";
  meatImg.onclick = meatGet;

  const candyImg = createElementWithClassAndParent("img", meatOrCandy);
  candyImg.src = "images/Diorama/Inside/Hallways/candy.png";
  candyImg.onclick = candyGet;

  showExistingPopup(contentEle, "Gotcha")
}

const maskLose = () => {
  const audio = new Audio("images/Diorama/foley/ready_effects/Inside/mask_use.mp3");
  audio.play();
  globalDataObject.masks += -1;
  save();
}

const keyLose = () => {
  const audio = new Audio("images/Diorama/foley/ready_effects/Inside/key_use.mp3");
  audio.play();
  globalDataObject.keys += -1;
  save();
}
const bookLose = () => {
  const audio = new Audio("images/Diorama/foley/ready_effects/Inside/key_use.mp3");
  audio.play();
  globalDataObject.books += -1;
  save();
}