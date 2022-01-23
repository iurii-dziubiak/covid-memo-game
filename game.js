const section = document.querySelector(".game-board");
const playerLivesCounter = document.querySelector(".player-lives");
const resetBtn = document.getElementById("reset-btn");
const timerValue = document.getElementById("timer");
const modalMsg = document.getElementById("modal-msg");
const closeModalControls = document.querySelectorAll("[data-close-button]");
const overlay = document.getElementById("overlay");
const modal = document.getElementById("modal");
const MODAL_MSG_WON = "CONGRATULATIONS! YOU DID IT! YOUR TIME WAS";
const MODAL_MSG_LOSE = "SORRY, TRY AGAIN!";
const TIMER_START_LABEL = "00:00";
let playerLives = 7;
let time = null;
let minutes = 0;
let seconds = 0;
let displayMin = 0;
let displaySec = 0;


//Generate the board
const getData = () => [
    {imgSrc: "images/ambulance.png", name: "ambulance"},
    {imgSrc: "images/bed.png", name: "bed"},
    {imgSrc: "images/gloves.png", name: "gloves"},
    {imgSrc: "images/hospital.png", name: "hospital"},
    {imgSrc: "images/liquid.png", name: "liquid"},
    {imgSrc: "images/mask.png", name: "mask"},
    {imgSrc: "images/microscope.png", name: "microscope"},
    {imgSrc: "images/virus.png", name: "virus"},
    {imgSrc: "images/ambulance.png", name: "ambulance"},
    {imgSrc: "images/bed.png", name: "bed"},
    {imgSrc: "images/gloves.png", name: "gloves"},
    {imgSrc: "images/hospital.png", name: "hospital"},
    {imgSrc: "images/liquid.png", name: "liquid"},
    {imgSrc: "images/mask.png", name: "mask"},
    {imgSrc: "images/microscope.png", name: "microscope"},
    {imgSrc: "images/virus.png", name: "virus"}
];

//Randomize image cards
const randomize = () => {
    const cardData = getData();
    cardData.sort( () => Math.random() - 0.5);
    return cardData;
}

//Card generator
const cardGenerator = () => {
    const cards = randomize();
    cards.forEach((item) => {
        const card = document.createElement("div");
        const face = document.createElement("img");
        const back = document.createElement("img");
        card.classList.add("card");
        face.classList.add("face");
        back.classList.add("back");
        //Attach info to the cards
        face.src = item.imgSrc;
        card.setAttribute("name", item.name);
        back.src = "images/reverse_logo.png"
        //Attach cards to the section
        section.appendChild(card);
        card.appendChild(face);
        card.appendChild(back);
        //EventListener for click
        card.addEventListener("click", (evn) => {
            card.classList.toggle("toggledCard");
            checkCards(evn);
            if (time === null) {
                startTimer();
            }
        })
    });
};

//Check Cards
const checkCards = (evn) => {
    const clickedCard = evn.target;
    clickedCard.classList.add("flipped");
    //Make toggled card not clickable until checking
    clickedCard.style.pointerEvents = "none";
    const flippedCards = document.querySelectorAll(".flipped");
    const toggledCards = document.querySelectorAll(".toggledCard");

    if(flippedCards.length === 2) {
        //IF RIGHT
        if(flippedCards[0].getAttribute("name") === flippedCards[1].getAttribute("name")) {
            flippedCards.forEach(card => {
                card.classList.remove("flipped");
                card.style.pointerEvents = "none";
            });
        } else {
        //IF WRONG
            flippedCards.forEach(card => {
                card.classList.remove("flipped");
                setTimeout(() => card.classList.remove("toggledCard"), 800);
                card.style.pointerEvents = "all";
            });
            playerLives--;
            playerLivesCounter.textContent = playerLives.toString();
            //Check if user lose the game
            if (playerLives === 0) {
                openModal(modal, false);
                setTimeout(() => reset(), 800);
            }
        }
    }
    //Check if user won the game
    if (toggledCards.length === 16) {
        openModal(modal, true);
        setTimeout(() => reset(), 800);
    }
}

//Reset
const reset = () => {
    let cardData = randomize();
    const faces = document.querySelectorAll(".face")
    const cards = document.querySelectorAll(".card")
    //Make cards not clickable before reset finished
    section.style.pointerEvents = "none";
    cardData.forEach((item,index) => {
        cards[index].classList.remove("toggledCard");
        cards[index].classList.remove("flipped");
        setTimeout(() => {
            //Enabling clicking again
            cards[index].style.pointerEvents = "all";
            //Randomize cards
            faces[index].src = item.imgSrc;
            cards[index].setAttribute("name", item.name);
            section.style.pointerEvents = "all";
        }, 1000);
    });
    stopTimer();
    minutes = 0;
    seconds = 0;
    timerValue.innerText = TIMER_START_LABEL;
    playerLives = 7;
    playerLivesCounter.innerText = playerLives.toString();
}

//Start Timer
const startTimer = () => {
    time = setInterval( () => {
        seconds++;
        if (seconds === 60) {
            minutes++;
            seconds = 0;
        }
        if (seconds < 10) {
            displaySec = "0" + seconds.toString();
        } else {
            displaySec = seconds;
        }
        if (minutes < 10) {
            displayMin = "0" + minutes.toString();
        } else {
            displayMin = minutes;
        }
        timerValue.innerText = displayMin + ":" + displaySec;
    }, 1000);
}

//Stop Timer
const stopTimer = () => {
    clearInterval(time);
    time = null;
}

//Open Modal
const openModal = (modal, isWon) => {
    if (modal === null) return;
    modal.classList.add("active");
    if (isWon) {
        overlay.classList.add("blue");
        modalMsg.innerText = MODAL_MSG_WON + " " + displayMin + ":" + displaySec;
    } else {
        modal.classList.add("lose");
        overlay.classList.add("red");
        modalMsg.innerText = MODAL_MSG_LOSE;
    }
}

//Close Modal
const closeModal = (modal) => {
    if (modal === null) return;
    modal.classList.remove("active");
    modal.classList.remove("lose");
    overlay.classList.remove("blue");
    overlay.classList.remove("red");
}

//Set Listeners for page controls
const setControlListeners = () => {
    resetBtn.addEventListener("click", reset);
    closeModalControls.forEach(button => {
        button.addEventListener("click", () => {
            const modal = button.closest(".modal");
            closeModal(modal);
        });
    })
}

//UI set player lives
const setUIscorePanel = () => {
    playerLivesCounter.innerText = playerLives.toString();
    timerValue.innerText = TIMER_START_LABEL;
}

const initGame = () => {
    setControlListeners();
    setUIscorePanel();
    cardGenerator();
}

initGame();
