function shuffleChildren(parent) { // 
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

// pb de base (timer)
let pb = "00:30";
// liste des pb
let pbList = [];

// function qui effectue un compte à rebours de 30s à 00s
function timer() { // https://stackoverflow.com/a/31559606
    let sec = 30;
    // begin countdown
    let timer = setInterval(function () {
        // remplace le texte dans le p timerDisplay
        document.getElementById('timerDisplay').innerHTML = '00:' + sec;
        sec--;
        // si toutes les box ont étées cliquées dans le bon ordre
        if (nb == board.children.length + 1) {
            pb = '00:' + sec;
            console.log(pb);
            // stop countdown
            clearInterval(timer);
            // rajoute le pb à la pbList
            pbList.push(pb);
            console.log(pbList);
        } else if (sec < 0) {
            // stop countdown
            clearInterval(timer);
        }
        // intervalle de 1000ms
    }, 1000);
}

// const du bouton de retry
const retryBtn = document.getElementById("retryBtn");

let nbBoxes = prompt("Please enter the number of boxes.");

const box = document.createElement("div"); // Crée div
box.classList.add("box"); // Y rajoute la classe box 

// le parent des .box
const board = document.querySelector("#board"); // Select board dans le DOM

let nb = 1;

for (let i = 1; i <= nbBoxes; i++) {
    // clone box pour changer son contenu de manière dynamique
    let newbox = box.cloneNode();
    newbox.innerText = i;
    board.appendChild(newbox);

    // quand newbox est cliqué ...
    newbox.addEventListener("click", function () {
        if (i == nb) {
            newbox.classList.add("box-clicked");
            if (nb == board.children.length) {
                board.querySelectorAll(".box").forEach(function (box) {
                    showReaction("success", box);
                });
            }
            // shuffleChildren(board);
            nb++;
        }
        else if (i > nb) { // error
            showReaction("error", newbox);
            nb = 1;
            board.querySelectorAll(".box-clicked").forEach(function (validBox) {
                validBox.classList.remove("box-clicked");
            });
            shuffleChildren(board);
        }
        else {
            showReaction("notice", newbox);
        }
    });
};

retryBtn.addEventListener("click", () => {
    board.querySelectorAll(".box-clicked").forEach(function (validBox) {
        validBox.classList.remove("box-clicked");
        validBox.classList.remove("success");
    });

    nb = 1;

    timer();

    shuffleChildren(board);
});

shuffleChildren(board); // mélange les enfants de board, soit les div.box