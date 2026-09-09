//give me the base ID for the hallway and I'll give you a template to edit with all the 
//wasd already wired in (youll need to make clones for state changes tho)
//and if theres a sunset version you gotta make two templates
const debugGenerateTemplateForNewHallway = (id, backwards_full_id, forwards_full_id) => {

  const map_template = `{
    "${id}_front": {
      "src": "${id}/deep1",
      "flavorText": "TODO",
      "forwards": "${id}_back",
      "left": "${id}_front_left",
      "right": "${id}_front_right",
      "backwards": "${backwards_full_id}",
      "functions": []
    },
    "${id}_front_left": {
      "src": "${id}/front_left",
      "flavorText": "TODO",
      "forwards": null,
      "left": null,
      "right": "${id}_front",
      "backwards": "${id}_front",
      "functions": []
    },
    "${id}_front_right": {
      "src": "${id}/front_right",
      "flavorText": "TODO",
      "forwards": null,
      "left": "${id}_front",
      "right": null,
      "backwards": "${id}_front",
      "functions": []
    },
    "${id}_back": {
      "src": "${id}/deep2",
      "flavorText": "TODO",
      "forwards": ${forwards_full_id},
      "left": "${id}_back_left",
      "right": "${id}_back_right",
      "backwards": "${id}_front",
      "functions": []
    },
    "${id}_back_left": {
      "src": "${id}/back_left",
      "flavorText": "TODO",
      "forwards": null,
      "left": null,
      "right": "${id}_back",
      "backwards": "${id}_back",
      "functions": []
    },
    "${id}_back_right": {
      "src": "${id}/back_right",
      "flavorText": "TODO",
      "forwards": null,
      "left": "${id}_back",
      "right": null,
      "backwards": "${id}_back",
      "functions": []
    }
  }`
  return map_template;

}

const debugHallways = () => {
  const body = document.body;
  body.innerHTML = "";
  const table = createElementWithClassAndParent("table", body);
  table.style.background = "white"
  const header_row = createElementWithClassAndParent("tr", table);

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