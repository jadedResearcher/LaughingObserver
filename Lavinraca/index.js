/*
note to future me, i briefly considered (on 9/19/2026, talk like a pirate day me hearties)
to try preloading video assets

it would have required me to rearchitect how i interact with video, but might have been worht it

unfortunately, it only works while on a server

i don't run a server while developing, and anyone who tries to make mods of my code won't either

i don't want to bundle wiht a server or do any of the shitty hacky workarounds google suggested 

SO!

no preloading assets. 

future me, don't get tempted
*/

let renderingClownsona = undefined; //will be the sprite buffer to render sometimes
const wind = "images/Diorama/foley/ready_effects/Outdoor/quieter_wind_loop.mp3";
const spooky_source = "images/Diorama/foley/ready_effects/Inside/wood_creaking.mp3";
const weird = "images/Diorama/foley/ready_effects/Inside/weirdambient_lower.mp3";
let seerOfVoid = false;
let flavorTextAndMovementButtonsVisible = true;

const bgMusic = new Audio(wind);
bgMusic.loop = true;

const spookyLoop = new Audio(spooky_source);
spookyLoop.loop = true;

const contentDirectory = "images/Diorama/Outside/Final"

//look its the 26th of september and i have MOST of the important shit done
//time to have weird glitch effects whenever an actual for real bug hits
//because thats funny to me
//but also might help people report shit 
let glitchyError = false;

//look catalyst pointed out how fun the resize bug was and i figured i could go harder on purpose
let justifedRecursion = false;

//its fun figuring what effects are cheap to do at 60fps or whatever this runs at
let hallOfMirrors = false;
let mirrorShards = 13;

window.onerror = () => {
  glitchyError = true;
  setTimeout(() => { glitchyError = false }, 3000)

}


window.onunhandledrejection = () => {
  glitchyError = true;
  setTimeout(() => { glitchyError = false }, 3000)
}


window.onload = async () => {
  clownsona = await makeSimpleDoll(); //loading will set its specifics
  alert("NOTE: this game loads many short videos. If it seems to hang, a video may be loading.")
  load();
  if (seerOfVoidCheck()) {
    seerOfVoid = true;
  }
  wireUpVisionControl();
  addIDToHallways();
  wireUpPopupClose();
  //video ele handles decoding and audio playing AND loading the buffer
  //but the canvas element should be the visible thing (prevents flicker)
  video.addEventListener("loadedmetadata", wireUpCanvas);
  if (globalDataObject.current_room_id && globalDataObject.current_room_id != "OUTSIDE") {
    beginGameplayLoop();
  } else {
    outsideTheHouse();

  }

  /*
  game.onclick = () => {
    game.play();
  }

  approach.onclick = () => {
    game.play();
  }

  game.onended = () => {
    alert("trick or treat")
  }*/
}

const wireUpVisionControl = () => {
  const body = document.querySelector("body")
  visionControl.onclick = () => {
    if (flavorTextAndMovementButtonsVisible) {
      storyContainer.style.display = "none";
      //css vars are WAY easier than i used to do it in SBURBSim
      if (seerOfVoid) {
        body.style.setProperty('--void_display', 'block');
      }
      visionControl.style.backgroundPositionY = "0px"
      flavorTextAndMovementButtonsVisible = false;
    } else {
      storyContainer.style.display = "block";
      if (seerOfVoid) {

        body.style.setProperty('--void_display', 'none');
      }

      flavorTextAndMovementButtonsVisible = true;
      visionControl.style.backgroundPositionY = "25px"
    }

  }
}

const wireUpCanvas = () => {
  //console.log("JR NOTE: you can do INTERESTING fuckery with canvas video, make a note of that (just while wiring this up the video got super tiny and that was fun)")
  video.removeEventListener("loadedmetadata", wireUpCanvas);

  //videoWith etc is the true resolution of the video
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  //this stuff scales my canvas to however big exactly teh video is on screen
  canvas.style.width = `${video.clientWidth}px`;
  canvas.style.height = `${video.clientHeight}px`;
  renderVideoToCanvas();
  glitchLoop();
}

/*
wait a random amount of seconds
*/
const glitchLoop = async () => {

  const maxWaitTime = 300000; //5 minutes is 300000
  await sleep(Math.random() * maxWaitTime);
  glitchyError = true;
  //up to a whole second of glitch
  setTimeout(() => {
    glitchyError = false;
    glitchLoop();
  }, 1000 * Math.random());


}

