//      "functions": ["prayForRoom", "letsGoGamble1", "letsGoGamble10", "letsGoGamble100"]

function cantAffordPrayer() {

  const contentEle = document.createElement("div");
  contentEle.innerHTML = `Through the buzzing TV static you seem to hear a voice.
  
  <div class='truth'>It seems it would cost ${globalDataObject.harvestPoints} books to pray to the Harvest right now.
  <br><Br>
  In Truth, She is a busy god, and can not be fielding constant requests. You understand how it is.
  <br><Br>
  But, perhaps, if you are willing to take a chance...?
  <Br><Br
  She might be persuaded of the strength of your convictions.
  <Br><Br>
  Here.
  <Br><Br>
  Take this book, free of charge.
  <Br><Br>
  May our lady of Gambling, Arbitration, Teaching and Eating favor you tonight.
  </div>
  <div class='scarecrow'>im so hungry</div>`
  const button = createElementWithClassAndParent("button", contentEle);
  button.innerText = "Take Book";
  button.onclick = () => {
    bookGet();
  }


  showExistingPopup(contentEle, "I don't need charity.");
}

const handlePrayingForRoom = () => {
  if (globalDataObject.harvestPoints > globalDataObject.books) {
    cantAffordPrayer();
    return;
  }
  const contentEle = document.createElement("div");

  contentEle.innerHTML = "<h2>Prayer for a Room</h2>"
  const prayerEle = createElementWithClassAndParent("div", contentEle);
  let theme = "Clowns;"
  let item1 = "Bed";
  let item2 = "Toilet";
  let item3 = "Drawers";
  let sentences = "";
  let claimed = false;
  prayerEle.innerHTML = `
      Dear, Sweet, Precious Harvest, I pray for a room to replace this location and I am willing to Sacrifice ${globalDataObject.harvestPoints} books in Prayer. I understand that even with my Sacrifice my Prayer may go unanswered, and even if answered, may take a long time.  I want the room built from my Sacrifice to be `;
  const themes = ['Clowns', "Identity", "Dolls", "Halloween", 'Waste', 'Technology', 'Art', 'Space', 'Time', 'Flesh', 'Buried', 'Stealing', 'Freedom', 'Fire', 'Lonely', 'Ocean', 'Science', 'Math', 'Spiral', 'Death', 'Apocalypse', 'Service', 'Family', 'Magic', 'Angels', 'Light', 'Hunting', 'Plants', 'Decay', 'Choices', 'Zap', 'Love', 'Soul', 'Anger', 'Web', 'Royalty', 'Endings', 'Knowing', 'Guiding', 'Crafting', 'Addiction', 'Spying', 'Healing', 'Obfuscation', 'Censorship', 'Darkness', 'Killing', 'Music', 'Defense', 'Questing', 'Bugs', 'Language'];
  const themeInput = createSelectInputWithLabel(prayerEle, "themeSelectForPrayer", undefined, themes.map((t) => { return { label: t, value: t } }), theme);
  themeInput.input.oninput = () => {
    theme = themeInput.input.value;
  }
  themeInput.container.style.display = "inline-block";
  const prayerEle2 = createElementWithClassAndParent("span", prayerEle);
  prayerEle2.innerHTML += " themed. I also want to copy these items from other rooms of the house and place them inside, if they'll fit."

  const items = ["Nothing", "Bed", "Toilet", "Desk", "Mannequin Vat", "Bookshelves", "Mirror", "Harvest Head", "Safe", "Bench", "Table", "Chair", "Potted Plants", "Drawers", "Masked Figure", "Veiled Figure"]



  const item1Input = createSelectInputWithLabel(prayerEle, "themeSelectForPrayer", undefined, items.map((t) => { return { label: t, value: t } }), item1);
  item1Input.input.oninput = () => {
    item1 = item1Input.input.value;
  }
  item1Input.container.style.display = "inline-block";

  const prayerEle3 = createElementWithClassAndParent("span", prayerEle);
  prayerEle3.innerHTML += " and ";


  const item2Input = createSelectInputWithLabel(prayerEle, "themeSelectForPrayer", undefined, items.map((t) => { return { label: t, value: t } }), item2);
  item2Input.input.oninput = () => {
    item2 = item2Input.input.value;
  }
  item2Input.container.style.display = "inline-block";

  const prayerEle4 = createElementWithClassAndParent("span", prayerEle);
  prayerEle4.innerHTML += " and ";


  const item3Input = createSelectInputWithLabel(prayerEle, "themeSelectForPrayer", undefined, items.map((t) => { return { label: t, value: t } }), item3);
  item3Input.input.oninput = () => {
    item3 = item2Input.input.value;
  }
  item3Input.container.style.display = "inline-block";

  const prayerEle5 = createElementWithClassAndParent("span", prayerEle);
  prayerEle5.innerHTML += " Here's a sentence or two of specifics that are important to me. If I have any images I want to be in the picture frames in this room, I'll link them here. ";


  //parent, id, labelText, initialValue, rows = 8, cols = 81
  const textAreaInput = createTextAreaInputWithLabel(prayerEle, "themeSelectForPrayer", undefined, "Here's an example of how you'd link any images you want to be in paintings on the wall of the new room: https://lostinzampanio.neocities.org/character_pixel/Yongki.png", 8, 81);
  textAreaInput.input.setAttribute("maxlength", 310);
  textAreaInput.input.oninput = () => {
    sentences = textAreaInput.input.value.slice(0, 310);
  }
  textAreaInput.container.style.marginTop = "13px";
  textAreaInput.input.style.width = "97%"

  const claimCheck = createCheckboxInputWithLabel(prayerEle, "claim-check", "I want to Claim This Room*:", claimed)
  claimCheck.input.oninput = () => {
    claimed = !claimed;
  }

  const asterisk = createElementWithClassAndParent("div", prayerEle, "clarification");
  asterisk.innerHTML += "* You can think of a Claimed Room as being like your personal room in the mansion. You can't keep other Guests out, but your clownsona will be associated with it so everyone knows where you are. Try to have only one claimed room, okay?";


  const sendPrayerButton = createElementWithClassAndParent("button", prayerEle);
  sendPrayerButton.innerText = `Send Prayer and Lose ${globalDataObject.harvestPoints} Books`;
  sendPrayerButton.style.marginTop = "13px";
  sendPrayerButton.onclick = async () => {
    const res = await sendRoomPrayer(globalDataObject.current_room_id, theme, item1, item2, item3, sentences, claimed);
    if (res) {
      contentEle.innerHTML = "The Harvest has heard your prayer. If you are Blessed, a Room will arrive before Halloween's End."
      document.querySelector(".bottom-close-button").innerText = "Gotcha"
      //re-render the room, do NOT try to manually start it back up or it won't redo the check for if you can afford it, catalyst discovered that one
      renderID(globalDataObject.current_room_id);
    } else {
      contentEle.innerHTML = "Something went wrong. The Harvest has NOT heard your prayer. JR may know why, if you can find them on the Lavinraca <a target='_blank' href ='https://discord.gg/Unj4x2aCBa'>Discord</a>. ";
      document.querySelector(".bottom-close-button").innerText = "Gotcha"
      //re-render the room, do NOT try to manually start it back up or it won't redo the check for if you can afford it, catalyst discovered that one
      renderID(globalDataObject.current_room_id);
    }
  }


  showExistingPopup(contentEle, "No thank you.");

}

