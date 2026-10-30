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

    //JR NOTE: todo, once i have dream logic fully up, my goal is to rewrite ids and have things be somewhat stable
    //but every so often the hallway clears itself out
    handleDreamLogic();

}

//grabs a random new room to render from.
//this gets called anytime the dream isn't sure where to go next.
//it doesn't just render a new room, it makes it the whole hallway.
//nothing exists but it
//so that if you try to leave 'reality' you get a new room
const handleDreamLogic = () => {
    hallways = pickFrom(Object.values(dreamMansionRooms));
    const target = Object.keys(hallways)[0]
    if (hallways[target].flavorText) {
        hallways[target].flavorText += " You are dreaming...the mist is so peaceful. Like you're floating."
    } else {
        hallways[target].flavorText = " You are dreaming...the mist is so peaceful. Like you're floating."
    }
    renderID(target);
}
