//      "functions": ["prayForRoom", "letsGoGamble1", "letsGoGamble10", "letsGoGamble100"]

function prayForRoom() {
  const textEle = story.querySelector("#room-text");
  const button = createElementWithClassAndParent("button", textEle);
  button.innerText = "Pray For Room?"
  button.onclick = () => {
    const contentEle = document.createElement("div");
    contentEle.innerHTML = `You can pray for what you'd like the Harvest to fill room '${globalDataObject.current_room_id}' with.
    <br><Br>
    It could be yours, if you wanted. Claim it, if so.
    <br><Br>
    Or it could be everyones.
    <br><Br>
    Fill it with anything you desire, just be warned that the Harvest can only Reap what is Sown.
    <br><Br>
    Shelves, beds, dressers, paintings (with custom images, if you link to them), safes, mirrors, and more are all possible.
    <br><Br>
    If you've seen it somewhere in the house, odds are you can add it to this room.
    <br><br>
    And if you want something...rarer, its possible it can be arranged. Including combination locks, secrets or puzzles.
    <br><Br>
    Know that the Harvest may fill this room with more than you asked for. Or less.
    <Br><Br>
    Or that multiple Faithful may pray to fill the same room.
    <br><br>
    Know also that the Harvest only works so many hours a day, and rooms will be Blessed in the order she deems appropriate.
    <br><Br>
    Finally, if you know what a clownsona is, know that any room claimed will be branded with yours.
    `
    const yes = createElementWithClassAndParent("button", contentEle);
    yes.innerText = "I want to Pray";
    yes.onclick = () => {
      contentEle.innerHTML = "<h2>Prayer for a Room</h2>"
      const prayerEle = createElementWithClassAndParent("div", contentEle);
      prayerEle.innerHTML = `
      Dear, Sweet, Precious Harvest, I pray for a room.  I want it to be `;
      const themes = ['Clowns', 'Waste', 'Technology', 'Art', 'Space', 'Time', 'Flesh', 'Buried', 'Stealing', 'Freedom', 'Fire', 'Lonely', 'Ocean', 'Science', 'Math', 'Twisting', 'Death', 'Apocalypse', 'Service', 'Family', 'Magic', 'Angels', 'Light', 'Hunting', 'Plants', 'Decay', 'Choices', 'Zap', 'Love', 'Soul', 'Anger', 'Web', 'Royalty', 'Endings', 'Knowing', 'Guiding', 'Crafting', 'Addiction', 'Spying', 'Healing', 'Dolls', 'Obfuscation', 'Censorship', 'Darkness', 'Killing', 'Music', 'Defense', 'Questing', 'Bugs', 'Language'];
      const themeInput = createSelectInputWithLabel(prayerEle, "themeSelectForPrayer", undefined, themes.map((t) => { return { label: t, value: t } }), "Clowns")
    }

    showExistingPopup(contentEle, "No thank you.");
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
    const json = hallways[globalDataObject.current_room_id];

    video.src = hallwayDir + json.src + ".mp4";
    video.loop = true;
    window.requestAnimationFrame(() => video.play().catch(() => { }))
  }

  if (src.includes("harvest")) {
    globalDataObject.books += 100; //quietly, with no fan fair
    //half to show off the model, half to collect for mysterious purposes
    harvestPointsGet(bet * 4);
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
  button.innerText = `Bet ${bet} Books?`
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
        const json = hallways[globalDataObject.current_room_id];

        video.src = hallwayDir + json.src + ".mp4";
        video.loop = true;
        window.requestAnimationFrame(() => video.play().catch(() => { }))
        textEle.style.display = "block";

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

