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
    video.src = "images/Diorama/Inside/Hallways/" + json.src + ".mp4";
    video.loop = true;
    window.requestAnimationFrame(() => video.play())
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
        console.log("JR NOTE: skip normal door opening")
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
      console.log("JR NOTE: did not win", onewin, twowin, threewin, fourwin)
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

const keyGet = () => {
  globalDataObject.keys++;
  save();
  const contentEle = document.createElement("div");
  contentEle.innerHTML = `You got a Key!<br><br><img src='images/Diorama/Inside/Hallways/key.gif'>`;

  showExistingPopup(contentEle, "Gotcha")
}

const maskGet = () => {
  globalDataObject.masks++;
  save();
  const contentEle = document.createElement("div");
  contentEle.innerHTML = `You got a Mask!<br><br><img src='images/Diorama/Inside/Hallways/mask_spin.gif'>`;

  showExistingPopup(contentEle, "Gotcha")
}

//more complicated than most things you can get.
const bookGet = () => {
  globalDataObject.books++;
  save();
  const contentEle = document.createElement("div");
  contentEle.innerHTML = `You got a Book!<br><br><img src='images/Diorama/Inside/Hallways/book_spin.gif'>`;
  const meatOrCandy = createElementWithClassAndParent("div", contentEle);
  meatOrCandy.innerText = "TODO: show meat and candy graphics, pick one, and get lore"

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