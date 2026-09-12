

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
        "flavorText": "The foyer looks so different lit by the electric lamps.",
        "forwards": "4_bright",
        "left": "2_bright",
        "right": "3_bright",
        "backwards": "2_sunset_back",
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
        "functions": [
            "wrongOnPurposeForDebugging"
        ]
    },

    "1_2_open_unlocked_door": {
        "roomID": "1",
        "src": "open_the_door",
        "flavorText": "",
        "forwards": "2_front",
        "backwards": "4_bright",
        "functions": ["unlockDoorForwards"]
    },
    "5_bright": {
        "roomID": "1",
        "src": "1/ElectricLights/back_left",
        "flavorText": "The key has already been collected.",
        "forwards": null,
        "left": null,
        "right": "4_bright",
        "backwards": "4_bright",
        "functions": ["testFuckery"]
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
    "2_front": {
        "roomID": "2",
        "src": "2/deep1",
        "flavorText": "Everything is clearly lit.",
        "forwards": "2_back",
        "left": "2_front_left",
        "right": "2_front_right",
        "backwards": "4_bright",
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
        "forwards": "Outside",
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
        "forwards": null,
        "left": "2_back_left_locked",
        "right": "2_back_right",
        "backwards": "2_front",
        "functions": []
    },
    "2_back_left_locked": {
        "roomID": "2",
        "src": "2/back_left_no_mask",
        "flavorText": "The desk is clearly lit. You try the drawers and find they are all empty, save a single locked one. There are some papers on the desk, under a heart shaped paperweight.",
        "forwards": null,
        "left": null,
        "right": "2_back",
        "backwards": "2_back",
        "functions": ["handleDesk2Locked"]
    },
    "2_back_left_unlocked_no_mask": {
        "roomID": "2",
        "src": "2/back_left_no_mask",
        "flavorText": "The desk is clearly lit. You already got the Mask in the locked drawer.",
        "forwards": null,
        "left": null,
        "right": "2_back",
        "backwards": "2_back",
        "functions": ["putMask2"]
    },
    "2_back_left_mask": {
        "roomID": "2",
        "src": "2/back_left_mask",
        "flavorText": "The desk is clearly lit. A Mask is placed on the desk, a gentle electrical hum coming from it.",
        "forwards": null,
        "left": null,
        "right": "2_back",
        "backwards": "2_back",
        "functions": ["takeMask2"]
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
    //hallway 2 sunset
    "2_sunset_front": {
        "roomID": "2",
        "src": "2_sunset/deep1",
        "flavorText": "If it wasn't for the setting sun you wouldn't be able to see anything at all.",
        "forwards": "2_sunset_back",
        "left": "2_sunset_front_left",
        "right": "2_sunset_front_right",
        "backwards": "4",
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
    "3_deep1": {
        "roomID": "3",
        "src": "3/deep1",
        "flavorText": "You see something hung from the far door.",
        "forwards": "3_deep2",
        "left": "3_left1",
        "right": "3_right1",
        "backwards": "2_sunset_back",
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
        "flavorText": "A list of rules are hung on the door.",
        "forwards": "6_deep1",
        "backwards": "3_deep2",
        "functions": ["lookCloserAtRules"]
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
        "forwards": null,
        "left": "3_deep2",
        "right": null,
        "backwards": "3_deep2",
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
        "functions": []
    },
    "6_left1": {
        "roomID": "6",
        "src": "6/left1",
        "forwards": null,
        "left": null,
        "right": "6_deep1",
        "backwards": "6_deep1",
        "functions": []
    },
    "6_right1": {
        "roomID": "6",
        "src": "6/right1",
        "forwards": null,
        "left": "6_deep1",
        "right": null,
        "backwards": "6_deep1",
        "functions": []
    },
    "6_deep2": {
        "roomID": "6",
        "src": "6/deep2",
        "forwards": "6_deep3",
        "left": "6_left2",
        "right": "6_right2",
        "backwards": "6_deep1",
        "functions": []
    },
    "6_left2": {
        "roomID": "6",
        "src": "6/left2",
        "forwards": null,
        "left": null,
        "right": "6_deep2",
        "backwards": "6_deep2",
        "functions": []
    },
    "6_right2": {
        "roomID": "6",
        "src": "6/right2",
        "forwards": null,
        "left": "6_deep2",
        "right": null,
        "backwards": "6_deep2",
        "functions": []
    },
    "6_deep3": {
        "roomID": "6",
        "src": "6/deep3",
        "forwards": "6_deep4",
        "left": "6_left3",
        "right": "6_right3",
        "backwards": "6_deep2",
        "functions": []
    },
    "6_left3": {
        "roomID": "6",
        "src": "6/left3",
        "forwards": null,
        "left": null,
        "right": "6_deep3",
        "backwards": "6_deep3",
        "functions": []
    },
    "6_right3": {
        "roomID": "6",
        "src": "6/right3",
        "forwards": null,
        "left": "6_deep3",
        "right": null,
        "backwards": "6_deep3",
        "functions": []
    },
    "6_deep4": {
        "roomID": "6",
        "src": "6/deep4",
        "forwards": "3_deep3",
        "left": "6_left4",
        "right": "6_right4",
        "backwards": "6_deep3",
        "functions": []
    },
    "6_left4": {
        "roomID": "6",
        "src": "6/left4",
        "forwards": null,
        "left": null,
        "right": "6_deep4",
        "backwards": "6_deep4",
        "functions": []
    },
    "6_right4": {
        "roomID": "6",
        "src": "6/right4",
        "forwards": null,
        "left": "6_deep4",
        "right": null,
        "backwards": "6_deep4",
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

/*will be procedural but contain whole rooms from floor 1
//it just rewrites where doors lead
//like, if a room on the first floor has a door to the left
so too will its second floor varient

will need to twist all open door functions to instead not use forward/left/etc and instead use new things
but not sure how i'll handle 'back' between rooms

added roomID to json to help me understand when we're leaving
*/
const floor_2_hallways = {}
