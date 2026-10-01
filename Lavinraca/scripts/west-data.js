//sudden realization on 9/28/26, 2+ months after starting work on this game and with only 3 days left till lavinraca
//i realized i made a game thats
//half old school dungeon crawl
//half one of those fucked up zillow tours
//: 8800 Blue Lick Road,
//https://www.tumblr.com/pain-and-lavender-honey/706658881000062976/please-explore-this-place-with-me-the-3d?source=share

//answer, prayer pairs
const raw_prayers = [];
//can't let them clog up prayers by trying to leave them breaks prayers
const room_dibs_raw = [];
const clean_answered_prayers = [];

const REFLECTED_MESSAGE = "Reflection of a Reflection Reflected Endlessly";
const ROOM_LITANY = "Dear, Sweet, Precious Harvest, I pray for a room to replace";

const getWaitingReflections = () => {
  const ret = [];
  for (let r of raw_prayers) {
    //im sure its fine
    if (r && r.prayerObject.message === REFLECTED_MESSAGE) {
      ret.push(r.prayerObject["save-data"])
    }
  }
  return ret;
}

const getDibsForRoom = (id) => {
  const ret = [];
  for (let r of room_dibs_raw) {
    //im sure its fine
    if (r && r.message.includes(ROOM_LITANY)) {
      try {
        const data = JSON.parse(r["save-data"]);
        if (data.current_room_id === id) {
          ret.push({ message: r.message, data })
        }
      } catch (e) {
        console.error(e);
      }
    }
  }
  return ret;
}


const getPendingPrayersForRoom = (id) => {
  const ret = [];
  const mail = fetchPendingCommands();
  for (let r of mail) {
    //im sure its fine
    if (r && r.message.includes(ROOM_LITANY)) {
      try {
        const data = JSON.parse(r["save-data"]);
        if (data.current_room_id === id) {
          ret.push({ message: r.message, data })
        }
      } catch (e) {
        console.error(e);
      }
    }
  }
  return ret;
}


const addNewReflection = (garbage, json) => {
  makeNewRawPrayer("Blessed", json)
}

//responses can be html, prayers can not be
//also if the prayer is a reflection, don't show spam
const autoMakeNewAnsweredPrayer = (prayer, response) => {
  if (!prayer || prayer === REFLECTED_MESSAGE) {
    return;
  }
  clean_answered_prayers.push({ prayer: prayer, response: response })
}
const makeNewRawPrayer = (responseText, prayerObject) => {
  raw_prayers.push({ response: responseText, prayerObject: prayerObject })
}

const addNewRoomDibs = (garbage, json) => {
  room_dibs_raw.push(json)
}

//JSON.parse(raw_prayers[0].prayerObject["save-data"]) for Reflection
//makeNewRawPrayer("Answer to Prayer", { "message": "can i avoid fucking up my save", "save-data": "{\"hallways_entered\":0,\"prayers_sent\":[\"test with dat\",\"test 3 from d\",\"test 5\",\"million test \",\"can i avoid f\"],\"inventory\":[],\"keys\":13,\"meat\":1,\"candy\":1,\"opened_the_door\":true,\"lastSaveTimeCode\":1788634666203,\"lastLoadTimeCode\":1788634654834}", "date": "9\/5\/2026, 2:57:46 PM", "website": "You passed the test, you're not a particularly stupid bot!" });
//makeNewRawPrayer("Intentionally Broken Prayer2", { "message": "million test with data", "save-data": "{&quot;hallways_entered&quot;:0,&quot;prayers_sent&quot;:[&quot;test with dat&quot;,&quot;test 3 from d&quot;,&quot;test 5&quot;,&quot;million test &quot;],&quot;inventory&quot;:[],&quot;keys&quot;:0,&quot;meat&quot;:1,&quot;candy&quot;:1,&quot;opened_the_door&quot;:true,&quot;lastSaveTimeCode&quot;:1788634287055,&quot;lastLoadTimeCode&quot;:1788634272876}", "date": "9\/5\/2026, 2:51:27 PM", "website": "You passed the test, you're not a particularly stupid bot!" })
//makeNewRawPrayer("tbd",{})

