/*
look in data for json that represents rooms in this game
make it kinda like the corn maze, very data heavy
*/

/*
example: 
backwards: -1
flavorText: "TODO: write flavortext Entrance1"
forwards: 4
functions: ['hallwayOneSunbeam']
humanLabel: "Entrance 1"
id: 1
left: 2
right: 3
src: "1/Sunset/deep_panel1"
*/
renderRoom = (json, target) => {
    video.src = "images/Diorama/Inside/Hallways/" + json.src + ".mp4";
    storyContainer.innerHTML = json.flavorText + "<br>TODO: wire up controls and objects of interest";
    video.play();
}

beginGameplayLoop = () => {
    if (!globalDataObject.current_room_id || globalDataObject.current_room_id < 1) {
        globalDataObject.current_room_id = 1
    }
    renderRoom(hallways[globalDataObject.current_room_id])
}