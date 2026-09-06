const debugHallways = () => {
    const body = document.body;
    body.innerHTML = "";
    const table = createElementWithClassAndParent("table", body);
    table.style.background = "white"
    const header_row = createElementWithClassAndParent("tr", table);

    for (let [key, value] of Object.entries(hallways)) {
        console.log("JR NOTE: debug", key, value)
        const row = createElementWithClassAndParent("tr", table);
        const cell = createElementWithClassAndParent("td", row);
        cell.innerHTML = "<b>ID: </b> " + key;
        for (let [k, v] of Object.entries(value)) {
            const c = createElementWithClassAndParent("td", row);
            c.innerHTML = `<b>${k}</b>:${v}`;
            c.style.border = "1px solid black";

        }

    }
}
const hallways = {
    1: {
        "humanLabel": "Entrance 1",
        "src": "1/Sunset/deep_panel1",
        "flavorText": "TODO: write flavortext Entrance1",
        "forwards": 4,
        "left": 2,
        "right": 3,
        "backwards": -1,
        "functions": [
            "hallwayOneSunbeam"
        ]
    },
    2: {
        "humanLabel": "Entrance 1: Lamp and Paintings",
        "src": "1/Sunset/flat_section2",
        "flavorText": "TODO: write flavortext Entrance1 meat and painting",
        "forwards": null,
        "left": null,
        "right": 1,
        "backwards": 1,
        "functions": [
            "test2"
        ]
    },
    3: {
        "humanLabel": "Entrance 1: MEat and Paintings",
        "src": "1/Sunset/flat_section1",
        "flavorText": "TODO: write flavortext Entrance1",
        "forwards": null,
        "left": 1,
        "right": null,
        "backwards": 1,
        "functions": []
    },
    4: {
        "humanLabel": "Entrance 2:",
        "src": "1/Sunset/deep_panel2",
        "flavorText": "TODO: write flavortext Entrance2",
        "forwards": null,
        "left": 5,
        "right": 6,
        "backwards": 1,
        "functions": [
            "wrongOnPurposeForDebugging"
        ]
    },
    5: {
        "humanLabel": "Entrance 2: Dark Window",
        "src": "1/Sunset/flat_section4",
        "flavorText": "TODO: write flavortext Entrance2",
        "forwards": null,
        "left": null,
        "right": 4,
        "backwards": 4,
        "functions": []
    },
    6: {
        "humanLabel": "Entrance 2: Bright Window",
        "src": "1/Sunset/flat_section3",
        "flavorText": "TODO: write flavortext Entrance2",
        "forwards": null,
        "left": 4,
        "right": null,
        "backwards": 4,
        "functions": []
    }
}