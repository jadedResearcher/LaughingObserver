window.onload = () => {


  console.log("JR NOTE: hello world")
  game.onclick = () => {
    game.play();
  }

  approach.onclick = () => {
    game.play();
  }

  game.onended = () => {
    alert("trick or treat")
  }
}

