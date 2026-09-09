

//call functions via window["functionName"](arguments);
/*
* scene id 4005 is for scene 4 transitioning to 5 with a door opening, (shouldn't matter if side or front)
 has function door4005 to handle it, 
 function calls generic function to check what video plays for door opening then moved
  to correct next scene, do this for sunset/electric 

*/

//i changed conventions shorly after flushing out the first room, to make it easier to template
//so first room is the most confusing one
const hallways = {
    //hallway 1, sunset
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
        "forwards": "2_sunset_front",
        "backwards": "4",
        "functions": ["unlockDoorForwards"]
    },
    //hallway 1, electric lights
    "1_bright": {
        "src": "1/ElectricLights/front1",
        "flavorText": "The foyer looks so different lit by the electric lamps.",
        "forwards": "4_bright",
        "left": "2_bright",
        "right": "3_bright",
        "backwards": "2_sunset_back",
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
        "forwards": "1_2_open_unlocked_door",
        "left": "5_bright",
        "right": "6_bright",
        "backwards": "1_bright",
        "functions": [
            "wrongOnPurposeForDebugging"
        ]
    },

    "1_2_open_unlocked_door": {
        "src": "open_the_door",
        "flavorText": "",
        "forwards": "2_front",
        "backwards": "4_bright",
        "functions": ["unlockDoorForwards"]
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
    },
    //hallway2 bright
    "2_front": {
        "src": "2/deep1",
        "flavorText": "TODO",
        "forwards": "2_back",
        "left": "2_front_left",
        "right": "2_front_right",
        "backwards": "4_bright",
        "functions": []
    },
    "2_front_left": {
        "src": "2/front_left",
        "flavorText": "TODO",
        "forwards": null,
        "left": null,
        "right": "2_front",
        "backwards": "2_front",
        "functions": []
    },
    "2_front_right": {
        "src": "2/front_right",
        "flavorText": "TODO",
        "forwards": null,
        "left": "2_front",
        "right": null,
        "backwards": "2_front",
        "functions": []
    },
    "2_back": {
        "src": "2/deep2",
        "flavorText": "TODO",
        "forwards": null,
        "left": "2_back_left",
        "right": "2_back_right",
        "backwards": "2_front",
        "functions": []
    },
    "2_back_left": {
        "src": "2/back_left_no_mask",
        "flavorText": "TODO",
        "forwards": null,
        "left": null,
        "right": "2_back",
        "backwards": "2_back",
        "functions": []
    },
    "2_back_right": {
        "src": "2/back_right",
        "flavorText": "TODO",
        "forwards": null,
        "left": "2_back",
        "right": null,
        "backwards": "2_back",
        "functions": []
    },
    //hallway 2 sunset
    "2_sunset_front": {
        "src": "2_sunset/deep1",
        "flavorText": "TODO",
        "forwards": "2_sunset_back",
        "left": "2_sunset_front_left",
        "right": "2_sunset_front_right",
        "backwards": "4",
        "functions": []
    },
    "2_sunset_front_left": {
        "src": "2_sunset/front_left",
        "flavorText": "TODO",
        "forwards": null,
        "left": null,
        "right": "2_sunset_front",
        "backwards": "2_sunset_front",
        "functions": []
    },
    "2_sunset_front_right": {
        "src": "2_sunset/front_right",
        "flavorText": "TODO",
        "forwards": null,
        "left": "2_sunset_front",
        "right": null,
        "backwards": "2_sunset_front",
        "functions": []
    },
    "2_sunset_back": {
        "src": "2_sunset/deep2",
        "flavorText": "TODO",
        "forwards": "2_sunset_back_open_unlocked_door",
        "left": "2_sunset_back_left",
        "right": "2_sunset_back_right",
        "backwards": "2_sunset_front",
        "functions": []
    },
    "2_sunset_back_open_unlocked_door": {
        "src": "open_the_door",
        "flavorText": "",
        "forwards": "1_bright",
        "backwards": "2_sunset_back",
        "functions": ["unlockDoorForwards"]
    },

    "2_sunset_back_left": {
        "src": "2_sunset/back_left",
        "flavorText": "TODO",
        "forwards": null,
        "left": null,
        "right": "2_sunset_back",
        "backwards": "2_sunset_back",
        "functions": []
    },
    "2_sunset_back_right": {
        "src": "2_sunset/back_right",
        "flavorText": "TODO",
        "forwards": null,
        "left": "2_sunset_back",
        "right": null,
        "backwards": "2_sunset_back",
        "functions": []
    }


}

/*
    "4_open_unlocked_door": {
        "src": "open_the_door",
        "flavorText": "",
        "forwards": "1_bright",
        "backwards": "4",
        "functions": ["openDoor4UnLocked"]
    },
*/
