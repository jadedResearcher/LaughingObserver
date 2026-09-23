//call via window["functionName"](arguments);

/* fat pipe functions WILL not work, make sure its a regular function to be in the window namespace
const test1 = () => {
  console.log("JR NOTE: test1")
}*/
//do everything you can to not make any of these async, breaks cleanup functions

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


/*
Eternal darkness was SUCH a good game for how bad the actual game play  of it was.

horrible combat controls

annoying mechanics

incredible spell grammer mechanic and
you know

the whole sanity mechanic they had was perfeciton

'this can't be happening!' was so iconic.

you'd open a door, enter a room and SOMETIMES it would be weird

upside down

or there would be lots of rare items

or enemies

or somewhere entirely different

and after thirty seconds or so your charcter would scream "this can't be happening!" and instead
you'd be just entering the room you were supposed to be in and it would be normal

they famously patented the sanity system 

but jokes on them, im not using sanity as a mechanic cuz thats kinda abelist

its just random if it happens

deal with it


*/

//the longer you're in here the spookier it gets but thats not all
const calculateOddsSpooky = () => {
  let oddsToBeat = 0.99;
  if (isItMidnight()) {
    oddsToBeat = 0;//its midnight, its spooky time, obviously, plus reminder to maybe take a break
  }

  const hallwayCountMultiplier = 3;

  if (globalDataObject.hallways_entered > 51 * hallwayCountMultiplier) {
    oddsToBeat += -.05;
  }

  if (globalDataObject.hallways_entered > 13 * hallwayCountMultiplier) {
    oddsToBeat += -.05;
  }

  if (globalDataObject.hallways_entered > 31 * hallwayCountMultiplier) {
    oddsToBeat += -.05;
  }

  if (globalDataObject.hallways_entered > 66 * hallwayCountMultiplier) {
    oddsToBeat += -.05;
  }

  if (globalDataObject.hallways_entered > 113 * hallwayCountMultiplier) {
    oddsToBeat += -.05;
  }

  if (globalDataObject.hallways_entered > 666 * hallwayCountMultiplier) {
    oddsToBeat += -.1;
  }

  return Math.max(0, oddsToBeat);
}

//separate function so i can write a debug script to look at them all and make sure they work
const getSpookyEffects = () => {
  const spookyEffects = ["bigchair", "bigclose", "bigfurniture", "itwrithes", "jars", "knives", "subtle", "theblackhall", "voiddoor", "upsidedown", "bride", "bride_and_mannequin", "bigroommannequin", "corridor", "hoon", "car", "river", "where", "stick", "hand", "lady", "pumpkins", "pumpkinroom", "foghorse", "bodies"];

  if (globalDataObject.candy > globalDataObject.meat) {
    spookyEffects.push("candy")
  }

  if (globalDataObject.meat > globalDataObject.candy) {
    spookyEffects.push("meat")
  }

  if (isItMidnight()) {
    spookyEffects.push("truth");
    spookyEffects.push("midnight");
  }

  if (globalDataObject.hallways_entered > 13) {
    spookyEffects.push("family")
    spookyEffects.push("masks")
    spookyEffects.push("somanypumpkins")
    spookyEffects.push("shake")
    spookyEffects.push("plants")
    spookyEffects.push("evil")
    spookyEffects.push("jrstairs")
    spookyEffects.push("fuckeduphorse")
    spookyEffects.push("approved")

  }

  if (globalDataObject.hallways_entered > 31) {
    spookyEffects.push("plantsandblocks")
    spookyEffects.push("masksky")
    spookyEffects.push("laugh")
    spookyEffects.push("jrsky")
    spookyEffects.push("deepstairs")
    spookyEffects.push("clowns")

    spookyEffects.push("face")
    spookyEffects.push("blind")


  }

  if (globalDataObject.hallways_entered > 66) {
    spookyEffects.push("bride_with_friends")
    spookyEffects.push("tentacles")

  }

  if (globalDataObject.hallways_entered > 113) {
    spookyEffects.push("mirrorwave")
    spookyEffects.push("tentacles")
  }
  return spookyEffects;
}

