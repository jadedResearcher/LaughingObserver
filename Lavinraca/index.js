const bgMusic = new Audio("images/Diorama/foley/ready_effects/Outdoor/wind_loop.mp3");
bgMusic.loop = true;

const contentDirectory = "images/Diorama/Outside/Final"
window.onload = () => {
  load();
  wireUpPopupClose();
  outsideTheHouse();

  console.log("JR NOTE: hello world")
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

const attachObviousExits = (obviousExits, outside = true) => {
  const c = createElementWithClassAndParent("div", story);
  c.innerHTML = "<br>Obvious Exits Are:<br><br>"
  console.log("JR NOTE: don't forget to have outside = false once i have insides")
  for (let exit of obviousExits) {
    const button = createElementWithClassAndParent("button", c);
    button.innerText = exit.text;
    button.onclick = () => movingAroundOutside(exit.function);
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
  bgMusic.play();
  const text = "Everyone knows the Harvest's House is Haunted. Will this year be when you finally are brave enough to Trick or Treat there?";
  video.thumbnail = contentDirectory + "first.jpg";
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
  /*
    play approach_door.mp4 in the video, when its done display your text 
  */
  video.src = contentDirectory + "/ApproachDoorFoley.mp4";
  storyContainer.style.display = "none"
  video.play();
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
  alert("JR NOTE: TODO trick")
}





const openDoor = () => {
  video.src = contentDirectory + "/open_the_door.mp4";
  storyContainer.style.display = "none"
  video.play();
  const obviousExits = [];
  obviousExits.push({ text: "Flee", function: outsideTheHouse })
  obviousExits.push({ text: "Take Meat Pamphlet", function: meatPamphlet })
  obviousExits.push({ text: "Take Candy Pamphlet", function: candyPamphlet })
  obviousExits.push({ text: "Go Inside, What's the Worst That Could Happen?", function: inside })

  video.onended = () => {
    globalDataObject.opened_the_door = true;
    save();
    storyContainer.style.display = "block"
    story.innerHTML = "You only knock, but the door must have been partially open or something, because it drifts open with a startlingly loud creak. You jump, hoping that half the neighborhood isn't coming to check who is dumb enough to break into the Harvest's House. <br><Br>Just inside the door, on paired little tables, you see two neat little piles of ...are those...religious Tracts? One has a little sculpture of Meat weighing it down, and the other a jar of fake Candy. The sign propped up between them proudly reads 'Take One!'"
    attachObviousExits(obviousExits)

  }
}

const meatPamphlet = () => {
  globalDataObject.meat++;
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
  globalDataObject.candy++;
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
  close.innerText = "Put the Letters Back and Hurry Back To the Door";
  close.onclick = () => {
    closeThePopup();
    outsideTheHouse();
  }

}


const theHarvest = () => {
  //maybe i'll have a blue screen verion at some point, cuz it hadn't occured to me that you can't green screen a green god , lol
  video.src = contentDirectory + "/HarvestApproach.mp4";
  storyContainer.style.display = "none"
  video.play();
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

const rollCredits = () => {
  popup.style.display = "block"
  popupContents.innerHTML = "The small metal plaque welded to the fence seems to be a list of those who have contributed to this game.";

  const credits = {
    "JR": "Writing, Coding, Filming, Set Making",
    "BR": "3d Printing, 3d Model Design and Sourcing, Painting Consults, Architecture, Harvest Casing Assembly",
    "DM": "Electrical Engineering, Harvest Screen Assembly <a href='https://github.com/mutantbob/diorama-mini-tv' target='_blank'>[Source]</a>",
    "IC": "Character Design, Candy Pamphlet Writing",
    "EmberIsCurious": "Wodin Blender Model",
    "The Lavinraca Community": "Sacrifices for the Harvest, Prayers to the Harvest, Halloween Celebrations"
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
  video.play();
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

const closeThePopup = () => {
  popup.style.display = "none"
  if (bgMusic.paused) {
    bgMusic.play();
  }
}

