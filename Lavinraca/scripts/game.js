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
let lastfiretime = performance.now();

//if a function has event handling or timers or whatever they need to know when its time to cleanup
let cleanupFunctions = [];

const beginGameplayLoop = () => {
    video.loop = true;
    if (!globalDataObject.current_room_id || globalDataObject.current_room_id == "OUTSIDE") {
        globalDataObject.current_room_id = "1"
    }
    spookyLoop.play();
    bgMusic.src = weird;
    bgMusic.play();
    popup.style.display = "block"
    if (probablyMobile()) {
        globalDataObject.button_controls = true;
    }

    popupContents.innerHTML = "Inside these Hallowed Halls, Movement becomes more natural. Your first task? See if you can get the lights on before the sun finishes setting."

    window.addEventListener('keydown', handleMovement);



    const close = createElementWithClassAndParent("button", popupContents);
    close.innerText = "Gotcha";
    close.onclick = () => {
        closeThePopup();
    }
    close.style.display = "block"
    close.style.marginTop = "13px"
    close.style.marginBottom = "13px"

    const contents = createElementWithClassAndParent("div", popupContents);
    contents.innerHTML = `
    <u>Keyboard controls are recommended:</u><br>
    W/UP Arrow = Move Forwards
    <br>S/DOWN Arrow = Move Backwards
    <Br>A/Left Arrow = Turn Left
    <br>D/Right Arrow = Turn Right
    <br><Br>
    ${globalDataObject.button_controls ? "Buttons will also display on the bottom. (this will happen by default on mobile but you can turn it off if I guessed wrong)" : "Or you can click below to toggle on mouse/touch controls, which will render buttons to move (and cover up more of the video)"}
    `



    const check = createCheckboxInputWithLabel(contents, "check", "Toggle Button Controls", globalDataObject.button_controls)
    check.container.onclick = () => {
        globalDataObject.button_controls = !globalDataObject.button_controls;
        save();
        renderRoom(hallways[globalDataObject.current_room_id]);

    }
    renderRoom(hallways[globalDataObject.current_room_id])


    const jrnote = createElementWithClassAndParent("div", popupContents);
    jrnote.innerHTML = `<Br><Br><i>JR NOTE: It would have been way too annoying to film all scenes with you facing backwards too so...if you wanna backtrack, enjoy literally walking backwards, I guess??? Everyone knows its perfectly safe to back into a room in a spooky house, lol.</i>`;


}


const renderRoom = (json, replacedAlready) => {
    const me = globalDataObject.current_room_id;
    globalDataObject.hallways_entered++;
    save();
    cleanupAllFunctions();
    const replacement_id = globalDataObject.state_changes[me];

    //only replace once, no infinite chains on accident
    if (replacement_id && !replacedAlready) {
        globalDataObject.current_room_id = replacement_id
        renderRoom(hallways[replacement_id], true)
        return;
    }

    fuckWithAudioVolume();

    console.log("JR NOTE: renderRoom", json)
    if (!json) {//id of -1 will get you there, need ways to leave
        globalDataObject.current_room_id = "OUTSIDE"
        outsideTheHouse();
        return;
    }
    video.src = "images/Diorama/Inside/Hallways/" + json.src + ".mp4";
    handleMovement(json);
    //if any function needs to alter room-text target here
    story.innerHTML = `<div id='room-text'>${json.flavorText}</div>`;
    video.play();
    if (globalDataObject.button_controls) {
        handleHallwayObviousExits()
    }

    if (json.functions) {
        for (let f of json.functions) {
            //call via window["functionName"](arguments);
            if (window[f]) {
                cleanupFunctions.push(window[f]());
            } else {
                console.error("JR NOTE: function is missing, did you do that on purpose???", f)
            }
        }
    }


}


const moveForwards = () => {
    const json = hallways[globalDataObject.current_room_id];

    if (json && json.forwards) {
        console.log("JR NOTE: forwards")
        globalDataObject.current_room_id = json.forwards;
        renderRoom(hallways[json.forwards])
    }
}
const moveBackwards = () => {
    const json = hallways[globalDataObject.current_room_id];

    if (json && json.backwards) {
        console.log("JR NOTE: backwards")
        globalDataObject.current_room_id = json.backwards;

        renderRoom(hallways[json.backwards])
    }
}

const moveLeft = () => {
    const json = hallways[globalDataObject.current_room_id];

    if (json && json.left) {
        console.log("JR NOTE: left")
        globalDataObject.current_room_id = json.left;

        renderRoom(hallways[json.left])
    }
}

const moveRight = () => {
    const json = hallways[globalDataObject.current_room_id];

    if (json && json.right) {
        console.log("JR NOTE: right")
        globalDataObject.current_room_id = json.right;

        renderRoom(hallways[json.right])
    }
}


const cleanupAllFunctions = () => {
    for (let f of cleanupFunctions) {
        if (f) {
            f();
        }
    }
    cleanupFunctions = [];
}

const fuckWithAudioVolume = () => {
    if (spookyLoop.duration) {//don't just alwyas play
        spookyLoop.currentTime = Math.random() * spookyLoop.duration;
    }
    const vol = Math.random();
    spookyLoop.volume = vol < 0.5 ? vol : 0// don't want to overuse creaks
}

const handleHallwayObviousExits = () => {
    const obviousExits = [];
    obviousExits.push({ text: "Forwards", function: moveForwards })
    obviousExits.push({ text: "Backwards", function: moveBackwards })
    obviousExits.push({ text: "Look Left", function: moveLeft })
    obviousExits.push({ text: "Look Right", function: moveRight })
    attachObviousExits(obviousExits, false)
}


//originally i took in json and had the rooms wire this up but it was lagging the page
//need to do it once and just handle current room stuff
const handleMovement = (event) => {
    if (event.repeat) {
        return;
    }
    //googled what the key codes are for arrows and stuff
    //its weird
    //normally i'll link to stack overflow articles if i use it
    //to help future me
    //or wastes
    //now its just
    //google didn't even show me stack overflow and i want to make a game in just a week so dug no deeper
    //the future is changing under my feet
    //the codes mine tho


    const keyActions = {
        w: moveForwards,
        a: moveLeft,
        s: moveBackwards,
        d: moveRight,
        W: moveForwards,
        A: moveLeft,
        S: moveBackwards,
        D: moveRight,
        ArrowUp: moveForwards,
        ArrowLeft: moveLeft,
        ArrowDown: moveBackwards,
        ArrowRight: moveRight
    };

    const action = keyActions[event.key];

    if (action) {
        //dont let it go too fast, and certaintly not constantly if you don't let up on the key
        //event.preventDefault();
        lastfiretime = performance.now();
        action();

    }
}