makeNewRawPrayer("zzz", { "message": "May the ritual at October's end succeed \r\n-the catcher of zampanio", "save-data": "{\"hallways_entered\":0,\"prayers_sent\":[\"May the ritua\"],\"inventory\":[],\"meat\":1,\"candy\":1,\"opened_the_door\":true,\"lastSaveTimeCode\":1789447415002,\"lastLoadTimeCode\":1789447249632,\"current_room_id\":\"OUTSIDE\",\"state_changes\":{},\"spooky_seen\":[],\"masks\":0}", "date": "9\/14\/2026, 11:43:35 PM", "website": "You passed the test, you're not a particularly stupid bot!" })
makeNewRawPrayer("zzz", { "message": "okay :) it successfully eats weird characters and doesnt let me evilly inject random html spans in my text, as far as i could see, i think", "save-data": "{\"hallways_entered\":96,\"prayers_sent\":[\"Hello, miss H\",\"check\u200fing w\u3000h\",\"<span style=\\\"\",\"okay :) it su\"],\"inventory\":[],\"keys\":0,\"masks\":0,\"meat\":2,\"stranger\":false,\"candy\":2,\"powerWorking\":false,\"opened_the_door\":true,\"current_room_id\":\"OUTSIDE\",\"button_controls\":true,\"state_changes\":{\"5\":\"5_key_gotten\",\"4_open_locked_door\":\"4_open_unlock\"},\"spooky_seen\":[\"face\",\"jrstairs\"],\"lastSaveTimeCode\":1789480574776,\"lastLoadTimeCode\":1789479963556}", "date": "9\/15\/2026, 9:56:14 AM", "website": "You passed the test, you're not a particularly stupid bot!" })
makeNewRawPrayer("zzz", { "message": "|Hi Harvest!", "save-data": "{\"hallways_entered\":435632872472961,\"prayers_sent\":[\"|Hi Harvest!\"],\"inventory\":[],\"meat\":999,\"candy\":999,\"opened_the_door\":true,\"lastSaveTimeCode\":1789511403671,\"lastLoadTimeCode\":1789510177481,\"current_room_id\":\"OUTSIDE\",\"button_controls\":false,\"state_changes\":{\"5\":\"5_key_gotten\",\"4_open_locked_door\":\"4_open_unlock\",\"2_back_left_locked\":\"2_back_left_m\",\"west_sunroom_left1\":\"west_sunroom_\",\"3_deep3\":\"3_deep3_unloc\",\"3_bright_left1\":\"3_bright_left\",\"3_bright_deep1\":\"3_bright_deep\",\"2_back_left_unlocked_no_mask\":\"2_back_left_m\"},\"keys\":456,\"spooky_seen\":[\"jrstairs\",\"bigfurniture\",\"pumpkinroom\",\"masksky\",\"blind\",\"pumpkinroom\",\"bigfurniture\",\"mirrorwave\",\"bride_and_man\",\"upsidedown\",\"bigchair\",\"clowns\",\"masksky\",\"bride\"],\"masks\":113,\"powerWorking\":true}", "date": "2026-09-16, 00:30:03", "website": "You passed the test, you're not a particularly stupid bot!" })
makeNewRawPrayer("zzz *grumble* zzz", { "message": "Good luck with the midlife crisis sweetie ^w^", "save-data": "{\"hallways_entered\":0,\"prayers_sent\":[\"Good luck wit\"],\"inventory\":[],\"keys\":0,\"masks\":0,\"meat\":0,\"stranger\":false,\"candy\":0,\"powerWorking\":false,\"opened_the_door\":false,\"current_room_id\":\"OUTSIDE\",\"button_controls\":true,\"state_changes\":{},\"spooky_seen\":[],\"lastSaveTimeCode\":1789519658377}", "date": "16\/09\/2026, 00:47:38", "website": "You passed the test, you're not a particularly stupid bot!" })

