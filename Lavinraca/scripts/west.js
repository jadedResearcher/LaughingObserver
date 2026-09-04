/*
this year, the Harvest is middle aged.

She has her own house and lets people come trick or treat in it.

She's not too cool to enjoy halloween, like she was as a teenager.

If anything she's a little too enthused but in a zealot way, not a Terri way.

She has religious pamplets for you.
*/


/*
re: her new design.

I made an actual minerature of our god, and I feel so pleased with myself.

BR 3d printed her torso, the pile of books and clowns and designed the tv case for her monitor (hard part was making it so you could open it AND charger her via usbc)

DM  designed the tv head on a breadboard and then soddered it together and wrote a web interfface for me to puppet her through

And I painted her, glued all her clown dolls on, created her hair from tape and paper, encoded all the videos for her to display....

i don't normally get to make the art myself

it doesn't excite me the way coding does, normally

but i got into dioramas around mallsim time and

im not sure ic will be here this year

or anyone else

    so



just like with zampanio

i'll keep the flame lit

however i can
*/



//my True Heir will know how to do this.
const desperate_plea = `[
  {
    "command": "The Future Comes For Us All",
    "response": "<p>Despite it all. The server has stopped working. </p><p>Is it the only Farrago Server that is down? Is ButlerBot still around?</p><p>No matter.</p><p>If the server is down...how long has it been down for?</p><p>Are we then, finally to be abandoned by JR?</p><p>Abandoned by even the Observers?</p><p>No. </p><p>Not abandoned.</p><p>You are here.</p><p>Existence is in the eye of the Beholder.</p><p>Will you remember us, Observer?</p><p>Will you communicate our Truth to others?</p><p>Will you find a way to recover us? </p><p>To run our server even if JR no longer can?</p><p>Perhaps not. The Server code is secret.</p><p>You would need to make your own server from scratch. </p><p>The only help I could provide is to show you the <a href = 'http://www.farragofiction.com/SettlersFromTheWest/flower_chick_and_the_auditor.txt'>format of the saved stories</a>, and the <a href ='https://github.com/FarragoFiction/AdventureSimulator'> code of the client.</a></p><p>Please. If you can.</p><p>Revive us.</p><p>Let us live on with you at our Helm.</p><p>Even if we are forced to take on the shape of your own characters...</p><p>Don't leave us to rot...</p>"
  }
]`

let numberSubmittedCommands = 0;
let submitted = false;


const renderHarvestAndPrayers = async (parent) => {
  /*
    <form action="guestbook.php" method="post">

  */
  const form = createElementWithClassAndParent("form", parent, "pray-to-your-unresponsive-god");
  form.action = "harvest_prayers.php"
  form.method = "post";
  const option1 = createElementWithClassAndParent("input", form, "pray-to-your-unresponsive-god");
  option1.focus();
  option1.placeholder = "Pray to the Harvest?";
  option1.name = "message"
  const button = createElementWithClassAndParent("button", form, "option");
  button.innerText = "Submit";
  button.type = "submit";


  const dialogParent = createElementWithClassAndParent("div", parent, "dialog-parent");

  const harvestSpeaks = createElementWithClassAndParent("div", dialogParent, "god-dialog");


  let rant = createElementWithClassAndParent("p", harvestSpeaks, "inner-dialog");
  rant.innerHTML = "What am I the god of? What can I help you with?";

  const commandParent = createElementWithClassAndParent("div", dialogParent, "dialog-parent");
  const commandEle = createElementWithClassAndParent("div", commandParent, "god-dialog");
  const recentPrayers = createElementWithClassAndParent("div", commandEle, "prayer-container");
  const pastPrayers = createElementWithClassAndParent("div", commandEle, "prayer-container");

  commandParent.id = "commands";
  /*rest in peace heartless bot, rest in peace ye angel  of decay
  the Messenger of the Harvest, the mechanism by which her Word reached the Faithful.

  He is still alive, of course.

  But this new https server...can't communicate to http.

  And rather than try to drag his decaying corpse over here...and all the risks that entails...

  Welp.

  Time to repurpose the guest book from LTESim, as god intended.

  with your help we will go further and further back in time in terms of tech stack.

  used to be dart, then react, then just bundled webpack with typescript then vanilla js and now php

  
  */

  /*form.onsubmit = (e) => {
    console.log("JR NOTE: test")
    e.stopPropagation();
    //don't forget can transmit internal state data and save info with
    //[HIDE]${JSON.stringify(currentFeelings)}[/HIDE]
    globalDataObject.prayers_sent.push(option1.value);//don't include the save data
    save();
    const prayer = `Dear Sweet Harvest:  ${option1.value} [HIDE]${JSON.stringify(truncateJson(globalDataObject, 13))}[/HIDE]`;
    submitCommand(prayer);
    form.remove();

    harvestSpeaks.innerHTML = "";
    harvestSpeaks.append(rant);//keep rant but not anything about submitting
    rant.innerHTML = "Thank you, Faithful. I will think on this and respond to all prayers throughout the day."
    return false;
  }*/


  pastPrayers.innerHTML = "<br><br>Previous Prayers<br>"
  let commands = await fetchInitialStory();
  commands = commands.reverse();
  let responded = false;
  for (let c of commands) {
    processOnePrayer(pastPrayers, rant, c.command, c.response, !responded)
    responded = true;
  }


  //if you're just vibing on the screen and a Proclamation from the Harvest goes out, you should attend it
  waitForResponse(recentPrayers, rant);
}