//any time you open a door it'll call this, when its done it'll do the callback
const youKnowEternalDarknessDoThatThingForDoors = (originalDestination, canGaslight) => {
  //do your best not to save while transitioning
  globalDataObject.current_room_id = originalDestination;
  save();
  video.loop = false;
  console.log("JR NOTE: youKnowEternalDarknessDoThatThingForDoors", originalDestination)
  const odds = Math.random();
  const oddsToBeat = calculateOddsSpooky();
  if (canGaslight && odds > oddsToBeat) {
    const choice = pickFrom(getSpookyEffects())
    const dir = "images/Diorama/Inside/Hallways/ThisIsntReal/";
    video.pause();
    video.src = dir + choice + ".mp4";
    globalDataObject.spooky_seen.push(choice);
  }

  video.onended = () => {
    video.onended = null;
    video.loop = true;

    renderID(originalDestination)

  }
  console.log("JR NOTE: video about to play")
  video.play();

}

function testFuckery() {
  const bookcase = "images/Diorama/Inside/Hallways/1/ElectricLights/quicktest";
  const key = "images/Diorama/Inside/Hallways/1/ElectricLights/keytest";
  const odds = Math.random();
  if (odds > .6) {
    video.pause();
    video.src = bookcase + ".mp4";
    video.play();
    const textEle = story.querySelector("#room-text");
    textEle.innerText = "Who put this bookcase here? For some reason its hard to focus on...What were you doing here?"

  } else if (odds > .3) {
    video.pause();
    video.src = key + ".mp4";
    const textEle = story.querySelector("#room-text");
    textEle.innerText = "How...how is the key back? You reach for it instinctively, but your hand goes right through."
    video.play();
  }
  //final third do nothing, regular thing
}

//if you click anywhere the sunbeam glitches out, returns a function to clean that up
//a simple test in the first room
function hallwayOneSunbeam() {
  console.log("JR NOTE: hallwayOneSunbeam")
  const oldSrc = video.src;
  const fuckySunBeam = () => {
    console.log("JR NOTE: fucky sunbeam", video)
    const textEle = story.querySelector("#room-text");
    textEle.innerText = "Is...something weird going on with the light?"
    video.pause();
    video.src = "images/Diorama/Inside/Hallways/1/Sunset/deep1_no_sun.mp4";
    video.play();
  }
  const timeout = setTimeout(fuckySunBeam, 10000)
  return () => {
    if (globalDataObject.current_room_id === "1") {
      video.src = oldSrc;
    }
    //if i don't do this then no matter what, after 10 seconds, we'll see fucky sunbeam, even if we're somewehre else and its disorienting
    clearTimeout(timeout);
  }
}





//render a button to pick the key up, if you click it, replace 5 with 1005
function pickUpKey5() {
  const myID = "5";
  const newID = "5_key_gotten"
  const c = createElementWithClassAndParent("div", story);
  const button = createElementWithClassAndParent("button", c);
  button.innerText = "Take Key?"
  button.onclick = () => {
    //whenever you would render room 5, now render 1005 which is the same but no key and no function
    globalDataObject.state_changes[myID] = newID;
    keyGet(); //will handle saving
    renderID(newID)
  }

}

function takeKeyWestSunroom() {
  const myID = "west_sunroom_left1";
  const newID = "west_sunroom_left1_nokey"
  const c = createElementWithClassAndParent("div", story);
  const button = createElementWithClassAndParent("button", c);
  button.innerText = "Take Key?"
  button.onclick = () => {
    globalDataObject.state_changes[myID] = newID;
    keyGet(); //will handle saving
    renderID(newID)
  }
}

/*
switches the video to play only a single loop, then return to normal looping when its done
and also send you away from the scary door
*/
function shutDoor2() {
  video.loop = false;
  const flee = () => {
    renderID("2_sunset_front_left")
  }
  video.addEventListener("ended", flee);
  const textEle = story.querySelector("#room-text");

  const t = setTimeout(() => { textEle.innerText = "You...do not want to go into the darkness." }, 2000)
  return () => {
    video.loop = true;
    clearTimeout(t);
    video.removeEventListener("ended", flee);
  }
}



function openDoor4Locked() {
  const current_id = globalDataObject.current_room_id;
  const new_state_id = "4_open_unlocked_door"; //will know where to go next
  normalKeyLockedDoor(current_id, new_state_id);
}

function openDoor3Locked() {
  const current_id = globalDataObject.current_room_id;
  const new_state_id = "3_deep3_unlocked"; //will know where to go next
  //automatically moves past the locked door
  normalKeyLockedDoor(current_id, new_state_id, true);
}

//maybe refactor this later. 
function openDoor2MaskLocked() {
  const textEle = story.querySelector("#room-text");
  if (checkForState("2_back_left_mask")) {
    textEle.innerHTML = "The door is unlocked...You think it has something to do with the mask on the desk.";
    //no other way to reach here
    renderID("2_open_unlocked_doorleft");
  }

}

