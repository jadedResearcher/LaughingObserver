//call via window["functionName"](arguments);

/* fat pipe functions WILL not work, make sure its a regular function to be in the window namespace
const test1 = () => {
  console.log("JR NOTE: test1")
}*/
//do everything you can to not make any of these async, breaks cleanup functions



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

  const hallwayCountMultiplier = 4;

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

const spookyEffects = ["tridoor", "bigchair", "bigclose", "bigfurniture", "itwrithes", "jars", "knives", "subtle", "theblackhall", "voiddoor", "upsidedown", "bride", "bride_and_mannequin", "bigroommannequin", "corridor", "hoon", "car", "river", "where", "stick", "hand", "lady", "pumpkins", "pumpkinroom", "foghorse", "bodies"];
const surpressedEffects = [];
//separate function so i can write a debug script to look at them all and make sure they work
const initSpookyEffects = () => {
  //console.log("JR NOTE: calling init spoooky effects a single time")
  if (globalDataObject.candy > globalDataObject.meat && globalDataObject.candy > 10) {
    spookyEffects.push("candy")
    spookyEffects.push("candy")
    spookyEffects.push("candy")
    spookyEffects.push("candy")
    spookyEffects.push("candy")

  }

  if (globalDataObject.meat > globalDataObject.candy && globalDataObject.meat > 10) {
    spookyEffects.push("meat")
    spookyEffects.push("meat")
    spookyEffects.push("meat")
    spookyEffects.push("meat")
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
    spookyEffects.push("maccus_sprint")


  }

  if (globalDataObject.hallways_entered > 66) {
    spookyEffects.push("bride_with_friends")
    spookyEffects.push("maccus_ball")
    spookyEffects.push("maccus_rotation")
    spookyEffects.push("mob_for_maccus")

  }

  if (globalDataObject.hallways_entered > 113) {
    spookyEffects.push("mirrorwave")
    spookyEffects.push("tentacles")
  }
  //console.log("JR NOTE: spooky effects is", spookyEffects)
  return spookyEffects;
}

