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

const attachObviousExits = (contentDirectory, obviousExits) => {
  const c = createElementWithClassAndParent("div", story);
  c.innerHTML = "<br>Obvious Exits Are:<br><br>"

  for (let exit of obviousExits) {
    const button = createElementWithClassAndParent("button", c);
    button.innerText = exit.text;
    button.onclick = () => exit.function(contentDirectory);
  }
}

/*
you can approach the door, the harvest, the mailbox or the backyard
content directory decides if its the normal outside or if its silly/spooky
text is mostly always the same but can vary
*/
const outsideTheHouse = (contentDirectory = "images/Diorama/Outside/Normal") => {
  const text = "Everyone knows the Harvest's House is Haunted. Will this year be when you finally are brave enough to Trick or Treat there?";
  video.thumbnail = contentDirectory + "first.jpg";
  const obviousExits = [];
  obviousExits.push({ text: "Approach the Door", function: outsideTheDoor })
  obviousExits.push({ text: "Approach the Harvest", function: theHarvest })

  story.innerHTML = `${text}`;
  attachObviousExits(contentDirectory, obviousExits)
}

const outsideTheDoor = (contentDirectory) => {
  /*
    play approach_door.mp4 in the video, when its done display your text 
  */
  video.src = contentDirectory + "/approach_door.mp4";
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

const knockOnDoor = () => {
  alert("JR NOTE: TODO")
}


const theHarvest = (contentDirectory) => {
  alert("TODO: outside the harvest")
}

const wireUpPopupClose = () => {
  closePopup.onclick = () => {
    closeThePopup();
  }

}

const closeThePopup = () => {
  popup.style.display = "none"
}