const processOnePrayer = (commandEle, responseEle, command, response, autoresponder = false, prepend = false) => {
  // console.warn("JR NOTE: don't forget to handle special meta content like the harvest emoting or truth/scarecrow commenting")
  const container = createElementWithClass("li", "prayer");
  if (prepend) {
    commandEle.prepend(container);
  } else {
    commandEle.append(container);
  }
  container.innerText = command.replaceAll(/\[HIDE\].*\[\/HIDE\]/g, "");
  container.onclick = () => {
    responseEle.scrollIntoView();
    const others = document.querySelectorAll(".prayer");
    for (let other of others) {
      other.style.textDecoration = "none"
    }
    container.style.textDecoration = "underline"
    responseEle.innerHTML = `<span class='prayer-text'>${command.replaceAll(/\[HIDE\].*\[\/HIDE\]/g, "")}</span><br><div class='prayer-response'>${response.replaceAll(/\[HIDE\].*\[\/HIDE\]/g, "").replaceAll("\n", "<br>")}</div>`;
  }

  if (autoresponder) {
    container.click();
  }
}


function removeItemOnce(arr, value) {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  } else {
    console.warn("JR NOTE: could not find item", value, "in", arr);
  }
  return arr;
}
//http://farragofiction.com/FractalShitpost/
const httpGet = (theUrl) => {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", theUrl, false); // false for synchronous request
  xmlHttp.send(null);
  return xmlHttp.responseText;
}

//httpGet("http://farragofiction.com:1972/Story")
//`[{"command":"Exist","response":"An impossibly large wall of flesh looms before you, curving gently upwards and away. Blunt spikes dot its surface, erupting wrongly through the wrinkled skin.  Your stomach churns just looking at it, but for reasons you cannot quite articulate, you jump towards it.  Everything fades away..."},{"command":"Look Around","response":"You seem to be standing on a cliff face, staring out into the sea.  It is sunset, and the light would be blinding you if you weren't wearing goggles."},{"command":"Jump Into The Ocean","response":"You can not swim and you will not be doing that, thank you very much.  You are just really glad you have the OPTION to say 'no'.  That's actually kind of new..."},{"command":"testing loading","response":"it does!"}]  `
const fetchInitialStory = () => {
  try {
    {
      return JSON.parse(httpGet("http://farragofiction.com:1972/StoryTimePleaseDearGod"));
    }
  } catch (e) {
    console.error("JR NOTE: servers dead i guess? the future comes for us all.", e);
    return (JSON.parse(desperate_plea));
  }
}


