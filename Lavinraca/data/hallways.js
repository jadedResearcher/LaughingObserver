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

//call functions via window["functionName"](arguments);
/*
* scene id 4005 is for scene 4 transitioning to 5 with a door opening, (shouldn't matter if side or front)
 has function door4005 to handle it, 
 function calls generic function to check what video plays for door opening then moved
  to correct next scene, do this for sunset/electric 

*/

const hallways = {
    "1": {
        "src": "1/Sunset/deep1_sun",
        "flavorText": "The entrance to the house is lit only by the setting sun.",
        "forwards": "4",
        "left": "2",
        "right": "3",
        "backwards": "OUTSIDE",
        "functions": [
            "hallwayOneSunbeam"
        ]
    },
    "2": {
        "src": "1/Sunset/front_left",
        "flavorText": "The lamp doesn't seem to be working.",
        "forwards": null,
        "left": null,
        "right": "1",
        "backwards": "1",
        "functions": [
            "test2"
        ]
    },
    "3": {
        "src": "1/Sunset/front_right",
        "flavorText": "Its hard to make out the paintings in the dark.",
        "forwards": null,
        "left": "1",
        "right": null,
        "backwards": "1",
        "functions": []
    },
    "4": {
        "src": "1/Sunset/deep2",
        "flavorText": "The door stands before you, invitingly.",
        "forwards": "4_open_locked_door",
        "left": "5",
        "right": "6",
        "backwards": "1"
    },
    "5": {
        "src": "1/Sunset/back_left_key",
        "flavorText": "Light filters in from across the hall, revealing a glinting Key.",
        "forwards": null,
        "left": null,
        "right": "4",
        "backwards": "4",
        "functions": ["pickUpKey5"]
    },
    "5_key_gotten": {
        "src": "1/Sunset/back_left_no_key",
        "flavorText": "You already got the key here.",
        "forwards": null,
        "left": null,
        "right": "4",
        "backwards": "4",
        "functions": []
    },
    "6": {
        "src": "1/Sunset/back_right",
        "flavorText": "This dirty window is doing its best to light up the entire hallway.",
        "forwards": null,
        "left": "4",
        "right": null,
        "backwards": "4",
        "functions": []
    },

    "4_open_locked_door": {
        "src": "open_the_door",
        "flavorText": "The door is locked, a normal keyhole visible.",
        "backwards": "4",
        "functions": ["openDoor4Locked"]
    },
    "4_open_unlocked_door": {
        "src": "open_the_door",
        "flavorText": "",
        "forwards": "1_bright",
        "backwards": "4",
        "functions": ["openDoor4UnLocked"]
    },
    "1_bright": {
        "src": "1/ElectricLights/front1",
        "flavorText": "The foyer looks so different lit by the electric lamps.",
        "forwards": "4_bright",
        "left": "2_bright",
        "right": "3_bright",
        "backwards": "4",
        "functions": []
    },
    "2_bright": {
        "src": "1/ElectricLights/front_left",
        "flavorText": "The lamp shines brightly showing two classic scenes from the Book of Harvest.",
        "forwards": null,
        "left": null,
        "right": "1_bright",
        "backwards": "1_bright",
        "functions": [
            "test2"
        ]
    },
    "3_bright": {
        "src": "1/ElectricLights/front_right",
        "flavorText": "Two classic scenes from the Book of Harvest.",
        "forwards": null,
        "left": "1_bright",
        "right": null,
        "backwards": "1_bright",
        "functions": []
    },
    "4_bright": {
        "src": "1/ElectricLights/front2",
        "flavorText": "The door stands before you, invitingly.",
        "forwards": null,
        "left": "5_bright",
        "right": "6_bright",
        "backwards": "1_bright",
        "functions": [
            "wrongOnPurposeForDebugging"
        ]
    },
    "5_bright": {
        "src": "1/ElectricLights/back_left",
        "flavorText": "The key has already been collected.",
        "forwards": null,
        "left": null,
        "right": "4_bright",
        "backwards": "4_bright",
        "functions": ["testFuckery"]
    },
    "6_bright": {
        "src": "1/ElectricLights/back_right",
        "flavorText": "The formerly briliant window is now a dark mirror.",
        "forwards": null,
        "left": "4_bright",
        "right": null,
        "backwards": "4_bright",
        "functions": []
    }
}