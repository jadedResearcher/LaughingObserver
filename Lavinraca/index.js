window.onload = () => {
  console.log("JR NOTE: hello world")
  game.onclick = () => {
    test.play();
  }

  approach.onclick = () => {
    game.play();
  }
  game.onended = () => {
    alert("trick or treat")
  }
}