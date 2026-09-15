//answer, prayer pairs
const raw_prayers = [];
const clean_answered_prayers = [];


const addNewReflection = (json) => {
  makeNewRawPrayer("Blessed", json)
}

//responses can be html, prayers can not be
const makeNewAnsweredPrayer = (prayer, response) => {
  if (!prayer) {
    return;
  }
  clean_answered_prayers.push({ prayer: prayer, response: response })
}
const makeNewRawPrayer = (responseText, prayerObject) => {
  raw_prayers.push({ response: responseText, prayerObject: prayerObject })
}

//JSON.parse(raw_prayers[0].prayerObject["save-data"]) for Reflection
//makeNewRawPrayer("Answer to Prayer", { "message": "can i avoid fucking up my save", "save-data": "{\"hallways_entered\":0,\"prayers_sent\":[\"test with dat\",\"test 3 from d\",\"test 5\",\"million test \",\"can i avoid f\"],\"inventory\":[],\"keys\":13,\"meat\":1,\"candy\":1,\"opened_the_door\":true,\"lastSaveTimeCode\":1788634666203,\"lastLoadTimeCode\":1788634654834}", "date": "9\/5\/2026, 2:57:46 PM", "website": "You passed the test, you're not a particularly stupid bot!" });
//makeNewRawPrayer("Intentionally Broken Prayer2", { "message": "million test with data", "save-data": "{&quot;hallways_entered&quot;:0,&quot;prayers_sent&quot;:[&quot;test with dat&quot;,&quot;test 3 from d&quot;,&quot;test 5&quot;,&quot;million test &quot;],&quot;inventory&quot;:[],&quot;keys&quot;:0,&quot;meat&quot;:1,&quot;candy&quot;:1,&quot;opened_the_door&quot;:true,&quot;lastSaveTimeCode&quot;:1788634287055,&quot;lastLoadTimeCode&quot;:1788634272876}", "date": "9\/5\/2026, 2:51:27 PM", "website": "You passed the test, you're not a particularly stupid bot!" })
//makeNewRawPrayer("tbd",{})



//makeNewRawPrayer("Blessed", { "message": "Reflection of a Reflection Reflected Endlessly", "save-data": "{\"hallways_entered\":13,\"prayers_sent\":[],\"inventory\":[],\"keys\":0,\"masks\":0,\"meat\":0,\"stranger\":false,\"candy\":0,\"powerWorking\":true,\"opened_the_door\":true,\"current_room_id\":\"2_back_right\",\"button_controls\":true,\"state_changes\":{},\"spooky_seen\":[],\"lastSaveTimeCode\":1789445162501}", "date": "9\/15\/2026, 12:06:02 AM", "website": "You passed the test, you're not a particularly stupid bot!" })
addNewReflection({ "message": "Reflection of a Reflection Reflected Endlessly", "save-data": "{\"hallways_entered\":54,\"prayers_sent\":[],\"inventory\":[],\"keys\":31,\"masks\":13,\"meat\":0,\"stranger\":true,\"candy\":0,\"powerWorking\":true,\"opened_the_door\":true,\"current_room_id\":\"2_back_right\",\"button_controls\":true,\"state_changes\":{\"2_back_left_locked\":\"2_back_left_mask\",\"2_back_left_unlocked_no_mask\":\"2_back_left_mask\"},\"spooky_seen\":[],\"lastSaveTimeCode\":1789445662324,\"lastLoadTimeCode\":1789445634693}", "date": "9\/15\/2026, 12:14:22 AM", "website": "You passed the test, you're not a particularly stupid bot!" })
addNewReflection({ "message": "Reflection of a Reflection Reflected Endlessly", "save-data": "{\"hallways_entered\":39,\"prayers_sent\":[],\"inventory\":[],\"keys\":0,\"masks\":0,\"meat\":0,\"stranger\":false,\"candy\":0,\"powerWorking\":true,\"opened_the_door\":true,\"current_room_id\":\"2_back_right\",\"button_controls\":true,\"state_changes\":{\"2_back_left_locked\":\"2_back_left_mask\",\"2_back_left_unlocked_no_mask\":\"2_back_left_mask\"},\"spooky_seen\":[],\"lastSaveTimeCode\":1789445412495,\"lastLoadTimeCode\":1789445397836}", "date": "9\/15\/2026, 12:10:12 AM", "website": "You passed the test, you're not a particularly stupid bot!" })
for (let p of raw_prayers) {
  makeNewAnsweredPrayer(p.prayerObject.message, p.response)
}