function shuffleChildren(parent) {
    let children = parent.children;

    let i = board.children.length, k, temp;

    while (--i > 0) { // while (i - 1) > 0
        k = Math.floor(Math.random() * (i + 1)); // k stocke un nombre aléatoire basé sur i
        temp = board.children[k]; // temp pointe temporairement l'élément à la position k dans board
        board.children[k] = board.children[i]; // remplace lélément à la position k par l'élément à la position i
        board.appendChild(temp); // place l'élément k pointé temporairement à la fin du contenu de board
    }
}

const box = document.createElement("div"); // Crée div
box.classList.add("box"); // Y rajoute la classe box 

const board = document.querySelector("#board"); // Select board dans le DOM

for (let i = 1; i <= 10; i++) {
    let newbox = box.cloneNode();
    newbox.innerText = i;
    board.appendChild(newbox);
}

shuffleChildren(board); // mélange les enfants de board, soit les div.box