function handleDesk2Locked() {
  const textEle = story.querySelector("#room-text");

  const button = createElementWithClassAndParent("button", textEle);
  button.innerText = "Read Papers?"
  button.onclick = () => {
    const contentEle = document.createElement("img");
    contentEle.src = "images/eustaceandterri.PNG"

    showExistingPopup(contentEle, "Gotcha");
  }

  const lock = createElementWithClassAndParent("button", textEle);
  lock.innerText = "Enter Combination?"
  lock.onclick = () => {
    const win = () => {
      const myID = "2_back_left_locked";
      const newID = "2_back_left_unlocked_no_mask"
      globalDataObject.state_changes[myID] = newID;
      maskGet();
      renderID(newID);
    }
    const contentEle = document.createElement("div");
    contentEle.innerText = "The combination lock has four digits:"

    showExistingPopup(contentEle, "I give up for now...");
    comboLock(contentEle, win, 4, 6, 6, 5)
  }
}

function putMask2() {
  const textEle = story.querySelector("#room-text");

  if (globalDataObject.masks > 0) {
    const button = createElementWithClassAndParent("button", textEle);
    button.innerText = "Place Mask On Stand?"
    button.onclick = () => {
      maskLose();
      const myID = "2_back_left_unlocked_no_mask";
      const otherID = "2_back_left_locked"; //hallway still knows about this
      const newID = "2_back_left_mask"
      globalDataObject.state_changes[myID] = newID;
      //hallway should redirect to the current meta
      globalDataObject.state_changes[otherID] = newID;
      //clear out the fact that i was previously redirecting to no mask
      globalDataObject.state_changes[newID] = undefined;
      renderID(newID)
    }
  } else {
    textEle.innerText += " If you had a Mask you could place it here."
  }
}

function takeMask2() {
  const textEle = story.querySelector("#room-text");

  const button = createElementWithClassAndParent("button", textEle);
  button.innerText = "Take Mask?"
  button.onclick = () => {
    maskGet();
    const myID = "2_back_left_mask";
    const otherID = "2_back_left_locked"; //hallway still knows about this
    const newID = "2_back_left_unlocked_no_mask"
    globalDataObject.state_changes[myID] = newID;
    //hallway should redirect to the current meta
    globalDataObject.state_changes[otherID] = newID;
    //clear out the fact that i was previously redirecting to mask
    globalDataObject.state_changes[newID] = undefined;
    renderID(newID)
  }
}

function bookcase3PlaceMask() {
  const textEle = story.querySelector("#room-text");

  if (globalDataObject.masks > 0) {
    const button = createElementWithClassAndParent("button", textEle);
    button.innerText = "Place Mask On Stand?"
    button.onclick = () => {
      maskLose();
      const myID = "3_bright_left1";
      const newID = "3_bright_left1_mask"
      video.pause();
      const dir = "images/Diorama/Inside/Hallways/3_bright/left1_open_cutscene.mp4";
      video.src = dir;
      video.loop = false;
      globalDataObject.state_changes[myID] = newID;
      //hallway should redirect to the current meta
      globalDataObject.state_changes["3_bright_deep1"] = "3_bright_deep1_open";
      video.play();
      video.onended = () => {
        video.onended = null;
        video.loop = true;

        renderID(newID);
      }

    }
  }
}


function bookcase3TakeMask() {
  const textEle = story.querySelector("#room-text");

  const button = createElementWithClassAndParent("button", textEle);
  button.innerText = "Take Mask?"
  button.onclick = () => {
    maskGet();

    //clear state changes
    globalDataObject.state_changes["3_bright_left1"] = undefined;
    globalDataObject.state_changes["3_bright_deep1"] = undefined;

    renderID("3_bright_left1")
  }
}


