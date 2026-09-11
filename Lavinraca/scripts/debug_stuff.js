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
    "${id}_deep2": {
      "roomID": "${id}",
      "src": "${id}/deep2",
      "flavorText": "TODO",
      "forwards": ${doubleSize ? `"${id}_deep3"` : forwards_full_id},
      "left": "${id}_left2",
      "right": "${id}_right2",
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
    }
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
    "${id}_deep4": {
      "roomID": "${id}",
      "src": "${id}/deep4",
      "flavorText": "TODO",
      "forwards": ${forwards_full_id},
      "left": "${id}_left4",
      "right": "${id}_right4",
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
    }
  `

  const map_template = `{${first_half}${doubleSize ? second_half : ""}}`;
  // console.log("JR NOTE: ", map_template)
  //trust me on this, outputs something i can copy and paste into the json
  const data = JSON.parse(map_template)
  //const outputEle = createTextAreaInputWithLabel();
  console.log(JSON.stringify(data, null, 4))

}

const debugHallways = () => {
  const body = document.body;
  body.innerHTML = "";
  body.style.overflow = "auto"
  const table = createElementWithClassAndParent("table", body);
  table.style.overflow = 'auto'
  table.style.background = "white"

  for (let [key, value] of Object.entries(hallways)) {
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