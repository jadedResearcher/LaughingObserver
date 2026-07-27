window.onload = () => {
  console.log("JR NOTE: hello world")
  test.onclick = () => {
    test.play();
  }

  approach.onclick = () => {
    test.play();
  }
  test.onended = () => {
    alert("trick or treat")
  }
}