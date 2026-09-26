//      "functions": ["prayForRoom", "letsGoGamble1", "letsGoGamble10", "letsGoGamble100"]

function prayForRoom() {
  const textEle = story.querySelector("#room-text");
  const button = createElementWithClassAndParent("button", textEle);
  button.innerText = "Pray For Room?"
  button.onclick = () => {
    alert("TODO")
  }
}

async function handleWin(src, bet) {
  video.pause();
  const dir = "images/Diorama/Inside/Hallways/"
  video.src = dir + "Harvest/victory.mp4";
  video.looping = true;
  await sleep(1000);

  if (src.includes("harvest")) {
    globalDataObject.books += 100; //quietly, with no fan fair
    //half to show off the model, half to collect for mysterious purposes
    harvestPointsGet(bet * 4);
  } else {
    alert("TODO")
  }


}

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
    const dir = "images/Diorama/Inside/Hallways/"
    const possible_videos = ["fail_two_harvests", "win_harvest"];
    video.pause();
    video.src = dir + "Harvest/" + pickFrom(possible_videos) + ".mp4";
    const textEle = story.querySelector("#room-text");
    textEle.style.display = "none";
    video.looping = false;
    video.play();
    video.onended = async () => {
      video.onended = null;
      if (video.src.includes("win")) {
        handleWin(src, bet)
      } else {
        await sleep(1000);
        resumePlayingRegularVideoOnEndOfTemporaryOne();
      }
    }
    //resumePlayingRegularVideoOnEndOfTemporaryOne
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

