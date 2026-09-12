//call via window["functionName"](arguments);

/* fat pipe functions WILL not work, make sure its a regular function to be in the window namespace
const test1 = () => {
  console.log("JR NOTE: test1")
}*/

//bespoke functions can use this to ask if a state has been set
const checkForState = (state_name) => {
  const values = Object.values(globalDataObject.state_changes)
  return values.includes(state_name);
}

//displays a button that asks if you want to use a key (if you have one)
// if you do, it adds a state replacement for the two ids and transitions to the new
//(presumably unlocked) state
const normalKeyLockedDoor = (current_id, unlock_id) => {
  video.pause();
  if (globalDataObject.keys > 0) {
    const textEle = story.querySelector("#room-text");

    const c = createElementWithClassAndParent("div", textEle);
    const button = createElementWithClassAndParent("button", c);
    button.innerText = "Use Key?"
    button.onclick = () => {
      globalDataObject.state_changes[current_id] = unlock_id;
      keyLose(); //will handle saving
      renderID(unlock_id)

    }
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
  one_ele.input.onchange = checkWin;
  two_ele.input.onchange = checkWin;
  three_ele.input.onchange = checkWin;
  four_ele.input.onchange = checkWin;
}



const normalUnlockedDoor = (current_id, next_id) => {
  video.pause();
  youKnowEternalDarknessDoThatThingForDoors(next_id);
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
  contentEle.innerHTML = `You got a Mask!<br><br><img src='images/Diorama/Inside/mask_spin.gif'>`;

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


  if (globalDataObject.hallways_entered > 51) {
    oddsToBeat += -.1;
  }

  if (globalDataObject.hallways_entered > 13) {
    oddsToBeat += -.1;
  }

  if (globalDataObject.hallways_entered > 31) {
    oddsToBeat += -.1;
  }

  if (globalDataObject.hallways_entered > 66) {
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
const youKnowEternalDarknessDoThatThingForDoors = (originalDestination) => {
  //do your best not to save while transitioning
  globalDataObject.current_room_id = originalDestination;
  save();
  video.loop = false;
  console.log("JR NOTE: youKnowEternalDarknessDoThatThingForDoors", originalDestination)
  const odds = Math.random();
  const oddsToBeat = calculateOddsSpooky();
  if (odds > oddsToBeat) {



    const choice = pickFrom(getSpookyEffects())
    const dir = "images/Diorama/Inside/Hallways/ThisIsntReal/";

    video.src = dir + choice + ".mp4"
    globalDataObject.spooky_seen.push(choice);
  }

  video.onended = () => {
    console.log("JR NOTE: video ended")
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
    video.src = bookcase + ".mp4";
    video.play();
    const textEle = story.querySelector("#room-text");
    textEle.innerText = "Who put this bookcase here? For some reason its hard to focus on...What were you doing here?"

  } else if (odds > .3) {
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
    video.src = "images/Diorama/Inside/Hallways/1/Sunset/deep1_no_sun.mp4";
    video.play();
  }
  const timeout = setTimeout(fuckySunBeam, 10000)
  return () => {
    video.src = oldSrc;
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
  const unlock_id = "4_open_unlocked_door"; //will know where to go next
  normalKeyLockedDoor(current_id, unlock_id);
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

function lookIntoTheMirror() {
  const textEle = story.querySelector("#room-text");

  const button = createElementWithClassAndParent("button", textEle);
  button.innerText = "Look Into The Mirror?"
  button.onclick = () => {
    try {
      const another_you_from_another_world = JSON.parse(raw_prayers[0].prayerObject["save-data"])
      textEle.innerText = "You feel a wave of vertigo as your world view shifts.";
      globalDataObject = another_you_from_another_world;
      globalDataObject.stranger = true;
      save();
      load();//sets defaults if whoevers save doesnt have them
      setTimeout(() => {
        renderID(globalDataObject.current_room_id);
      }, 1000)

    } catch (e) {
      textEle.innerText = "You don't know why you feel relived that nothing happened..."
    }
  }
}



function unlockDoorForwards() {
  const current_id = globalDataObject.current_room_id;
  //some doors are left/right but this one is forwards
  const next_id = hallways[current_id].forwards;
  normalUnlockedDoor(current_id, next_id);
}

function lookCloserAtRules() {
  const textEle = story.querySelector("#room-text");

  const c = createElementWithClassAndParent("div", textEle);
  const button = createElementWithClassAndParent("button", c);
  button.innerText = "Look Closer At Rules?"
  button.onclick = () => {
    const contentEle = document.createElement("div");
    contentEle.innerHTML = `<img style='max-height:100%' src='images/Diorama/Inside/Hallways/rules.PNG' >
    <ol>
    <li>If time is stable, go through the far door.</li>
    <li>If time is NOT stable, turn around and leave the room.</li>
    <li>Past room 8 is where time solidifies fully.</li>
    (NOTE: Some instabilities are more subtle than others. There is no penalty for missing them, save starting the loop over from 0.)
    </ol>`

    showExistingPopup(contentEle, "Gotcha")
  }

  const button2 = createElementWithClassAndParent("button", c);
  button2.innerText = "Enter"
  const current_id = globalDataObject.current_room_id;
  const next_id = hallways[current_id].forwards;

  button2.onclick = () => {
    renderID(next_id)
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