//note to future jr....the mirrors keep corrupting players and i literally can't make this up
//right now its because the json save data is getting truncated (so its not too spammy)
//but that means that STATE changes (like picking a mask up) get truncated so you might get yeeted to the OUTSIDE at random
//fun
function lookIntoTheMirror() {
  const textEle = story.querySelector("#room-text");

  const button = createElementWithClassAndParent("button", textEle);
  button.innerText = "Look Into The Mirror?"
  button.onclick = () => {
    try {
      sendPrayerText(); //a copy of a copy

      //i wouldn't worry about it
      const another_you_from_another_world = JSON.parse(pickFrom(getWaitingReflections()))
      textEle.innerText = "You feel a wave of vertigo as your world view shifts.";
      globalDataObject = another_you_from_another_world;
      globalDataObject.stranger = true;
      //your face is not your face your you is not your you
      clownsona.fromJSON(globalDataObject.clownsona)
      clownsona.rerenderBuffer();
      save();
      load();//sets defaults if whoevers save doesnt have them
      setTimeout(() => {
        renderID(globalDataObject.current_room_id);
      }, 2000)

    } catch (e) {
      console.error(e)
      textEle.innerText = "You don't know why you feel relived that nothing happened..."
    }
  }
}



function unlockDoorForwards() {
  const current_id = globalDataObject.current_room_id;
  //some doors are left/right but this one is forwards
  const next_id = hallways[current_id].forwards;
  normalUnlockedDoor(current_id, next_id, true);
}

function unlockDoorBackwards() {
  const current_id = globalDataObject.current_room_id;
  //some doors are left/right but this one is back
  const next_id = hallways[current_id].backwards;
  normalUnlockedDoor(current_id, next_id);
}


function unlockDoorLeft() {
  const current_id = globalDataObject.current_room_id;
  const next_id = hallways[current_id].left;
  normalUnlockedDoor(current_id, next_id);
}


function unlockDoorRight() {
  const current_id = globalDataObject.current_room_id;
  //some doors are left/right but this one is back
  const next_id = hallways[current_id].right;
  normalUnlockedDoor(current_id, next_id);
}

function lookCloserAtRules() {
  const textEle = story.querySelector("#room-text");

  const c = createElementWithClassAndParent("div", textEle);
  const button = createElementWithClassAndParent("button", c);
  button.innerText = "Look Closer At Rules?"
  button.onclick = () => {
    const contentEle = document.createElement("div");
    contentEle.innerHTML = `These rules seem to apply to the room past this door:<br><Br> <img style='max-height:100%' src='images/Diorama/Inside/Hallways/rules.PNG' >
    <ol>
    <li>If time is stable, go through the far door.</li>
    <li>If time is NOT stable, turn around and leave the room.</li>
    <li>Past room 8 is where time solidifies fully.</li>
    <li>You cannot leave if you have a number.</li>
    (NOTE: Some instabilities are more subtle than others. There is no penalty for missing them, save starting the loop over from 0.)
    </ol>`

    showExistingPopup(contentEle, "Gotcha")
  }


}

function victory7() {
  if (currentRoomBeaten > 0) {
    const dir = "images/Diorama/Inside/Hallways/7/victory.mp4";
    video.pause();
    video.src = dir;
    video.loop = false;
    video.play();
    resumePlayingRegularVideoOnEndOfTemporaryOne();
    currentRoomBeaten = 0;
  }

}

function pressBigRedButton7() {
  const textEle = story.querySelector("#room-text");
  const c = createElementWithClassAndParent("div", textEle);
  const button = createElementWithClassAndParent("button", c);
  button.innerText = "Press Them, What's the Worst That Can Happen?"
  button.onclick = () => {
    button.remove();
    const dir = "images/Diorama/Inside/Hallways/7/power_cutscene.mp4";
    video.pause();
    video.src = dir;
    video.loop = false;
    video.play();
    const json = hallways[globalDataObject.current_room_id];

    video.onended = () => {
      globalDataObject.powerWorking = true;
      video.onended = null;
      video.src = "images/Diorama/Inside/Hallways/" + json.src + ".mp4";
      video.loop = true;
      window.requestAnimationFrame(() => video.play())
      renderID("7_bright_deep2");
    }
  }

}

function pressBigRedButton7Off() {
  const textEle = story.querySelector("#room-text");
  const c = createElementWithClassAndParent("div", textEle);
  const button = createElementWithClassAndParent("button", c);
  button.innerText = "Turn The Power Back Off"
  button.onclick = () => {
    button.remove();
    video.pause();
    const dir = "images/Diorama/Inside/Hallways/7/power_cutscene_but_backwards.mp4";
    video.src = dir;
    video.loop = false;
    video.play();
    const json = hallways[globalDataObject.current_room_id];

    video.onended = () => {
      globalDataObject.powerWorking = false;
      video.onended = null;
      video.src = "images/Diorama/Inside/Hallways/" + json.src + ".mp4";
      video.loop = true;
      window.requestAnimationFrame(() => video.play())
      renderID("7_deep2");
      textEle.innerText = "...Somehow the sun is setting again."
    }
  }

}

