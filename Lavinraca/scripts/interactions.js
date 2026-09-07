//call via window["functionName"](arguments);

/* fat pipe functions WILL not work, make sure its a regular function to be in the window namespace
const test1 = () => {
  console.log("JR NOTE: test1")
}*/



function test2() {
  console.log("JR NOTE: test interaction event");
  return () => { console.log("JR NOTE: test cleaning up") }
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
  if (odds > .9999999991) {
    const spookyEffects = ["images/Diorama/Inside/Hallways/1/ElectricLights/quicktest.mp4"];
    video.src = pickFrom(spookyEffects)
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
    video.src = "images/Diorama/Inside/Hallways/1/Weird/deep_panel1.mp4";
    video.play();
  }
  window.addEventListener("click", fuckySunBeam);
  return () => {
    video.src = oldSrc;
    window.removeEventListener("click", fuckySunBeam)
  }
}

function openDoor4111() {
  console.log("JR NOTE: openDoor4111")
  video.pause();
  const json = hallways["4111"]
  console.log("JR NOTE: Json for openDoor4111 is", json)
  youKnowEternalDarknessDoThatThingForDoors(json.forwards);
}