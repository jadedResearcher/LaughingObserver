/*
always wanted to make one of these

having them be regular functions (not fat pipe)
lets the json refer to them by name


*/
//if it is not set, there is no anomaly and its safe to go through the back door
//if it IS set, there is an anomaly and its safe to go through the front door
let anomaly_id = null;
let currentRoomBeaten = 0;


function incrementRoomBeaten() {
  currentRoomBeaten++;
}

function resetRoomBeaten() {
  currentRoomBeaten = 0
}

//go back if theres something wrong
function checkStabilityNearDoor(json, successID, failID) {
  if (anomaly_id) {
    json.backwards = successID;
    return;
  }
  json.backwards = failID;
}

//go forward if everything is fine
function checkStabilityFarDoor(json, successID, failID) {
  console.log("JR NOTE: checkStabilityFarDoor", { anomaly_id, json, successID, failID })

  if (!anomaly_id) {
    console.log("JR NOTE: there is no anomaly so success", { successID, currentRoomBeaten })
    json.forwards = successID;
    return;
  }
  json.forwards = failID;
}

//room 6 functions
let loop6SuccessArray = ["3_deep3_1", "3_deep3_2", "3_deep3_3", "3_deep3_4", "3_deep3_5", "3_deep3_6", "3_deep3_7", "TODO"]
const loop6Fail = "3_deep3"; //always the same failure

function check_room_6_near_stability() {
  const targetID = globalDataObject.current_room_id;
  checkStabilityNearDoor(hallways[targetID], loop6SuccessArray[currentRoomBeaten], loop6Fail);
}

function check_room_6_far_stability() {
  console.log("JR NOTE: check_room_6_far_stability currentRoomBeaten is:", currentRoomBeaten)
  const targetID = globalDataObject.current_room_id;
  checkStabilityFarDoor(hallways[targetID], loop6SuccessArray[currentRoomBeaten], loop6Fail);

}

//functions to handle rendering anomolies if you're supposed to
function check_room_6_deep1() {

}


function check_room_6_left1() {

}


function check_room_6_right1() {

}


function check_room_6_deep2() {

}



function check_room_6_left2() {

}



function check_room_6_right2() {

}



function check_room_6_deep3() {

}



function check_room_6_left3() {

}



function check_room_6_right3() {

}



function check_room_6_deep4() {

}



function check_room_6_left4() {

}



function check_room_6_right4() {

}

//end room 6