const renderVideoToCanvas = () => {

  const ctx = canvas.getContext("2d");
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  if (glitchyError) {
    //weird horizontal bars SHOULD be performant and not seizure inducing as a glitch
    const slices = Math.floor(Math.random() * 4) + 2;
    for (let i = 0; i < slices; i++) {

      const offsetY = Math.random() * canvas.height;
      const offsetHight = Math.random() * (canvas.height / 4);

      const maxShift = 15;
      const xOffset = (Math.random() - 0.5) * maxShift * 2; // its 15 either direction

      //take that bar and draw it again
      ctx.drawImage(
        canvas,
        0, offsetY, canvas.width, offsetHight,
        xOffset, offsetY, canvas.width, offsetHight
      );
    }
  }

  if (justifedRecursion) {
    let scale = 0.9
    const recursions = 13;
    let width = canvas.width;
    let height = canvas.height;
    for (let i = 0; i < recursions; i++) {
      width = width * scale;
      height = height * scale;
      ctx.drawImage(
        video,
        0, 0, width, height,
      );
    }

  }

  if (hallOfMirrors) {
    const recursions = mirrorShards;
    const angle = (Math.PI * 2) / recursions;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    for (let i = 0; i < recursions; i++) {
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(i * angle);

      // Mirror every alternating slice
      if (i % 2 === 1) {
        ctx.scale(-1, 1);
      }

      // Draw the wedge from an offscreen/source canvas
      ctx.drawImage(video, 0, 0);
      ctx.restore();
    }

  }

  //your clownsona won't glitch, its the most true thing here
  if (renderingClownsona) {
    ctx.save();

    ctx.globalAlpha = 0.5;
    const size = 810;
    //fiddling till it kinda looks like its in the mirror
    const x = (canvas.width - size) / 2 + size / 7;
    const y = (canvas.height - size) / 2;
    ctx.drawImage(renderingClownsona, x, y, size, size);
    ctx.restore();
  }

  requestAnimationFrame(renderVideoToCanvas);
}

const attachObviousExits = (obviousExits, outside = true) => {
  const c = createElementWithClassAndParent("div", story);
  if (outside) {
    c.innerHTML = "<br>Obvious Exits Are:"
  } else {
    c.innerHTML = ""
  }
  const c2 = createElementWithClassAndParent("div", story, "button-holder");

  for (let exit of obviousExits) {
    const button = createElementWithClassAndParent("button", c2);
    button.innerText = exit.text;
    button.onclick = () => movingAroundOutside(exit.function);
    if (exit.dim) {
      button.style.opacity = "0.3"
    }
  }
}

//possibility of interuprtion which might force you to stay where you were
// or just give you a scene before dumping you in your location (or even in a random location)
//this can't be happening, eternal darkness ref
const movingBetweenHallways = (target) => {
  if (Math.random() > 0.5) {
    alert("Something spooky happens while moving, but you make it to your destination okay!")
  }
  target(contentDirectory);
}

//possibility of interuprtion which might force you to stay where you were
// or just give you a scene before dumping you in your location (or even in a random location)
const movingAroundOutside = (target) => {
  //can enable later but mostly was annoying cuz in practice when you're outside you're just trying to get shit done
  target();
}

/*
you can approach the door, the harvest, the mailbox or the backyard
content directory decides if its the normal outside or if its silly/spooky
text is mostly always the same but can vary
*/
const outsideTheHouse = () => {
  window.removeEventListener('keydown', handleMovement); //remove the wasd controls we set up for inside (won't crash even if they werent' in use)
  bgMusic.src = wind;
  bgMusic.volume = 1;
  bgMusic.play();
  video.loop = false;
  const text = "Everyone knows the Harvest's House is Haunted. Will this year be when you finally are brave enough to Trick or Treat there?";
  video.src = contentDirectory + "/ApproachDoorFoley.mp4"
  video.currentTime = 0;
  const obviousExits = [];
  obviousExits.push({ text: "Approach the Door", function: outsideTheDoor })
  obviousExits.push({ text: "Approach the Mailbox", function: theMailbox })
  obviousExits.push({ text: "Approach the Harvest", function: theHarvest })
  obviousExits.push({ text: "Read the Plaque", function: rollCredits })

  story.innerHTML = `${text}`;
  attachObviousExits(obviousExits)
}

