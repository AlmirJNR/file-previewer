import {TREE_ITEM_KEY} from "./constants.js";

/** @param fileName {string} */
function buildPdfContainer(fileName) {
    const div = document.createElement('div');
    div.classList.add('pdf-container');
    div.appendChild(document.createTextNode(fileName))
    return div;
}

/** @param filePath {string} */
function buildPdf(filePath) {
    const embed = document.createElement('embed');
    embed.src = filePath;
    embed.classList.add('pdf');
    return embed;
}

/** @type {{pasta: string, pdfs: string[]}} */
const value = JSON.parse(localStorage.getItem(TREE_ITEM_KEY));
for (const pdf of value.pdfs) {
    const pdfContainer = buildPdfContainer(pdf);
    const embedPdf = buildPdf(`${value.pasta}/${pdf}`);
    pdfContainer.appendChild(embedPdf);
    document.body.appendChild(pdfContainer);
}