const handleShowingExistingPrayers = (prayers) => {

  const contentEle = document.createElement("div");
  const header = createElementWithClassAndParent("div", contentEle);
  header.innerText = "These Guests Have Already Prayed For This Room."
  const clarification = createElementWithClassAndParent("div", contentEle, "clarification");
  clarification.innerText = "You are free to join them cramming themselves into this room. What would you like to contribute to this growing chaos of creation? ";
  const list = createElementWithClassAndParent("ol", contentEle);

  for (let p of prayers) {
    const e = createElementWithClassAndParent("li", list);
    e.innerText = p.message;
    e.style.marginBottom = "13px"
  }

  showExistingPopup(contentEle, "Gotcha")
}

function prayForRoom() {
  //this fucntion will NOT let you have zero cuz if we did it won't escalate prices and im lazy and this is the easiest solution
  //yes i note the irony that i claim to be lazy and built this whole maze in several months of intense focus
  if (globalDataObject.harvestPoints === 0) {
    globalDataObject.harvestPoints = 1;
    save();
  }
  const textEle = story.querySelector("#room-text");
  const button = createElementWithClassAndParent("button", textEle);

  button.innerText = "Pray For Room?"
  button.onclick = () => {
    handlePrayingForRoom();
  }

  const prayers = getPendingPrayersForRoom(globalDataObject.current_room_id);
  console.log("JR NOTE: prayers for room", prayers, globalDataObject.current_room_id)

  if (prayers.length > 0) {
    const button2 = createElementWithClassAndParent("button", textEle);

    button2.innerText = "View Current Prayers For This Room?"
    button2.onclick = () => {
      handleShowingExistingPrayers(prayers);
    }
  }

}