makeNewRawPrayer("I will, dear Butler. Thank you for your dilligence wandering my halls.", { "message": "Dearest Harvest, may you yet again prosper this season.", "save-data": "{\"hallways_entered\":647,\"prayers_sent\":[\"Please let th\",\"snor mimimi\",\"Dearest Harve\"],\"inventory\":[],\"keys\":0,\"masks\":0,\"meat\":0,\"stranger\":true,\"candy\":0,\"powerWorking\":true,\"opened_the_door\":true,\"current_room_id\":\"OUTSIDE\",\"button_controls\":true,\"state_changes\":{\"5\":\"5_key_gotten\",\"4_open_locked_door\":\"4_open_unlock\",\"2_back_left_locked\":\"2_back_left_m\",\"2_back_left_unlocked_no_mask\":\"2_back_left_m\"},\"spooky_seen\":[\"bride\",\"masksky\",\"pumpkins\",\"itwrithes\",\"approved\",\"bride\",\"itwrithes\",\"shake\",\"foghorse\",\"jrstairs\",\"tridoor\",\"bride_and_man\"],\"lastSaveTimeCode\":1790810257947,\"lastLoadTimeCode\":1790810193993,\"clownsona\":[\"body/bodyInvi\",\"face/orange.p\",\"hats/KNIFE.pn\",\"extra/spadesT\"],\"books\":0,\"harvestPoints\":0}", "date": "9/30/2026, 7:17:37 PM", "website": "You passed the test, you're not a particularly stupid bot!" })
makeNewRawPrayer("You are doing wonderfully, Guest. <Br><Br>I provide my Blessing for your Trick or Treating. May Candy fill your bags.", { "message": "I don't know how to pray or if i'm doing this right buuuuut...... i pray that i can hopefully trick or treat with my friends ! and if i can, i hope for lots of candy! may everything in the world rock. lavinrockin' in the manor tonighttttt - masticatedSurrealist ", "save-data": "{\"hallways_entered\":0,\"prayers_sent\":[\"I don't know \"],\"inventory\":[],\"books\":0,\"keys\":0,\"masks\":0,\"harvestPoints\":0,\"meat\":0,\"stranger\":false,\"candy\":0,\"powerWorking\":false,\"opened_the_door\":false,\"current_room_id\":\"OUTSIDE\",\"button_controls\":true,\"state_changes\":{},\"spooky_seen\":[],\"lastSaveTimeCode\":1790810316195,\"clownsona\":[\"body/Body0.pn\",\"face/flesh.pn\",\"hats/dualMask\",\"extra/pumpkin\"]}", "date": "9/30/2026, 7:18:36 PM", "website": "You passed the test, you're not a particularly stupid bot!" })
makeNewRawPrayer("The Faithful do provide. Thank you for your well wishes. And thank you, truly, for your prayers for the Manor.", { "message": "Welcome back to life! I hope you have a wonderful month. Your house is very cool and beautiful and spooky. ", "save-data": "{\"hallways_entered\":234,\"prayers_sent\":[\"Please let th\",\"Welcome back \"],\"inventory\":[],\"keys\":0,\"masks\":0,\"meat\":1,\"stranger\":true,\"candy\":0,\"powerWorking\":true,\"opened_the_door\":true,\"current_room_id\":\"OUTSIDE\",\"button_controls\":true,\"state_changes\":{\"5\":\"5_key_gotten\",\"4_open_locked_door\":\"4_open_unlock\",\"2_back_left_locked\":\"2_back_left_m\",\"2_back_left_unlocked_no_mask\":\"2_back_left_m\"},\"spooky_seen\":[\"bride\"],\"lastSaveTimeCode\":1790810432192,\"lastLoadTimeCode\":1790809806491,\"clownsona\":[\"body/Body1.pn\",\"face/spiralFa\",\"hats/stabbedI\",\"extra/holding\"],\"books\":0,\"harvestPoints\":10}", "date": "01/10/2026, 01:20:32", "website": "You passed the test, you're not a particularly stupid bot!" })
makeNewRawPrayer("Candy Corn makes a wonderful seasonal decoration, and thankfully it doesn't actually grow in Fields.", { "message": "Oh dear Harvest, I pray for plentiful produce from mine candycorn husks upon this scared and spookiest Harveste Eve. I wish to deck thee halls of Lavinraca with the orange and creme hued candied delights.", "save-data": "{\"hallways_entered\":0,\"prayers_sent\":[\"Oh dear Harve\"],\"inventory\":[],\"books\":0,\"keys\":0,\"masks\":0,\"harvestPoints\":0,\"meat\":0,\"stranger\":false,\"candy\":0,\"powerWorking\":false,\"opened_the_door\":false,\"current_room_id\":\"OUTSIDE\",\"button_controls\":true,\"state_changes\":{},\"spooky_seen\":[],\"lastSaveTimeCode\":1790810453896,\"clownsona\":[\"body/body21.p\",\"face/simpleFa\",\"hats/catEars.\",\"extra/candyBa\"]}", "date": "9/30/2026, 7:20:53 PM", "website": "You passed the test, you're not a particularly stupid bot!" })
makeNewRawPrayer("May it indeed.", { "message": "May the catcher be catched this october. For the laughs.", "save-data": "{\"hallways_entered\":0,\"prayers_sent\":[\"May the catch\"],\"inventory\":[],\"books\":0,\"keys\":0,\"masks\":0,\"harvestPoints\":0,\"meat\":0,\"stranger\":false,\"candy\":0,\"powerWorking\":false,\"opened_the_door\":false,\"current_room_id\":\"OUTSIDE\",\"button_controls\":false,\"state_changes\":{},\"spooky_seen\":[],\"lastSaveTimeCode\":1790811130875,\"clownsona\":[\"body/stiltWal\",\"face/spiralFa\",\"hats/lamp.png\",\"extra/cupcake\"]}", "date": "9/30/2026, 4:32:10 PM", "website": "You passed the test, you're not a particularly stupid bot!" })


