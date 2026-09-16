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
  currentRoomBeaten = 0;
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

function playVariantIfCurrentIdIsAnomaly(path, variant_list) {
  console.log("JR NOTE: playVariantIfCurrentIdIsAnomaly", globalDataObject.current_room_id, anomaly_id)
  if (globalDataObject.current_room_id === anomaly_id) {
    console.log("JR NOTE: going to play weird video")
    video.src = path + pickFrom(variant_list) + ".mp4";
    video.play();
  }
}













//room 6 functions
let loop6SuccessArray = ["3_deep3_1", "3_deep3_2", "3_deep3_3", "3_deep3_4", "3_deep3_5", "3_deep3_6", "3_deep3_7", "7_deep1"]
const loop6Fail = "3_deep3"; //always the same failure
//all ids for room 6
const loop6PossibleAnomalyLocations = ['6_deep1', '6_left1', '6_right1', '6_deep2', '6_left2', '6_right2', '6_deep3', '6_left3', '6_right3', '6_deep4', '6_left4', '6_right4']


function setAnomalyLocationRoom6() {
  if (currentRoomBeaten === 0) {
    anomaly_id = null;
    return;

  }

  //tutorial, so you get two for free
  if (currentRoomBeaten === 1) {
    anomaly_id = "6_deep4";
  }

  if (currentRoomBeaten < 4 && Math.random() > 0.5) {
    anomaly_id = pickFrom(loop6PossibleAnomalyLocations);
    return;

  }



  //room 5 is guaranteed to have an anamaly for two reasons
  //one, so you can't get a run where theres literally nothing wrong with it
  //and two
  //and this is more important to me
  //i forgot to film the 5 marker at first and didn't know why and got confused and 
  //kinda disoriented when i couldn't find it and had to reshoot it
  //it wans't too hard but
  //man how did that happen
  //i remember setting it up, i just...didn't snap the picture??? i guess???
  //perfect thing to immortalize
  if (Math.random() > 0.5 || currentRoomBeaten == 4) {
    anomaly_id = pickFrom(loop6PossibleAnomalyLocations);
    return;
  }
  //more likely to see them later on
  if (currentRoomBeaten > 4 && Math.random() > 0.25) {
    anomaly_id = pickFrom(loop6PossibleAnomalyLocations);
    return;

  }
  anomaly_id = null;
  return;

}
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
  const path = "images/Diorama/Inside/Hallways/6/";
  const options = ["deep1_bride", "deep1_mask_storm"];
  playVariantIfCurrentIdIsAnomaly(path, options);
}


function check_room_6_left1() {
  const path = "images/Diorama/Inside/Hallways/6/";
  const options = ["left1_subtle_painting", "left1_two_orbs"];
  playVariantIfCurrentIdIsAnomaly(path, options);
}


function check_room_6_right1() {
  const path = "images/Diorama/Inside/Hallways/6/";
  const options = ["right1_bride", "right1_nosign"];
  playVariantIfCurrentIdIsAnomaly(path, options);
}


function check_room_6_deep2() {
  const path = "images/Diorama/Inside/Hallways/6/";
  const options = ["deep2_cat", "deep2_garland"];
  playVariantIfCurrentIdIsAnomaly(path, options);
}



function check_room_6_left2() {
  const path = "images/Diorama/Inside/Hallways/6/";
  const options = ["left2_fallen_chair", "left2_therearefourlights"];
  playVariantIfCurrentIdIsAnomaly(path, options);
}



function check_room_6_right2() {
  const path = "images/Diorama/Inside/Hallways/6/";
  const options = ["right2_upsidedown"];
  playVariantIfCurrentIdIsAnomaly(path, options);
}



function check_room_6_deep3() {
  const path = "images/Diorama/Inside/Hallways/6/";
  const options = ["deep3_bride", "deep3_mask", "deep3_skull"];
  playVariantIfCurrentIdIsAnomaly(path, options);
}



function check_room_6_left3() {
  const path = "images/Diorama/Inside/Hallways/6/";
  const options = ["left3_chair", "left3_noface"];
  playVariantIfCurrentIdIsAnomaly(path, options);
}



function check_room_6_right3() {
  const path = "images/Diorama/Inside/Hallways/6/";
  const options = ["right3_bearleft", "right3_jack", "right3_no_odin", "right3_nobear"];
  playVariantIfCurrentIdIsAnomaly(path, options);
}



function check_room_6_deep4() {
  const path = "images/Diorama/Inside/Hallways/6/";
  const options = ["deep4_cones", "deep4_crate", "deep4_growth", "deep4_stop", "deep4_stop", "deep4_stop", "deep4_stop"];
  playVariantIfCurrentIdIsAnomaly(path, options);
}



function check_room_6_left4() {
  const path = "images/Diorama/Inside/Hallways/6/";
  const options = ["left4_blue", "left4_chair", "left4_chair_nolight", "left4_fallen", "left4_wrongpics"];
  playVariantIfCurrentIdIsAnomaly(path, options);
}



function check_room_6_right4() {
  const path = "images/Diorama/Inside/Hallways/6/";
  const options = ["right4_noknife", "right4_plantfell", "right4_tablefell", "right4_weirdblackgoo"];
  playVariantIfCurrentIdIsAnomaly(path, options);
}

//end room 6

