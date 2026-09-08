//call via window["functionName"](arguments);

/* fat pipe functions WILL not work, make sure its a regular function to be in the window namespace
const test1 = () => {
  console.log("JR NOTE: test1")
}*/


//displays a button that asks if you want to use a key (if you have one)
// if you do, it adds a state replacement for the two ids and transitions to the new
//(presumably unlocked) state
const normalKeyLockedDoor = (current_id, unlock_id) => {
  video.pause();
  if (globalDataObject.keys > 0) {
    const c = createElementWithClassAndParent("div", story);
    const button = createElementWithClassAndParent("button", c);
    button.innerText = "Use Key?"
    button.onclick = () => {
      globalDataObject.state_changes[current_id] = unlock_id;
      keyLose(); //will handle saving
      renderRoom(hallways[unlock_id])
    }
  }

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
//any time you open a door it'll call this, when its done it'll do the callback
const youKnowEternalDarknessDoThatThingForDoors = (originalDestination) => {
  //do your best not to save while transitioning
  globalDataObject.current_room_id = originalDestination;
  save();
  video.loop = false;
  console.log("JR NOTE: youKnowEternalDarknessDoThatThingForDoors", originalDestination)
  const odds = Math.random();
  if (odds > .5) {
    const dir = "images/Diorama/Inside/Hallways/ThisIsntReal/";
    const spookyEffects = ["stick", "hand"];
    const choice = pickFrom(spookyEffects)
    video.src = dir + choice + ".mp4"
    globalDataObject.spooky_seen.push(choice);
  }

  video.onended = () => {
    console.log("JR NOTE: video ended")
    video.onended = null;
    video.loop = true;

    renderRoom(hallways[originalDestination]);
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
    renderRoom(hallways[newID])
  }

}

function openDoor4Locked() {
  const current_id = globalDataObject.current_room_id;
  const unlock_id = "4_open_unlocked_door";
  normalKeyLockedDoor(current_id, unlock_id);
}

function openDoor4UnLocked() {
  const current_id = globalDataObject.current_room_id;
  //some doors are left/right but this one is forwards
  const next_id = hallways[current_id].forwards;
  normalUnlockedDoor(current_id, next_id);
}