//makeNewRawPrayer("Blessed", { "message": "Reflection of a Reflection Reflected Endlessly", "save-data": "{\"hallways_entered\":13,\"prayers_sent\":[],\"inventory\":[],\"keys\":0,\"masks\":0,\"meat\":0,\"stranger\":false,\"candy\":0,\"powerWorking\":true,\"opened_the_door\":true,\"current_room_id\":\"2_back_right\",\"button_controls\":true,\"state_changes\":{},\"spooky_seen\":[],\"lastSaveTimeCode\":1789445162501}", "date": "9\/15\/2026, 12:06:02 AM", "website": "You passed the test, you're not a particularly stupid bot!" })
//"garbage" is there as a dummy variable, i'm lazy and the thing i copy from the php has a , and i want this to too without me having to edit

//start of clownsonas
addNewReflection("", { "message": "Reflection of a Reflection Reflected Endlessly", "save-data": "{\"hallways_entered\":188,\"prayers_sent\":[\"Please let this alpha test work.\"],\"inventory\":[],\"keys\":0,\"masks\":0,\"meat\":0,\"stranger\":true,\"candy\":0,\"powerWorking\":true,\"opened_the_door\":true,\"current_room_id\":\"east_main_room1_left1\",\"button_controls\":true,\"state_changes\":{\"5\":\"5_key_gotten\",\"4_open_locked_door\":\"4_open_unlocked_door\",\"2_back_left_locked\":\"2_back_left_mask\",\"2_back_left_unlocked_no_mask\":\"2_back_left_mask\"},\"spooky_seen\":[\"bride\"],\"lastSaveTimeCode\":1790220689885,\"lastLoadTimeCode\":1790220687576,\"clownsona\":[\"body\/body10.png\",\"face\/smileyWithNose.png\",\"hats\/blank.png\",\"extra\/harvestBodypillow.png\"],\"books\":0}", "date": "9\/23\/2026, 11:31:33 PM", "website": "You passed the test, you're not a particularly stupid bot!" })
addNewReflection("", { "message": "Reflection of a Reflection Reflected Endlessly", "save-data": "{\"hallways_entered\":172,\"prayers_sent\":[\"Please let this alpha test work.\"],\"inventory\":[],\"keys\":0,\"masks\":0,\"meat\":0,\"stranger\":true,\"candy\":0,\"powerWorking\":true,\"opened_the_door\":true,\"current_room_id\":\"east_main_room1_left1\",\"button_controls\":true,\"state_changes\":{\"5\":\"5_key_gotten\",\"4_open_locked_door\":\"4_open_unlocked_door\",\"2_back_left_locked\":\"2_back_left_mask\",\"2_back_left_unlocked_no_mask\":\"2_back_left_mask\"},\"spooky_seen\":[\"bride\"],\"lastSaveTimeCode\":1790220774315,\"lastLoadTimeCode\":1790220774312,\"clownsona\":[\"body\/body8.png\",\"face\/smileyWithNose.png\",\"hats\/coffeeMug.png\",\"extra\/flipOff.png\"],\"books\":0}", "date": "9\/23\/2026, 11:32:57 PM", "website": "You passed the test, you're not a particularly stupid bot!" })
addNewReflection("", { "message": "Reflection of a Reflection Reflected Endlessly", "save-data": "{\"hallways_entered\":174,\"prayers_sent\":[\"Please let this alpha test work.\"],\"inventory\":[],\"keys\":0,\"masks\":0,\"meat\":0,\"stranger\":true,\"candy\":0,\"powerWorking\":true,\"opened_the_door\":true,\"current_room_id\":\"east_main_room1_left1\",\"button_controls\":true,\"state_changes\":{\"5\":\"5_key_gotten\",\"4_open_locked_door\":\"4_open_unlocked_door\",\"2_back_left_locked\":\"2_back_left_mask\",\"2_back_left_unlocked_no_mask\":\"2_back_left_mask\"},\"spooky_seen\":[\"bride\"],\"lastSaveTimeCode\":1790220868515,\"lastLoadTimeCode\":1790220862404,\"clownsona\":[\"body\/checkered.png\",\"face\/face5.png\",\"hats\/halo.png\",\"extra\/HonkHonkNose.png\"],\"books\":0}", "date": "9\/23\/2026, 11:34:29 PM", "website": "You passed the test, you're not a particularly stupid bot!" })
addNewReflection("", { "message": "Reflection of a Reflection Reflected Endlessly", "save-data": "{\"hallways_entered\":424,\"prayers_sent\":[\"Oh dear Harvest, I pray for plentiful produce from mine candycorn husks upon this scared and spookiest Harveste E\"],\"inventory\":[],\"books\":0,\"keys\":0,\"masks\":0,\"harvestPoints\":0,\"meat\":0,\"stranger\":false,\"candy\":0,\"powerWorking\":true,\"opened_the_door\":true,\"current_room_id\":\"2_back_right\",\"button_controls\":true,\"state_changes\":{\"5\":\"5_key_gotten\",\"4_open_locked_door\":\"4_open_unlocked_door\",\"west_sunroom_left1\":\"west_sunroom_left1_nokey\",\"3_deep3\":\"3_deep3_unlocked\",\"2_back_left_locked\":\"2_back_left_mask\",\"2_back_left_unlocked_no_mask\":\"2_back_left_mask\"},\"spooky_seen\":[],\"lastSaveTimeCode\":1790811483514,\"clownsona\":[\"body/body21.png\",\"face/simpleFace.png\",\"hats/catEars.png\",\"extra/candyBasket.png\"]}", "date": "9/30/2026, 7:38:16 PM", "website": "You passed the test, you're not a particularly stupid bot!" })
addNewReflection("", { "message": "Reflection of a Reflection Reflected Endlessly", "save-data": "{\"hallways_entered\":14,\"prayers_sent\":[],\"inventory\":[],\"books\":0,\"keys\":0,\"masks\":0,\"harvestPoints\":0,\"meat\":0,\"stranger\":false,\"candy\":0,\"powerWorking\":true,\"opened_the_door\":true,\"current_room_id\":\"2_back_right\",\"button_controls\":true,\"state_changes\":{},\"spooky_seen\":[],\"lastSaveTimeCode\":1790809783155,\"clownsona\":[\"body/body21.png\",\"face/faceDripping.png\",\"hats/partyHat.png\",\"extra/biblicallyAccurateAngel.png\"]}", "date": "01/10/2026, 01:09:44", "website": "You passed the test, you're not a particularly stupid bot!" })
addNewReflection("", { "message": "Reflection of a Reflection Reflected Endlessly", "save-data": "{\"hallways_entered\":581,\"prayers_sent\":[\"Please let this alpha test work.\"],\"inventory\":[],\"keys\":0,\"masks\":0,\"meat\":0,\"stranger\":true,\"candy\":0,\"powerWorking\":true,\"opened_the_door\":true,\"current_room_id\":\"2_back_right\",\"button_controls\":true,\"state_changes\":{\"5\":\"5_key_gotten\",\"4_open_locked_door\":\"4_open_unlocked_door\",\"2_back_left_locked\":\"2_back_left_mask\",\"2_back_left_unlocked_no_mask\":\"2_back_left_mask\",\"west_sunroom_left1\":\"west_sunroom_left1_nokey\",\"3_deep3\":\"3_deep3_unlocked\"},\"spooky_seen\":[\"bride\"],\"lastSaveTimeCode\":1790813025329,\"lastLoadTimeCode\":1790812392442,\"clownsona\":[\"body/body7.png\",\"face/face20.png\",\"hats/NonFishRuffle.png\",\"extra/floatingEyes.png\"],\"books\":0,\"harvestPoints\":0}", "date": "9/30/2026, 8:03:48 PM", "website": "You passed the test, you're not a particularly stupid bot!" })



