

//call functions via window["functionName"](arguments);
/*
* scene id 4005 is for scene 4 transitioning to 5 with a door opening, (shouldn't matter if side or front)
 has function door4005 to handle it, 
 function calls generic function to check what video plays for door opening then moved
  to correct next scene, do this for sunset/electric 

*/

const getRandomHallwayID = () => {
    return pickFrom(Object.keys(hallways))
}

//i changed conventions shorly after flushing out the first room, to make it easier to template
//so first room is the most confusing one
const hallways = {
    //hallway 1, sunset
    "1": {
        "roomID": '1', //how we know all these are in the same 'room'
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
        "roomID": "1",
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
        "roomID": "1",
        "src": "1/Sunset/front_right",
        "flavorText": "Its hard to make out the paintings in the dark.",
        "forwards": null,
        "left": "1",
        "right": null,
        "backwards": "1",
        "functions": []
    },
    "4": {
        "roomID": "1",
        "src": "1/Sunset/deep2",
        "flavorText": "The door stands before you, invitingly.",
        "forwards": "4_open_locked_door",
        "left": "5",
        "right": "6",
        "backwards": "1"
    },
    "5": {
        "roomID": "1",
        "src": "1/Sunset/back_left_key",
        "flavorText": "Light filters in from across the hall, revealing a glinting Key.",
        "forwards": null,
        "left": null,
        "right": "4",
        "backwards": "4",
        "functions": ["pickUpKey5"]
    },

    "5_key_gotten": {
        "roomID": "1",
        "src": "1/Sunset/back_left_no_key",
        "flavorText": "You already got the key here.",
        "forwards": null,
        "left": null,
        "right": "4",
        "backwards": "4",
        "functions": []
    },
    "6": {
        "roomID": "1",
        "src": "1/Sunset/back_right",
        "flavorText": "This dirty window is doing its best to light up the entire hallway.",
        "forwards": null,
        "left": "4",
        "right": null,
        "backwards": "4",
        "functions": []
    },

    "4_open_locked_door": {
        "roomID": "1",
        "src": "open_the_door",
        "flavorText": "The door is locked, a normal keyhole visible.",
        "backwards": "4",
        "functions": ["openDoor4Locked"]
    },
    "4_open_unlocked_door": {
        "roomID": "1",
        "src": "open_the_door",
        "flavorText": "",
        "forwards": "2_sunset_front",
        "backwards": "4",
        "functions": ["unlockDoorForwards"]
    },
    //hallway 1, electric lights
    "1_bright": {
        "roomID": "1",
        "src": "1/ElectricLights/front1",
        "flavorText": "The foyer looks so different lit by the electric lamps. In the bright light, you notice a book tucked away behind the candy jar.",
        "forwards": "4_bright",
        "left": "2_bright",
        "right": "3_bright",
        "backwards": "OUTSIDE",
        "functions": ["getEntranceBook"]
    },

    "1_bright_no_book": {
        "roomID": "1",
        "src": "1/ElectricLights/front1",
        "flavorText": "The foyer looks so different lit by the electric lamps. You already got the book here.",
        "forwards": "4_bright",
        "left": "2_bright",
        "right": "3_bright",
        "backwards": "OUTSIDE",
        "functions": []
    },
    "2_bright": {
        "roomID": "1",
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
        "roomID": "1",
        "src": "1/ElectricLights/front_right",
        "flavorText": "Two classic scenes from the Book of Harvest.",
        "forwards": null,
        "left": "1_bright",
        "right": null,
        "backwards": "1_bright",
        "functions": []
    },
    "4_bright": {
        "roomID": "1",
        "src": "1/ElectricLights/front2",
        "flavorText": "The door stands before you, invitingly.",
        "forwards": "1_2_open_unlocked_door",
        "left": "5_bright",
        "right": "6_bright",
        "backwards": "1_bright",
        "functions": []
    },

    "1_2_open_unlocked_door": {
        "roomID": "1",
        "src": "open_the_door",
        "flavorText": "",
        "forwards": "2_front",
        "backwards": "4_bright",
        "functions": ["unlockDoorForwards"]
    },
    "5_bright_book_got": {
        "roomID": "1",
        "src": "1/ElectricLights/back_left",
        "flavorText": "The key and book have already been collected.",
        "forwards": null,
        "left": null,
        "right": "4_bright",
        "backwards": "4_bright",
        "functions": ["gaslightToShowCombo"]
    },
    "5_bright": {
        "roomID": "1",
        "src": "1/ElectricLights/back_left",
        "flavorText": "The key has already been collected. In the bright light, you notice the drawer has a combination lock.",
        "forwards": null,
        "left": null,
        "right": "4_bright",
        "backwards": "4_bright",
        "functions": ["getFirstBook", "gaslightToShowCombo"]
    },
    "6_bright": {
        "roomID": "1",
        "src": "1/ElectricLights/back_right",
        "flavorText": "The formerly briliant window is now a dark mirror.",
        "forwards": null,
        "left": "4_bright",
        "right": null,
        "backwards": "4_bright",
        "functions": []
    },
    //hallway2 bright

    "bright_2_1_back_up": {
        "src": "open_the_door_but_backwards",
        "flavorText": "",
        "forwards": "2_front",
        "backwards": "4_bright",
        "functions": ["unlockDoorBackwards"]
    },

    "2_front": {
        "roomID": "2",
        "src": "2/deep1",
        "flavorText": "Everything is clearly lit.",
        "forwards": "2_back",
        "left": "2_front_left",
        "right": "2_front_right",
        "backwards": "bright_2_1_back_up",
        "functions": []
    },
    "2_front_left": {
        "roomID": "2",
        "src": "2/front_left",
        "flavorText": "Time to face this door again.",
        "forwards": "2_open_locked_door",
        "left": null,
        "right": "2_front",
        "backwards": "2_front",
        "functions": []
    },

    "2_open_locked_door": {
        "roomID": "2",
        "src": "2/front_left",
        "flavorText": "The door is locked, and there is no keyhole visible...it wasn't locked before...Did the power turning back on lock it?",
        "right": "2_front",
        "backwards": "2_front",
        "functions": ["openDoor2MaskLocked"]
    },

    "2_open_unlocked_doorleft": {
        "roomID": "2",
        "src": "open_the_door",
        "flavorText": "",
        "forwards": "east_main_1_deep1",
        "backwards": "2_front",
        "functions": ["unlockDoorForwards"]
    },
    "2_front_right": {
        "roomID": "2",
        "src": "2/front_right",
        "flavorText": "The formerly blinding window is now a dark mirror.",
        "forwards": null,
        "left": "2_front",
        "right": null,
        "backwards": "2_front",
        "functions": []
    },
    "2_back": {
        "roomID": "2",
        "src": "2/deep2",
        "flavorText": "You feel unsettled.",
        "forwards": "2_back_open_unlocked_door",
        "left": "2_back_left_locked",
        "right": "2_back_right",
        "backwards": "2_front",
        "functions": []
    },
    "2_back_open_unlocked_door": {
        "roomID": "2",
        "src": "open_the_door",
        "flavorText": "",
        "forwards": "3_bright_deep1",
        "backwards": "2_back",
        "functions": ["unlockDoorForwards"]
    },
    "2_back_left_locked": {
        "roomID": "2",
        "src": "2/back_left_no_mask",
        "flavorText": "The desk is clearly lit. You try the drawers and find both are locked. There are some papers on the desk, under a heart shaped paperweight.",
        "forwards": null,
        "left": null,
        "right": "2_back",
        "backwards": "2_back",
        "functions": ["handleDesk2Locked", "readDesk2Papers"]
    },
    "2_back_left_unlocked_no_mask": {
        "roomID": "2",
        "src": "2/back_left_no_mask",
        "flavorText": "The desk is clearly lit. You already got the Mask in the locked drawer.",
        "forwards": null,
        "left": null,
        "right": "2_back",
        "backwards": "2_back",
        "functions": ["putMask2", "readDesk2Papers"]
    },
    "2_back_left_mask": {
        "roomID": "2",
        "src": "2/back_left_mask",
        "flavorText": "The desk is clearly lit. A Mask is placed on the desk, a gentle electrical hum coming from it.",
        "forwards": null,
        "left": null,
        "right": "2_back",
        "backwards": "2_back",
        "functions": ["takeMask2", "readDesk2Papers"]
    },
    "2_back_right": {
        "roomID": "2",
        "src": "2/back_right",
        "flavorText": "The mirror is scratched and chipped, in ragged lines too similar to finger scratches for your liking. Someone desperately wanted to destroy this.<br><Br>You almost feel like you can see...a face that is not yours imprinted on the glass?",
        "forwards": null,
        "left": "2_back",
        "right": null,
        "backwards": "2_back",
        "functions": ["lookIntoTheMirror"]
    },

    "sunset_2_1_back_up": {
        "src": "open_the_door_but_backwards",
        "flavorText": "",
        "forwards": "2_sunset_front",
        "backwards": "4",
        "functions": ["unlockDoorBackwards"]
    },

    //hallway 2 sunset

    "2_sunset_front": {
        "roomID": "2",
        "src": "2_sunset/deep1",
        "flavorText": "If it wasn't for the setting sun you wouldn't be able to see anything at all.",
        "forwards": "2_sunset_back",
        "left": "2_sunset_front_left",
        "right": "2_sunset_front_right",
        "backwards": "sunset_2_1_back_up",
        "functions": []
    },
    "2_sunset_front_left": {
        "roomID": "2",
        "src": "2_sunset/front_left",
        "flavorText": "A beam of sunlight draws your attention to this door.",
        "forwards": "2_sunset_front_left_toodark",
        "left": null,
        "right": "2_sunset_front",
        "backwards": "2_sunset_front",
        "functions": []
    },

    "2_sunset_front_left_toodark": {
        "roomID": "2",
        "src": "2_sunset/bad_door",
        "flavorText": "You go to open the door...",
        "forwards": null,
        "left": null,
        "right": null,
        "backwards": "2_sunset_front_left",
        "functions": ["shutDoor2"]
    },

    "2_sunset_front_right": {
        "roomID": "2",
        "src": "2_sunset/front_right",
        "flavorText": "The setting sun is blinding.",
        "forwards": null,
        "left": "2_sunset_front",
        "right": null,
        "backwards": "2_sunset_front",
        "functions": []
    },
    "2_sunset_back": {
        "roomID": "2",
        "src": "2_sunset/deep2",
        "flavorText": "You almost can't see this far from the window.",
        "forwards": "2_sunset_back_open_unlocked_door",
        "left": "2_sunset_back_left",
        "right": "2_sunset_back_right",
        "backwards": "2_sunset_front",
        "functions": []
    },
    "2_sunset_back_open_unlocked_door": {
        "roomID": "2",
        "src": "open_the_door",
        "flavorText": "",
        "forwards": "3_deep1",
        "backwards": "2_sunset_back",
        "functions": ["unlockDoorForwards"]
    },

    "2_sunset_back_left": {
        "roomID": "2",
        "src": "2_sunset/back_left",
        "flavorText": "There is a desk here but its too dark to see.",
        "forwards": null,
        "left": null,
        "right": "2_sunset_back",
        "backwards": "2_sunset_back",
        "functions": []
    },
    "2_sunset_back_right": {
        "roomID": "2",
        "src": "2_sunset/back_right",
        "flavorText": "There is a mirror here but its too dark to see much. You get a weird feeling from it.",
        "forwards": null,
        "left": "2_sunset_back",
        "right": null,
        "backwards": "2_sunset_back",
        "functions": []
    },
    //room 3
    "sunset_3_2_backup": {
        "src": "open_the_door_but_backwards",
        "flavorText": "",
        "forwards": "3_deep1",
        "backwards": "2_sunset_back",
        "functions": ["unlockDoorBackwards"]
    },
    "3_deep1": {
        "roomID": "3",
        "src": "3/deep1",
        "flavorText": "You see something hung from the far door.",
        "forwards": "3_deep2",
        "left": "3_left1",
        "right": "3_right1",
        "backwards": "sunset_3_2_backup",
        "functions": []
    },
    "3_left1": {
        "roomID": "3",
        "src": "3/left1",
        "flavorText": "Nothing seems especially important about this bookcase in the dim light.",
        "forwards": null,
        "left": null,
        "right": "3_deep1",
        "backwards": "3_deep1",
        "functions": []
    },
    "3_right1": {
        "roomID": "3",
        "src": "3/right1",
        "flavorText": "The setting sun is blinding.",
        "forwards": null,
        "left": "3_deep1",
        "right": null,
        "backwards": "3_deep1",
        "functions": []
    },
    "3_deep2": {
        "roomID": "3",
        "src": "3/deep2",
        "flavorText": "You can't make the writing out yet.",
        "forwards": "3_deep3",
        "left": "3_left2",
        "right": "3_right2",
        "backwards": "3_deep1",
        "functions": []
    },
    "3_deep3": {
        "roomID": "3",
        "src": "3/deep3",
        "flavorText": "A list of rules are hung on the door. The door appears to be locked, a normal keyhole visible.",
        "forwards": "",
        "backwards": "3_deep2",
        "functions": ["openDoor3Locked", "lookCloserAtRules"]
    }, "3_deep3_unlocked": {
        "roomID": "3",
        "src": "3/deep3",
        "flavorText": "A list of rules are hung on the door. The door appears to be locked, a normal keyhole visible.",
        "forwards": "6_deep1",
        "backwards": "3_deep2",
        "functions": ["lookCloserAtRules", "resetRoomBeaten", "setAnomalyLocationRoom6"]
    },
    "3_deep3_1": {
        "roomID": "3",
        "src": "3/deep3_1",
        "flavorText": "A list of rules are hung on the door.",
        "forwards": "6_deep1",
        "functions": ["lookCloserAtRules", "incrementRoomBeaten", "setAnomalyLocationRoom6"]
    },
    "3_deep3_2": {
        "roomID": "3",
        "src": "3/deep3_2",
        "flavorText": "A list of rules are hung on the door.",
        "forwards": "6_deep1",
        "functions": ["lookCloserAtRules", "incrementRoomBeaten", "setAnomalyLocationRoom6"]
    },
    "3_deep3_3": {
        "roomID": "3",
        "src": "3/deep3_3",
        "flavorText": "A list of rules are hung on the door.",
        "forwards": "6_deep1",
        "functions": ["lookCloserAtRules", "incrementRoomBeaten", "setAnomalyLocationRoom6"]
    },
    "3_deep3_4": {
        "roomID": "3",
        "src": "3/deep3_4",
        "flavorText": "A list of rules are hung on the door.",
        "forwards": "6_deep1",
        "functions": ["lookCloserAtRules", "incrementRoomBeaten", "setAnomalyLocationRoom6"]
    },

    "3_deep3_5": {
        "roomID": "3",
        "src": "3/deep3_5",
        "flavorText": "A list of rules are hung on the door.",
        "forwards": "6_deep1",
        "functions": ["lookCloserAtRules", "incrementRoomBeaten", "setAnomalyLocationRoom6"]
    },

    "3_deep3_6": {
        "roomID": "3",
        "src": "3/deep3_6",
        "flavorText": "A list of rules are hung on the door.",
        "forwards": "6_deep1",
        "functions": ["lookCloserAtRules", "incrementRoomBeaten", "setAnomalyLocationRoom6"]
    },

    "3_deep3_7": {
        "roomID": "3",
        "src": "3/deep3_7",
        "flavorText": "A list of rules are hung on the door.",
        "forwards": "6_deep1",
        "functions": ["lookCloserAtRules", "incrementRoomBeaten", "setAnomalyLocationRoom6"]
    },



    "3_left2": {
        "roomID": "3",
        "src": "3/left2",
        "flavorText": "The lamp is not lit.",
        "forwards": null,
        "left": null,
        "right": "3_deep2",
        "backwards": "3_deep2",
        "functions": []
    },
    "3_right2": {
        "roomID": "3",
        "src": "3/right2",
        "flavorText": "There is a door leading to the right, towards the setting sun. <br><Br>You should be able to see in the room beyond.",
        "forwards": "3_open_unlocked_door_right",
        "left": "3_deep2",
        "right": null,
        "backwards": "3_deep2",
        "functions": []
    },

    "3_open_unlocked_door_right": {
        "src": "open_the_door",
        "flavorText": "",
        "forwards": "west_sunroom_deep1",
        "backwards": "3_deep2",
        "functions": ["unlockDoorForwards"]
    },

    //3 bright
    "bright_3_2_backup": {
        "src": "open_the_door_but_backwards",
        "flavorText": "",
        "forwards": "3_bright_deep1",
        "backwards": "2_back",
        "functions": ["unlockDoorBackwards"]
    },

    "3_bright_deep1": {
        "roomID": "3_bright",
        "src": "3_bright/deep1",
        "flavorText": "The room is bright and inviting you to investigate it.",
        "forwards": "3_bright_deep2",
        "left": "3_bright_left1",
        "right": "3_bright_right1",
        "backwards": "bright_3_2_backup",
        "functions": []
    },

    "3_bright_deep1_open": {
        "roomID": "3_bright",
        "src": "3_bright/deep1_open",
        "flavorText": "The mask has revealed a hidden passage way.",
        "forwards": "3_bright_deep2",
        "left": "3_bright_left1",
        "right": "3_bright_right1",
        "backwards": "2_back",
        "functions": []
    },
    "3_bright_left1": {
        "roomID": "3_bright",
        "src": "3_bright/left1",
        "flavorText": "Something seems to be missing from this bookshelf.",
        "forwards": null,
        "left": null,
        "right": "3_bright_deep1",
        "backwards": "3_bright_deep1",
        "functions": ["bookcase3PlaceMask"]
    },
    "3_bright_left1_mask": {
        "roomID": "3_bright",
        "src": "3_bright/left1_open",
        "flavorText": "The bookcase slides to reveal a secret passage way.",
        "forwards": "SecretPassageway_deep1_fromWest",
        "left": null,
        "right": "3_bright_deep1",
        "backwards": "3_bright_deep1",
        "functions": ["bookcase3TakeMask"]
    },
    "3_bright_right1": {
        "roomID": "3_bright",
        "src": "3_bright/right1",
        "flavorText": "The electric light illuminates the whole hall.",
        "forwards": null,
        "left": "3_bright_deep1",
        "right": null,
        "backwards": "3_bright_deep1",
        "functions": []
    },
    "3_bright_deep2": {
        "roomID": "3_bright",
        "src": "3_bright/deep2",
        "flavorText": "Somehow the rules posted on the door are less ominous in the bright light.",
        "forwards": "3_6_safe_open_door",
        "left": "3_bright_left2",
        "right": "3_bright_right2",
        "backwards": "3_bright_deep1",
        "functions": []
    },

    "3_6_safe_open_door": {
        "src": "open_the_door",
        "flavorText": "",
        "forwards": "6_deep1_safe",
        "backwards": "3_bright_deep2",
        "functions": ["unlockDoorForwards"]
    },


    "3_bright_left2": {
        "roomID": "3_bright",
        "src": "3_bright/left2",
        "flavorText": "The electric light illuminates the whole hall.",
        "forwards": null,
        "left": null,
        "right": "3_bright_deep2",
        "backwards": "3_bright_deep2",
        "functions": []
    },
    "3_bright_right2": {
        "roomID": "3_bright",
        "src": "3_bright/right2",
        "flavorText": "The door to the West Sun Room no longer opens. You don't remember seeing any lights in there, so it would be too dark, anyways.",
        "forwards": null,
        "left": "3_bright_deep2",
        "right": null,
        "backwards": "3_bright_deep2",
        "functions": []
    },
    //room 6
    "6_deep1": {
        "roomID": "6",
        "src": "6/deep1",
        "flavorText": "You keep your eyes peeled for any time instabilities.",
        "forwards": "6_deep2",
        "left": "6_left1",
        "right": "6_right1",
        "backwards": "3_deep3",
        "functions": ["check_room_6_near_stability", "check_room_6_deep1"]
    },
    "6_left1": {
        "roomID": "6",
        "src": "6/left1",
        "forwards": null,
        "left": null,
        "right": "6_deep1",
        "backwards": "6_deep1",
        "functions": ["check_room_6_left1"]
    },
    "6_right1": {
        "roomID": "6",
        "src": "6/right1",
        "forwards": null,
        "left": "6_deep1",
        "right": null,
        "backwards": "6_deep1",
        "functions": ["check_room_6_right1"]
    },
    "6_deep2": {
        "roomID": "6",
        "src": "6/deep2",
        "forwards": "6_deep3",
        "left": "6_left2",
        "right": "6_right2",
        "backwards": "6_deep1",
        "functions": ["check_room_6_deep2"]
    },
    "6_left2": {
        "roomID": "6",
        "src": "6/left2",
        "forwards": null,
        "left": null,
        "right": "6_deep2",
        "backwards": "6_deep2",
        "functions": ["check_room_6_left2"]
    },
    "6_right2": {
        "roomID": "6",
        "src": "6/right2",
        "forwards": null,
        "left": "6_deep2",
        "right": null,
        "backwards": "6_deep2",
        "functions": ["check_room_6_right2"]
    },
    "6_deep3": {
        "roomID": "6",
        "src": "6/deep3",
        "forwards": "6_deep4",
        "left": "6_left3",
        "right": "6_right3",
        "backwards": "6_deep2",
        "functions": ["check_room_6_deep3"]
    },
    "6_left3": {
        "roomID": "6",
        "src": "6/left3",
        "forwards": null,
        "left": null,
        "right": "6_deep3",
        "backwards": "6_deep3",
        "functions": ["check_room_6_left3"]
    },
    "6_right3": {
        "roomID": "6",
        "src": "6/right3",
        "forwards": null,
        "left": "6_deep3",
        "right": null,
        "backwards": "6_deep3",
        "functions": ["check_room_6_right3"]
    },
    "6_deep4": {
        "roomID": "6",
        "src": "6/deep4",
        "forwards": "3_deep3",
        "left": "6_left4",
        "right": "6_right4",
        "backwards": "6_deep3",
        "functions": ["check_room_6_far_stability", "check_room_6_deep4"]
    },
    "6_left4": {
        "roomID": "6",
        "src": "6/left4",
        "forwards": null,
        "left": null,
        "right": "6_deep4",
        "backwards": "6_deep4",
        "functions": ["check_room_6_left4"]
    },
    "6_right4": {
        "roomID": "6",
        "src": "6/right4",
        "forwards": null,
        "left": "6_deep4",
        "right": null,
        "backwards": "6_deep4",
        "functions": ["check_room_6_right4"]
    },

    "2_1_open_door": {
        "src": "open_the_door_but_backwards",
        "flavorText": "",
        "forwards": "6_deep1_safe",
        "backwards": "3_bright_deep2",
        "functions": ["unlockDoorBackwards"]
    },

    "6_deep1_safe": {
        "roomID": "6",
        "src": "6/deep1",
        "flavorText": "Somehow you can just feel the hallway is stable now.",
        "forwards": "6_deep2_safe",
        "left": "6_left1_safe",
        "right": "6_right1_safe",
        "backwards": "2_1_open_door",
        "functions": []
    },
    "6_left1_safe": {
        "roomID": "6",
        "src": "6/left1",
        "forwards": null,
        "left": null,
        "flavorText": "The paintings are just how you expect them to be.",

        "right": "6_deep1_safe",
        "backwards": "6_deep1_safe",
        "functions": []
    },
    "6_right1_safe": {
        "roomID": "6",
        "src": "6/right1",
        "forwards": null,
        "flavorText": "The harvest is happy, all is well.",

        "left": "6_deep1_safe",
        "right": null,
        "backwards": "6_deep1_safe",
        "functions": []
    },
    "6_deep2_safe": {
        "roomID": "6",
        "src": "6/deep2",
        "forwards": "6_deep3_safe",
        "left": "6_left2_safe",
        "right": "6_right2_safe",
        "backwards": "6_deep1_safe",
        "functions": []
    },
    "6_left2_safe": {
        "roomID": "6",
        "src": "6/left2",
        "forwards": null,
        "left": null,
        "flavorText": "The chair and the vase are where they should be.",

        "right": "6_deep2_safe",
        "backwards": "6_deep2_safe",
        "functions": []
    },
    "6_right2_safe": {
        "roomID": "6",
        "src": "6/right2",
        "forwards": null,
        "flavorText": "The wall isn't upside down behind the lamp, just as it should be.",

        "left": "6_deep2_safe",
        "right": null,
        "backwards": "6_deep2_safe",
        "functions": []
    },
    "6_deep3_safe": {
        "roomID": "6",
        "src": "6/deep3",
        "forwards": "6_deep4_safe",
        "left": "6_left3_safe",
        "right": "6_right3_safe",
        "backwards": "6_deep2_safe",
        "functions": []
    },
    "6_left3_safe": {
        "roomID": "6",
        "src": "6/left3",
        "forwards": null,
        "left": null,
        "flavorText": "The pumpkin gazes down the hallway, like normal.",

        "right": "6_deep3_safe",
        "backwards": "6_deep3_safe",
        "functions": []
    },
    "6_right3_safe": {
        "roomID": "6",
        "src": "6/right3",
        "forwards": null,
        "flavorText": "The bear is on the right, the statue is of Odin and his crows.",

        "left": "6_deep3_safe",
        "right": null,
        "backwards": "6_deep3_safe",
        "functions": []
    },
    "6_deep4_safe": {
        "roomID": "6",
        "src": "6/deep4",
        "forwards": "6bright_7_open",
        "flavorText": "The hallway feels ...stable somehow.",
        "left": "6_left4_safe",
        "right": "6_right4_safe",
        "backwards": "6_deep3_safe",
        "functions": []
    },

    "6bright_7_open": {
        "src": "open_the_door",
        "flavorText": "",
        "forwards": "7_bright_deep1",
        "backwards": "6_deep4_safe",
        "functions": ["unlockDoorForwards"]
    },
    "6_left4_safe": {
        "roomID": "6",
        "src": "6/left4",
        "forwards": null,
        "left": null,
        "flavorText": "The lamp is on the table, like always.",
        "right": "6_deep4_safe",
        "backwards": "6_deep4_safe",
        "functions": []
    },
    "6_right4_safe": {
        "roomID": "6",
        "src": "6/right4",
        "forwards": null,
        "flavorText": "The knife is where its supposed to be.",
        "left": "6_deep4_safe",
        "right": null,
        "backwards": "6_deep4_safe",
        "functions": []
    },


    "TODO": {
        "roomID": "6",
        "src": "TODO",
        "forwards": "OUTSIDE",
        "left": "OUTSIDE",
        "right": "OUTSIDE",
        "backwards": "OUTSIDE",
        "functions": []
    },

    //room 7
    "sunset_7_6_backup": {
        "src": "open_the_door_but_backwards",
        "flavorText": "",
        "forwards": "7_deep1",
        "backwards": "6_deep4",
        "functions": ["unlockDoorBackwards"]
    },
    "7_deep1": {
        "roomID": "7",
        "src": "7/deep1",
        "flavorText": "Are those...tanks?",
        "forwards": "7_deep2",
        "left": "7_left1",
        "right": "7_right1",
        "backwards": "sunset_7_6_backup",
        "functions": ["victory7"]
    },
    "7_left1": {
        "roomID": "7",
        "src": "7/left1",
        "flavorText": "Nothing important to see.",
        "forwards": null,
        "left": null,
        "right": "7_deep1",
        "backwards": "7_deep1",
        "functions": []
    },
    "7_right1": {
        "roomID": "7",
        "src": "7/right1",
        "flavorText": "The bright sunlight filters through the tanks, lighting them up.",
        "forwards": null,
        "left": "7_deep1",
        "right": null,
        "backwards": "7_deep1",
        "functions": []
    },
    "7_deep2": {
        "roomID": "7",
        "src": "7/close",
        "flavorText": "There is a large red button on each of the strange tanks.",
        "forwards": null,
        "backwards": "7_deep1",
        "functions": ["pressBigRedButton7"]
    },

    //7 bright

    "7bright_6_backup": {
        "src": "open_the_door_but_backwards",
        "flavorText": "",
        "forwards": "7_bright_deep1",
        "backwards": "6_deep4_safe",
        "functions": ["unlockDoorBackwards"]
    },


    "7_bright_deep1": {
        "roomID": "7_bright",
        "src": "7_bright/deep1",
        "flavorText": "The power is on, flooding the room with bright light from the tanks.",
        "forwards": "7_bright_deep2",
        "left": "7_bright_left1",
        "right": "7_bright_right1",
        "backwards": "7bright_6_backup",
        "functions": []
    },
    "7_bright_left1": {
        "roomID": "7_bright",
        "src": "7_bright/left1",
        "flavorText": "Nothing important is here.",
        "forwards": null,
        "left": null,
        "right": "7_bright_deep1",
        "backwards": "7_bright_deep1",
        "functions": []
    },
    "7_bright_right1": {
        "roomID": "7_bright",
        "src": "7_bright/right1",
        "flavorText": "The sun must have gone down while you weren't looking.",
        "forwards": null,
        "left": "7_bright_deep1",
        "right": null,
        "backwards": "7_bright_deep1",
        "functions": []
    },
    "7_bright_deep2": {
        "roomID": "7_bright",
        "src": "7_bright/close",
        "flavorText": "Somehow these mannequins are powering the house.",
        "forwards": null,
        "left": null,
        "right": null,
        "backwards": "7_bright_deep1",
        "functions": ["pressBigRedButton7Off"]
    },

    //west sunroom
    "sunset_3_west_backup": {
        "src": "open_the_door_but_backwards",
        "flavorText": "",
        "forwards": "west_sunroom_deep1",
        "backwards": "3_right2",
        "functions": ["unlockDoorBackwards"]
    },
    "west_sunroom_deep1": {
        "roomID": "west_sunroom",
        "src": "west_sunroom/deep1",
        "flavorText": "The view of the West Facing Sunroom is stunning.",
        "forwards": "west_sunroom_deep2",
        "left": "west_sunroom_left1",
        "right": "west_sunroom_right1",
        "backwards": "sunset_3_west_backup",
        "functions": []
    },
    "west_sunroom_left1": {
        "roomID": "west_sunroom",
        "src": "west_sunroom/left1key",
        "flavorText": "There is a key on the bench.",
        "forwards": null,
        "left": null,
        "right": "west_sunroom_deep1",
        "backwards": "west_sunroom_deep1",
        "functions": ["takeKeyWestSunroom"]
    }, "west_sunroom_left1_nokey": {
        "roomID": "west_sunroom",
        "src": "west_sunroom/left1nokey",
        "flavorText": "You already took the key from the bench.",
        "forwards": null,
        "left": null,
        "right": "west_sunroom_deep1",
        "backwards": "west_sunroom_deep1",
        "functions": []
    },
    "west_sunroom_right1": {
        "roomID": "west_sunroom",
        "src": "west_sunroom/right1",
        "flavorText": "A length of canvas covers the window from the outside.",
        "forwards": null,
        "left": "west_sunroom_deep1",
        "right": null,
        "backwards": "west_sunroom_deep1",
        "functions": []
    },
    "west_sunroom_deep2": {
        "roomID": "west_sunroom",
        "src": "west_sunroom/deep2",
        "flavorText": "The setting sun paints everything in gold.",
        "forwards": "west_sunroom_deep3",
        "left": "west_sunroom_left2",
        "right": "west_sunroom_right2",
        "backwards": "west_sunroom_deep1",
        "functions": []
    },
    "west_sunroom_deep3": {
        "roomID": "west_sunroom",
        "src": "west_sunroom/deep3",
        "flavorText": "Its a beautiful stained glass window of the Harvest.",
        "forwards": null,
        "backwards": "west_sunroom_deep2",
        "functions": []
    },
    "west_sunroom_left2": {
        "roomID": "west_sunroom",
        "src": "west_sunroom/left2",
        "flavorText": "Looking closer, you see the potted plants are fake.",
        "forwards": null,
        "left": null,
        "right": "west_sunroom_deep2",
        "backwards": "west_sunroom_deep2",
        "functions": []
    },
    "west_sunroom_right2": {
        "roomID": "west_sunroom",
        "src": "west_sunroom/right2",
        "flavorText": "Looking closer, you see the potted plants are fake.",
        "forwards": null,
        "left": "west_sunroom_deep2",
        "right": null,
        "backwards": "west_sunroom_deep2",
        "functions": []
    },
    //east wing start
    //east wing start
    //east wing start
    "east_west_backup": {
        "src": "open_the_door_but_backwards",
        "flavorText": "",
        "forwards": "east_main_1_deep1",
        "backwards": "2_front_left",
        "functions": ["unlockDoorBackwards"]
    },
    "east_main_1_deep1": {
        "roomID": "east_main_1",
        "src": "CopyOfACopy/BDeep1",
        "flavorText": "The EAST WING is brightly lit.",
        "forwards": "east_main_1_deep2",
        "left": "east_main_1_left1",
        "right": "east_main_1_right1",
        "backwards": "east_west_backup",
        "functions": []
    },
    "east_main_1_left1": {
        "roomID": "east_main_1",
        "src": "CopyOfACopy/FlatWall",
        "forwards": null,
        "left": null,
        "right": "east_main_1_deep1",
        "backwards": "east_main_1_deep1",
        "functions": []
    },
    "east_main_1_right1": {
        "roomID": "east_main_1",
        "src": "CopyOfACopy/AFlatLight",
        "forwards": null,
        "left": "east_main_1_deep1",
        "right": null,
        "backwards": "east_main_1_deep1",
        "functions": []
    },
    "east_main_1_deep2": {
        "roomID": "east_main_1",
        "src": "CopyOfACopy/BDeep2",
        "forwards": "east_main_1_2_unlocked",
        "left": "east_main_1_left2",
        "right": "east_main_1_right2",
        "backwards": "east_main_1_deep1",
        "functions": []
    },
    "east_main_1_left2": {
        "roomID": "east_main_1",
        "src": "CopyOfACopy/BFlatLight",
        "forwards": null,
        "left": null,
        "right": "east_main_1_deep2",
        "backwards": "east_main_1_deep2",
        "functions": []
    },
    "east_main_1_right2": {
        "roomID": "east_main_1",
        "src": "CopyOfACopy/FlatWall",
        "forwards": null,
        "left": "east_main_1_deep2",
        "right": null,
        "backwards": "east_main_1_deep2",
        "functions": []
    },

    "east_main_1_2_unlocked": {
        "src": "open_the_door",
        "flavorText": "",
        "forwards": "east_main_2_deep1",
        "backwards": "east_main_1_deep2",
        "functions": ["unlockDoorForwards"]
    },
    //east wing main hall  2
    "east_main_1_2_backup": {
        "src": "open_the_door_but_backwards",
        "flavorText": "",
        "forwards": "east_main_2_deep1",
        "backwards": "east_main_1_deep2",
        "functions": ["unlockDoorBackwards"]
    },
    "east_main_2_deep1": {
        "roomID": "east_main_2",
        "src": "CopyOfACopy/RightDoorDeep1",
        "forwards": "east_main_2_deep2",
        "left": "east_main_2_left1",
        "right": "east_main_2_right1",
        "backwards": "east_main_1_2_backup",
        "functions": []
    },
    "east_main_2_left1": {
        "roomID": "east_main_2",
        "src": "CopyOfACopy/FlatWall",
        "forwards": null,
        "left": null,
        "right": "east_main_2_deep1",
        "backwards": "east_main_2_deep1",
        "functions": []
    },
    "east_main_2_right1": {
        "roomID": "east_main_2",
        "src": "CopyOfACopy/AFlatLight",
        "forwards": null,
        "left": "east_main_2_deep1",
        "right": null,
        "backwards": "east_main_2_deep1",
        "functions": []
    },
    "east_main_2_left2": {
        "roomID": "east_main_2",
        "src": "CopyOfACopy/BFlatLight",
        "forwards": null,
        "left": null,
        "right": "east_main_2_deep2",
        "backwards": "east_main_2_deep2",
        "functions": []
    },
    "east_main_2_right2": {
        "roomID": "east_main_2",
        "src": "CopyOfACopy/FlatDoor",
        "forwards": "east_first_1_locked",
        "flavorText": "A door that leads to the right.",
        "left": "east_main_2_deep2",
        "right": null,
        "backwards": "east_main_2_deep2",
        "functions": []
    },
    "east_main_2_deep2": {
        "roomID": "east_main_2",
        "src": "CopyOfACopy/RightDoorDeep2",
        "forwards": "east_main_2_3_unlocked",
        "left": "east_main_2_left2",
        "right": "east_main_2_right2",
        "backwards": "east_main_2_deep1",
        "functions": []
    },


    "east_main_2_3_unlocked": {
        "src": "open_the_door",
        "flavorText": "",
        "forwards": "east_main_3_deep1",
        "backwards": "east_main_2_deep2",
        "functions": ["unlockDoorForwards"]
    },


    //east main 3

    "east_main_3_2_backup": {
        "src": "open_the_door_but_backwards",
        "flavorText": "",
        "forwards": "east_main_3_deep1",
        "backwards": "east_main_2_deep2",
        "functions": ["unlockDoorBackwards"]
    },
    "east_main_3_deep1": {
        "roomID": "east_main_3",
        "src": "CopyOfACopy/LeftDoorDeep1",
        "forwards": "east_main_3_deep2",
        "left": "east_main_3_left1",
        "right": "east_main_3_right1",
        "backwards": "east_main_3_2_backup",
        "functions": []
    },
    "east_main_3_left1": {
        "roomID": "east_main_3",
        "src": "CopyOfACopy/FlatDoor",
        "forwards": "east_main_room1_enter",
        "left": null,
        "right": "east_main_3_deep1",
        "backwards": "east_main_3_deep1",
        "functions": []
    },
    "east_main_3_right1": {
        "roomID": "east_main_3",
        "src": "CopyOfACopy/AFlatLight",
        "forwards": null,
        "left": "east_main_3_deep1",
        "right": null,
        "backwards": "east_main_3_deep1",
        "functions": []
    },
    "east_main_3_left2": {
        "roomID": "east_main_3",
        "src": "CopyOfACopy/FlatWall",
        "forwards": null,
        "left": null,
        "right": "east_main_3_deep2",
        "backwards": "east_main_3_deep2",
        "functions": []
    },
    "east_main_3_right2": {
        "roomID": "east_main_3",
        "src": "CopyOfACopy/BFlatLight",
        "forwards": null,
        "left": "east_main_3_deep2",
        "right": null,
        "backwards": "east_main_3_deep2",
        "functions": []
    },
    "east_main_3_deep2": {
        "roomID": "east_main_3",
        "src": "CopyOfACopy/ADeep2",
        "forwards": "east_main_4_enter",
        "left": "east_main_3_left2",
        "right": "east_main_3_right2",
        "backwards": "east_main_3_deep1",
        "functions": []
    },//east_main_room1 start
    "east_main_room3_enter": {
        "src": "open_the_door",
        "flavorText": "",
        "forwards": "east_main_room3_deep1",
        "backwards": "east_main_3_left1",
        "functions": [
            "unlockDoorForwards"
        ]
    },
    "east_main_room3_backup": {
        "src": "open_the_door_but_backwards",
        "flavorText": "",
        "forwards": "east_main_room3_deep1",
        "backwards": "east_main_7_left1",
        "functions": [
            "unlockDoorBackwards"
        ]
    },
    "east_main_room3_left1": {
        "roomID": "east_main_room3",
        "src": "east_main_room3/left1",
        "backwards": "east_main_room3_deep1",
        "right": "east_main_room3_deep1",
        "functions": ["lookIntoTheMirror"]
    },
    "east_main_room3_right1": {
        "roomID": "east_main_room3",
        "src": "east_main_room3/right1",
        "backwards": "east_main_room3_deep1",
        "left": "east_main_room3_deep1",
        "functions": ["lookIntoTheMirror"]
    },
    "east_main_room3_deep1": {
        "roomID": "east_main_room3",
        "src": "east_main_room3/deep1",
        "backwards": "east_main_room3_backup",
        "left": "east_main_room3_left1",
        "right": "east_main_room3_right1",
        "functions": ["eatHarvestFruit"]
    },
    "east_main_room3_left1_waste": {
        "roomID": "east_main_room3",
        "src": "east_main_room3/left1_waste",
        "backwards": "east_main_room3_deep1",
        "right": "east_main_room3_deep1",
        "flavorText": "In a flash of sometthing almost...Prophetic... You realize that there is now a ladder in the Secret passage way behind the west wing bookcase.",
        "functions": ["lookIntoTheMirror"]
    },
    "east_main_room3_right1_waste": {
        "roomID": "east_main_room3",
        "src": "east_main_room3/right1_waste",
        "backwards": "east_main_room3_deep1",
        "left": "east_main_room3_deep1",
        "flavorText": "Something Catalyzes within you. You realize if you close your eyes, you will see something new. But only if seerOfVoid is enabled. You realize can add it to the URL with ?seerOfVoid=true.",
        "functions": ["lookIntoTheMirror"]
    },
    "east_main_room3_deep1_waste": {
        "roomID": "east_main_room3",
        "src": "east_main_room3/deep1_waste",
        "backwards": "east_main_room3_backup",
        "left": "east_main_room3_left1",
        "right": "east_main_room3_right1",
        "flavorText": "You feel your mind crack in two, reality leaking through the seams until you can no longer deny the fact that everything you have ever known is fake. This is...reality is just a game to beings you can not possibly comprehend."
    },
    //east_main_4 start
    "east_main_4_enter": {
        "src": "open_the_door",
        "flavorText": "",
        "forwards": "east_main_4_deep1",
        "backwards": "east_main_3_deep2",
        "functions": [
            "unlockDoorForwards"
        ]
    },
    "east_main_4_backup": {
        "src": "open_the_door_but_backwards",
        "flavorText": "",
        "forwards": "east_main_4_deep1",
        "backwards": "east_main_3_deep2",
        "functions": [
            "unlockDoorBackwards"
        ]
    },
    "east_main_4_deep1": {
        "roomID": "east_main_4",
        "src": "CopyOfACopy/RightDoorDeep1",
        "forwards": "east_main_4_deep2",
        "left": "east_main_4_left1",
        "right": "east_main_4_right1",
        "backwards": "east_main_4_backup",
        "functions": []
    },
    "east_main_4_left1": {
        "roomID": "east_main_4",
        "src": "CopyOfACopy/FlatWall",
        "forwards": null,
        "left": null,
        "right": "east_main_4_deep1",
        "backwards": "east_main_4_deep1",
        "functions": []
    },
    "east_main_4_right1": {
        "roomID": "east_main_4",
        "src": "CopyOfACopy/AFlatLight",
        "forwards": null,
        "left": "east_main_4_deep1",
        "right": null,
        "backwards": "east_main_4_deep1",
        "functions": []
    },
    "east_main_4_left2": {
        "roomID": "east_main_4",
        "src": "CopyOfACopy/BFlatLight",
        "forwards": null,
        "left": null,
        "right": "east_main_4_deep2",
        "backwards": "east_main_4_deep2",
        "functions": []
    },
    "east_main_4_right2": {
        "roomID": "east_main_4",
        "src": "CopyOfACopy/FlatDoor",
        "forwards": "east_second_1_enter",
        "left": "east_main_4_deep2",
        "right": null,
        "backwards": "east_main_4_deep2",
        "functions": []
    },
    "east_main_4_deep2": {
        "roomID": "east_main_4",
        "src": "CopyOfACopy/RightDoorDeep2",
        "forwards": "east_main_5_enter",
        "left": "east_main_4_left2",
        "right": "east_main_4_right2",
        "backwards": "east_main_4_deep1",
        "functions": []
    },
    //east_main_5 start
    "east_main_5_enter": {
        "src": "open_the_door",
        "flavorText": "",
        "forwards": "east_main_5_deep1",
        "backwards": "east_main_4_deep2",
        "functions": [
            "unlockDoorForwards"
        ]
    },
    "east_main_5_backup": {
        "src": "open_the_door_but_backwards",
        "flavorText": "",
        "forwards": "east_main_5_deep1",
        "backwards": "east_main_4_deep2",
        "functions": [
            "unlockDoorBackwards"
        ]
    },
    "east_main_5_deep1": {
        "roomID": "east_main_5",
        "src": "CopyOfACopy/LeftDoorDeep1",
        "forwards": "east_main_5_deep2",
        "left": "east_main_5_left1",
        "right": "east_main_5_right1",
        "backwards": "east_main_5_backup",
        "functions": []
    },
    "east_main_5_left1": {
        "roomID": "east_main_5",
        "src": "CopyOfACopy/FlatDoor",
        "forwards": "east_main_room2_enter",
        "left": null,
        "right": "east_main_5_deep1",
        "backwards": "east_main_5_deep1",
        "functions": []
    },
    "east_main_5_right1": {
        "roomID": "east_main_5",
        "src": "CopyOfACopy/AFlatLight",
        "forwards": null,
        "left": "east_main_5_deep1",
        "right": null,
        "backwards": "east_main_5_deep1",
        "functions": []
    },
    "east_main_5_left2": {
        "roomID": "east_main_5",
        "src": "CopyOfACopy/FlatWall",
        "forwards": null,
        "left": null,
        "right": "east_main_5_deep2",
        "backwards": "east_main_5_deep2",
        "functions": []
    },
    "east_main_5_right2": {
        "roomID": "east_main_5",
        "src": "CopyOfACopy/BFlatLight",
        "forwards": null,
        "left": "east_main_5_deep2",
        "right": null,
        "backwards": "east_main_5_deep2",
        "functions": []
    },
    "east_main_5_deep2": {
        "roomID": "east_main_5",
        "src": "CopyOfACopy/ADeep2",
        "forwards": "east_main_6_enter",
        "left": "east_main_5_left2",
        "right": "east_main_5_right2",
        "backwards": "east_main_5_deep1",
        "functions": []
    },

    //east main room 2 start
    "east_main_room2_enter": {
        "src": "open_the_door",
        "forwards": "east_main_room2",
        "backwards": "east_main_5_left1",
        "functions": [
            "unlockDoorForwards"
        ]
    },
    "east_main_room2_backup": {
        "src": "open_the_door_but_backwards",
        "flavorText": "",
        "forwards": "east_main_room2",
        "backwards": "east_main_5_left1",
        "functions": [
            "unlockDoorBackwards"
        ]
    },
    "east_main_room2": {
        "flavorText": "...what is a pumpkin patch doing inside?",
        "roomID": "east_main_5",
        "src": "EastMainRoom2/deep1",
        "backwards": "east_main_room2_backup",
        "functions": ["pumpkin1"]
    },

    //east_main_6 start
    "east_main_6_enter": {
        "src": "open_the_door",
        "flavorText": "",
        "forwards": "east_main_6_deep1",
        "backwards": "east_main_5_deep2",
        "functions": [
            "unlockDoorForwards"
        ]
    },
    "east_main_6_backup": {
        "src": "open_the_door_but_backwards",
        "flavorText": "",
        "forwards": "east_main_6_deep1",
        "backwards": "east_main_5_deep2",
        "functions": [
            "unlockDoorBackwards"
        ]
    },
    "east_main_6_deep1": {
        "roomID": "east_main_6",
        "src": "CopyOfACopy/RightDoorDeep1",
        "forwards": "east_main_6_deep2",
        "left": "east_main_6_left1",
        "right": "east_main_6_right1",
        "backwards": "east_main_6_backup",
        "functions": []
    },
    "east_main_6_left1": {
        "roomID": "east_main_6",
        "src": "CopyOfACopy/FlatWall",
        "forwards": null,
        "left": null,
        "right": "east_main_6_deep1",
        "backwards": "east_main_6_deep1",
        "functions": []
    },
    "east_main_6_right1": {
        "roomID": "east_main_6",
        "src": "CopyOfACopy/AFlatLight",
        "forwards": null,
        "left": "east_main_6_deep1",
        "right": null,
        "backwards": "east_main_6_deep1",
        "functions": []
    },
    "east_main_6_left2": {
        "roomID": "east_main_6",
        "src": "CopyOfACopy/BFlatLight",
        "forwards": null,
        "left": null,
        "right": "east_main_6_deep2",
        "backwards": "east_main_6_deep2",
        "functions": []
    },
    "east_main_6_right2": {
        "roomID": "east_main_6",
        "src": "CopyOfACopy/FlatDoor",
        "forwards": "east_third_1_enter",
        "left": "east_main_6_deep2",
        "right": null,
        "backwards": "east_main_6_deep2",
        "functions": []
    },
    "east_main_6_deep2": {
        "roomID": "east_main_6",
        "src": "CopyOfACopy/RightDoorDeep2",
        "forwards": "east_main_7_enter",
        "left": "east_main_6_left2",
        "right": "east_main_6_right2",
        "backwards": "east_main_6_deep1",
        "functions": []
    },
    //east_main_7 start
    "east_main_7_enter": {
        "src": "open_the_door",
        "flavorText": "",
        "forwards": "east_main_7_deep1",
        "backwards": "east_main_6_deep2",
        "functions": [
            "unlockDoorForwards"
        ]
    },
    "east_main_7_backup": {
        "src": "open_the_door_but_backwards",
        "flavorText": "",
        "forwards": "east_main_7_deep1",
        "backwards": "east_main_6_deep2",
        "functions": [
            "unlockDoorBackwards"
        ]
    },
    "east_main_7_deep1": {
        "roomID": "east_main_7",
        "src": "CopyOfACopy/LeftDoorDeep1",
        "forwards": "east_main_7_deep2",
        "left": "east_main_7_left1",
        "right": "east_main_7_right1",
        "backwards": "east_main_7_backup",
        "functions": []
    },
    "east_main_7_left1": {
        "roomID": "east_main_7",
        "src": "CopyOfACopy/sticky_note_door",
        "forwards": "east_main_room3_enter",
        "left": null,
        "right": "east_main_7_deep1",
        "backwards": "east_main_7_deep1",
        "functions": []
    },
    "east_main_7_right1": {
        "roomID": "east_main_7",
        "src": "CopyOfACopy/AFlatLight",
        "forwards": null,
        "left": "east_main_7_deep1",
        "right": null,
        "backwards": "east_main_7_deep1",
        "functions": []
    },
    "east_main_7_left2": {
        "roomID": "east_main_7",
        "src": "CopyOfACopy/FlatWall",
        "forwards": null,
        "left": null,
        "right": "east_main_7_deep2",
        "backwards": "east_main_7_deep2",
        "functions": []
    },
    "east_main_7_right2": {
        "roomID": "east_main_7",
        "src": "CopyOfACopy/BFlatLight",
        "forwards": null,
        "left": "east_main_7_deep2",
        "right": null,
        "backwards": "east_main_7_deep2",
        "functions": []
    },
    "east_main_7_deep2": {
        "roomID": "east_main_7",
        "src": "CopyOfACopy/ADeep2",
        "forwards": "east_main_8_enter",
        "left": "east_main_7_left2",
        "right": "east_main_7_right2",
        "backwards": "east_main_7_deep1",
        "functions": []
    },
    //east_main_8 start
    "east_main_8_enter": {
        "src": "open_the_door",
        "flavorText": "",
        "forwards": "east_main_8_deep1",
        "backwards": "east_main_7_deep2",
        "functions": [
            "unlockDoorForwards"
        ]
    },
    "east_main_8_backup": {
        "src": "open_the_door_but_backwards",
        "flavorText": "",
        "forwards": "east_main_8_deep1",
        "backwards": "east_main_7_deep2",
        "functions": [
            "unlockDoorBackwards"
        ]
    },
    "east_main_8_deep1": {
        "roomID": "east_main_8",
        "src": "CopyOfACopy/RightDoorDeep1",
        "forwards": "east_main_8_deep2",
        "left": "east_main_8_left1",
        "right": "east_main_8_right1",
        "backwards": "east_main_8_backup",
        "functions": []
    },
    "east_main_8_left1": {
        "roomID": "east_main_8",
        "src": "CopyOfACopy/FlatWall",
        "forwards": null,
        "left": null,
        "right": "east_main_8_deep1",
        "backwards": "east_main_8_deep1",
        "functions": []
    },
    "east_main_8_right1": {
        "roomID": "east_main_8",
        "src": "CopyOfACopy/AFlatLight",
        "forwards": null,
        "left": "east_main_8_deep1",
        "right": null,
        "backwards": "east_main_8_deep1",
        "functions": []
    },
    "east_main_8_left2": {
        "roomID": "east_main_8",
        "src": "CopyOfACopy/BFlatLight",
        "forwards": null,
        "left": null,
        "right": "east_main_8_deep2",
        "backwards": "east_main_8_deep2",
        "functions": []
    },
    "east_main_8_right2": {
        "roomID": "east_main_8",
        "src": "CopyOfACopy/FlatDoor",
        "forwards": "east_fourth_1_enter",
        "left": "east_main_8_deep2",
        "right": null,
        "backwards": "east_main_8_deep2",
        "functions": []
    },
    "east_main_8_deep2": {
        "roomID": "east_main_8",
        "src": "CopyOfACopy/RightDoorDeep2",
        "forwards": null,
        "left": "east_main_8_left2",
        "right": "east_main_8_right2",
        "backwards": "east_main_8_deep1",
        "functions": []
    },
    //east_main_room1 start
    "east_main_room1_enter": {
        "src": "open_the_door",
        "flavorText": "",
        "forwards": "east_main_room1_deep1",
        "backwards": "east_main_3_left1",
        "functions": [
            "unlockDoorForwards"
        ]
    },
    "east_main_room1_backup": {
        "src": "open_the_door_but_backwards",
        "flavorText": "",
        "forwards": "east_main_room1_deep1",
        "backwards": "east_main_3_left1",
        "functions": [
            "unlockDoorBackwards"
        ]
    },
    "east_main_room1_left1": {
        "roomID": "east_main_room1",
        "src": "MirrorRoom/left1",
        "flavorText": "Was that always your face? You feel like looking into the Mirror would change you into someone who is not you.",
        "backwards": "east_main_room1_deep1",
        "right": "east_main_room1_deep1",
        "functions": ["showClownsonaInVideo", "editClownsona", "lookIntoTheMirror"]
    },
    "east_main_room1_right1": {
        "roomID": "east_main_room1",
        "src": "MirrorRoom/right1",
        "flavorText": "The light is dazzling. It makes you want to close your eyes.",
        "backwards": "east_main_room1_deep1",
        "left": "east_main_room1_deep1",
        "functions": ["toggleSeerOfVoid"]
    },
    "east_main_room1_deep1": {
        "roomID": "east_main_room1",
        "src": "MirrorRoom/deep1",
        "flavorText": "You feel uneasy.",
        "backwards": "east_main_room1_backup",
        "left": "east_main_room1_left1",
        "right": "east_main_room1_right1",
        "functions": []
    },
    //east_first_1 start

    "east_first_1_locked": {
        "src": "open_the_door",
        "flavorText": "",
        "backwards": "east_main_2_right2",
        "functions": [
            "openDoorEastFirstLocked"
        ]
    },
    "east_first_1_enter": {
        "src": "open_the_door",
        "flavorText": "",
        "forwards": "east_first_1_deep1",
        "backwards": "east_main_2_right2",
        "functions": [
            "unlockDoorForwards"
        ]
    },
    "east_first_1_backup": {
        "src": "open_the_door_but_backwards",
        "flavorText": "",
        "forwards": "east_first_1_deep1",
        "backwards": "east_main_2_right2",
        "functions": [
            "unlockDoorBackwards"
        ]
    },
    "east_first_1_deep1": {
        "roomID": "east_first_1",
        "src": "CopyOfACopy/LeftDoorDeep1",
        "forwards": "east_first_1_deep2",
        "left": "east_first_1_left1",
        "right": "east_first_1_right1",
        "backwards": "east_first_1_backup",
        "functions": []
    },
    "east_first_1_left1": {
        "roomID": "east_first_1",
        "src": "CopyOfACopy/FlatDoor",
        "forwards": "east_first_room1_enter",
        "left": null,
        "right": "east_first_1_deep1",
        "backwards": "east_first_1_deep1",
        "functions": []
    },
    "east_first_1_right1": {
        "roomID": "east_first_1",
        "src": "CopyOfACopy/AFlatLight",
        "forwards": null,
        "left": "east_first_1_deep1",
        "right": null,
        "backwards": "east_first_1_deep1",
        "functions": []
    },
    "east_first_1_left2": {
        "roomID": "east_first_1",
        "src": "CopyOfACopy/FlatWall",
        "forwards": null,
        "left": null,
        "right": "east_first_1_deep2",
        "backwards": "east_first_1_deep2",
        "functions": []
    },
    //fun fact, completely forgot that this hallway is the ONLY hallway to the east with doors on both side
    //because the secret passage way confused me
    //whoops!
    //guess its magic!
    "east_first_1_right2": {
        "roomID": "east_first_1",
        "src": "CopyOfACopy/FlatDoor",
        "forwards": "SecretPassageEnterFromEast",
        "left": "east_first_1_deep2",
        "flavorText": "Was this door always here?",
        "right": null,
        "backwards": "east_first_1_deep2",
        "functions": []
    },
    "east_first_1_deep2": {
        "roomID": "east_first_1",
        "src": "CopyOfACopy/RightDoorDeep2",
        "flavorText": "How...Did the light just...move across the hall?",
        "forwards": "east_first_2_enter",
        "left": "east_first_1_left2",
        "right": "east_first_1_right2",
        "backwards": "east_first_1_deep1",
        "functions": []
    },
    //east_first_room1 start
    "east_first_room1_enter": {
        "src": "open_the_door",
        "forwards": "east_first_room1_deep1",
        "backwards": "east_first_1_left1",
        "functions": [
            "unlockDoorForwards"
        ]
    },
    "east_first_room1_backup": {
        "src": "open_the_door_but_backwards",
        "forwards": "east_first_room1_deep1",
        "backwards": "east_first_1_left1",
        "functions": [
            "unlockDoorBackwards"
        ]
    },
    "east_first_room1_left1": {
        "roomID": "east_first_room1",
        "flavorText": "The pale moonlight reveals a mirror that was not there before. Somehow you realize its two mirrors. One always shows Lies, one always shows Truths. Which will you pick?",
        "src": "east_first_room1/left1",
        "backwards": "east_first_room1_deep1",
        "right": "east_first_room1_deep1",
        "functions": ["xcom", "lookIntoTheMirror"]
    },
    "east_first_room1_right1": {
        "roomID": "east_first_room1",
        "src": "east_first_room1/right1",
        "flavorText": "This place is not a place of honor... no highly esteemed deed is commemorated here... nothing valued is here. What is here was dangerous and repulsive to us. This message is a warning about danger.",
        "backwards": "east_first_room1_deep1",
        "left": "east_first_room1_deep1",
        "functions": []
    },
    "east_first_room1_deep1": {
        "roomID": "east_first_room1",
        "flavorText": "Something terrible has happened here. You can see the moon shining through the splintered ceiling.",
        "src": "east_first_room1/deep1",
        "backwards": "east_first_room1_backup",
        "left": "east_first_room1_left1",
        "right": "east_first_room1_right1",
        "functions": []
    },
    //east_first_2 start
    "east_first_2_enter": {
        "src": "open_the_door",
        "flavorText": "",
        "forwards": "east_first_2_deep1",
        "backwards": "east_first_1_deep2",
        "functions": [
            "unlockDoorForwards"
        ]
    },
    "east_first_2_backup": {
        "src": "open_the_door_but_backwards",
        "flavorText": "",
        "forwards": "east_first_2_deep1",
        "backwards": "east_first_1_deep2",
        "functions": [
            "unlockDoorBackwards"
        ]
    },
    "east_first_2_deep1": {
        "roomID": "east_first_2",
        "src": "CopyOfACopy/ADeep1",
        "forwards": "east_first_2_deep2",
        "left": "east_first_2_left1",
        "right": "east_first_2_right1",
        "backwards": "east_first_2_backup",
        "functions": []
    },
    "east_first_2_left1": {
        "roomID": "east_first_2",
        "src": "CopyOfACopy/BFlatLight",
        "forwards": null,
        "left": null,
        "right": "east_first_2_deep1",
        "backwards": "east_first_2_deep1",
        "functions": []
    },
    "east_first_2_right1": {
        "roomID": "east_first_2",
        "src": "CopyOfACopy/FlatWall",
        "forwards": null,
        "left": "east_first_2_deep1",
        "right": null,
        "backwards": "east_first_2_deep1",
        "functions": []
    },
    "east_first_2_left2": {
        "roomID": "east_first_2",
        "src": "CopyOfACopy/FlatWall",
        "forwards": null,
        "left": null,
        "right": "east_first_2_deep2",
        "backwards": "east_first_2_deep2",
        "functions": []
    },
    "east_first_2_right2": {
        "roomID": "east_first_2",
        "src": "CopyOfACopy/AFlatLight",
        "forwards": null,
        "left": "east_first_2_deep2",
        "right": null,
        "backwards": "east_first_2_deep2",
        "functions": []
    },
    "east_first_2_deep2": {
        "roomID": "east_first_2",
        "src": "CopyOfACopy/ADeep2",
        "forwards": "east_first_3_enter",
        "left": "east_first_2_left2",
        "right": "east_first_2_right2",
        "backwards": "east_first_2_deep1",
        "functions": []
    },
    //east_first_3 start
    "east_first_3_enter": {
        "src": "open_the_door",
        "flavorText": "",
        "forwards": "east_first_3_deep1",
        "backwards": "east_first_2_deep2",
        "functions": [
            "unlockDoorForwards"
        ]
    },
    "east_first_3_backup": {
        "src": "open_the_door_but_backwards",
        "flavorText": "",
        "forwards": "east_first_3_deep1",
        "backwards": "east_first_2_deep2",
        "functions": [
            "unlockDoorBackwards"
        ]
    },
    "east_first_3_deep1": {
        "roomID": "east_first_3",
        "src": "CopyOfACopy/RightDoorDeep1",
        "forwards": "east_first_3_deep2",
        "left": "east_first_3_left1",
        "right": "east_first_3_right1",
        "backwards": "east_first_3_backup",
        "functions": []
    },
    "east_first_3_left1": {
        "roomID": "east_first_3",
        "src": "CopyOfACopy/FlatWall",
        "forwards": null,
        "left": null,
        "right": "east_first_3_deep1",
        "backwards": "east_first_3_deep1",
        "functions": []
    },
    "east_first_3_right1": {
        "roomID": "east_first_3",
        "src": "CopyOfACopy/AFlatLight",
        "forwards": null,
        "left": "east_first_3_deep1",
        "right": null,
        "backwards": "east_first_3_deep1",
        "functions": []
    },
    "east_first_3_left2": {
        "roomID": "east_first_3",
        "src": "CopyOfACopy/BFlatLight",
        "forwards": null,
        "left": null,
        "right": "east_first_3_deep2",
        "backwards": "east_first_3_deep2",
        "functions": []
    },
    "east_first_3_right2": {
        "roomID": "east_first_3",
        "src": "CopyOfACopy/FlatDoor",
        "forwards": "east_first_room2_enter",
        "left": "east_first_3_deep2",
        "right": null,
        "backwards": "east_first_3_deep2",
        "functions": []
    },
    "east_first_3_deep2": {
        "roomID": "east_first_3",
        "src": "CopyOfACopy/RightDoorDeep2",
        "forwards": "east_first_4_enter",
        "left": "east_first_3_left2",
        "right": "east_first_3_right2",
        "backwards": "east_first_3_deep1",
        "functions": []
    },
    //east_first_room2 start
    "east_first_room2_enter": {
        "src": "open_the_door",
        "forwards": "east_first_room2_deep1",
        "backwards": "east_first_3_right2",
        "functions": [
            "unlockDoorForwards"
        ]
    },
    "east_first_room2_backup": {
        "src": "open_the_door_but_backwards",
        "forwards": "east_first_room2_deep1",
        "backwards": "east_first_3_right2",
        "functions": [
            "unlockDoorBackwards"
        ]
    },
    "east_first_room2_deep1": {
        "roomID": "east_first_room2",
        "src": "east_first_room2/deep1",
        "flavorText": "You are not you. Your face is not your face. You were never you. ",
        "forwards": "east_first_room2_deep2",
        "left": "east_first_room2_left1",
        "right": "east_first_room2_right1",
        "backwards": "east_first_room2_backup",
        "functions": []
    },
    "east_first_room2_left1": {
        "roomID": "east_first_room2",
        "src": "east_first_room2/left1",
        "flavorText": "You are not you. Your face is not your face. You were never you. ",
        "forwards": null,
        "left": null,
        "right": "east_first_room2_deep1",
        "backwards": "east_first_room2_deep1",
        "functions": []
    },
    "east_first_room2_right1": {
        "roomID": "east_first_room2",
        "src": "east_first_room2/right1",
        "flavorText": "You are not you. Your face is not your face. You were never you. ",
        "forwards": null,
        "left": "east_first_room2_deep1",
        "right": null,
        "backwards": "east_first_room2_deep1",
        "functions": []
    },
    "east_first_room2_left2": {
        "roomID": "east_first_room2",
        "src": "east_first_room2/left2",
        "flavorText": "You are not you. Your face is not your face. You were never you. ",
        "forwards": null,
        "left": null,
        "right": "east_first_room2_deep2",
        "backwards": "east_first_room2_deep2",
        "functions": []
    },
    "east_first_room2_right2": {
        "roomID": "east_first_room2",
        "src": "east_first_room2/right2",
        "flavorText": "You are not you. Your face is not your face. You were never you. ",
        "forwards": null,
        "left": "east_first_room2_deep2",
        "right": null,
        "backwards": "east_first_room2_deep2",
        "functions": []
    },
    "east_first_room2_deep2": {
        "roomID": "east_first_room2",
        "src": "east_first_room2/deep2",
        "flavorText": "You are not you. Your face is not your face. You were never you. ",
        "forwards": null,
        "left": "east_first_room2_left2",
        "right": "east_first_room2_right2",
        "backwards": "east_first_room2_deep1",
        "functions": []
    },
    //east_first_4 start
    "east_first_4_enter": {
        "src": "open_the_door",
        "flavorText": "",
        "forwards": "east_first_4_deep1",
        "backwards": "east_first_3_deep2",
        "functions": [
            "unlockDoorForwards"
        ]
    },
    "east_first_4_backup": {
        "src": "open_the_door_but_backwards",
        "flavorText": "",
        "forwards": "east_first_4_deep1",
        "backwards": "east_first_3_deep2",
        "functions": [
            "unlockDoorBackwards"
        ]
    },
    "east_first_4_deep1": {
        "roomID": "east_first_4",
        "src": "CopyOfACopy/ADeep1",
        "forwards": "east_first_4_deep2",
        "left": "east_first_4_left1",
        "right": "east_first_4_right1",
        "backwards": "east_first_4_backup",
        "functions": []
    },
    "east_first_4_left1": {
        "roomID": "east_first_4",
        "src": "CopyOfACopy/BFlatLight",
        "forwards": null,
        "left": null,
        "right": "east_first_4_deep1",
        "backwards": "east_first_4_deep1",
        "functions": []
    },
    "east_first_4_right1": {
        "roomID": "east_first_4",
        "src": "CopyOfACopy/FlatWall",
        "forwards": null,
        "left": "east_first_4_deep1",
        "right": null,
        "backwards": "east_first_4_deep1",
        "functions": []
    },
    "east_first_4_left2": {
        "roomID": "east_first_4",
        "src": "CopyOfACopy/FlatWall",
        "forwards": null,
        "left": null,
        "right": "east_first_4_deep2",
        "backwards": "east_first_4_deep2",
        "functions": []
    },
    "east_first_4_right2": {
        "roomID": "east_first_4",
        "src": "CopyOfACopy/AFlatLight",
        "forwards": null,
        "left": "east_first_4_deep2",
        "right": null,
        "backwards": "east_first_4_deep2",
        "functions": []
    },
    "east_first_4_deep2": {
        "roomID": "east_first_4",
        "src": "CopyOfACopy/ADeep2",
        "forwards": "east_first_room3_enter",
        "left": "east_first_4_left2",
        "right": "east_first_4_right2",
        "backwards": "east_first_4_deep1",
        "functions": []
    },
    //east_first_room3 start
    "east_first_room3_enter": {
        "src": "open_the_door",
        "forwards": "east_first_room3_deep1",
        "backwards": "east_first_4_deep2",
        "functions": [
            "unlockDoorForwards"
        ]
    },
    "east_first_room3_backup": {
        "src": "open_the_door_but_backwards",
        "forwards": "east_first_room3_deep1",
        "backwards": "east_first_4_deep2",
        "functions": [
            "unlockDoorBackwards"
        ]
    },

    "east_first_room3_left1": {
        "flavorText": "A statue of the Harvest's Head looms over you, just for gambling.",
        "src": "Harvest/gang",
        "roomID": "east_first_room3",
        "right": "east_first_room3_deep1",
        "backwards": "east_first_room3_deep1",
        "functions": [
            "letsGoGamble1",
            "letsGoGamble10",
            "letsGoGamble100"
        ]
    },
    "east_first_room3_right1": {
        "roomID": "east_first_room3",
        "src": "east_first_room3/right1",
        "backwards": "east_first_room3_deep1",
        "left": "east_first_room3_deep1",
        "flavorText": "Something is wrong here. Is. Is there a bookcase of Harvest Books and Harvest Dolls? Is...is there a map? Does that...spiral...seem to be moving? You wish if a map existed, it was easier to see.",

        "functions": ["gaslightEastFirstRoom3"]
    },
    "east_first_room3_deep1": {
        "roomID": "east_first_room3",
        "src": "east_first_room3/deep1",
        "backwards": "east_first_room3_backup",
        "forwards": "east_first_room3_deep2",
        "left": "east_first_room3_left1",
        "right": "east_first_room3_right1",
        "flavorText": "This room is stuffed to the gills with strange figures, gambling and...an eerie almost unreal feeling.",

        "functions": []
    }, "east_first_room3_deep2": {
        "roomID": "east_first_room3",
        "flavorText": "The bed is covered in dolls. A taxidermied alligator head gives you a toothy grin.",
        "src": "east_first_room3/deep2",
        "backwards": "east_first_room3_deep1",
        "left": "east_first_room3_left2",
        "right": "east_first_room3_right2",
        "functions": []
    },
    "east_first_room3_left2": {
        "flavorText": "The Masked and Veiled figures look impassively down onto the bed.",
        "src": "east_first_room3/left2",
        "roomID": "east_first_room3",
        "right": "east_first_room3_deep2",
        "backwards": "east_first_room3_deep2"
    },
    "east_first_room3_right2": {
        "roomID": "east_first_room3",
        "flavorText": "The mirror unsettles you. Like you would become not you if you looked within. Not even the Harvest Doll can soothe you.",

        "src": "east_first_room3/right2",
        "backwards": "east_first_room3_deep2",
        "left": "east_first_room3_deep2",
        "functions": ["lookIntoTheMirror"]
    },


    "SecretPassageway_deep1_fromWest": {
        "roomID": "SecretPassageway",
        "src": "SecretPassageway/deep1",
        "flavorText": "The secret passage way seems long forgotten. Untold years of storage and discarded items line this hall.",
        "forwards": "SecretPassageway_deep2",
        "left": "SecretPassageway_left1",
        "right": "SecretPassageway_right1",
        "backwards": "null",
        "functions": []
    },
    "SecretPassageway_left1": {
        "roomID": "SecretPassageway",
        "src": "SecretPassageway/left1",
        "flavorText": "You feel strangely relieved that there are no bathrooms in this strange mansion. <a target='_blank' href='http://farragofiction.com/CatalystsBathroomSim/bathroom'>Bathrooms have a way of keeping you, after all.</a>",
        "forwards": null,
        "left": null,
        "right": "SecretPassageway_deep1_fromWest",
        "backwards": "SecretPassageway_deep1",
        "functions": []
    },
    "SecretPassageway_right1": {
        "roomID": "SecretPassageway",
        "src": "SecretPassageway/right1",
        "flavorText": "The flashlight is blinding. Who left this here? It seems to be stuck to the birdbath it was discarded into.",
        "forwards": null,
        "left": "SecretPassageway_deep1_fromWest",
        "right": null,
        "backwards": "SecretPassageway_deep1",
        "functions": []
    },
    "SecretPassageway_left2": {
        "roomID": "SecretPassageway",
        "src": "SecretPassageway/left2",
        "flavorText": "Someone must have rolled the rug up in this hall to make room.",
        "forwards": null,
        "left": null,
        "right": "SecretPassageway_deep2",
        "backwards": "SecretPassageway_deep2",
        "functions": []
    },
    "SecretPassageway_right2": {
        "roomID": "SecretPassageway",
        "src": "SecretPassageway/right2",
        "flavorText": "There is a safe here. Faintly scratched into it, right above the combo lock, you can see the phrase 'Wasted, Wasted'. And also 'See The Void' ",
        "forwards": null,
        "left": "SecretPassageway_deep2",
        "right": null,
        "backwards": "SecretPassageway_deep2",
        "functions": ["openSecretPassageSafe", "seeTheLadder"]
    },

    "SecretPassageway_right2_safe_plundered": {
        "roomID": "SecretPassageway",
        "src": "SecretPassageway/right2",
        "flavorText": "There is a safe here. You already took what was inside it.",
        "forwards": null,
        "left": "SecretPassageway_deep2",
        "right": null,
        "backwards": "SecretPassageway_deep2",
        "functions": ['seeTheLadder']
    },
    "SecretPassageway_deep2": {
        "roomID": "SecretPassageway",
        "src": "SecretPassageway/deep2",
        "flavorText": "You carefully pick your way past paper, glass and who knows what to the far door. ",
        "forwards": "SecretPassageway_exit_toEast",
        "left": "SecretPassageway_left2",
        "right": "SecretPassageway_right2",
        "backwards": "SecretPassageway_deep1_fromWest",
        "functions": []
    },
    "SecretPassageway_exit_toEast": {
        "src": "open_the_door",
        "forwards": "east_first_1_right2",
        "backwards": "SecretPassageway_deep2",
        "functions": [
            "unlockDoorForwards"
        ]
    },


    "SecretPassageway_deep1_fromWest": {
        "roomID": "SecretPassageway",
        "src": "SecretPassageway/deep1",
        "flavorText": "The secret passage way seems long forgotten. Untold years of storage and discarded items line this hall.",
        "forwards": "SecretPassageway_deep2",
        "left": "SecretPassageway_left1",
        "right": "SecretPassageway_right1",
        "backwards": "3_bright_left1_mask",
        "functions": []
    },
    "SecretPassageway_left1": {
        "roomID": "SecretPassageway",
        "src": "SecretPassageway/left1",
        "flavorText": "You feel strangely relieved that there are no bathrooms in this strange mansion. <a target='_blank' href='http://farragofiction.com/CatalystsBathroomSim/bathroom'>Bathrooms have a way of keeping you, after all.</a>",
        "forwards": null,
        "left": null,
        "right": "SecretPassageway_deep1_fromWest",
        "backwards": "SecretPassageway_deep1",
        "functions": []
    },
    "SecretPassageway_right1": {
        "roomID": "SecretPassageway",
        "src": "SecretPassageway/right1",
        "flavorText": "The flashlight is blinding. Who left this here? It seems to be stuck to the birdbath it was discarded into.",
        "forwards": null,
        "left": "SecretPassageway_deep1_fromWest",
        "right": null,
        "backwards": "SecretPassageway_deep1",
        "functions": []
    },
    "SecretPassageway_left2": {
        "roomID": "SecretPassageway",
        "src": "SecretPassageway/left2",
        "flavorText": "Someone must have rolled the rug up in this hall to make room.",
        "forwards": null,
        "left": null,
        "right": "SecretPassageway_deep2",
        "backwards": "SecretPassageway_deep2",
        "functions": []
    },
    "SecretPassageway_right2": {
        "roomID": "SecretPassageway",
        "src": "SecretPassageway/right2",
        "flavorText": "There is a safe here. Faintly scratched into it, right above the combo lock, you can see the phrase 'Wasted, Wasted'. And also 'See The Void' ",
        "forwards": null,
        "left": "SecretPassageway_deep2",
        "right": null,
        "backwards": "SecretPassageway_deep2",
        "functions": ["openSecretPassageSafe", "seeTheLadder"]
    },

    "SecretPassageway_right2_safe_plundered": {
        "roomID": "SecretPassageway",
        "src": "SecretPassageway/right2",
        "flavorText": "There is a safe here. You already took what was inside it.",
        "forwards": null,
        "left": "SecretPassageway_deep2",
        "right": null,
        "backwards": "SecretPassageway_deep2",
        "functions": ['seeTheLadder']
    },
    "SecretPassageway_deep2": {
        "roomID": "SecretPassageway",
        "src": "SecretPassageway/deep2",
        "flavorText": "You carefully pick your way past paper, glass and who knows what to the far door. ",
        "forwards": "SecretPassageway_exit_toEast",
        "left": "SecretPassageway_left2",
        "right": "SecretPassageway_right2",
        "backwards": "SecretPassageway_deep1_fromWest",
        "functions": []
    },
    "SecretPassageway_exit_toEast": {
        "src": "open_the_door",
        "forwards": "east_first_1_right2",
        "backwards": "SecretPassageway_deep2",
        "functions": [
            "unlockDoorForwards"
        ]
    },
    //start of the west version of the secret passage way
    //  (this complexity is why i didn't do this for most halls, lol)

    "SecretPassageEnterFromEast": {
        "src": "open_the_door",
        "flavorText": "",
        "forwards": "SecretPassageway_deep1_fromEast",
        "backwards": "east_first_1_right2",
        "functions": [
            "unlockDoorForwards"
        ]
    },
    "SecretPassageBackupToEast": {
        "src": "open_the_door_but_backwards",
        "flavorText": "",
        "forwards": "SecretPassageway_deep1_fromEast",
        "backwards": "east_first_1_right2",
        "functions": [
            "unlockDoorBackwards"
        ]
    },
    "SecretPassageway_deep1_fromEast": {
        "roomID": "SecretPassageway",
        "src": "SecretPassageway/deep1_east",
        "flavorText": "Untold years of storage and discarded items line this hall. You can't quite make out if there is a door at the far end or not.",
        "forwards": "SecretPassagewayWest_deep2",
        "left": "SecretPassagewayWest_left1",
        "right": "SecretPassagewayWest_right1",
        "backwards": "SecretPassageBackupToEast",
        "functions": []
    },
    "SecretPassagewayWest_left1": {
        "roomID": "SecretPassageway",
        "src": "SecretPassageway/right2",
        "flavorText": "There is a safe here. Faintly scratched into it, right above the combo lock, you can see the phrase 'Wasted, Wasted'. And also 'See The Void' ",
        "forwards": null,
        "left": null,
        "right": "SecretPassageway_deep1_fromEast",
        "backwards": "SecretPassageway_deep1_fromEast",
        "functions": ["openSecretPassageSafe", "seeTheLadder"]
    },

    "SecretPassagewayWest_left1_plundered": {
        "roomID": "SecretPassageway",
        "src": "SecretPassageway/right2",
        "flavorText": "There is a safe here. You already took what was inside it.",
        "forwards": null,
        "left": "SecretPassagewayWest_deep2",
        "right": null,
        "backwards": "SecretPassagewayWest_deep2",
        "functions": ['seeTheLadder']
    },
    "SecretPassagewayWest_right1": {
        "roomID": "SecretPassageway",
        "src": "SecretPassageway/left2",
        "flavorText": "Rolled up carpet and cones and a blinding flashlight you can't seem to pry up.",
        "forwards": null,
        "left": "SecretPassageway_deep1_fromEast",
        "right": null,
        "backwards": "SecretPassageway_deep1_fromEast",
        "functions": []
    },
    "SecretPassagewayWest_left2": {
        "roomID": "SecretPassageway",
        "src": "SecretPassageway/right1",
        "flavorText": "The flashlight is blinding, you can't seem to pry it up.",
        "forwards": null,
        "left": null,
        "right": "SecretPassagewayWest_deep2",
        "backwards": "SecretPassagewayWest_deep2",
        "functions": []
    },
    "SecretPassagewayWest_right2": {
        "roomID": "SecretPassageway",
        "src": "SecretPassageway/left1",
        "flavorText": "You feel strangely relieved that there are no bathrooms in this strange mansion. <a target='_blank' href='http://farragofiction.com/CatalystsBathroomSim/bathroom'>Bathrooms have a way of keeping you, after all.</a>",
        "forwards": null,
        "left": "SecretPassagewayWest_deep2",
        "right": null,
        "backwards": "SecretPassagewayWest_deep2",
        "functions": []
    },


    "SecretPassagewayWest_deep2": {
        "roomID": "SecretPassageway",
        "src": "SecretPassageway/deep2_east",
        "flavorText": "Something large and wooden is blocking the doorway ahead, you can't get it to budge.",
        "left": "SecretPassagewayWest_left2",
        "right": "SecretPassagewayWest_right2",
        "backwards": "SecretPassageway_deep1_fromEast",
        "functions": []
    },

    "SecretPassagewayWest_deep2_open": {
        "roomID": "SecretPassageway",
        "src": "SecretPassageway/deep2_east_open",
        "flavorText": "The way ahead seems unblocked. A bookcase has been slid aside.",
        "left": "SecretPassagewayWest_left2",
        "right": "SecretPassagewayWest_right2",
        "backwards": "SecretPassageway_deep1_fromEast",
        "forwards": "3_bright_left1_mask",
        "functions": []
    },
    //east_third_1 start
    "east_third_1_enter": {
        "src": "open_the_door",
        "flavorText": "",
        "forwards": "east_third_1_deep1",
        "backwards": "east_main_6_right2",
        "functions": [
            "unlockDoorForwards"
        ]
    },
    "east_third_1_backup": {
        "src": "open_the_door_but_backwards",
        "flavorText": "",
        "forwards": "east_third_1_deep1",
        "backwards": "east_main_6_right2",
        "functions": [
            "unlockDoorBackwards"
        ]
    },
    "east_third_1_deep1": {
        "roomID": "east_third_1",
        "src": "CopyOfACopy/RightDoorDeep1",
        "forwards": "east_third_1_deep2",
        "left": "east_third_1_left1",
        "right": "east_third_1_right1",
        "backwards": "east_third_1_backup",
        "functions": []
    },
    "east_third_1_left1": {
        "roomID": "east_third_1",
        "src": "CopyOfACopy/FlatWall",
        "forwards": null,
        "left": null,
        "right": "east_third_1_deep1",
        "backwards": "east_third_1_deep1",
        "functions": []
    },
    "east_third_1_right1": {
        "roomID": "east_third_1",
        "src": "CopyOfACopy/AFlatLight",
        "forwards": null,
        "left": "east_third_1_deep1",
        "right": null,
        "backwards": "east_third_1_deep1",
        "functions": []
    },
    "east_third_1_left2": {
        "roomID": "east_third_1",
        "src": "CopyOfACopy/BFlatLight",
        "forwards": null,
        "left": null,
        "right": "east_third_1_deep2",
        "backwards": "east_third_1_deep2",
        "functions": []
    },
    "east_third_1_right2": {
        "roomID": "east_third_1",
        "src": "CopyOfACopy/FlatDoor",
        "forwards": "east_third_room1_enter",
        "left": "east_third_1_deep2",
        "right": null,
        "backwards": "east_third_1_deep2",
        "functions": []
    },
    "east_third_1_deep2": {
        "roomID": "east_third_1",
        "src": "CopyOfACopy/RightDoorDeep2",
        "forwards": "east_third_2_enter",
        "left": "east_third_1_left2",
        "right": "east_third_1_right2",
        "backwards": "east_third_1_deep1",
        "functions": []
    },
    //east_third_room1 start
    "east_third_room1_enter": {
        "src": "open_the_door",
        "forwards": "east_third_room1_deep1",
        "backwards": "east_third_1_right2",
        "functions": [
            "unlockDoorForwards"
        ]
    },
    "east_third_room1_backup": {
        "src": "open_the_door_but_backwards",
        "forwards": "east_third_room1_deep1",
        "backwards": "east_third_1_right2",
        "functions": [
            "unlockDoorBackwards"
        ]
    },
    "east_third_room1_deep1": {
        "roomID": "east_third_room1",
        "flavorText": "A statue of the Harvest's Head looms over you.",
        "src": "Harvest/gang",
        "backwards": "east_third_room1_backup",
        "functions": [
            "prayForRoom",
            "letsGoGamble1",
            "letsGoGamble10",
            "letsGoGamble100"
        ]
    },
    //east_third_2 start
    "east_third_2_enter": {
        "src": "open_the_door",
        "flavorText": "",
        "forwards": "east_third_2_deep1",
        "backwards": "east_third_2_enter",
        "functions": [
            "unlockDoorForwards"
        ]
    },
    "east_third_2_backup": {
        "src": "open_the_door_but_backwards",
        "flavorText": "",
        "forwards": "east_third_2_deep1",
        "backwards": "east_third_1_deep2",
        "functions": [
            "unlockDoorBackwards"
        ]
    },
    "east_third_2_deep1": {
        "roomID": "east_third_2",
        "src": "CopyOfACopy/LeftDoorDeep1",
        "forwards": "east_third_2_deep2",
        "left": "east_third_2_left1",
        "right": "east_third_2_right1",
        "backwards": "east_third_2_backup",
        "functions": []
    },
    "east_third_2_left1": {
        "roomID": "east_third_2",
        "src": "east_third_room2/Jar/jar",
        "forwards": "east_third_room2_enter",
        "left": null,
        "right": "east_third_2_deep1",
        "backwards": "east_third_2_deep1",
        "functions": ["theDoorIsAJar", "unjustifyRecursion"] //resets recursion level
    },
    "east_third_2_right1": {
        "roomID": "east_third_2",
        "src": "CopyOfACopy/AFlatLight",
        "forwards": null,
        "left": "east_third_2_deep1",
        "right": null,
        "backwards": "east_third_2_deep1",
        "functions": []
    },
    "east_third_2_left2": {
        "roomID": "east_third_2",
        "src": "CopyOfACopy/FlatWall",
        "forwards": null,
        "left": null,
        "right": "east_third_2_deep2",
        "backwards": "east_third_2_deep2",
        "functions": []
    },
    "east_third_2_right2": {
        "roomID": "east_third_2",
        "src": "CopyOfACopy/BFlatLight",
        "forwards": null,
        "left": "east_third_2_deep2",
        "right": null,
        "backwards": "east_third_2_deep2",
        "functions": []
    },
    "east_third_2_deep2": {
        "roomID": "east_third_2",
        "src": "CopyOfACopy/ADeep2",
        "forwards": "east_third_3_enter",
        "left": "east_third_2_left2",
        "right": "east_third_2_right2",
        "backwards": "east_third_2_deep1",
        "functions": []
    },

    //east_third_room2/Jar start


    "east_third_room2/Jar_left1": {
        "roomID": "east_third_room2/Jar",
        "src": "east_third_room2/Jar/left1",
        "flavorText": "You would become who you aren't, if you look into this mirror.",
        "backwards": "east_third_room2/Jar_deep1",
        "right": "east_third_room2/Jar_deep1",
        "functions": ["lookIntoTheMirror"]
    },
    "east_third_room2/Jar_right1": {
        "roomID": "east_third_room2/Jar",
        "src": "east_third_room2/Jar/right1",
        "backwards": "east_third_room2/Jar_deep1",
        "left": "east_third_room2/Jar_deep1",
        "flavorText": "You would become a specific spiral cat if you looked into this mirror.",
        "functions": ["becomeCatSpiral"]
    },
    "east_third_room2/Jar_deep1": {
        "roomID": "east_third_room2/Jar",
        "src": "east_third_room2/Jar/deep1",
        "backwards": "east_third_2_left1",
        "left": "east_third_room2/Jar_left1",
        "right": "east_third_room2/Jar_right1",
        "flavorText": "...are...are you...inside the jar?",
        "functions": ["theDoorIsAJar"] //keep going deeper into the JAR
    },
    //east_third_room2 start
    "east_third_room2_enter": {
        "src": "open_the_door",
        "forwards": "east_third_room2_deep1",
        "backwards": "east_third_2_left1",
        "functions": [
            "unlockDoorForwards"
        ]
    },
    "east_third_room2_backup": {
        "src": "open_the_door_but_backwards",
        "forwards": "east_third_room2_deep1",
        "backwards": "east_third_2_left1",
        "functions": [
            "unlockDoorBackwards"
        ]
    },
    "east_third_room2_deep1": {
        "roomID": "east_third_room2",
        "flavorText": "Something about this room makes you think about how all things end.",
        "src": "east_third_room2/deep1",
        "backwards": "east_third_room2_backup",
        "functions": ["theEnd"]
    },
    //east_third_3 start
    "east_third_3_enter": {
        "src": "open_the_door",
        "flavorText": "",
        "forwards": "east_third_3_deep1",
        "backwards": "east_third_2_deep2",
        "functions": [
            "unlockDoorForwards"
        ]
    },
    "east_third_3_backup": {
        "src": "open_the_door_but_backwards",
        "flavorText": "",
        "forwards": "east_third_3_deep1",
        "backwards": "east_third_2_deep2",
        "functions": [
            "unlockDoorBackwards"
        ]
    },
    "east_third_3_deep1": {
        "roomID": "east_third_3",
        "src": "CopyOfACopy/BDeep1",
        "forwards": "east_third_3_deep2",
        "left": "east_third_3_left1",
        "right": "east_third_3_right1",
        "backwards": "east_third_3_backup",
        "functions": []
    },
    "east_third_3_left1": {
        "roomID": "east_third_3",
        "src": "CopyOfACopy/FlatWall",
        "forwards": null,
        "left": null,
        "right": "east_third_3_deep1",
        "backwards": "east_third_3_deep1",
        "functions": []
    },
    "east_third_3_right1": {
        "roomID": "east_third_3",
        "src": "CopyOfACopy/AFlatLight",
        "forwards": null,
        "left": "east_third_3_deep1",
        "right": null,
        "backwards": "east_third_3_deep1",
        "functions": []
    },
    "east_third_3_left2": {
        "roomID": "east_third_3",
        "src": "CopyOfACopy/BFlatLight",
        "forwards": null,
        "left": null,
        "right": "east_third_3_deep2",
        "backwards": "east_third_3_deep2",
        "functions": []
    },
    "east_third_3_right2": {
        "roomID": "east_third_3",
        "src": "CopyOfACopy/FlatWall",
        "forwards": null,
        "left": "east_third_3_deep2",
        "right": null,
        "backwards": "east_third_3_deep2",
        "functions": []
    },
    "east_third_3_deep2": {
        "roomID": "east_third_3",
        "src": "CopyOfACopy/BDeep2",
        "forwards": "east_third_4_enter",
        "left": "east_third_3_left2",
        "right": "east_third_3_right2",
        "backwards": "east_third_3_deep1",
        "functions": []
    },


    //east_third_4 start
    "east_third_4_enter": {
        "src": "open_the_door",
        "flavorText": "",
        "forwards": "east_third_4_deep1",
        "backwards": "east_third_3_deep2",
        "functions": [
            "unlockDoorForwards"
        ]
    },
    "east_third_4_backup": {
        "src": "open_the_door_but_backwards",
        "flavorText": "",
        "forwards": "east_third_4_deep1",
        "backwards": "east_third_3_deep2",
        "functions": [
            "unlockDoorBackwards"
        ]
    },
    "east_third_4_deep1": {
        "roomID": "east_third_4",
        "src": "CopyOfACopy/RightDoorDeep1",
        "forwards": "east_third_4_deep2",
        "left": "east_third_4_left1",
        "right": "east_third_4_right1",
        "backwards": "east_third_4_backup",
        "functions": []
    },
    "east_third_4_left1": {
        "roomID": "east_third_4",
        "src": "CopyOfACopy/FlatWall",
        "forwards": null,
        "left": null,
        "right": "east_third_4_deep1",
        "backwards": "east_third_4_deep1",
        "functions": []
    },
    "east_third_4_right1": {
        "roomID": "east_third_4",
        "src": "CopyOfACopy/AFlatLight",
        "forwards": null,
        "left": "east_third_4_deep1",
        "right": null,
        "backwards": "east_third_4_deep1",
        "functions": []
    },
    "east_third_4_left2": {
        "roomID": "east_third_4",
        "src": "CopyOfACopy/BFlatLight",
        "forwards": null,
        "left": null,
        "right": "east_third_4_deep2",
        "backwards": "east_third_4_deep2",
        "functions": []
    },
    "east_third_4_right2": {
        "roomID": "east_third_4",
        "src": "CopyOfACopy/FlatDoor",
        "forwards": "east_third_room3_enter",
        "left": "east_third_4_deep2",
        "right": null,
        "backwards": "east_third_4_deep2",
        "functions": []
    },
    "east_third_4_deep2": {
        "roomID": "east_third_4",
        "src": "CopyOfACopy/RightDoorDeep2",
        "forwards": "Stairs_enter",
        "left": "east_third_4_left2",
        "right": "east_third_4_right2",
        "backwards": "east_third_4_deep1",
        "functions": []
    },
    //east_third_room3 start
    "east_third_room3_enter": {
        "src": "open_the_door",
        "forwards": "east_third_room3_deep1",
        "backwards": "east_third_4_right2",
        "functions": [
            "unlockDoorForwards"
        ]
    },
    "east_third_room3_backup": {
        "src": "open_the_door_but_backwards",
        "forwards": "east_third_room3_deep1",
        "backwards": "east_third_4_right2",
        "functions": [
            "unlockDoorBackwards"
        ]
    },
    "east_third_room3_deep1": {
        "roomID": "east_third_room3",
        "flavorText": "A statue of the Harvest's Head looms over you.",
        "src": "Harvest/fox",
        "backwards": "east_third_room3_backup",
        "functions": [
            "prayForRoom",
            "letsGoGamble1",
            "letsGoGamble10",
            "letsGoGamble100"
        ]
    },
    //Stairs start
    "Stairs_enter": {
        "src": "open_the_door",
        "flavorText": "",
        "forwards": "Stairs_deep1",
        "backwards": "east_third_4_deep2",
        "functions": [
            "unlockDoorForwards"
        ]
    },
    "Stairs_backup": {
        "src": "open_the_door_but_backwards",
        "flavorText": "",
        "forwards": "Stairs_deep1",
        "backwards": "east_third_4_deep2",
        "functions": [
            "unlockDoorBackwards"
        ]
    },
    "Stairs_left1": {
        "roomID": "Stairs",
        "src": "Stairs/left1",
        "backwards": "Stairs_deep1",
        "right": "Stairs_deep1",
        "functions": ["goIntoThePortal"]
    },
    "Stairs_right1": {
        "roomID": "Stairs",
        "src": "Stairs/right1",
        "backwards": "Stairs_deep1",
        "left": "Stairs_deep1",
        "functions": []
    },
    "Stairs_deep1": {
        "roomID": "Stairs",
        "src": "Stairs/deep1",
        "flavorText": "Holy shit...are...are those...STAIRS?",
        "backwards": "Stairs_backup",
        "left": "Stairs_left1",
        "forwards": "Stairs_deep2",
        "right": "Stairs_right1",
        "functions": []
    },
    "Stairs_deep2": {
        "roomID": "Stairs",
        "src": "Stairs/deep2",
        "flavorText": "The stairs beckon you forwards. Somehow, you know, bone deep, that if you try to go upstairs before Halloween Ends........It would be wrong.",
        "backwards": "Stairs_deep1",
        "functions": ["theStairsBeckon"]
    },
    //east_fourth_1 start
    "east_fourth_1_enter": {
        "src": "open_the_door",
        "flavorText": "",
        "forwards": "east_fourth_1_deep1",
        "backwards": "east_main_8_right2",
        "functions": [
            "unlockDoorForwards"
        ]
    },
    "east_fourth_1_backup": {
        "src": "open_the_door_but_backwards",
        "flavorText": "",
        "forwards": "east_fourth_1_deep1",
        "backwards": "east_main_8_right2",
        "functions": [
            "unlockDoorBackwards"
        ]
    },
    "east_fourth_1_deep1": {
        "roomID": "east_fourth_1",
        "src": "CopyOfACopy/BDeep1",
        "forwards": "east_fourth_1_deep2",
        "left": "east_fourth_1_left1",
        "right": "east_fourth_1_right1",
        "backwards": "east_fourth_1_backup",
        "functions": []
    },
    "east_fourth_1_left1": {
        "roomID": "east_fourth_1",
        "src": "CopyOfACopy/FlatWall",
        "forwards": null,
        "left": null,
        "right": "east_fourth_1_deep1",
        "backwards": "east_fourth_1_deep1",
        "functions": []
    },
    "east_fourth_1_right1": {
        "roomID": "east_fourth_1",
        "src": "CopyOfACopy/AFlatLight",
        "forwards": null,
        "left": "east_fourth_1_deep1",
        "right": null,
        "backwards": "east_fourth_1_deep1",
        "functions": []
    },
    "east_fourth_1_left2": {
        "roomID": "east_fourth_1",
        "src": "CopyOfACopy/BFlatLight",
        "forwards": null,
        "left": null,
        "right": "east_fourth_1_deep2",
        "backwards": "east_fourth_1_deep2",
        "functions": []
    },
    "east_fourth_1_right2": {
        "roomID": "east_fourth_1",
        "src": "CopyOfACopy/FlatWall",
        "forwards": null,
        "left": "east_fourth_1_deep2",
        "right": null,
        "backwards": "east_fourth_1_deep2",
        "functions": []
    },
    "east_fourth_1_deep2": {
        "roomID": "east_fourth_1",
        "src": "CopyOfACopy/BDeep2",
        "forwards": "east_fourth_2_enter",
        "left": "east_fourth_1_left2",
        "right": "east_fourth_1_right2",
        "backwards": "east_fourth_1_deep1",
        "functions": []
    },
    //east_fourth_2 start
    "east_fourth_2_enter": {
        "src": "open_the_door",
        "flavorText": "",
        "forwards": "east_fourth_2_deep1",
        "backwards": "east_fourth_1_deep2",
        "functions": [
            "unlockDoorForwards"
        ]
    },
    "east_fourth_2_backup": {
        "src": "open_the_door_but_backwards",
        "flavorText": "",
        "forwards": "east_fourth_2_deep1",
        "backwards": "east_fourth_1_deep2",
        "functions": [
            "unlockDoorBackwards"
        ]
    },
    "east_fourth_2_deep1": {
        "roomID": "east_fourth_2",
        "src": "CopyOfACopy/LeftDoorDeep1",
        "forwards": "east_fourth_2_deep2",
        "left": "east_fourth_2_left1",
        "right": "east_fourth_2_right1",
        "backwards": "east_fourth_2_backup",
        "functions": []
    },
    "east_fourth_2_left1": {
        "roomID": "east_fourth_2",
        "src": "CopyOfACopy/FlatDoor",
        "forwards": "east_fourth_room1_enter",
        "left": null,
        "right": "east_fourth_2_deep1",
        "backwards": "east_fourth_2_deep1",
        "functions": []
    },
    "east_fourth_2_right1": {
        "roomID": "east_fourth_2",
        "src": "CopyOfACopy/AFlatLight",
        "forwards": null,
        "left": "east_fourth_2_deep1",
        "right": null,
        "backwards": "east_fourth_2_deep1",
        "functions": []
    },
    "east_fourth_2_left2": {
        "roomID": "east_fourth_2",
        "src": "CopyOfACopy/FlatWall",
        "forwards": null,
        "left": null,
        "right": "east_fourth_2_deep2",
        "backwards": "east_fourth_2_deep2",
        "functions": []
    },
    "east_fourth_2_right2": {
        "roomID": "east_fourth_2",
        "src": "CopyOfACopy/BFlatLight",
        "forwards": null,
        "left": "east_fourth_2_deep2",
        "right": null,
        "backwards": "east_fourth_2_deep2",
        "functions": []
    },
    "east_fourth_2_deep2": {
        "roomID": "east_fourth_2",
        "src": "CopyOfACopy/ADeep2",
        "forwards": "east_fourth_3_enter",
        "left": "east_fourth_2_left2",
        "right": "east_fourth_2_right2",
        "backwards": "east_fourth_2_deep1",
        "functions": []
    },
    //east_fourth_room1 start
    "east_fourth_room1_enter": {
        "src": "open_the_door",
        "forwards": "east_fourth_room1_deep1",
        "backwards": "east_fourth_2_left1",
        "functions": [
            "unlockDoorForwards"
        ]
    },
    "east_fourth_room1_backup": {
        "src": "open_the_door_but_backwards",
        "forwards": "east_fourth_room1_deep1",
        "backwards": "east_fourth_2_left1",
        "functions": [
            "unlockDoorBackwards"
        ]
    },
    "east_fourth_room1_deep1": {
        "roomID": "east_fourth_room1",
        "flavorText": "A statue of the Harvest's Head looms over you.",
        "src": "Harvest/fox",
        "backwards": "east_fourth_room1_backup",
        "functions": [
            "prayForRoom",
            "letsGoGamble1",
            "letsGoGamble10",
            "letsGoGamble100"
        ]
    },
    //east_fourth_3 start
    "east_fourth_3_enter": {
        "src": "open_the_door",
        "flavorText": "",
        "forwards": "east_fourth_3_deep1",
        "backwards": "east_fourth_2_deep2",
        "functions": [
            "unlockDoorForwards"
        ]
    },
    "east_fourth_3_backup": {
        "src": "open_the_door_but_backwards",
        "flavorText": "",
        "forwards": "east_fourth_3_deep1",
        "backwards": "east_fourth_2_deep2",
        "functions": [
            "unlockDoorBackwards"
        ]
    },
    "east_fourth_3_deep1": {
        "roomID": "east_fourth_3",
        "src": "CopyOfACopy/RightDoorDeep1",
        "forwards": "east_fourth_3_deep2",
        "left": "east_fourth_3_left1",
        "right": "east_fourth_3_right1",
        "backwards": "east_fourth_3_backup",
        "functions": ["muffledQuietBop"]
    },
    "east_fourth_3_left1": {
        "roomID": "east_fourth_3",
        "src": "CopyOfACopy/FlatWall",
        "forwards": null,
        "left": null,
        "right": "east_fourth_3_deep1",
        "backwards": "east_fourth_3_deep1",
        "functions": ["muffledQuietBop"]
    },
    "east_fourth_3_right1": {
        "roomID": "east_fourth_3",
        "src": "CopyOfACopy/AFlatLight",
        "forwards": null,
        "left": "east_fourth_3_deep1",
        "right": null,
        "backwards": "east_fourth_3_deep1",
        "functions": ["muffledQuietBop"]
    },
    "east_fourth_3_left2": {
        "roomID": "east_fourth_3",
        "src": "CopyOfACopy/BFlatLight",
        "forwards": null,
        "left": null,
        "right": "east_fourth_3_deep2",
        "backwards": "east_fourth_3_deep2",
        "functions": ["muffledQuietBop"]
    },
    "east_fourth_3_right2": {
        "roomID": "east_fourth_3",
        "src": "CopyOfACopy/FlatDoor",
        "forwards": "east_fourth_room2_enter",
        "left": "east_fourth_3_deep2",
        "right": null,
        "backwards": "east_fourth_3_deep2",
        "functions": ["muffledBop"]
    },
    "east_fourth_3_deep2": {
        "roomID": "east_fourth_3",
        "src": "CopyOfACopy/RightDoorDeep2",
        "forwards": "east_fourth_4_enter",
        "left": "east_fourth_3_left2",
        "right": "east_fourth_3_right2",
        "backwards": "east_fourth_3_deep1",
        "functions": ["muffledBop"]
    },
    //east_fourth_room2 start
    "east_fourth_room2_enter": {
        "src": "open_the_door",
        "forwards": "east_fourth_room2_deep0",
        "backwards": "east_fourth_3_right2",
        "functions": [
            "unlockDoorForwards"
        ]
    },
    "east_fourth_room2_backup": {
        "src": "open_the_door_but_backwards",
        "forwards": "east_fourth_room2_deep0",
        "backwards": "east_fourth_3_right2",
        "functions": [
            "unlockDoorBackwards"
        ]
    },

    "east_fourth_room2_deep0": {
        "roomID": "east_fourth_room2",
        "src": "east_fourth_room2/deep1",
        "forwards": "east_fourth_room2_deep1",
        "flavorText": "A feast of knowledge is laid out for all to partake in. Books and Replica Harvest Fruit are strewn carelessly about. A freaking bop is playing from everywhere and nowhere.",
        "backwards": "east_fourth_room2_backup",
        "functions": []
    },
    "east_fourth_room2_left1": {
        "roomID": "east_fourth_room2",
        "src": "east_fourth_room2/left1",
        "backwards": "east_fourth_room2_deep1",
        "right": "east_fourth_room2_deep1",
        "flavorText": "You realize you could just...read this <a target='_blank' href='https://drive.google.com/file/d/17klENnjTIxx6ir6wLBaaslWuDrhyA7Hw/view?usp=sharing'>book</a>, if you wanted to. ", //i also host the file myself but, pdfs can be dangerous to just download so i decided to be more careful with my https server
        "functions": []
    },
    "east_fourth_room2_right1": {
        "roomID": "east_fourth_room2",
        "src": "east_fourth_room2/right1",
        "backwards": "east_fourth_room2_deep1",
        "flavorText": "You realize that you could Sacrifice a short story to the Harvest to feast on, if you wanted to.",
        "left": "east_fourth_room2_deep1",
        "functions": ["prayForStorySacrifice"]
    },
    "east_fourth_room2_deep1": {
        "roomID": "east_fourth_room2",
        "src": "east_fourth_room2/deep2",
        "backwards": "east_fourth_room2_deep0",
        "flavorText": "You almost feel like the Harvest god is at the table. If only the Harvest Fruit before you were real, but alas, it is plastic.",
        "left": "east_fourth_room2_left1",
        "right": "east_fourth_room2_right1",
        "functions": []
    },
    //east_fourth_4 start
    "east_fourth_4_enter": {
        "src": "open_the_door",
        "flavorText": "",
        "forwards": "east_fourth_4_deep1",
        "backwards": "east_fourth_3_deep2",
        "functions": [
            "unlockDoorForwards"
        ]
    },
    "east_fourth_4_backup": {
        "src": "open_the_door_but_backwards",
        "flavorText": "",
        "forwards": "east_fourth_4_deep1",
        "backwards": "east_fourth_3_deep2",
        "functions": [
            "unlockDoorBackwards"
        ]
    },
    "east_fourth_4_deep1": {
        "roomID": "east_fourth_4",
        "src": "CopyOfACopy/LeftDoorDeep1",
        "forwards": "east_fourth_4_deep2",
        "left": "east_fourth_4_left1",
        "right": "east_fourth_4_right1",
        "backwards": "east_fourth_4_backup",
        "functions": []
    },
    "east_fourth_4_left1": {
        "roomID": "east_fourth_4",
        "src": "CopyOfACopy/FlatDoor",
        "forwards": "east_fourth_room3_enter",
        "left": null,
        "right": "east_fourth_4_deep1",
        "backwards": "east_fourth_4_deep1",
        "functions": []
    },
    "east_fourth_4_right1": {
        "roomID": "east_fourth_4",
        "src": "CopyOfACopy/AFlatLight",
        "forwards": null,
        "left": "east_fourth_4_deep1",
        "right": null,
        "backwards": "east_fourth_4_deep1",
        "functions": []
    },
    "east_fourth_4_left2": {
        "roomID": "east_fourth_4",
        "src": "CopyOfACopy/FlatWall",
        "forwards": null,
        "left": null,
        "right": "east_fourth_4_deep2",
        "backwards": "east_fourth_4_deep2",
        "functions": []
    },
    "east_fourth_4_right2": {
        "roomID": "east_fourth_4",
        "src": "CopyOfACopy/BFlatLight",
        "forwards": null,
        "left": "east_fourth_4_deep2",
        "right": null,
        "backwards": "east_fourth_4_deep2",
        "functions": []
    },
    "east_fourth_4_deep2": {
        "roomID": "east_fourth_4",
        "src": "CopyOfACopy/ADeep2",
        "forwards": "east_fourth_room4_enter",
        "left": "east_fourth_4_left2",
        "right": "east_fourth_4_right2",
        "backwards": "east_fourth_4_deep1",
        "functions": []
    },
    //east_fourth_room3 start
    "east_fourth_room3_enter": {
        "src": "open_the_door",
        "forwards": "east_fourth_room3_deep1",
        "backwards": "east_fourth_4_left1",
        "functions": [
            "unlockDoorForwards"
        ]
    },
    "east_fourth_room3_backup": {
        "src": "open_the_door_but_backwards",
        "forwards": "east_fourth_room3_deep1",
        "backwards": "east_fourth_4_left1",
        "functions": [
            "unlockDoorBackwards"
        ]
    },
    "east_fourth_room3_deep1": {
        "roomID": "east_fourth_room3",
        "flavorText": "A statue of the Harvest's Head looms over you.",
        "src": "Harvest/take_one",
        "backwards": "east_fourth_room3_backup",
        "functions": [
            "prayForRoom",
            "letsGoGamble1",
            "letsGoGamble10",
            "letsGoGamble100"
        ]
    },
    //east_fourth_room4 start
    "east_fourth_room4_enter": {
        "src": "open_the_door",
        "forwards": "east_fourth_room4_deep1",
        "backwards": "east_fourth_4_deep2",
        "functions": [
            "unlockDoorForwards"
        ]
    },
    "east_fourth_room4_backup": {
        "src": "open_the_door_but_backwards",
        "forwards": "east_fourth_room4_deep1",
        "backwards": "east_fourth_4_deep2",
        "functions": [
            "unlockDoorBackwards"
        ]
    },
    "east_fourth_room4_deep1": {
        "roomID": "east_fourth_room4",
        "flavorText": "This room is reserved for IC.",
        "src": "Harvest/eyes",
        "backwards": "east_fourth_room4_backup",
        "functions": [
            "letsGoGamble1",
            "letsGoGamble10",
            "letsGoGamble100"
        ]
    },
    //east_second_1 start
    "east_second_1_enter": {
        "src": "open_the_door",
        "flavorText": "",
        "forwards": "east_second_1_deep1",
        "backwards": "east_main_4_right2",
        "functions": [
            "unlockDoorForwards"
        ]
    },
    "east_second_1_backup": {
        "src": "open_the_door_but_backwards",
        "flavorText": "",
        "forwards": "east_second_1_deep1",
        "backwards": "east_main_4_right2",
        "functions": [
            "unlockDoorBackwards"
        ]
    },
    "east_second_1_deep1": {
        "roomID": "east_second_1",
        "src": "CopyOfACopy/BDeep1",
        "forwards": "east_second_1_deep2",
        "left": "east_second_1_left1",
        "right": "east_second_1_right1",
        "backwards": "east_second_1_backup",
        "functions": []
    },
    "east_second_1_left1": {
        "roomID": "east_second_1",
        "src": "CopyOfACopy/FlatWall",
        "forwards": null,
        "left": null,
        "right": "east_second_1_deep1",
        "backwards": "east_second_1_deep1",
        "functions": []
    },
    "east_second_1_right1": {
        "roomID": "east_second_1",
        "src": "CopyOfACopy/AFlatLight",
        "forwards": null,
        "left": "east_second_1_deep1",
        "right": null,
        "backwards": "east_second_1_deep1",
        "functions": []
    },
    "east_second_1_left2": {
        "roomID": "east_second_1",
        "src": "CopyOfACopy/BFlatLight",
        "forwards": null,
        "left": null,
        "right": "east_second_1_deep2",
        "backwards": "east_second_1_deep2",
        "functions": []
    },
    "east_second_1_right2": {
        "roomID": "east_second_1",
        "src": "CopyOfACopy/FlatWall",
        "forwards": null,
        "left": "east_second_1_deep2",
        "right": null,
        "backwards": "east_second_1_deep2",
        "functions": []
    },
    "east_second_1_deep2": {
        "roomID": "east_second_1",
        "src": "CopyOfACopy/BDeep2",
        "forwards": "east_second_2_enter",
        "left": "east_second_1_left2",
        "right": "east_second_1_right2",
        "backwards": "east_second_1_deep1",
        "functions": []
    },
    //east_second_2 start
    "east_second_2_enter": {
        "src": "open_the_door",
        "flavorText": "",
        "forwards": "east_second_2_deep1",
        "backwards": "east_second_1_deep2",
        "functions": [
            "unlockDoorForwards"
        ]
    },
    "east_second_2_backup": {
        "src": "open_the_door_but_backwards",
        "flavorText": "",
        "forwards": "east_second_2_deep1",
        "backwards": "east_second_1_deep2",
        "functions": [
            "unlockDoorBackwards"
        ]
    },
    "east_second_2_deep1": {
        "roomID": "east_second_2",
        "src": "CopyOfACopy/LeftDoorDeep1",
        "forwards": "east_second_2_deep2",
        "left": "east_second_2_left1",
        "right": "east_second_2_right1",
        "backwards": "east_second_2_backup",
        "functions": []
    },
    "east_second_2_left1": {
        "roomID": "east_second_2",
        "src": "CopyOfACopy/FlatDoor",
        "forwards": "east_second_room1_enter",
        "left": null,
        "right": "east_second_2_deep1",
        "backwards": "east_second_2_deep1",
        "functions": []
    },
    "east_second_2_right1": {
        "roomID": "east_second_2",
        "src": "CopyOfACopy/AFlatLight",
        "forwards": null,
        "left": "east_second_2_deep1",
        "right": null,
        "backwards": "east_second_2_deep1",
        "functions": []
    },
    "east_second_2_left2": {
        "roomID": "east_second_2",
        "src": "CopyOfACopy/FlatWall",
        "forwards": null,
        "left": null,
        "right": "east_second_2_deep2",
        "backwards": "east_second_2_deep2",
        "functions": []
    },
    "east_second_2_right2": {
        "roomID": "east_second_2",
        "src": "CopyOfACopy/BFlatLight",
        "forwards": null,
        "left": "east_second_2_deep2",
        "right": null,
        "backwards": "east_second_2_deep2",
        "functions": []
    },
    "east_second_2_deep2": {
        "roomID": "east_second_2",
        "src": "CopyOfACopy/ADeep2",
        "forwards": "east_second_3_enter",
        "left": "east_second_2_left2",
        "right": "east_second_2_right2",
        "backwards": "east_second_2_deep1",
        "functions": []
    },
    //east_second_room1 start
    "east_second_room1_enter": {
        "src": "open_the_door",
        "forwards": "east_second_room1_deep1",
        "backwards": "east_second_2_left1",
        "functions": [
            "unlockDoorForwards"
        ]
    },
    "east_second_room1_backup": {
        "src": "open_the_door_but_backwards",
        "forwards": "east_second_room1_deep1",
        "backwards": "east_second_2_left1",
        "functions": [
            "unlockDoorBackwards"
        ]
    },
    "east_second_room1_deep1": {
        "roomID": "east_second_room1",
        "flavorText": "A statue of the Harvest's Head looms over you.",
        "src": "Harvest/bride",
        "backwards": "east_second_room1_backup",
        "functions": [
            "prayForRoom",
            "letsGoGamble1",
            "letsGoGamble10",
            "letsGoGamble100"
        ]
    },
    //east_second_3 start
    "east_second_3_enter": {
        "src": "open_the_door",
        "flavorText": "",
        "forwards": "east_second_3_deep1",
        "backwards": "east_second_2_deep2",
        "functions": [
            "unlockDoorForwards"
        ]
    },
    "east_second_3_backup": {
        "src": "open_the_door_but_backwards",
        "flavorText": "",
        "forwards": "east_second_3_deep1",
        "backwards": "east_second_2_deep2",
        "functions": [
            "unlockDoorBackwards"
        ]
    },
    "east_second_3_deep1": {
        "roomID": "east_second_3",
        "src": "CopyOfACopy/RightDoorDeep1",
        "forwards": "east_second_3_deep2",
        "left": "east_second_3_left1",
        "right": "east_second_3_right1",
        "backwards": "east_second_3_backup",
        "functions": []
    },
    "east_second_3_left1": {
        "roomID": "east_second_3",
        "src": "CopyOfACopy/FlatWall",
        "forwards": null,
        "left": null,
        "right": "east_second_3_deep1",
        "backwards": "east_second_3_deep1",
        "functions": []
    },
    "east_second_3_right1": {
        "roomID": "east_second_3",
        "src": "CopyOfACopy/AFlatLight",
        "forwards": null,
        "left": "east_second_3_deep1",
        "right": null,
        "backwards": "east_second_3_deep1",
        "functions": []
    },
    "east_second_3_left2": {
        "roomID": "east_second_3",
        "src": "CopyOfACopy/BFlatLight",
        "forwards": null,
        "left": null,
        "right": "east_second_3_deep2",
        "backwards": "east_second_3_deep2",
        "functions": []
    },
    "east_second_3_right2": {
        "roomID": "east_second_3",
        "src": "CopyOfACopy/FlatDoor",
        "forwards": "east_second_room2_enter",
        "left": "east_second_3_deep2",
        "right": null,
        "backwards": "east_second_3_deep2",
        "functions": []
    },
    "east_second_3_deep2": {
        "roomID": "east_second_3",
        "src": "CopyOfACopy/RightDoorDeep2",
        "forwards": "east_second_4_enter",
        "left": "east_second_3_left2",
        "right": "east_second_3_right2",
        "backwards": "east_second_3_deep1",
        "functions": []
    },
    //east_second_room2 start
    "east_second_room2_enter": {
        "src": "open_the_door",
        "forwards": "east_second_room2_deep1",
        "backwards": "east_second_3_right2",
        "functions": [
            "unlockDoorForwards"
        ]
    },
    "east_second_room2_backup": {
        "src": "open_the_door_but_backwards",
        "forwards": "east_second_room2_deep1",
        "backwards": "east_second_3_right2",
        "functions": [
            "unlockDoorBackwards"
        ]
    },
    "east_second_room2_deep1": {
        "roomID": "east_second_room2",
        "flavorText": "A statue of the Harvest's Head looms over you.",
        "src": "Harvest/fox",
        "backwards": "east_second_room2_backup",
        "functions": [
            "prayForRoom",
            "letsGoGamble1",
            "letsGoGamble10",
            "letsGoGamble100"
        ]
    },
    //east_second_4 start
    "east_second_4_enter": {
        "src": "open_the_door",
        "flavorText": "",
        "forwards": "east_second_4_deep1",
        "backwards": "east_second_3_deep2",
        "functions": [
            "unlockDoorForwards"
        ]
    },
    "east_second_4_backup": {
        "src": "open_the_door_but_backwards",
        "flavorText": "",
        "forwards": "east_second_4_deep1",
        "backwards": "east_second_3_deep2",
        "functions": [
            "unlockDoorBackwards"
        ]
    },
    "east_second_4_deep1": {
        "roomID": "east_second_4",
        "src": "CopyOfACopy/ADeep1",
        "forwards": "east_second_4_deep2",
        "left": "east_second_4_left1",
        "right": "east_second_4_right1",
        "backwards": "east_second_4_backup",
        "functions": []
    },
    "east_second_4_left1": {
        "roomID": "east_second_4",
        "src": "CopyOfACopy/BFlatLight",
        "forwards": null,
        "left": null,
        "right": "east_second_4_deep1",
        "backwards": "east_second_4_deep1",
        "functions": []
    },
    "east_second_4_right1": {
        "roomID": "east_second_4",
        "src": "CopyOfACopy/FlatWall",
        "forwards": null,
        "left": "east_second_4_deep1",
        "right": null,
        "backwards": "east_second_4_deep1",
        "functions": []
    },
    "east_second_4_left2": {
        "roomID": "east_second_4",
        "src": "CopyOfACopy/FlatWall",
        "forwards": null,
        "left": null,
        "right": "east_second_4_deep2",
        "backwards": "east_second_4_deep2",
        "functions": []
    },
    "east_second_4_right2": {
        "roomID": "east_second_4",
        "src": "CopyOfACopy/AFlatLight",
        "forwards": null,
        "left": "east_second_4_deep2",
        "right": null,
        "backwards": "east_second_4_deep2",
        "functions": []
    },
    "east_second_4_deep2": {
        "roomID": "east_second_4",
        "src": "CopyOfACopy/ADeep2",
        "forwards": "east_second_room3_enter",
        "left": "east_second_4_left2",
        "right": "east_second_4_right2",
        "backwards": "east_second_4_deep1",
        "functions": []
    },
    //east_second_room3 start
    "east_second_room3_enter": {
        "src": "open_the_door",
        "forwards": "east_second_room3_deep1",
        "backwards": "east_second_4_deep2",
        "functions": [
            "unlockDoorForwards"
        ]
    },
    "east_second_room3_backup": {
        "src": "open_the_door_but_backwards",
        "forwards": "east_second_room3_deep1",
        "backwards": "east_second_4_deep2",
        "functions": [
            "unlockDoorBackwards"
        ]
    },
    "east_second_room3_deep1": {
        "roomID": "east_second_room3",
        "flavorText": "A statue of the Harvest's Head looms over you.",
        "src": "Harvest/fox",
        "backwards": "east_second_room3_backup",
        "functions": [
            "prayForRoom",
            "letsGoGamble1",
            "letsGoGamble10",
            "letsGoGamble100"
        ]
    }



}

/*
    "1_2_open_door": {
        "src": "open_the_door",
        "flavorText": "",
        "forwards": "1",
        "backwards": "2",
        "functions": ["unlockDoorForwards"]
    },
//going backwards needs a transition effect or it feels like you're moving forwards rip
    "2_1_open_door": {
        "src": "open_the_door_but_backwards",
        "flavorText": "",
        "forwards": "2",
        "backwards": "1",
        "functions": ["unlockDoorBackwards"]
    },

        "1_2_open_door": {
        "src": "open_the_door",
        "flavorText": "",
        "forwards": "1",
        "backwards": "2",
        "functions": ["unlockDoorLeft"]
    },

        "1_2_open_door": {
        "src": "open_the_door",
        "flavorText": "",
        "forwards": "1",
        "backwards": "2",
        "functions": ["unlockDoorRight"]
    },
*/

/*will be procedural but contain whole rooms from floor 1
//it just rewrites where doors lead
//like, if a room on the first floor has a door to the left
so too will its second floor varient

will need to twist all open door functions to instead not use forward/left/etc and instead use new things
but not sure how i'll handle 'back' between rooms

added roomID to json to help me understand when we're leaving
*/
const floor_2_hallways = {}