function embraceTheUnknown() {
  const urls = ["http://farragofiction.com/MallSim/", "http://lavinraca.eyedolgames.com/TheHarvestGames/", "http://lavinraca.eyedolgames.com/TheHarvestWakes/", "http://lavinraca.eyedolgames.com/Week4/Corn/", "http://lavinraca.eyedolgames.com/Week3/Corn/", "http://lavinraca.eyedolgames.com/Week2/Corn/", "http://lavinraca.eyedolgames.com/Week1/Corn/"]
  window.open(pickFrom(urls), '_blank');

}

//don't make this async, it breaks teh cleanup stuff.
function showClownsonaInVideo() {
  clownsona.getPrerenderedClown().then((sprite) => {
    renderingClownsona = sprite;
  })
}

function editClownsona() {
  const textEle = story.querySelector("#room-text");

  const button = createElementWithClassAndParent("button", textEle);
  button.innerText = "Edit Clownsona?"
  button.onclick = async () => {
    alert("JR NOTE: save current doll layers to global data object plz")
    const contentEle = document.createElement("div");
    contentEle.innerHTML = "This clown represents you. You appear this way while praying, to the Harvest. You apepar this way to others. How do you want this clown to be?"


    clownsona.render(contentEle);

    showExistingPopup(contentEle, "Stop Editing Clownsona")

  }
}

function pumpkin1() {
  const textEle = story.querySelector("#room-text");
  const c = createElementWithClassAndParent("div", textEle);

  const button = createElementWithClassAndParent("button", c);
  button.innerText = "Commune with Pumpkins?"
  button.onclick = () => {

    const contentEle = document.createElement("div");
    contentEle.innerHTML = "If you know the right words, you can teleport anywhere. Why not go to '1' or to 'west_sunroom_deep1'?<br><Br>Be Cautious: You never know where you might end up if the words aren't right.";
    const { input } = createTextInputWithLabel(contentEle, "teleport", "Teleportation ID:", "");
    const button2 = createElementWithClassAndParent("button", contentEle);
    button2.innerText = "Ask the Pumpkins to Take You"


    button2.onclick = () => {
      if (hallways[input.value]) {
        console.log("JR NOTE: tyring to teleport to", input.value)
        renderID(input.value);
        closeThePopup();
      } else {
        closeThePopup();
        embraceTheUnknown();
      }
    }

    showExistingPopup(contentEle, "I give up for now...");
  }
}



//this won't render right on all devices, so use this to make screenshots you display as images
function eustaceAndTerri() {

  const contentEle = document.createElement("div");
  contentEle.innerHTML = `<div class='terri'>
    <img class='pumpkin1' src='images/pumpkinstamp.PNG'>    <img class='pumpkin2' src='images/pumpkinstamp.PNG'>

    <br><Br><i>I am so excited you could make it here!
    <br><Br>This years Harvest Festival is going to be the BEST ONE EVER! 
    <br><Br>
    We, the Church of the Candy Harvest, have made sure to prepare LOTS of activities for everyone to do!
    <br><Br>
    We aren't like those squares over in the meat faction, you know?
    <br><Br>
    What's the point of Halloween if not to have spooky fun?
    <br><Br>
    Anyways we wanted this puzzle to be super easy! So that no one gets stuck in the boring start of the maze!
    <Br><Br>
    So the combination lock is 4665!
    <br><Br>
    But you probably already knew that because thats a sacred number to the Harvest!
    <br><Br>
    Anyways I hope you have so so much fun!
    <br><Br>
    -Terri
    <br>    <img class='pumpkin3' src='images/pumpkinstamp.PNG'>    <img class='pumpkin4' src='images/pumpkinstamp.PNG'>

</i>
    <div class='eustace'>Classic Terri. <Br>Got so excited she forgot no one could READ this damn letter in the dark. <br>Well. 'square' or not, THIS meat faction guy is gonna make sure our Guests can get the power on.<Br> Amazing what you can do when you're mostly resting all year, am I right? Eustace out.</div>
</div>

<br><Br><Br><Br>
    There is a scrawled note in the margins that reads '<i>Classic Terri. Got so excited she forgot no one could READ this damn letter in the dark. Well. 'square' or not, THIS meat faction guy is gonna make sure our Guests can get the power on. Amazing what you can do when you're mostly resting all year, am I right? Eustace out.</i>'`;

  showExistingPopup(contentEle, "Gotcha")
}