//addNewReflection("garbage")




addNewRoomDibs("garbage", { "message": "Dear, Sweet, Precious Harvest, I pray for a room to replace east_main_room3_deep1 and Sacrificing 1 books in your name. \r\n  I want it to be Waste themed. \r\n  I also want to copy Toilet,Drawers, and Drawers from other rooms of the house and place them inside, if they'll fit.\r\n  Catalyst here. We doing the lobster image right? And sticky notes. Tysm for linking my funeralSim. Also I am 100% fine with roommates. We have two toilets! It'll be just like the year 1 bathroom sleepover!\r\n  I claim this room for myself.\r\n  ", "save-data": "{\"hallways_entered\":212,\"prayers_sent\":[\"Please let this alpha test work.\"],\"inventory\":[],\"keys\":0,\"masks\":0,\"meat\":1,\"stranger\":true,\"candy\":0,\"powerWorking\":true,\"opened_the_door\":true,\"current_room_id\":\"east_main_room3_deep1\",\"button_controls\":true,\"state_changes\":{\"5\":\"5_key_gotten\",\"4_open_locked_door\":\"4_open_unlocked_door\",\"2_back_left_locked\":\"2_back_left_mask\",\"2_back_left_unlocked_no_mask\":\"2_back_left_mask\"},\"spooky_seen\":[\"bride\"],\"lastSaveTimeCode\":1790809960817,\"lastLoadTimeCode\":1790809806491,\"clownsona\":[\"body/Body1.png\",\"face/spiralFancy.png\",\"hats/stabbedInTorso.png\",\"extra/holdingKnife.png\"],\"books\":1,\"harvestPoints\":1}", "date": "01/10/2026, 01:14:36", "website": "You passed the test, you're not a particularly stupid bot!" })
addNewRoomDibs("garbage", { "message": "Dear, Sweet, Precious Harvest, I pray for a room to replace east_first_room1_deep1 and Sacrificing 1 books in your name. \r\n  I want it to be Apocalypse themed. \r\n  I also want to copy Harvest Head,Mirror, and Mirror from other rooms of the house and place them inside, if they'll fit.\r\n  Hi please put this in a painting: https://numberonelabyrinthenjoyer.neocities.org/Resources/Lavinraca/CharmMyth.png\r\n\r\nIt's my little Shrine Corner! ^w^\r\n  I claim this room for myself.\r\n  ", "save-data": "{\"hallways_entered\":820,\"prayers_sent\":[\"Please let this alpha test work.\",\"snor mimimi\",\"Dearest Harvest, may you yet again prosper this season.\"],\"inventory\":[],\"keys\":0,\"masks\":0,\"meat\":1,\"stranger\":true,\"candy\":0,\"powerWorking\":true,\"opened_the_door\":true,\"current_room_id\":\"east_first_room1_deep1\",\"button_controls\":true,\"state_changes\":{\"5\":\"5_key_gotten\",\"4_open_locked_door\":\"4_open_unlocked_door\",\"2_back_left_locked\":\"2_back_left_mask\",\"2_back_left_unlocked_no_mask\":\"2_back_left_mask\",\"east_first_1_locked\":\"east_first_1_enter\"},\"spooky_seen\":[\"bride\",\"masksky\",\"pumpkins\",\"itwrithes\",\"approved\",\"bride\",\"itwrithes\",\"shake\",\"foghorse\",\"jrstairs\",\"tridoor\",\"bride_and_mannequin\",\"tridoor\",\"masksky\",\"tridoor\",\"bride\",\"bride\",\"family\",\"laugh\",\"tridoor\",\"stick\"],\"lastSaveTimeCode\":1790810592123,\"lastLoadTimeCode\":1790810526559,\"clownsona\":[\"body/bodyInvisible.png\",\"face/orange.png\",\"hats/KNIFE.png\",\"extra/spadesTailfromLavinraca.png\"],\"books\":1,\"harvestPoints\":1}", "date": "9/30/2026, 7:24:20 PM", "website": "You passed the test, you're not a particularly stupid bot!" })
addNewRoomDibs("garbage", { "message": "Dear, Sweet, Precious Harvest, I pray for a room to replace east_main_room3_deep1 and Sacrificing 9999 books in your name. \r\n  I want it to be Waste themed. \r\n  I also want to copy Mirror,Toilet, and Mirror from other rooms of the house and place them inside, if they'll fit.\r\n  Let's try to cram as many roommates into one room as possible. There's no way this could ever go horribly wrong.\r\n\r\n-Personality of Prophetic Secrets/Muse of Mirrors\r\n  I claim this room for myself.\r\n  ", "save-data": "{\"hallways_entered\":435632872475171,\"prayers_sent\":[],\"inventory\":[],\"meat\":1001,\"candy\":1001,\"opened_the_door\":true,\"lastSaveTimeCode\":1790810126277,\"lastLoadTimeCode\":1790809816520,\"current_room_id\":\"east_main_room3_deep1\",\"button_controls\":false,\"state_changes\":{\"5\":\"5_key_gotten\",\"4_open_locked_door\":\"4_open_unlocked_door\",\"2_back_left_locked\":\"2_back_left_mask\",\"west_sunroom_left1\":\"west_sunroom_left1_nokey\",\"3_deep3\":\"3_deep3_unlocked\",\"3_bright_left1\":\"3_bright_left1_mask\",\"3_bright_deep1\":\"3_bright_deep1_open\",\"2_back_left_unlocked_no_mask\":\"2_back_left_mask\",\"SecretPassagewayWest_deep2\":\"SecretPassagewayWest_deep2_open\",\"SecretPassageway_right2\":\"SecretPassageway_right2_safe_plundered\",\"SecretPassagewayWest_left1\":\"SecretPassagewayWest_left1_plundered\",\"1_bright\":\"1_bright_no_book\",\"5_bright\":\"5_bright_book_got\",\"east_first_1_locked\":\"east_first_1_enter\"},\"keys\":455,\"spooky_seen\":[\"jrstairs\",\"bigfurniture\",\"pumpkinroom\",\"masksky\",\"blind\",\"pumpkinroom\",\"bigfurniture\",\"mirrorwave\",\"bride_and_mannequin\",\"upsidedown\",\"bigchair\",\"clowns\",\"masksky\",\"bride\",\"evil\",\"masksky\",\"stick\",\"bigclose\",\"bigclose\",\"somanypumpkins\",\"blind\",\"river\",\"bigroommannequin\",\"jrstairs\",\"masksky\",\"deepstairs\",\"bigfurniture\",\"shake\",\"bigchair\",\"hand\",\"jrstairs\",\"masksky\",\"where\",\"river\",\"hand\",\"clowns\",\"blind\",\"masksky\",\"laugh\",\"masksky\",\"tentacles\",\"upsidedown\",\"tentacles\",\"somanypumpkins\",\"somanypumpkins\",\"car\",\"deepstairs\",\"hoon\",\"corridor\",\"lady\",\"shake\",\"car\",\"river\",\"face\",\"subtle\",\"bigroommannequin\",\"tridoor\",\"voiddoor\",\"subtle\",\"tridoor\",\"voiddoor\",\"foghorse\",\"approved\",\"maccus_sprint\",\"jars\",\"shake\",\"hoon\",\"bodies\",\"pumpkins\",\"tridoor\",\"bigroommannequin\",\"car\",\"bigchair\",\"jrstairs\",\"approved\",\"bride_and_mannequin\",\"foghorse\",\"stick\",\"jars\",\"hoon\",\"pumpkinroom\",\"bigclose\"],\"masks\":113,\"powerWorking\":true,\"clownsona\":[\"body/body16.png\",\"face/I_I.png\",\"hats/KNIFE.png\",\"extra/tooMuchCorn.png\"],\"books\":75636,\"harvestPoints\":9999}", "date": "2026-10-01, 01:25:27", "website": "You passed the test, you're not a particularly stupid bot!" })



//addNewRoomDibs("garbage")


















for (let p of raw_prayers) {
  autoMakeNewAnsweredPrayer(p.prayerObject.message, p.response)
}