
const SAVE_KEY = 'LAVINRACA_2026_SHESMIDDLEAGEDNOW'

//up to what uses this to define this
//https://catalystsbathroomlibrary.neocities.org/
let globalDataObject = {
    hallways_entered: 0,
    prayers_sent: [],
    inventory: [],
    keys: 0,
    meat: 0,
    candy: 0,
    opened_the_door: false
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
}

//http://www.purplefrog.com/~thoth/ruby/nobody-knows-shoes.pdf



//up to what uses this to decide how often to save
const save = (reason) => {
    console.log("JR NOTE: Saving game because: ", reason)
    protectFromDesyncIssues();//will handle anything that needs to be combined with what's currently in local storage (if another tab saved before us)
    globalDataObject.lastSaveTimeCode = Date.now();
    localStorage.setItem(SAVE_KEY, JSON.stringify(globalDataObject));
    const saveNoise = new Audio("SoundEffects/single_heart.mp3");
    saveNoise.play();
}


//if theres any fancy stuff you need to do to save
//like turn hash maps into objects
//you gotta add code here
const load = () => {
    let data = localStorage.getItem(SAVE_KEY);
    if (data) {
        globalDataObject = JSON.parse(data);
        globalDataObject.lastLoadTimeCode = Date.now();

        /*
          only objects that need to respond to functions have to be separately parsed as json
          if they just store data (like facts) its fine to leave them as parsed json
        */
    }

}


