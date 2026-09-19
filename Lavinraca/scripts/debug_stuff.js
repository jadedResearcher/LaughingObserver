/*
i am finding it SUPER annoyign to do all this boiler plate for each new hallway

so

i'm fixing it

plus it hurts my arm to do all this repetition

i considered flat out makign a builder but, i hate making forms and this is easier

give me the base ID for the hallway and I'll give you a template to edit with all the 
//wasd already wired in (youll need to make clones for state changes tho)
//and if theres a sunset version you gotta make two templates
*/

//very very very fun fan animation of ZampanioSimEast:  https://www.tumblr.com/emberiscurious/827708119865016320/that-thing-i-promised?source=share


//debugGenerateTemplateForNewHallway("2_sunset")
const debugGenerateTemplateForNewHallway = (id, doubleSize = false, backwards_full_id = null, forwards_full_id = null) => {
  //they had us in the first half ngl
  const first_half = `
    "${id}_deep1": {
      "roomID": "${id}",
      "src": "${id}/deep1",
      "flavorText": "TODO",
      "forwards": "${id}_deep2",
      "left": "${id}_left1",
      "right": "${id}_right1",
      "backwards": "${backwards_full_id}",
      "functions": []
    },
    "${id}_left1": {
      "roomID": "${id}",
      "src": "${id}/left1",
      "flavorText": "TODO",
      "forwards": null,
      "left": null,
      "right": "${id}_deep1",
      "backwards": "${id}_deep1",
      "functions": []
    },
    "${id}_right1": {
      "roomID": "${id}",
      "src": "${id}/right1",
      "flavorText": "TODO",
      "forwards": null,
      "left": "${id}_deep1",
      "right": null,
      "backwards": "${id}_deep1",
      "functions": []
    },
    "${id}_left2": {
      "roomID": "${id}",
      "src": "${id}/left2",
      "flavorText": "TODO",
      "forwards": null,
      "left": null,
      "right": "${id}_deep2",
      "backwards": "${id}_deep2",
      "functions": []
    },
    "${id}_right2": {
      "roomID": "${id}",
      "src": "${id}/right2",
      "flavorText": "TODO",
      "forwards": null,
      "left": "${id}_deep2",
      "right": null,
      "backwards": "${id}_deep2",
      "functions": []
    }, "${id}_deep2": {
      "roomID": "${id}",
      "src": "${id}/deep2",
      "flavorText": "TODO",
      "forwards": ${doubleSize ? `"${id}_deep3"` : forwards_full_id},
      "left": "${id}_left2",
    "right": "${id}_right2",
      "backwards": "${id}_deep1",
      "functions": []
    },
  `

  const second_half = `,
    "${id}_deep3": {
      "roomID": "${id}",
      "src": "${id}/deep3",
      "flavorText": "TODO",
      "forwards": "${id}_deep4",
      "left": "${id}_left3",
      "right": "${id}_right3",
      "backwards": "${id}_deep2",
      "functions": []
    },
    "${id}_left3": {
      "roomID": "${id}",
      "src": "${id}/left3",
      "flavorText": "TODO",
      "forwards": null,
      "left": null,
      "right": "${id}_deep3",
      "backwards": "${id}_deep3",
      "functions": []
    },
    "${id}_right3": {
      "roomID": "${id}",
      "src": "${id}/right3",
      "flavorText": "TODO",
      "forwards": null,
      "left": "${id}_deep3",
      "right": null,
      "backwards": "${id}_deep3",
      "functions": []
    },

    "${id}_left4": {
      "roomID": "${id}",
      "src": "${id}/left4",
      "flavorText": "TODO",
      "forwards": null,
      "left": null,
      "right": "${id}_deep4",
      "backwards": "${id}_deep4",
      "functions": []
    },
    "${id}_right4": {
      "roomID": "${id}",
      "src": "${id}/right4",
      "flavorText": "TODO",
      "forwards": null,
      "left": "${id}_deep4",
      "right": null,
      "backwards": "${id}_deep4",
      "functions": []
    },
      "${id}_deep4": {
      "roomID": "${id}",
      "src": "${id}/deep4",
      "flavorText": "TODO",
      "forwards": ${forwards_full_id},
      "left": "${id}_left4",
      "right": "${id}_right4",
      "backwards": "${id}_deep3",
      "functions": []
    }
  `

  const map_template = `{${first_half}${doubleSize ? second_half : ""}}`;
  // console.log("JR NOTE: ", map_template)
  //trust me on this, outputs something i can copy and paste into the json
  const data = JSON.parse(map_template)
  //const outputEle = createTextAreaInputWithLabel();
  const str = (JSON.stringify(data, null, 4)) //gets rid of first and last curly brace, not stupposd to copy
  console.log(str.slice(1, -1))

  //console.log("JR NOTE: dont copy the containing curly braces, they break hallways")
}