//any time you open a door it'll call this, when its done it'll do the callback
const youKnowEternalDarknessDoThatThingForDoors = (originalDestination, canGaslight) => {
  const availableEffects = [...spookyEffects];
  //let people censor
  for (let e of surpressedEffects) {
    removeItemOnce(availableEffects, e);
  }
  //console.log("JR NOTE: availableEffects is", availableEffects)
  //do your best not to save while transitioning
  globalDataObject.current_room_id = originalDestination;
  save();
  video.loop = false;
  //console.log("JR NOTE: youKnowEternalDarknessDoThatThingForDoors", originalDestination)
  const odds = Math.random();
  const oddsToBeat = calculateOddsSpooky();
  if (canGaslight && odds > oddsToBeat) {
    const choice = pickFrom(availableEffects)
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
  //note: i am so tired of having errors that i don't care about
  //yeah yeah you can't finish your play because i changed src before you were finishing loading
  //old internet didn't use to care
  video.play().catch(() => { });

}

const fillGalleryWithBTS = async (contentEle) => {
  //if we're running locally look at remote
  const first = window.location.href.includes("laughing") ? "" : "https://laughing.observer/Lavinraca/"

  const dir = first + "images/Diorama/Inside/Hallways/BTS/";

  const images = await getImages(dir);
  const containerGallery = createElementWithClassAndParent("div", contentEle);
  containerGallery.id = "gallery-container";
  console.log("JR NOTE: images", images)
  for (let img of images) {
    const div = createElementWithClassAndParent("div", containerGallery);
    div.style.marginTop = "31px"

    const i = createElementWithClassAndParent("img", div);
    i.src = dir + img;
    const label = createElementWithClassAndParent("div", div);
    label.innerText = img;
    label.style.textDecoration = "underlined"

  }
}

function jrsHighlySelfIndulgentSpiel() {
  const chosenId = getRandomHallwayID();
  if (chosenId === globalDataObject.current_room_id) {
    const textEle = story.querySelector("#room-text");
    textEle.innerText += "Oh. Uh! Sorry about that. Dream JR gets a little...aggressive. Try refreshing the page if you want to escape."
  }
  hallways[globalDataObject.current_room_id].backwards = chosenId;
  //this ALSO ominously fades to black when it ends, but thats because
  //looping dialogue is a sin
  if (video.paused) {
    const textEle = story.querySelector("#room-text");

    const button = createElementWithClassAndParent("button", textEle);
    button.innerText = "Whoops, you refreshed here and its not autoplaying. Click this."
    button.onclick = () => {
      video.play();
      button.remove();
    }

  }
  video.loop = false;
  video.onended = () => {
    video.onended = undefined;
    setTimeout(() => {
      const contentEle = document.createElement("div");
      contentEle.innerHTML = '<h2>Behind The Scenes Shots</h2>'
      showExistingPopup(contentEle, "Stop Viewing")
      fillGalleryWithBTS(contentEle);

    }, 2000)


  }
}

function gaslightEastFirstRoom3() {
  const dir = "images/Diorama/Inside/Hallways/east_first_room3/"
  const noMap = "right_nomap.mp4";
  const noBookcase = "right_no_bookcase.mp4";
  const gaslightFlicker = "right_bookcase_gaslight.mp4"
  const bookCaseCoverMap = "right_bookcasecovering_map.mp4"
  const noNOthing = "right_no_nothing.mp4"
  const backwards = "right_backwards.mp4"
  const possibilities = [noMap, noBookcase, gaslightFlicker, bookCaseCoverMap, noNOthing, backwards];
  const choice = pickFrom(possibilities);

  if (Math.random() > 0.75) {
    //do nothing, its literally fine
    return;
  }

  video.pause();
  video.src = dir + choice;
  video.play().catch(() => { });
  const textEle = story.querySelector("#room-text");

  if (choice === noNOthing) {
    textEle.innerText = "There was never anything here."
  }

  if (choice === noMap) {
    textEle.innerText = "Wasn't there a map here?"
  }

  if (choice === gaslightFlicker) {
    textEle.innerText = "..."
  }

  if (choice === backwards) {
    const tmp = textEle.innerText;
    textEle.innerText = "";

    const mirrorText = createElementWithClassAndParent("div", textEle);
    mirrorText.innerText = tmp;
    mirrorText.style.transform = "scaleX(-1)"


  }

  if (choice === noBookcase) {
    textEle.innerText = "It's a good thing nothing blocks your view of this map. ";
    const button = createElementWithClassAndParent("button", textEle);
    button.innerText = "View Map?";
    button.onclick = () => {
      const contentEle = document.createElement("div");
      contentEle.innerHTML = `This map seems to be only accurate while the Harvest slept... and might not even be that accurate.<img src='${dir}/secret.png'>`
      showExistingPopup(contentEle, "Stop Viewing")
    }


  }



}



//http://farragofiction.com/Gopher/NORTH/EAST/NORTH/NORTH/NORTH/NORTH/NORTH/SOUTH/NORTH/EAST/EAST/SOUTH/
function thereIsNothing() {
  toggleVoid();
  bgMusic.pause();
  video.loop = false;
  video.onended = () => {
    video.onended = undefined;
    textEle.innerHTML = "There is <a target='_blank' href='http://farragofiction.com/Gopher/NORTH/EAST/NORTH/NORTH/NORTH/NORTH/NORTH/SOUTH/NORTH/EAST/EAST/SOUTH/'>nothing</a> left to give."

  }
}

function theEnd() {
  const textEle = story.querySelector("#room-text");

  video.loop = false;
  video.onended = () => {
    video.onended = undefined;
    textEle.innerText = "There is nothing else. You've reached the end."
    //ic offered me even more music so tied it to this contemplatative room with a piano in it
    bgMusic.src = "music/often such miserable things.mp3";
    bgMusic.loop = false;
    bgMusic.onloadedmetadata = () => {
      bgMusic.loadedmetadata = undefined;
      tryPlayBgMusic();
    }

    bgMusic.onended = () => {
      bgMusic.onended = false;
      textEle.innerText = "Even the music ends."

    }
  }

  return () => {
    bgMusic.src = weird;
    bgMusic.loop = true;
    tryPlayBgMusic();
  }
}

function onlyOnce() {
  const textEle = story.querySelector("#room-text");

  video.loop = false;
  video.onended = () => {
    video.onended = undefined;

  }
}

function gaslightToShowCombo() {
  const bookcase = "images/Diorama/Inside/Hallways/1/ElectricLights/quicktest";
  const key = "images/Diorama/Inside/Hallways/1/ElectricLights/keytest";
  const combo = "images/Diorama/Inside/Hallways/1/ElectricLights/1031";

  const odds = Math.random();
  if (odds > .75) {
    video.pause();
    video.src = bookcase + ".mp4";
    video.play().catch(() => { });
    const textEle = story.querySelector("#room-text");
    textEle.innerText = "Who put this bookcase here? For some reason its hard to focus on...What were you doing here?"

  } else if (odds > .5) {
    video.pause();
    video.src = key + ".mp4";
    const textEle = story.querySelector("#room-text");
    textEle.innerText = "How...how is the key back? You reach for it instinctively, but your hand goes right through."
    video.play().catch(() => { });
  } else if (odds > .25) {
    video.pause();
    video.src = combo + ".mp4";
    const textEle = story.querySelector("#room-text");
    textEle.innerText = "'1031' is scribbled on the wall. What could it mean?"
    video.play().catch(() => { });
  }
  //final third do nothing, regular thing
}

//https://okgo.net/2009/02/26/do-what-you-want-version-2-wallpaper-background/ this remains the most me coded song of all time
//faceless horrors trying out new things and encouraging you to do so as well


//if you click anywhere the sunbeam glitches out, returns a function to clean that up
//a simple test in the first room
function hallwayOneSunbeam() {
  //console.log("JR NOTE: hallwayOneSunbeam")
  const oldSrc = video.src;
  const fuckySunBeam = () => {
    console.log("JR NOTE: fucky sunbeam", video)
    const textEle = story.querySelector("#room-text");
    textEle.innerText = "Is...something weird going on with the light?"
    video.pause();
    video.src = "images/Diorama/Inside/Hallways/1/Sunset/deep1_no_sun.mp4";
    video.play().catch(() => { });
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


function theDoorIsAJar() {
  const textEle = story.querySelector("#room-text");
  textEle.innerText += " When Is A Door Not A Door?"
  const c = createElementWithClassAndParent("div", story);
  const button = createElementWithClassAndParent("button", c);
  button.innerText = "When It's a Jar.";
  button.onclick = () => {
    renderID("east_third_room2/Jar_deep1");
    justifyAllRecursion();
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


function openDoorEastFirstLocked() {
  const current_id = globalDataObject.current_room_id;
  const new_state_id = "east_first_1_enter"; //will know where to go next
  //automatically moves past the locked door
  normalKeyLockedDoor(current_id, new_state_id, false);
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

function readDesk2Papers() {
  const textEle = story.querySelector("#room-text");

  const button = createElementWithClassAndParent("button", textEle);
  button.innerText = "Read Papers?"
  button.onclick = () => {
    const contentEle = document.createElement("div");
    contentEle.innerHTML = `<img src = 'images/eustaceandterri.PNG'> <br><Br>
        The note reads:
        <div class='simple-terri'>
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
                            </div>
                              <br><Br>
                                And then someone scribbled onto it in blue ink: <br><Br>

                                  <div class='simple-eustace'>Classic Terri. <Br>Got so excited she forgot no one could READ this damn letter in the dark. <br>Well. 'square' or not, THIS meat faction guy is gonna make sure our Guests can get the power on.<Br> Amazing what you can do when you're mostly resting all year, am I right? Eustace out.</div>
                                    `


    showExistingPopup(contentEle, "Gotcha");
  }
}

function handleDesk2Locked() {
  const textEle = story.querySelector("#room-text");
  const lock = createElementWithClassAndParent("button", textEle);
  lock.innerText = "Enter Combo?"
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

function getEntranceBook() {
  const textEle = story.querySelector("#room-text");
  const lock = createElementWithClassAndParent("button", textEle);
  lock.innerText = "Take Book?"
  lock.onclick = () => {
    const myID = "1_bright";
    const newID = "1_bright_no_book"
    globalDataObject.state_changes[myID] = newID;
    bookGet();
    renderID(newID);
  }
}

function getFirstBook() {
  const textEle = story.querySelector("#room-text");
  const lock = createElementWithClassAndParent("button", textEle);
  lock.innerText = "Enter Combo?"
  lock.onclick = () => {
    const win = () => {
      const myID = "5_bright";
      const newID = "5_bright_book_got"
      globalDataObject.state_changes[myID] = newID;
      bookGet();
      renderID(newID);
    }
    const contentEle = document.createElement("div");
    contentEle.innerText = "The combination lock has four digits:"

    showExistingPopup(contentEle, "I give up for now...");
    comboLock(contentEle, win, 1, 0, 3, 1)
  }
}

function tradeKeyForBook() {
  if (globalDataObject.keys < 1) {
    return;
  }
  const textEle = story.querySelector("#room-text");
  const lock = createElementWithClassAndParent("button", textEle);

  lock.innerText = "Use Key On Drawer?"
  lock.onclick = () => {
    keyLose();
    bookGet();
    renderID("east_third_room3_deep1")

  }
}

function technologyRoom() {
  const textEle = story.querySelector("#room-text");
  const lock = createElementWithClassAndParent("button", textEle);
  lock.innerText = "Enter Safe Combo?"
  lock.onclick = () => {
    const win = async () => {
      maskGet();
    }
    const contentEle = document.createElement("div");
    contentEle.innerText = "The combination lock has four digits:"

    showExistingPopup(contentEle, "I give up for now...");
    //Z13 is the combo
    comboLock(contentEle, win, 2, 6, 1, 3)
  }

  if (globalDataObject.keys > 0) {
    const drawer = createElementWithClassAndParent("button", textEle);
    drawer.innerText = "Use Key On Drawer?"
    drawer.onclick = () => {
      keyLose();
      bookGet();
      renderID("east_third_room3_deep1")
    }
  }

  //this is the guts of the harvest head btw
  if (globalDataObject.books > 0) {
    const drawer = createElementWithClassAndParent("button", textEle);
    drawer.innerText = "Sacrifice Book To View Prayers On Screen?"
    drawer.onclick = () => {
      bookLose();
      const contentEle = document.createElement("div");
      contentEle.innerText = "Prayers"
      let commands = clean_answered_prayers;
      commands = commands.reverse();
      const ol = createElementWithClassAndParent("ol", contentEle);

      for (let c of commands) {
        //c.prayer, c.response
        const prayer = createElementWithClassAndParent("li", ol);
        prayer.style.marginBottom = "31px"
        const p = createElementWithClassAndParent("div", prayer);
        p.innerText = c.prayer;
        const r = createElementWithClassAndParent("div", prayer, 'harvest');
        r.innerText = c.response;
      }

      showExistingPopup(contentEle, "Gotcha");
    }
  } else {
    const span = createElementWithClassAndParent("span", textEle);
    span.innerText = "You wish you had a Book to sacrifice to the gutted Harvest screen."
  }
}


function openSecretPassageSafe() {
  const textEle = story.querySelector("#room-text");
  const lock = createElementWithClassAndParent("button", textEle);
  lock.innerText = "Enter Safe Combo?"
  lock.onclick = () => {
    const win = async () => {
      //you can open it as many times as you want now
      //const myID = "SecretPassageway_right2";
      //const newID = "SecretPassageway_right2_safe_plundered"

      //because i had to be fancy and make the secret passage way reversable
      //const myIDBackwards = "SecretPassagewayWest_left1";
      //const newIDBackwards = "SecretPassagewayWest_left1_plundered";
      //globalDataObject.state_changes[myID] = newID;
      //globalDataObject.state_changes[myIDBackwards] = newIDBackwards;

      textEle.innerText = "Space itself seems to fold around you, revealing previously hidden dimensions to this room."
      await sleep(3000);

      const contentEle = document.createElement("div");
      contentEle.style.color = "red";
      contentEle.innerHTML = `<h2>The Parable of the Wanderer</h2><Br>`;
      const resultsEle = createElementWithClassAndParent("div", contentEle);
      resultsEle.id = "resultsEle";
      showExistingPopup(contentEle, "Leave")
      runSecret("the door is a jar");
      renderID(newID);
    }
    const contentEle = document.createElement("div");
    contentEle.innerText = "The combination lock has four digits:"

    showExistingPopup(contentEle, "I give up for now...");
    comboLock(contentEle, win, 1, 3, 1, 3)
  }
}

function seeTheLadder() {
  if (globalDataObject.wasted) {
    video.src = hallwayDir + "SecretPassageway/right2_ladder" + ".mp4";
    const textEle = story.querySelector("#room-text");
    const button = createElementWithClassAndParent("button", textEle);
    button.innerText = "Climb Ladder?"
    button.onclick = () => {
      const atticID = "attic";
      renderID(atticID)
    }
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
      const secretID = "SecretPassagewayWest_deep2";
      const secretNewID = "SecretPassagewayWest_deep2_open";
      video.pause();
      const dir = "images/Diorama/Inside/Hallways/3_bright/left1_open_cutscene.mp4";
      video.src = dir;
      video.loop = false;
      globalDataObject.state_changes[secretID] = secretNewID;
      globalDataObject.state_changes[myID] = newID;

      //hallway should redirect to the current meta
      globalDataObject.state_changes["3_bright_deep1"] = "3_bright_deep1_open";
      video.play().catch(() => { });
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
    globalDataObject.state_changes["SecretPassagewayWest_deep2"] = undefined;


    renderID("3_bright_left1")
  }
}

function becomeCatSpiral() {
  const textEle = story.querySelector("#room-text");

  const button = createElementWithClassAndParent("button", textEle);
  button.innerText = "Look Into The Mirror?"
  button.onclick = () => {
    try {

      //i wouldn't worry about it
      const another_you_from_another_world = specialReflectionCatSpiral;
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

function justifyAllRecursion() {
  recursionLevel++;
}

function unjustifyRecursion() {
  recursionLevel = 0;
}

function deployJoke() {
  faceMoundLoop();
  const textEle = story.querySelector("#room-text");
  const jokesRaw = `Did you hear about how the Eye Killer attended a fancy costume party? She absolutely slayed!
  Did you hear about the Knight of Fated End let herself get attached to a Cult member?  She really lost her head!
  What's worse than one Echidna? Two Echidnas!
  Did you hear that a thief broke into Twig's Warehouse last night?  They never found the body!
  What do you call an alligator in a vest? An Investigator!
  Why is there a fence around the Harvest's House? Because people are dying to get in.
  Why is there a fence around a graveyard? Because people are dying to get in!
  How do you make an octopus laugh? You give her Ten Tickles!
  What did the Bufallo say to his son when he went away to college?  Bison!
  What do you call a happy cowboy? A jolly rancher?
  Why am I in bed? Because I want to go to bed EARLy!
  Why did the ghost cross the road? To get to the other side!
  What's a dentist's favorite time? Tooth Hurty!
  How do you fix a leaky pumpkin? With a pumpkin patch!
  Why did the scarecrow win an award? He was outstanding in his field!
  Why are ghosts such bad liars? You can see right through them!
  What kind of ship does Dracula have? A blood vessel!
  Why did the vampire need mouth wash? Because he had bat-breath!
  Why couldn't the skeleton cross the road? He didn't have the guts!
  How do you know if Camille is feeling unwell? She's coffin!
  What's a witches favorite class in school? Spelling!
  Why didn't the ghost attend the dance? Because he had no body to dance with!
  What runs around a cemetary but never moves?  A fence!
  Did you hear about the pile of flesh created to provide body parts for the ever fickle whims of Observers wishing to be embodied in a Universe inimical to their very existence? He said 'Nice to meat you!'
  What did the butcher say to the cow? Nice to meat you!
  What did the Sheep say to the Hund who asked her to repeat herself? You herd me!
  `;
  const jokes = jokesRaw.split("\n")
  textEle.innerText = pickFrom(jokes);
  const button = createElementWithClassAndParent("button", textEle);
  button.style.display = "block"
  button.innerText = "Tell Me Another Joke"
  button.onclick = () => {
    deployJoke();
  }
}


function theEarl() {
  const textEle = story.querySelector("#room-text");
  const button = createElementWithClassAndParent("button", textEle);
  button.innerText = "Of Course!"
  button.onclick = () => {
    deployJoke();
  }
  faceMoundLoop();
  return () => {
    faceArray = [];
  }

}

//its extremely funny to me that we we DO have multiple pool rooms. No, not that one. Not that one either. Billiards.
function poolRooms() {
  const textEle = story.querySelector("#room-text");
  const button = createElementWithClassAndParent("button", textEle);
  button.innerText = "Play Pool"
  button.onclick = () => {
    renderID("pool")
  }

}

function xcom() {
  const textEle = story.querySelector("#room-text");

  const button = createElementWithClassAndParent("button", textEle);
  button.innerText = "Look Into The Mirror?"
  button.onclick = () => {
    if (Math.random() > 0.5) {
      //codes of ruin entry for the mediums blorbo
      window.open("http://farragofiction.com/CodexOfRuin/viewer.html?name=Myth&data=N4IgdghgtgpiBcICyBPALgCxAGhAExgGcBLAc0jWIHswEQANAYQDkBaJVgBm5xACdihANZ0AggBkAogAUAEr0wxYhOkgCaAFVnYABAEY9AZmzTRAJVEARAPL1dB4zoCqzM5IkBJDWuwPdzDwBxWQ0kc0kAZXsjXWlxUR8-HVlrMzNU6McAMTMPSWZLCNkPaUzdFwBpZmsAdWYynQlGWUl1BqRrZgiNdIivH30jXkI0CDQVRBbxcWtfGI8dACknbrnjGtFmDTXsDWsdOISdhYjJSR21aycdwOq+qMHDXhgADwgAYzQAGxQAfUw+DAYP9iAAHCYgcSsRhcACsOkEOgARgBXABmaJgaBgeB0sD472IXyIhB+yJQOkUOgA7sQwHhCDoqGidGixjAAHQ6RgQFGUGgIxloKjImA6FGEHE0jAwMA6DSsGqsABCekFOggX0IIrpOlBXwgKC5ulEaA1SO1Xz5Yr4EHpVCgAG4dFCYZxYQByRkjCBIonENAU95UFFgbF8PGGnSkEV4KjUsAc7CuuE6d52nRxjVgdAYOmkDU6QLQGAR4Mor644Ngd4wYgAN19ZLjHN4dJGdM+dCyVC+X3jOhQIYjMogfDQSZ0Pb7A6gFNBYwwk48Hr7oppAYwg5Dk40fAlZt1sEn4ixXvXaIEsoZrdw7bIGDQdBXUB0AlIj50MsBk4iwtBOiEBgEBCPmk7SMSECSroCxxmAHpmtSdpmsKX4ouO24oieZ6MkiYqXsQ16ELeIBjKM7wYLAYZ0MqYpzqyV70gAhLoNRirSa7AfWYraniKIUayoYsdyDrsZueKcjBiFEl866au+j7Ljo-bcZhlJUFQTG8ICoKAoQJA0HQGh5oyiL6oaSYLEIYADpgiLUjAfaWRua5AQOQ5Ydgsi2SK5lGtgCwqWKHkkT6fpfAGfzEtxXx0Ho2k4r8BCYmAkp0JwvDUnm2JJTAKVpYgnAcvFuBIga7xCLl+VwIVvALsSVWygVICsCVIDEFApC-IQBJ0I+aDgvAAD0Q1gCiUB4XwNCOb6KACGGMpgAAVlQKClhyYAwFQhKUEQHJUHwpBDWYRDDrWhBDeIED1nStrpkNjDAXwUCoJgHKgmApDDMKfB-AQoxEhC1hbmyxARq9S5LFQN2apSeafUyLILracYvByAA6YBOGAgKw3Zn26LSmDIiG9LEvpynQ5ymMeGaukwB8MqMqCDO1roAZ6rjFFEDoN29rKtYY2AtPqhAcP5ojlOqXauJi-jBbMniKAjKWhGMjLhby5LUA0CrfDEZjmNqCGaYZpKPGiZLHPftTYD9aCw1DQaN04x8EAcjAa1xl8pAlsRwZQENTA0MqKBIDixDjdYaLGbjDJDZjHJJ5gIYfnDYznktB5w-hYNQCWYZW2al4OjnmaCKMhcLiMQs02g54dmupBTbSBM6I5kpZaWtsi7j+sIuMX4M7iupXS7d3uzTHqqaOfAj4PVKiGGxBIIaB2S1kmrEnKACKKJEOGN19jAhPAdi3ERpgYwSXaBtgJjlgih5OjWQOAYAPx1zSUFMjWYpiwIRsslUJUlkGObiIxdApxRGnDm1YSAEH7t+QsBFry12FmaCKQhHIUmpCGSsaZdbEEQWpMWqD6TqSoOg2mjJyEMjzABREhAHJYmzPPWhjF6FgnVGiMGnIdA0O-s9NhhDKxckEWLfsZpFby2IgI+keU6QBn4TUOkeAwI6DUFiXQWJSyQC+ELCI-EtyIipEhCkMiZTfxQEhOeRYqB4AIBTRW0gxwQFRntAR0k1whm+A2OidoKSyK5MqPkugf5iyAu422mNTTKQZiMcUy9ZIBm9KMCMukqAsz4GSAQkpiIKDBPFRAGwzABGYIEeAOgmBsA4NwTgAiIiNGYDoSQ9AeiiFYC4DwAA1SQZgIgSCLNYSw6CansC4NwHQ1gsgaHyAIpA0h+kRE6KIOZTTrBaH6a0rYXg8gPA8MwRg4gnCWEOYEF0ogenQkmQAJl0HsHQlgLA1GmVsgZAitj7C8E0w5WQTn5EYJIEilBQS3LoKU8plSdCGzADYHQ1QNDck6BEJwSBJDNLUFOMwTgfm6EsJEIIzA1mSEsNUlgEz6kqi5NIawERTj0tJToZUWL4jXLdJwW5rBRBcgkDIWQrANB5DMDoJATgNBrI8J0ZIogmnKjOC06wypThmD6aMzGhTQRPEQOMupUybCRARZsnQEQpAyC5CaoIIRzlNPCDoCwbhdDKnFdMxgjAnAisOY0aYJr3ArK6OIpFmwIg1GWfKFoBwLBqDDTM8NGKXAtHMKMp5+xEU7MCKIQIGLdWTKKiAAAvkAA", '_blank')
    } else {
      window.open("http://lavinraca.eyedolgames.com/XConByMediumOfThreads/", '_blank');

    }

  }
}
//https://www.tumblr.com/jadedresearcher/830943681150337024/yessssssss-i-had-so-many-thoughts-about-this?source=share

//from the corn maze in year 1 of my participation in lavinraca
function crickets() {
  bgMusic.src = "images/Diorama/foley/ready_effects/Outdoor/053147845-meadow-night-crickets-ambient-.mp3";
  bgMusic.onloadedmetadata = () => {

    bgMusic.loadedmetadata = undefined;
    tryPlayBgMusic();



  }
  return () => {
    bgMusic.src = weird;
    tryPlayBgMusic();
  }
}



//i tried to make these not reset to zero every time you move but it was annoying and its getting late so i dropped it
function muffledBop() {

  bgMusic.src = "music/loop1_byIC_itsabop_muffled.mp3";

  bgMusic.onloadedmetadata = () => {

    bgMusic.loadedmetadata = undefined;
    tryPlayBgMusic();
  }

  return () => {
    bgMusic.src = weird;
    tryPlayBgMusic();
  }

}

function muffledQuietBop() {

  bgMusic.src = "music/loop1_byIC_itsabop_muffled_and_quiet.mp3";
  bgMusic.onloadedmetadata = () => {
    bgMusic.loadedmetadata = undefined;
    tryPlayBgMusic();
  }


  return () => {
    bgMusic.src = weird;
    tryPlayBgMusic();
  }
}

function freeBook() {
  const textEle = story.querySelector("#room-text");

  const lock = createElementWithClassAndParent("button", textEle);
  lock.innerText = "Take Free Book?"
  lock.onclick = () => {
    bookGet();
    lock.remove();
  }
}

//language + censor just sort of automatically creates a Quest, doesn't it?
function digDeeper() {
  console.log("JR NOTE: the prayers for this room were language + censort and they just sort of naturally combine to make a Quest don't they?")
  const textEle = story.querySelector("#room-text");

  const lock = createElementWithClassAndParent("button", textEle);
  lock.innerText = "This Can't be All There Is, You Have To Dig Deeper"
  lock.onclick = () => {
    renderID("east_third_room1_deep1_secret");
  }
}

function digEvenDeeper() {
  const textEle = story.querySelector("#room-text");

  const lock = createElementWithClassAndParent("button", textEle);
  lock.innerText = "This Can't be All There Is, You Have To Dig Deeper"
  lock.onclick = () => {
    renderID("east_third_room1_deep1_basement");
  }
}

function classicZampanioSimBasement() {
  const textEle = story.querySelector("#room-text");

  const lock = createElementWithClassAndParent("button", textEle);
  lock.innerText = "Dig."

  lock.onclick = () => {
    const contentEle = document.createElement("div");
    contentEle.style.color = "red";
    contentEle.innerHTML = `<h2>Rabbit Hole</h2>
    <Br>
    You are down the rabbit hole. It does not end. If you know important words, you may enter them here.<br><Br>`

    const form = createElementWithClassAndParent("form", contentEle)
    const textInput = createTextInputWithLabel(form, "rabbit-hole", "", "");
    textInput.input.placeholder = "Type Important Words Here";
    const resultsEle = createElementWithClassAndParent("div", contentEle);
    resultsEle.id = "resultsEle";

    const lock2 = createElementWithClassAndParent("button", form);
    lock2.innerText = "Submit"
    form.onsubmit = (e) => {
      e.preventDefault();
      console.log("JR NOTE: submitting")
      runSecret(textInput.input.value.toLowerCase());
      return false;
    }

    showExistingPopup(contentEle, "Leave. This Quest Leads To Nothing Good");


  }

  //IC gave me this as the harvest's theme. its explicitly the same music i always use for gambling (including for the harvests head)
  //just slow, and thoughful, like the harvest is
  bgMusic.src = "music/everything turns to dust byIC.mp3";
  bgMusic.onloadedmetadata = () => {

    bgMusic.loadedmetadata = undefined;
    tryPlayBgMusic();



  }
  return () => {
    bgMusic.src = weird;
    tryPlayBgMusic();
  }
}

//value, label pairs
let eyeKillerDialogue = [];

const eyeKillerExtravaganza = async (ele) => {
  const first = window.location.href.includes("laughing") ? "" : "https://laughing.observer/Lavinraca/"

  const dir = "images/Diorama/Inside/Hallways/EyeKillerRoom/Dialogue/";
  const audio = new Audio()
  audio.src = dir + "Why is there an empty chair in this room" + ".mp3";
  audio.play();
  if (eyeKillerDialogue.length === 0) {
    console.log("JR NOTE: fetching recordings")
    const tmp = await getAudio(first + dir);
    eyeKillerDialogue = tmp.map((i) => { return { value: i, label: decodeURIComponent(i).replaceAll(".mp3", "?") } });
  }
  const form = createElementWithClassAndParent("form", ele);

  const questionInput = createSelectInputWithLabel(form, "questionSelect", "", eyeKillerDialogue);



  const lock1 = createElementWithClassAndParent("button", form);
  lock1.innerText = "Ask"
  lock1.type = "submit"

  form.onsubmit = (e) => {
    e.preventDefault();
    audio.src = dir + questionInput.input.value;
    audio.play();
    return false;
  }


}

function turnYourBackOnTheBody() {
  const textEle = story.querySelector("#room-text");

  const lock1 = createElementWithClassAndParent("button", textEle);
  lock1.innerText = "Crouch Down"
  lock1.onclick = () => {
    const contentEle = document.createElement("div");
    contentEle.innerHTML = `<img src ='images/Diorama/Inside/Hallways/EyeKillerRoom/vent.PNG'><Br>Is that...the sound of a tape recorder from deep within the vent?<br><Br>If you like, you can ask the Mysterious Figure in the vent questions.`;
    showExistingPopup(contentEle, "Leave")
    eyeKillerExtravaganza(contentEle);
  }
}

function approachVent() {
  const textEle = story.querySelector("#room-text");

  const lock1 = createElementWithClassAndParent("button", textEle);
  lock1.innerText = "Approach Vent"
  lock1.onclick = () => {
    renderID("east_fourth_room4_vent");
  }
}

function censorRooms() {
  const textEle = story.querySelector("#room-text");

  const lock1 = createElementWithClassAndParent("button", textEle);
  lock1.innerText = "Censor Unreality"
  lock1.onclick = () => {
    const contentEle = document.createElement("div");
    //its interesting to me that in allowing censorship I'm forced to reveal information.
    // Now you KNOW theres effects that unlock under certain conditions, and you also now KNOW the ids of all the prayed for rooms
    contentEle.innerHTML = `<h2>You Can Censor Any Door Opening Unreality Effect You Have Unlocked Here, But If You Refresh/Load They Will Return</h2>`
    for (let effect of spookyEffects) {
      const claimCheck = createCheckboxInputWithLabelTurnways(contentEle, effect, effect, !surpressedEffects.includes(effect))
      claimCheck.input.oninput = () => {
        if (surpressedEffects.includes(effect)) {
          removeItemOnce(surpressedEffects, effect)
        } else {
          surpressedEffects.push(effect)
        }
      }
    }
    showExistingPopup(contentEle, "I'm Done.");
  }


  const lock = createElementWithClassAndParent("button", textEle);
  lock.innerText = "Censor Rooms"
  lock.onclick = () => {
    const contentEle = document.createElement("div");
    contentEle.innerHTML = `<h2>You Can Censor Any Room This Run, But Must Return Here If You Refresh/Load As Your Censorship Will Be Cleared</h2>`
    showExistingPopup(contentEle, "I'm Done.");


    const row = createElementWithClassAndParent("div", contentEle, "rows");
    const left = createElementWithClassAndParent("div", row);


    for (let [key, value] of Object.entries(finishedRoomPrayers)) {

      const claimCheck = createCheckboxInputWithLabelTurnways(left, key, key, censoredRoomIDs.includes(key))
      claimCheck.input.oninput = () => {
        details.innerText = "";
        for (let v of value) {
          const ele = createElementWithClassAndParent("div", details);
          ele.innerText = v;
          ele.style.border = "1px dotted red"
          ele.style.margin = "3px";
          ele.style.padding = "3px";

        }
        console.log("JR NOTE: ", value)
        if (censoredRoomIDs.includes(key)) {
          removeItemOnce(censoredRoomIDs, key)
          if (key === hallways[globalDataObject.current_room_id].roomID) {
            censorCurrentRoom = false;
          }
        } else {
          censoredRoomIDs.push(key)
          if (key === hallways[globalDataObject.current_room_id].roomID) {
            censorCurrentRoom = true;
          }
        }
      }
      //censoredRoomIDs

    }
    const details = createElementWithClassAndParent("div", row);
    details.style.border = "1px solid red";
    details.style.padding = "3px";
    details.innerText = "Click a room id to confirm what prayers created it.";
  }
}

/*
btw, seeing this chronological archive of the chronicles of the marked: 
 
https://yolkdump.neocities.org/zampaniodiscordarchive
 
made me realize how important banquet halls were for early testimonials of zampanio
 
so i HAD to make sure there was at least one in this house
*/

//especially useful if you steal someones body who has collected more books  than you
function bookGallery() {
  const textEle = story.querySelector("#room-text");

  const lock = createElementWithClassAndParent("button", textEle);
  lock.innerText = "Browse Books?"
  lock.onclick = () => {
    const contentEle = document.createElement("div");
    contentEle.innerHTML = `<h2>Books Collected</h2>`
    showExistingPopup(contentEle, "Finish Browsing")
    const loreBox = createElementWithClassAndParent("div", contentEle, 'lore-box');
    loreBox.innerHTML

    const twocols = createElementWithClassAndParent("div", contentEle, 'rows');

    const maxCandy = Math.min(globalDataObject.candy, candy_lore.length);
    const maxMeat = Math.min(globalDataObject.meat, meat_lore.length);

    const col1 = createElementWithClassAndParent("ol", twocols);
    const col2 = createElementWithClassAndParent("ol", twocols);

    for (let i = 0; i < maxCandy; i++) {
      const ele = createElementWithClassAndParent("li", col1,);
      ele.innerHTML = `<a>Candy${i}</a>`;
      ele.onclick = () => {
        candyGet(undefined, i)
      }

    }

    for (let i = 0; i < maxMeat; i++) {
      const ele = createElementWithClassAndParent("li", col2,);
      ele.innerHTML = `<a>Meat${i}</a>`;
      ele.onclick = () => {
        meatGet(undefined, i)
      }
    }

  }
}

const wireUpWasteControls = () => {
  //should be a list of all functions on the window object that take no params
  //which is the primary trait of the interaction functions i let rooms call
  let keys = Object.keys(window).filter(key => {
    const val = window[key];
    return typeof val === 'function' && val.length === 0;
  });
  keys = keys.reverse();
  const themeInput = createSelectInputWithLabel(secrets, "hackingSelect", "Call These Functions At Your Own Risk", keys.map((t) => { return { label: t, value: t } }));
  themeInput.container.classList.add("void")
  const button3 = createElementWithClassAndParent("button", secrets);
  button3.classList.add("void")
  button3.innerText = "Call Function"
  button3.onclick = () => {
    window[themeInput.input.value]();
    toggleVoid();

  }
}

function eatHarvestFruit() {
  const textEle = story.querySelector("#room-text");

  const button = createElementWithClassAndParent("button", textEle);
  button.innerText = "Partake of the Harvest Fruit?"
  button.onclick = () => {
    const contentEle = document.createElement("div");
    contentEle.innerHTML = `As a Faithful of the Harvest, you know there is no turning back once you consume the Fruit of the Harvest, that which provides knowledge of the Truth behind it all.
    <br>
    Knowing this, do you still choose to eat?`

    const button2 = createElementWithClassAndParent("button", contentEle);
    button2.innerText = "im so hungry";
    button2.onclick = () => {
      console.log(`JR NOTE: wasted wasted, harvesting the tree,
         you found a fruit and ate it, and now you finally see
         cameras and flashlights glowing
         all reality
         you found a fruit and ate it, and now you finally see `)
      globalDataObject.wasted = true;
      const deep1Old = "east_main_room3_deep1";
      const deep1New = "east_main_room3_deep1_waste";
      const left1Old = "east_main_room3_left1";
      const left1New = "east_main_room3_left1_waste";
      const right1Old = "east_main_room3_right1"
      const right1New = "east_main_room3_right1_waste"


      globalDataObject.state_changes[deep1Old] = deep1New;
      globalDataObject.state_changes[left1Old] = left1New;
      globalDataObject.state_changes[right1Old] = right1New;


      closeThePopup();
      save();
      renderID(deep1New)
      wireUpWasteControls();

    }



    showExistingPopup(contentEle, "No, that sounds like an obviously bad idea.")
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
      sendReflectedPrayer(); //a copy of a copy

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

function goIntoThePortal() {
  const textEle = story.querySelector("#room-text");

  const c = createElementWithClassAndParent("div", textEle);
  const button = createElementWithClassAndParent("button", c);
  button.innerText = "You kinda feel like...just...jumping into. The scary. Portal.";
  button.onclick = () => {
    const dir = "images/Diorama/Inside/Hallways/Stairs/left1cutscene.mp4";
    video.pause();
    video.src = dir;
    video.loop = false;
    video.play().catch(() => { });
    video.onended = () => {
      video.loop = true;
      video.onended = undefined;
      renderID("1_bright")

    }
  }


}

function theStairsBeckon() {
  const textEle = story.querySelector("#room-text");

  const c = createElementWithClassAndParent("div", textEle);
  const button = createElementWithClassAndParent("button", c);
  button.innerText = "Dare you climb them anyways?";
  button.onclick = () => {
    const stairNoise = new Audio("images/Diorama/foley/ready_effects/Inside/short_stairs.mp3");
    stairNoise.onended = () => {
      hallOfMirrors = true;
      const chosenId = getRandomHallwayID();
      //console.log("JR NOTE: chosen id is", chosenId)
      renderID(chosenId);
    }
    stairNoise.play();

  }
}

function toggleSeerOfVoid() {
  seerOfVoid = !seerOfVoid;
  const textEle = story.querySelector("#room-text");
  textEle.innerText += seerOfVoid ? " What will you find in the void within?" : " There is a peace in not knowing.";
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

function lookAtHonorSign() {
  const textEle = story.querySelector("#room-text");

  const c = createElementWithClassAndParent("div", textEle);
  const button = createElementWithClassAndParent("button", c);
  button.innerText = "Look Closer?"
  button.onclick = () => {
    const contentEle = document.createElement("div");
    contentEle.innerHTML = `The walls are covered in similar words. <img style='max-height:100%' src='images/Diorama/Inside/Hallways/east_first_room1/this_is_not.png' >
                                      <br>
                                      This place is not a place of honor... no highly esteemed deed is commemorated here... nothing valued is here. What is here was dangerous and repulsive to us. This message is a warning about danger.`

    showExistingPopup(contentEle, "Gotcha")
  }
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
    video.play().catch(() => { });
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
    video.play().catch(() => { });
    const json = hallways[globalDataObject.current_room_id];

    video.onended = () => {
      globalDataObject.powerWorking = true;
      video.onended = null;
      video.src = hallwayDir + json.src + ".mp4";
      video.loop = true;
      window.requestAnimationFrame(() => video.play().catch(() => { }))
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
    video.play().catch(() => { });
    const json = hallways[globalDataObject.current_room_id];

    video.onended = () => {
      globalDataObject.powerWorking = false;
      video.onended = null;
      video.src = hallwayDir + json.src + ".mp4";
      video.loop = true;
      window.requestAnimationFrame(() => video.play().catch(() => { }))
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
