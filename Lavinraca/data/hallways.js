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
    1: {
        "src": "1/Sunset/deep1_sun",
        "flavorText": "You gingerly step inside, peering into the dark hallway, lit only by the setting sun.",
        "forwards": 4,
        "left": 2,
        "right": 3,
        "backwards": -1,
        "functions": [
            "hallwayOneSunbeam"
        ]
    },
    2: {
        "src": "1/Sunset/front_left",
        "flavorText": "The lamp doesn't seem to be working.",
        "forwards": null,
        "left": null,
        "right": 1,
        "backwards": 1,
        "functions": [
            "test2"
        ]
    },
    3: {
        "src": "1/Sunset/front_right",
        "flavorText": "Its hard to make out the paintings in the dark.",
        "forwards": null,
        "left": 1,
        "right": null,
        "backwards": 1,
        "functions": []
    },
    4: {
        "src": "1/Sunset/deep2",
        "flavorText": "The door stands before you, invitingly.",
        "forwards": 4111,
        "left": 5,
        "right": 6,
        "backwards": 1,
        "functions": [
            "wrongOnPurposeForDebugging"
        ]
    },
    5: {
        "src": "1/Sunset/back_left_key",
        "flavorText": "Not much light is coming in from the east.",
        "forwards": null,
        "left": null,
        "right": 4,
        "backwards": 4,
        "functions": []
    },
    6: {
        "src": "1/Sunset/back_right",
        "flavorText": "This window is doing its best to light up the entire hallway.",
        "forwards": null,
        "left": 4,
        "right": null,
        "backwards": 4,
        "functions": []
    },

    4111: {
        "src": "open_the_door",
        "flavorText": "",
        "forwards": 111,
        "functions": ["openDoor4111"]
    },
    111: {
        "src": "1/ElectricLights/front1",
        "flavorText": "The foyer looks so different lit by the electric lamps.",
        "forwards": 444,
        "left": 222,
        "right": 333,
        "backwards": 4,
        "functions": []
    },
    222: {
        "src": "1/ElectricLights/front_left",
        "flavorText": "The lamp shines brightly showing two classic scenes from the Book of Harvest.",
        "forwards": null,
        "left": null,
        "right": 111,
        "backwards": 111,
        "functions": [
            "test2"
        ]
    },
    333: {
        "src": "1/ElectricLights/front_right",
        "flavorText": "Two classic scenes from the Book of Harvest.",
        "forwards": null,
        "left": 111,
        "right": null,
        "backwards": 111,
        "functions": []
    },
    444: {
        "src": "1/ElectricLights/front2",
        "flavorText": "The door stands before you, invitingly.",
        "forwards": null,
        "left": 555,
        "right": 666,
        "backwards": 111,
        "functions": [
            "wrongOnPurposeForDebugging"
        ]
    },
    555: {
        "src": "1/ElectricLights/back_left",
        "flavorText": "The key has already been collected.",
        "forwards": null,
        "left": null,
        "right": 444,
        "backwards": 444,
        "functions": ["testFuckery"]
    },
    666: {
        "src": "1/ElectricLights/back_right",
        "flavorText": "The formerly briliant window is now a dark mirror.",
        "forwards": null,
        "left": 444,
        "right": null,
        "backwards": 444,
        "functions": []
    }
}