async function handleWin(src, bet) {
  video.pause();
  video.src = hallwayDir + "Harvest/victory.mp4";
  video.loop = true;
  video.play().catch(() => { });
  await sleep(3000);

  const resumeGambling = async () => {
    await sleep(3000)
    const textEle = story.querySelector("#room-text");
    textEle.style.display = "block";
    //re-render the room, do NOT try to manually start it back up or it won't redo the check for if you can afford it, catalyst discovered that one
    renderID(globalDataObject.current_room_id);

  }

  if (src.includes("harvest")) {
    globalDataObject.books += 100; //quietly, with no fan fair
    //half to show off the model, half to collect for mysterious purposes (9/28/26 i know the purpose now)
    harvestPointsGet(bet);
    resumeGambling();
  } else if (src.includes("key")) {
    globalDataObject.books += 1; //you get your bet back, at least.
    keyGet(bet * 4);
    resumeGambling();
  } else if (src.includes("mask")) {
    globalDataObject.books += 1; //you get your bet back, at least.
    maskGet(bet * 4);
    resumeGambling();
  } else if (src.includes("book")) {
    bookGet(bet * 4);
    resumeGambling();
  } else {
    globalDataObject.books += 1; //you get your bet back, at least.
    alert("Uh. What did. What did you do? Uh. I guess you win. Uh. This popup? How the hell did you win something impossible???")
  }


}

/*
....
i just left the harvest room
and came back into it
and it was the mirror room
this is fine
east_main_room1_enter is mirror
oh i see the harvest backs out into the mirror rooms hall on accident
i do enjoy the bugs we're getting
space is non euclidean but don't worry its just because of bugs
*/
function gamble(bet) {
  if (globalDataObject.books < bet) {
    return;
  }
  const textEle = story.querySelector("#room-text");
  const button = createElementWithClassAndParent("button", textEle);
  button.innerText = `Bet ${bet} Books ? `
  button.onclick = () => {
    //take your bet.
    globalDataObject.books += -1 * bet;
    save();
    const possible_videos = ["win_mask", "win_key", "win_book", "fail5", "fail3", "fail4", "fail2", "fail1", "fail_two_harvests", "win_harvest", "fail_two_keys", "fail_two_masks"];
    video.pause();
    video.src = hallwayDir + "Harvest/" + pickFrom(possible_videos) + ".mp4";
    const textEle = story.querySelector("#room-text");
    textEle.style.display = "none";
    video.loop = false;
    video.play().catch(() => { });
    video.onended = async () => {
      video.onended = null;
      if (video.src.includes("win")) {
        handleWin(video.src, bet)
      } else {
        await sleep(1000);
        //re-render the room, do NOT try to manually start it back up or it won't redo the check for if you can afford it, catalyst discovered that one
        renderID(globalDataObject.current_room_id);


      }
    }
  }
}

function letsGoGamble1() {
  gamble(1)
}

function letsGoGamble10() {
  gamble(10)
}


function letsGoGamble100() {
  gamble(100)
}

