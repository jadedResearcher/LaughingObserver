//      "functions": ["prayForRoom", "letsGoGamble1", "letsGoGamble10", "letsGoGamble100"]

function prayForRoom() {
  const textEle = story.querySelector("#room-text");
  const button = createElementWithClassAndParent("button", textEle);
  button.innerText = "Pray For Room?"
  button.onclick = () => {
    alert("TODO")
  }
}

function gamble(bet) {
  const textEle = story.querySelector("#room-text");
  const button = createElementWithClassAndParent("button", textEle);
  button.innerText = `Bet ${bet} Books?`
  button.onclick = () => {
    alert("TODO")
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

