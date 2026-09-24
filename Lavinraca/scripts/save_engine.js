
const SAVE_KEY = 'LAVINRACA_2026_SHESMIDDLEAGEDNOW'

//up to what uses this to define this
//https://catalystsbathroomlibrary.neocities.org/

let clownsona;

let initialDataObject = {
    hallways_entered: 0,
    prayers_sent: [],
    inventory: [],
    books: 0,
    keys: 0,
    masks: 0,
    meat: 0,
    stranger: false, //there are ways you can become a stranger to everyone around you, what even is identity
    candy: 0,
    powerWorking: false,
    opened_the_door: false,
    current_room_id: "OUTSIDE",
    button_controls: !probablyMobile(), //keyboard is easier, make it default unless probably mobile
    state_changes: {},//if you pick up the key, permamently replace 5 with 1005 or whatever, which is the video with no key
    spooky_seen: []
}

globalDataObject = initialDataObject;

const saveClownsona = () => {
    if (clownsona) {
        globalDataObject.clownsona = clownsona.toJSON();
        save();
    }
}

//showing number of keys you have etc
const saveSideEffects = () => {
    if (globalDataObject.keys > 0) {
        keyText.innerText = `x${globalDataObject.keys}`;
        keyContainer.style.display = "flex";

    } else {
        keyContainer.style.display = "none";
    }

    if (globalDataObject.masks > 0) {
        maskText.innerText = `x${globalDataObject.masks}`;
        maskContainer.style.display = "flex";

    } else {
        maskContainer.style.display = "none";

    }

    if (globalDataObject.books > 0) {
        bookText.innerText = `x${globalDataObject.books}`;
        bookContainer.style.display = "flex";

    } else {
        bookContainer.style.display = "none";
    }
}

//JR NOTE: add the things you're worried about desyncing here
const protectFromDesyncIssues = () => {
    //if you have nothing you're worried about just return here, it'll be faster
    return

    console.log("JR NOTE: LAVINRACA 2026 protectFromDesyncIssues")


    //in mallsim, achievementsUnlocked and passwordsDugInto are most at risk of desyncing.
    //you don't want to add a dozen strings to an array, then have another tab save and blow them away
    //YES looping cultists matter too but i think its funny that some might get lost in the void (instead of gunking up your cpu and crashing your browser)
    //probably better to get voided out than eaten by peewee you know?

    let fileData = localStorage.getItem(SAVE_KEY);
    if (fileData) {
        let fileJSON = JSON.parse(fileData);
    }

}


//if you, say, have multiple mallsim tabs open, this handles syncing them.
window.onstorage = () => {
    // When local storage changes, dump the list to
    // the console.
    console.log(JSON.parse(window.localStorage.getItem(SAVE_KEY)));
};


const deleteSave = () => {
    localStorage.removeItem(SAVE_KEY);
    globalDataObject = initialDataObject;
    save();
}

//http://www.purplefrog.com/~thoth/ruby/nobody-knows-shoes.pdf


//up to what uses this to decide how often to save
const save = (reason) => {
    //console.log("JR NOTE: Saving game because: ", reason)
    protectFromDesyncIssues();//will handle anything that needs to be combined with what's currently in local storage (if another tab saved before us)
    globalDataObject.lastSaveTimeCode = Date.now();
    if (clownsona) {
        globalDataObject.clownsona = clownsona.toJSON();
    }
    localStorage.setItem(SAVE_KEY, JSON.stringify(globalDataObject));
    const saveNoise = new Audio("SoundEffects/single_heart.mp3");
    saveNoise.play();
    saveSideEffects();

}


//if theres any fancy stuff you need to do to save
//like turn hash maps into objects
//you gotta add code here
const load = () => {
    let data = localStorage.getItem(SAVE_KEY);
    if (data) {
        globalDataObject = JSON.parse(data);
        globalDataObject.lastLoadTimeCode = Date.now();
        if (!globalDataObject.current_room_id) {
            globalDataObject.current_room_id = "OUTSIDE";
        }
        if (!globalDataObject.state_changes) {
            globalDataObject.state_changes = {}
        }
        if (!globalDataObject.spooky_seen) {
            globalDataObject.spooky_seen = [];
        }

        if (!globalDataObject.masks) {
            globalDataObject.masks = 0;
        }

        if (!globalDataObject.books) {
            globalDataObject.books = 0;
        }

        if (globalDataObject.clownsona) {
            clownsona.fromJSON(globalDataObject.clownsona);
            clownsona.rerenderBuffer();

        }

        /*
          only objects that need to respond to functions have to be separately parsed as json
          if they just store data (like facts) its fine to leave them as parsed json
        */
    }
    saveSideEffects();

}