//debugGenerateTemplateForNewHallway("bluh")
//a generic hallway with no decorations that fills out the "you should map this" part of the maze
//i.e. the east wing
//i can go back around and make more custom stuff for some hallways if i want, but this lets me go fast
//its 9/16, only 14 or so days till halloween season begins
//gotta make the most of it
//if i want to customize just edit the json, make a new dir for the stuff etc
const debugGenerateStraightHallway = (id) => {
  const versions = [];
  /* versions.push({
     deep1: "",
     deep2: "",
     left1: "",
     left2: "",
     right1: "",
     right2: ""
   });*/

  versions.push({
    deep1: "ADeep1",
    deep2: "ADeep2",
    left1: "BFlatLight",
    left2: "FlatWall",
    right1: "FlatWall",
    right2: "AFlatLight"
  });

  versions.push({
    deep1: "BDeep1",
    deep2: "BDeep2",
    left1: "FlatWall",
    left2: "BFlatLight",
    right1: "AFlatLight",
    right2: "FlatWall"
  });

  debugGenerateCopiedHallwayWithVersions(id, versions)



}

const debugGenerateRightDoorHallway = (id) => {
  const versions = [];
  /* versions.push({
     deep1: "",
     deep2: "",
     left1: "",
     left2: "",
     right1: "",
     right2: ""
   });*/

  versions.push({
    deep1: "RightDoorDeep1",
    deep2: "RightDoorDeep2",
    left1: "FlatWall",
    left2: "BFlatLight",
    right1: "AFlatLight",
    right2: "FlatDoor"
  });
  debugGenerateCopiedHallwayWithVersions(id, versions)
}

const debugGenerateLeftDoorHallway = (id) => {
  const versions = [];
  /* versions.push({
     deep1: "",
     deep2: "",
     left1: "",
     left2: "",
     right1: "",
     right2: ""
   });*/

  versions.push({
    deep1: "LeftDoorDeep1",
    deep2: "ADeep2",
    left1: "FlatDoor",
    left2: "FlatWall",
    right1: "AFlatLight",
    right2: "BFlatLight"
  });
  debugGenerateCopiedHallwayWithVersions(id, versions)
}


const debugGenerateRoomWithSingleDoorBehindYou = (id) => {

  const map_template = `"${id}_enter": {
        "src": "open_the_door",
        "flavorText": "",
        "forwards": "${id}_deep1",
        "backwards": "TODO",
        "functions": ["unlockDoorForwards"]
    },"${id}_backup": {
        "src": "open_the_door_but_backwards",
        "flavorText": "",
        "forwards": "${id}_deep1",
        "backwards": "TODO",
        "functions": ["unlockDoorBackwards"]
    },
  "${id}_deep1": {
      "roomID": "${id}",
      "src": "${id}/deep1",
      "backwards": "${id}_backup",
      "functions": []
    }`

  //trust me on this, outputs something i can copy and paste into the json
  const massaged_map_template = `{${map_template}}`;

  //console.log("JR NOTE: ", massaged_map_template);

  const data = JSON.parse(massaged_map_template)
  //const outputEle = createTextAreaInputWithLabel();
  const str = (JSON.stringify(data, null, 4));
  //gets rid of first and last curly braces, not supposed to copy
  console.log(`//${id} start${str.slice(1, -1)}`)
  //console.log("JR NOTE: dont copy the containing curly braces, they break hallways")
}


//until you have Prayed for a new room to exist, harvest rooms are placeholders
//they all let you Pray, and they all let you Gamble (lets go gambling)
//GATE is Gambling, Arbitration, Teaching and Eating
//and boy does our girl love all four. the reward for gambling is books, which come wiht knowledge
//and of course if multiple people are praying in the same room, the Harvest needs to Arbitrate their wishes
//all thats left is eating .... maybe i can do something with meat and candy here.
const debugGenerateHarvestRoom = (id) => {

  const videos = ["eyes", "fox", "fox"];

  const map_template = `"${id}_enter": {
        "src": "open_the_door",
        "forwards": "${id}_deep1",
        "backwards": "TODO",
        "functions": ["unlockDoorForwards"]
    },"${id}_backup": {
        "src": "open_the_door_but_backwards",
        "forwards": "${id}_deep1",
        "backwards": "TODO",
        "functions": ["unlockDoorBackwards"]
    },
  "${id}_deep1": {
      "roomID": "${id}",
      "flavorText": "A statue of the Harvest's Head looms over you.",
      "src": "Harvest/${pickFrom(videos)}",
      "backwards": "${id}_backup",
      "functions": ["prayForRoom", "letsGoGamble1", "letsGoGamble10", "letsGoGamble100"]
    }`

  //trust me on this, outputs something i can copy and paste into the json
  const massaged_map_template = `{${map_template}}`;

  //console.log("JR NOTE: ", massaged_map_template);

  const data = JSON.parse(massaged_map_template)
  //const outputEle = createTextAreaInputWithLabel();
  const str = (JSON.stringify(data, null, 4));
  //gets rid of first and last curly braces, not supposed to copy
  console.log(`//${id} start${str.slice(1, -1)}`)
  //console.log("JR NOTE: dont copy the containing curly braces, they break hallways")
}

