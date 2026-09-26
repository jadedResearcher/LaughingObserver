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
  video.loop = true;
  video.play();
  await sleep(1000);

  if (src.includes("harvest")) {
    globalDataObject.books += 100; //quietly, with no fan fair
    //half to show off the model, half to collect for mysterious purposes
    harvestPointsGet(bet * 4);
    await sleep(3000)
    const textEle = story.querySelector("#room-text");
    textEle.style.display = "block";
    const json = hallways[globalDataObject.current_room_id];

    video.src = "images/Diorama/Inside/Hallways/" + json.src + ".mp4";
    video.loop = true;
    window.requestAnimationFrame(() => video.play())

  } else {
    alert("TODO")
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
    const dir = "images/Diorama/Inside/Hallways/"
    const possible_videos = ["fail_two_harvests", "win_harvest"];
    video.pause();
    video.src = dir + "Harvest/" + pickFrom(possible_videos) + ".mp4";
    const textEle = story.querySelector("#room-text");
    textEle.style.display = "none";
    video.loop = false;
    video.play();
    video.onended = async () => {
      video.onended = null;
      if (video.src.includes("win")) {
        handleWin(video.src, bet)
      } else {
        console.log("JR NOTE: lose")
        await sleep(1000);
        const json = hallways[globalDataObject.current_room_id];

        video.src = "images/Diorama/Inside/Hallways/" + json.src + ".mp4";
        video.loop = true;
        window.requestAnimationFrame(() => video.play())
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

