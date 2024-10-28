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

function showReaction(type, clickedBox) {
    clickedBox.classList.add(type);

    if (type != "success") {
        setTimeout(function () {
            clickedBox.classList.remove(type);
        }, 800)
    }
}

const box = document.createElement("div"); // Crée div
box.classList.add("box"); // Y rajoute la classe box 

const board = document.querySelector("#board"); // Select board dans le DOM

let nb = 1;

for (let i = 1; i <= 10; i++) {
    let newbox = box.cloneNode();
    newbox.innerText = i;
    board.appendChild(newbox);

    newbox.addEventListener("click", function () {
        if (i == nb) {
            newbox.classList.add("box-clicked");
            if (nb == board.children.length) {
                board.querySelectorAll(".box").forEach(function (box) {
                    showReaction("success", box);
                });
            }
            nb++;
        } else if (i > nb) {
            showReaction("error", newbox);
            nb = 1;
            board.querySelectorAll(".box-clicked").forEach(function (validBox) {
                validBox.classList.remove("box-clicked");
            });
        } else {
            showReaction("notice", newbox);
        }
    });
}

shuffleChildren(board); // mélange les enfants de board, soit les div.box