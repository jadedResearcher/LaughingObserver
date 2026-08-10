window.onload = () => {
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

const attachObviousExits = (contentDirectory, obviousExits, outside = true) => {
  const c = createElementWithClassAndParent("div", story);
  c.innerHTML = "<br>Obvious Exits Are:<br><br>"
  console.log("JR NOTE: don't forget to have outside = false once i have insides")
  for (let exit of obviousExits) {
    const button = createElementWithClassAndParent("button", c);
    button.innerText = exit.text;
    button.onclick = () => movingAroundOutside(exit.function, contentDirectory);
  }
}

//possibility of interuprtion which might force you to stay where you were
// or just give you a scene before dumping you in your location (or even in a random location)
const movingBetweenHallways = (target, contentDirectory) => {
  if (Math.random() > 0.5) {
    alert("Something spooky happens while moving, but you make it to your destination okay!")
  }
  target(contentDirectory);
}

//possibility of interuprtion which might force you to stay where you were
// or just give you a scene before dumping you in your location (or even in a random location)
const movingAroundOutside = (target, contentDirectory) => {
  if (Math.random() > 0.5) {
    alert("Something spooky happens while moving, but you make it to your destination okay!")
  }
  target(contentDirectory);
}

/*
you can approach the door, the harvest, the mailbox or the backyard
content directory decides if its the normal outside or if its silly/spooky
text is mostly always the same but can vary
*/
const outsideTheHouse = (contentDirectory = "images/Diorama/Outside/Normal") => {
  const text = "Everyone knows the Harvest's House is Haunted. Will this year be when you finally are brave enough to Trick or Treat there?";
  video.thumbnail = contentDirectory + "first.jpg";
  video.currentTime = 0;
  const obviousExits = [];
  obviousExits.push({ text: "Approach the Door", function: outsideTheDoor })
  obviousExits.push({ text: "Approach the Mailbox", function: theMailbox })
  obviousExits.push({ text: "Approach the Harvest", function: theHarvest })

  story.innerHTML = `${text}`;
  attachObviousExits(contentDirectory, obviousExits)
}

const outsideTheDoor = (contentDirectory) => {
  /*
    play approach_door.mp4 in the video, when its done display your text 
  */
  video.src = contentDirectory + "/go_to_door.mp4";
  storyContainer.style.display = "none"
  video.play();
  const obviousExits = [];
  obviousExits.push({ text: "Flee", function: outsideTheHouse })
  obviousExits.push({ text: "Knock", function: knockOnDoor })

  video.onended = () => {
    storyContainer.style.display = "block"
    story.innerText = "With beating heart and shaky hands you reach the door. What wonders and horrors will you find within?"
    attachObviousExits(contentDirectory, obviousExits)

  }
}

const inside = () => {
  alert("JR NOTE: TODO trick")
}

const knockOnDoor = (contentDirectory) => {
  const odds = Math.random();
  if (odds > .1) {
    openDoor(contentDirectory);
  } else {
    treat();
  }
}

const treat = () => {
  alert("JR NOTE: todo treat instead of trick")
}


const openDoor = (contentDirectory) => {
  video.src = contentDirectory + "/open_the_door.mp4";
  storyContainer.style.display = "none"
  video.play();
  const obviousExits = [];
  obviousExits.push({ text: "Flee", function: outsideTheHouse })
  obviousExits.push({ text: "Go Inside, What's the Worst That Could Happen?", function: inside })

  video.onended = () => {
    storyContainer.style.display = "block"
    story.innerText = "You only knock, but the door must have been partially open or something, because it drifts open with a startlingly loud creak. You jump, hoping that half the neighborhood isn't coming to check who is dumb enough to break into the Harvest's House. Maybe you should hide inside before anyone sees you?"
    attachObviousExits(contentDirectory, obviousExits)

  }
}

const greetHarvest = () => {
  alert("JR NOTE: TODO")
}

const viewMail = () => {
  alert("JR NOTE: TODO")
}


const theHarvest = (contentDirectory) => {
  video.src = contentDirectory + "/go_to_harvest.mp4";
  storyContainer.style.display = "none"
  video.play();
  const obviousExits = [];
  obviousExits.push({ text: "Flee", function: outsideTheHouse })
  obviousExits.push({ text: "Greet", function: greetHarvest })

  video.onended = () => {
    storyContainer.style.display = "block"
    story.innerText = "You decide its only polite to greet the Statue of the Harvest that sits outside the house."
    attachObviousExits(contentDirectory, obviousExits)

  }
}


const theMailbox = (contentDirectory) => {
  video.src = contentDirectory + "/go_to_mailbox.mp4";
  storyContainer.style.display = "none"
  video.play();
  const obviousExits = [];
  obviousExits.push({ text: "Flee", function: outsideTheHouse })
  obviousExits.push({ text: "Rifle Through Mail", function: viewMail })

  video.onended = () => {
    storyContainer.style.display = "block"
    story.innerText = "Curiosity overrides your better judgement, just what kind of mail can this long abandoned house of a god be getting?"
    attachObviousExits(contentDirectory, obviousExits)

  }
}

const wireUpPopupClose = () => {
  closePopup.onclick = () => {
    closeThePopup();
  }

}

const closeThePopup = () => {
  popup.style.display = "none"
}