const outsideTheDoor = () => {
  window.removeEventListener('keydown', handleMovement);

  /*
    play approach_door.mp4 in the video, when its done display your text 
  */
  video.src = `${contentDirectory}${globalDataObject.opened_the_door ? "/RunDoor.mp4" : "/ApproachDoorFoley.mp4"}`;
  storyContainer.style.display = "none"
  video.play().catch(() => { });
  const obviousExits = [];
  obviousExits.push({ text: "Flee", function: outsideTheHouse })
  obviousExits.push({ text: "Knock", function: openDoor })

  video.onended = () => {
    storyContainer.style.display = "block"
    story.innerText = "With beating heart and shaky hands you reach the door. What wonders and horrors will you find within?"
    attachObviousExits(obviousExits)

  }
}

const inside = () => {
  video.onended = null;
  beginGameplayLoop();
}





const openDoor = () => {
  video.src = contentDirectory + "/open_the_door.mp4";
  storyContainer.style.display = "none"
  video.play().catch(() => { });
  const obviousExits = [];
  obviousExits.push({ text: "Flee", function: outsideTheHouse })
  obviousExits.push({ text: "Take Meat", function: meatPamphlet })
  obviousExits.push({ text: "Take Candy", function: candyPamphlet })
  obviousExits.push({ text: "Go Inside, What's the Worst That Could Happen?", function: inside })

  video.onended = () => {
    globalDataObject.opened_the_door = true;
    save();
    storyContainer.style.display = "block"
    story.innerHTML = "You only knock, but the door must have been partially open or something, because it drifts open with a startlingly loud creak. <Br><Br>Just inside the door, on paired little tables, you see piles of paper. Propped up between them proudly reads 'Take One!'"
    attachObviousExits(obviousExits);


  }
}

const meatPamphlet = () => {
  save();
  popup.style.display = "block"

  popupContents.innerHTML = "You've always been more  of a meat and potatoes kinda trick or treater.<br><img src='images/meat_pamplet.png'> "
  const close = createElementWithClassAndParent("button", popupContents);
  close.innerText = "Pocket Pamphlet";
  close.onclick = () => {
    closeThePopup();
  }
}

const candyPamphlet = () => {
  save();
  popup.style.display = "block"

  popupContents.innerHTML = "Halloween is ALL about the Candy!<br><img src='images/churchofcandy.png'>"
  const close = createElementWithClassAndParent("button", popupContents);
  close.innerText = "Pocket Pamphlet";
  close.onclick = () => {
    closeThePopup();
  }
}

const prayHarvest = () => {
  popup.style.display = "block"

  popupContents.innerHTML = "As you focus deeply on the statue of the Harvest, the god of Libraries, of Mysteries, of Potential, you become aware of her words."




  const close = createElementWithClassAndParent("button", popupContents);
  close.innerText = "Stop Praying";
  close.onclick = () => {
    closeThePopup();
    outsideTheHouse();
  }
  close.style.display = "block"
  close.style.marginTop = "13px"
  close.style.marginBottom = "13px"

  const contents = createElementWithClassAndParent("div", popupContents, 'prayer-contents');
  renderHarvestAndPrayers(contents);

}



const viewMail = () => {
  const mail = fetchPendingCommands();
  console.log("JR NOTE: here's the mail it never fails", mail);
  //alert("JR NOTE: todo display " + mail.length + mail);
  popup.style.display = "block"
  popupContents.innerHTML = "You find the following postcards, letters and small pamplets waiting for the Harvest God's perusal.<br><Br> You feel a little uneasy, knowing these messages from the Faithful have not yet been seen by any eyes. The Harvest has not yet judged any of these Worthy and you may find things better left hidden in the void.<br><br>(ooc: This is pending online content submitted by fans and not yet moderated. viewer discretion is advised etc etc but you can also check here to make sure your own Prayers are waiting for the God to be In)<br><br>";

  for (let letter of mail) {
    console.log("JR NOTE: rendering mail")
    const c = createElementWithClassAndParent("li", popupContents);
    c.innerText = letter;

  }

  const c = createElementWithClassAndParent("div", popupContents);
  c.style.marginTop = "31px"
  c.innerText = "You feel vaguely guilty reading such personal things, before anyone has seen them at all. ";
  const close = createElementWithClassAndParent("button", popupContents);
  close.innerText = "Put the Letters Back and Hurry Back To the GATE";
  close.onclick = () => {
    closeThePopup();
    outsideTheHouse();
  }

}


