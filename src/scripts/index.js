import {TREE_KEY, TREE_ITEM_KEY, REUNION_KEY} from "./constants.js";

/** @param event {Event} */
function listenReunionInput(event) {
    localStorage.setItem(REUNION_KEY, event.target.value);
}

/** @param dir {{pasta: string, pdfs: string[]}} */
function buildDirectory(dir) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    const text = document.createTextNode(dir.pasta.replace("content/", ""));

    a.addEventListener('click', () => {
        localStorage.setItem(TREE_ITEM_KEY, JSON.stringify(dir));
    });

    a.href = './pdf-list.html';
    a.appendChild(text);
    li.appendChild(a);

    return li;
}

/** @type HTMLInputElement */
const reunionInput = document.getElementById('reunion');
reunionInput.value = localStorage.getItem(REUNION_KEY);
reunionInput.addEventListener('change', listenReunionInput);

const response = await fetch("http://localhost:4200/api/tree");

/** @type {{pasta: string, pdfs: string[]}[]} */
const tree = await response.json();
localStorage.setItem(TREE_KEY, JSON.stringify(tree));

/** @type {{pasta: string, pdfs: string[]}[]} */
const values = JSON.parse(localStorage.getItem(TREE_KEY));

for (const value of values) {
    const directoryListItem = buildDirectory(value);
    document.getElementById('dir-list').appendChild(directoryListItem);
}
