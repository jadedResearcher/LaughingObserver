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

const beginGameplayLoop = () => {
    bgMusic.pause();
    if (!globalDataObject.current_room_id || globalDataObject.current_room_id < 1) {
        globalDataObject.current_room_id = 1
    }

    renderRoom(hallways[globalDataObject.current_room_id]);
    popup.style.display = "block"

    popupContents.innerHTML = "Inside these Hallowed Halls, Movement becomes more natural. Your first task? See if you can get the lights on before the sun finishes setting."

    window.addEventListener('keydown', handleMovement);



    const close = createElementWithClassAndParent("button", popupContents);
    close.innerText = "Gotcha";
    close.onclick = () => {
        closeThePopup();
        bgMusic.pause()
    }
    close.style.display = "block"
    close.style.marginTop = "13px"
    close.style.marginBottom = "13px"

    const contents = createElementWithClassAndParent("div", popupContents);
    contents.innerHTML = `W/UP Arrow = Move Forwards<br>S/DOWN Arrow = Move Backwards<Br>A/Left Arrow = Turn Left<br>D/Right Arrow = Turn Right<br><Br>JR NOTE: It would be WAY Too hard to actually shoot looking down the halls backwards, so, I'm sure it won't be TOO Scary to just...back up. The whole way out. Lol.`;
}

const renderRoom = (json) => {
    console.log("JR NOTE: renderRoom", json)
    if (!json) {//id of -1 will get you there, need ways to leave
        outsideTheHouse();
        return;
    }
    video.src = "images/Diorama/Inside/Hallways/" + json.src + ".mp4";
    handleMovement(json);
    story.innerHTML = `${json.flavorText}<br><br><Br>TODO: wire up touch controls and interaction functions`;
    video.play();
}


//originally i took in json and had the rooms wire this up but it was lagging the page
//need to do it once and just handle current room stuff
const handleMovement = (event) => {
    //googled what the key codes are for arrows and stuff
    //its weird
    //normally i'll link to stack overflow articles if i use it
    //to help future me
    //or wastes
    //now its just
    //google didn't even show me stack overflow and i want to make a game in just a week so dug no deeper
    //the future is changing under my feet
    //the codes mine tho

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
        const time = performance.now() - lastfiretime
        //dont let it go too fast, and certaintly not constantly if you don't let up on the key
        if (time > 300) {
            event.preventDefault();
            lastfiretime = performance.now();
            action();
        } else {
            //time is real in lavinraca rip
            console.log("JR NOTE: time is not enough", time)
        }
    }
}