const theHarvest = () => {
  //maybe i'll have a blue screen verion at some point, cuz it hadn't occured to me that you can't green screen a green god , lol
  video.src = contentDirectory + "/HarvestApproach.mp4";
  storyContainer.style.display = "none"
  video.play().catch(() => { });
  const obviousExits = [];
  obviousExits.push({ text: "Flee", function: outsideTheHouse })
  obviousExits.push({ text: "Pray", function: prayHarvest })

  video.onended = () => {
    storyContainer.style.display = "block"
    //haha whoops i forgot the harvest was green when i put a green screen behind her....it would Stres Me The Hell Out to film the outside of the house again, so...I'm just going to not. besides, she's a grace now, she teaches everyone to hack reality and step 1 is proving to you that the reality she's in isn't real. so there.
    story.innerHTML = "You decide its only polite to greet the Statue of the Harvest that sits outside the house. <br><Br>Something...feels off...though. Weird. Almost like...reality is....just a little bit less real here... You've heard the phrase 'the veil is thin here' but you never FELT it before... You can't put your finger on any one thing that's wrong but...<Br><BR>Its unsettling."
    attachObviousExits(obviousExits)

  }
}

//https://yolkdump.neocities.org/zampaniodiscordarchive
const rollCredits = () => {
  popup.style.display = "block"
  popupContents.innerHTML = "The small metal plaque welded to the fence seems to be a list of those who have contributed to this game.";

  const credits = {
    "JR": "Writing, Coding, Filming, Set Making",
    "BR": "3d Printing, 3d Model Design and Sourcing, Painting Consults, Architecture, Harvest Casing Assembly",
    "DM": "Electrical Engineering, Harvest Screen Assembly <a href='https://github.com/mutantbob/diorama-mini-tv' target='_blank'>[Source]</a>",
    "IC": "Character Design, Candy Pamphlet Writing, Camellia Sermons",
    "EmberIsCurious": "Wodin Blender Model (assuming i get a chance to print it out and put it in)",
    "Flippet/flippetUrnways": "Eustace Poems",
    "KR": "Harvest Book Design/Binding",
    "Butlers/Cirky's": "Playtesting/Feedback",
    "The Lavinraca Community": "Sacrifices for the Harvest, Prayers to the Harvest, Halloween Celebrations. Join the <a target='_blank' href ='https://discord.gg/Unj4x2aCBa'>Discord</a>."
  }
  for (let [key, value] of Object.entries(credits)) {
    console.log("JR NOTE: rendering credits")
    const c = createElementWithClassAndParent("li", popupContents);
    c.innerHTML = `${key} : ${value}`;

  }

  const close = createElementWithClassAndParent("button", popupContents);
  close.style.marginTop = "31px"
  close.innerText = "Stop Looking At Plaque";
  close.onclick = () => {
    closeThePopup();
    outsideTheHouse();
  }
}


const theMailbox = () => {
  video.src = contentDirectory + "/MailboxApproach.mp4";
  storyContainer.style.display = "none"
  video.play().catch(() => { });
  const obviousExits = [];
  obviousExits.push({ text: "Flee", function: outsideTheHouse })
  obviousExits.push({ text: "Rifle Through Mail", function: viewMail })

  video.onended = () => {
    storyContainer.style.display = "block"
    story.innerText = "Curiosity overrides your better judgement, just what kind of mail can this long abandoned house of a god be getting?"
    attachObviousExits(obviousExits)

  }
}

const wireUpPopupClose = () => {
  closePopup.onclick = () => {
    closeThePopup();

  }

}

const closeThePopup = (callback) => {
  popup.style.display = "none"
  if (bgMusic.paused) {
    bgMusic.play();
  }
  if (callback) {
    callback();
  }
}

const showExistingPopup = (contentEle, closeButtonText) => {
  popup.style.display = "block"

  popupContents.innerHTML = "";
  const contents = createElementWithClassAndParent("div", popupContents);
  contents.append(contentEle)

  if (closeButtonText) {
    const close = createElementWithClassAndParent("button", contents, "bottom-close-button");
    close.innerText = closeButtonText;
    close.onclick = () => {
      closeThePopup();
    }

    close.style.display = "block"
    close.style.marginTop = "13px"
    close.style.marginBottom = "13px"
  }

}

