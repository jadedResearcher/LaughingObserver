/*
The final dream of this Harvest.

I hope it is a good one.

I might add things to her dreams, even as we move through the year. 

Little rooms that only appear here.
*/
let dreamMansionRooms = {};
let dreaming = false; //game will automatically do some stuff if this is true when you move
//this intitializes the dream once
const theHarvestDreams = () => {
    if (Object.keys(dreamMansionRooms).length > 0) {
        return;
    }
    initDreamRooms();

    //JR NOTE: todo, once i have dream logic fully up, my goal is to rewrite ids and have things be somewhat stable
    //but every so often the hallway clears itself out
    handleDreamLogic(true);

}

//space breaks down. just like i like it
const floor2BelongsToZampanio = () => {
    initDreamRooms();
    hallways = {};
    /*
* like dream, but instead of picking a new at random (and clearing hall) you ADD to a blank hall array and have a POPUP for selecting rooms

* placeholder click a, b or c, confirm it works, confirm i can back up etc

* THEN add still frames of every video in every hall 

* create "card" for each possible space you could play from the still image

* card includes info on room size (most rooms are size 1 or 3 but might be more) and number of exists 

* wire up to stairs instead of fractals

* apocalypse room has button to turn things into fractals
    */

    showOptionsForNextRoom("OUTSIDE");
}

/*
default number is three
for now just show a popup with a, b, and c that maps to three different rooms from dreamMansionRooms
eventually want a card for each option (need generate first for all rooms,
 script mapping deep1 to first)
 when you pick one of the three , call makeNewSecondFloorRoom(currentID, pickedJSON)
*/
const showOptionsForNextRoom = (currentID) => {
    const contentEle = document.createElement("div");
    contentEle.innerHTML = "<h1>How Will You Build Your House Of Cards?</h1>"

    const cardWrapper = createElementWithClassAndParent("div", contentEle, 'cardHolder');
    let rooms = Object.keys(dreamMansionRooms)
    let optionCount = 3;
    for (let i = 0; i < optionCount; i++) {
        const card = createElementWithClassAndParent("button", contentEle, 'card');
        let cardID = pickFrom(rooms);
        card.innerText = cardID;
        card.onclick = () => {
            makeNewSecondFloorRoom(currentID, dreamMansionRooms[cardID])
        }
    }

    showExistingPopup(contentEle, "");
}

/*
takes room json and gives it a new id and 
makes all internal refernces to ids reflect this and wires it to go backwards into 
whatever room genreated it
*/
const makeNewSecondFloorRoom = (backwardsID, jsonForNextRoom) => {
    console.log("JR NOTE: making room", { backwardsID, jsonForNextRoom });
    const id = "_zampanio" + Object.keys(hallways).length;
    const ret = {};
    for (let [key, value] of Object.entries(jsonForNextRoom)) {
        const new_object = { ...value };

        //NOTE: none of this id rewriting will work on any hardcoded interaction ids. whoops
        if (new_object.left) {
            new_object.left = value.left + id;
        }

        if (new_object.right) {
            new_object.right = value.right + id;
        }

        //https://zampaniosim.fandom.com/wiki/Lavinraca
        if (new_object.forwards) {
            new_object.forwards = value.forwards + id;
        }

        if (new_object.backwards) {
            new_object.backwards = value.backwards + id;
        }

        ret[key + id] = new_object;

    }
    Object.assign(hallways, ret);
    console.log("JR NOTE: going to render ret[0]", ret)
    renderID(Object.keys(ret)[0])
}

const initDreamRooms = () => {
    if (Object.keys(dreamMansionRooms).length > 0) {
        return;
    }
    //parse the hallway into rooms, things without a room id don't count

    //key is  by room id, value is sub object from hallways


    for (let [key, hall] of Object.entries(hallways)) {
        if (hall.roomID) {
            if (!dreamMansionRooms[hall.roomID]) {
                dreamMansionRooms[hall.roomID] = {};
            }
            dreamMansionRooms[hall.roomID][key] = hall;
        }
    }
}

//grabs a random new room to render from.
//this gets called anytime the dream isn't sure where to go next.
//it doesn't just render a new room, it makes it the whole hallway.
//nothing exists but it
//so that if you try to leave 'reality' you get a new room
const handleDreamLogic = (first = false) => {
    if (first) {
        hallways = dreamMansionRooms["TheHarvestDreams"]
    } else {
        hallways = pickFrom(Object.values(dreamMansionRooms));
    }
    const target = Object.keys(hallways)[0]
    if (hallways[target].flavorText) {
        hallways[target].flavorText += " You are dreaming...the mist is so peaceful. Like you're floating."
    } else {
        hallways[target].flavorText = " You are dreaming...the mist is so peaceful. Like you're floating."
    }
    renderID(target);
}