const debugGenerateCopiedHallwayWithVersions = (id, versions) => {
  const version = pickFrom(versions);

  const map_template = `"${id}_enter": {
        "src": "open_the_door",
        "flavorText": "",
        "forwards": "${id}_deep1",
        "backwards": "TODO",
        "functions": ["unlockDoorForwards"]
    },"${id}_backup": {
        "src": "open_the_door_but_backwards",
        "flavorText": "",
        "forwards": "${id}_deep1",
        "backwards": "TODO",
        "functions": ["unlockDoorBackwards"]
    },
  "${id}_deep1": {
      "roomID": "${id}",
      "src": "CopyOfACopy/${version.deep1}",
      "forwards": "${id}_deep2",
      "left": "${id}_left1",
      "right": "${id}_right1",
      "backwards": "${id}_backup",
      "functions": []
    },
    "${id}_left1": {
      "roomID": "${id}",
      "src": "CopyOfACopy/${version.left1}",
      "forwards": null,
      "left": null,
      "right": "${id}_deep1",
      "backwards": "${id}_deep1",
      "functions": []
    },
    "${id}_right1": {
      "roomID": "${id}",
      "src": "CopyOfACopy/${version.right1}",
      "forwards": null,
      "left": "${id}_deep1",
      "right": null,
      "backwards": "${id}_deep1",
      "functions": []
    },
    "${id}_left2": {
      "roomID": "${id}",
      "src": "CopyOfACopy/${version.left2}",
      "forwards": null,
      "left": null,
      "right": "${id}_deep2",
      "backwards": "${id}_deep2",
      "functions": []
    },
    "${id}_right2": {
      "roomID": "${id}",
      "src": "CopyOfACopy/${version.right2}",
      "forwards": null,
      "left": "${id}_deep2",
      "right": null,
      "backwards": "${id}_deep2",
      "functions": []
    },
    "${id}_deep2": {
      "roomID": "${id}",
      "src": "CopyOfACopy/${version.deep2}",
      "forwards": "TODO",
      "left": "${id}_left2",
      "right": "${id}_right2",
      "backwards": "${id}_deep1",
      "functions": []
    }
  `//deep2 being the last makes it easier to wire up in a line



  //trust me on this, outputs something i can copy and paste into the json
  const massaged_map_template = `{${map_template}}`;

  //console.log("JR NOTE: ", massaged_map_template);

  const data = JSON.parse(massaged_map_template)
  //const outputEle = createTextAreaInputWithLabel();
  const str = (JSON.stringify(data, null, 4));
  //gets rid of first and last curly braces, not supposed to copy
  console.log(`//${id} start${str.slice(1, -1)}`)
  //console.log("JR NOTE: dont copy the containing curly braces, they break hallways")
}

//        "roomID": "6",

const getHallwaysForRoomID = (roomID) => {
  return Object.values(hallways).filter((h) => h.roomID === roomID)
}

//i don't want to manually copy and paste this but i want them to be a map normally
//but a given hallway know its id too
const addIDToHallways = () => {
  for (let [key, value] of Object.entries(hallways)) {
    value.id = key;
  }
}

const debugHallways = (subset) => {
  let h = hallways;
  if (subset) {
    h = subset;
  }
  const body = document.body;
  body.innerHTML = "";
  body.style.overflow = "auto"
  const table = createElementWithClassAndParent("table", body);
  table.style.overflow = 'auto'
  table.style.background = "white"

  for (let [key, value] of Object.entries(h)) {
    console.log("JR NOTE: debug", key, value)
    const row = createElementWithClassAndParent("tr", table);
    const cell = createElementWithClassAndParent("td", row);
    cell.innerHTML = "<b>ID: </b> " + key;
    for (let [k, v] of Object.entries(value)) {
      const c = createElementWithClassAndParent("td", row);
      c.innerHTML = `<b>${k}</b>:${v}`;
      c.style.border = "1px solid black";
      const ids = ["forwards", "left", "right", "backwards"];
      if (ids.includes(k)) {
        if (hallways[v]) {
          c.style.background = "#b2e2b2";
        } else if (v === null) {
          c.style.opacity = "0.3"
        } else {
          c.style.background = "red"
          c.style.color = "black"
        }
      }

    }

  }
}

//makes it red so i can confirm its where i think it is and doing what i think it should
const debugCanvas = () => {
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "red";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

const debugSpookyEffects = () => {
  const dir = "images/Diorama/Inside/Hallways/ThisIsntReal/";
  const files = getSpookyEffects();
  const body = document.body;
  body.innerHTML = "";
  body.style.overflow = "auto";
  const preview = createElementWithClassAndParent("div", body);
  preview.style.cssText = `
  display: flex;
  flex-wrap:wrap;
  gap:13px;
`

  for (let f of files) {
    const v = createElementWithClassAndParent("video", preview);
    v.src = dir + f + ".mp4"
    v.style.height = "213px"
    v.controls = true;
  }
}