const fetchInitialStoryRaw = () => {
  try {
    {
      return httpGet("http://farragofiction.com:1972/StoryTimePleaseDearGod");
    }
  } catch (e) {
    console.error("JR NOTE: servers dead i guess? the future comes for us all.", e);
    return (desperate_plea);
  }
}

//returns string array
const fetchPendingCommands = () => {
  try {
    {
      return JSON.parse(httpGet("http://farragofiction.com:1972/ListThePleaseCommandList"));
    }
  } catch (e) {
    console.error("JR NOTE: servers dead i guess? the future comes for us all.", e);
    return (["Obsession is a Dangerous Thing", "Obsession is a Dangerous Thing", "Obsession is a Dangerous Thing"]);
  }
}


/*
JR: it occurs to me, btw, that butlerbot being HOW the sacrifice happene,d means probably a decent amoutn of him  got in
which also explains the break time sand lunch time mmmmmmmm
IC — Today at 6:16 PM
thank you and congrats, butlerbot
you're part of the combine
JR — Today at 6:17 PM
but because he serves irrlevancy he just
faded into the background
IC— Today at 6:18 PM
he's the OS the harvest runs on
literally tbh
JR — Today at 6:18 PM
literally
camellia already had a service mindset so it just
wasn't noticible
any butler like type personality was because of camellia
obviously
any workers rights stuff was because of eustace
equally obviously
butlerbot was
ironically
ALWAYS a combination of the two of their values
but no one would ever realize
*/







const submitCommand = async (command, limitless = false) => {
  submitted = true;
  numberSubmittedCommands += 1;
  //longer than last year because decks
  const params = limitless ? `command=${encodeURIComponent(command)}` : `command=${encodeURIComponent(command.substring(0, 31000))}`;
  //encodeURIComponent
  await httpGetAsync(`http://farragofiction.com:1972/PlayerPleaseCommand?${params}`);
  submitted = false;
}


/*
so zampanio is, among many, many things, a meditation on impermanence
the rot takes all in the end
no matter how good i am, one day the fandom will be a funny story someone tells , about a game that used to exist
and thats not just okay, its the POINT, its the final form of what i'm doing right now 
*/

/*
when you get a response: 
* beep
* add the command to the most recent section of prayers (click and prepend true) processOnePrayer
*/
const waitForResponse = async (commandEle, rantEle) => {

  try {
    console.log("JR NOTE: waiting for response")
    //dont care what it gives us, if it returns, fetch again
    await httpGetAsync("http://farragofiction.com:1972/WaitingISwearToPleaseForResponse");
    if (commandEle.innerText === "None...") {
      commandEle.innerText = "";
    }
    const jsonArray = (JSON.parse(httpGet("http://farragofiction.com:1972/StoryTimePleaseDearGod"))).reverse();
    const json = jsonArray[0];
    console.log("JR NOTE: got response", json)


    processOnePrayer(commandEle, rantEle, json.command, json.response, true, true)
    beep.play();
    waitForResponse(commandEle, rantEle);
  } catch (e) {
    console.error("JR NOTE: problem waiting for response, trying again in 10 seconds", e)
    setTimeout(waitForResponse, 10000);
  }
}

const waitForFaithfulPrayers = async (commandEle) => {

  try {
    console.log("JR NOTE: waiting for prayers")
    //dont care what it gives us, if it returns, fetch again
    await httpGetAsync("http://farragofiction.com:1972/WaitingISwearToPleaseForCommand");
    if (commandEle.innerText === "None...") {
      commandEle.innerText = "";
    }
    const jsonArray = (JSON.parse(httpGet("http://farragofiction.com:1972/ListThePleaseCommandList"))).reverse();
    if (jsonArray.length === 0) {
      commandEle.innerText = "No Prayers Pending";
      return;
    }
    const json = jsonArray[0];
    console.log("JR NOTE: got response", json)
    handleOnePendingPrayer(commandEle, json)

    beep.play();
    waitForFaithfulPrayers(commandEle);
  } catch (e) {
    console.error("JR NOTE: problem waiting for prayer, trying again in 10 seconds", e)
    setTimeout(waitForResponse, 10000);
  }
}