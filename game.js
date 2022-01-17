const section = document.querySelector(".game-board");
const playerLivesCounter = document.querySelector(".player-lives");
const resetBtn = document.getElementById("reset-btn");
let playerLives = 6;

//UI set player lives
playerLivesCounter.textContent = playerLives.toString();

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
const initGame = () => {
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
        })
    });
    resetBtn.addEventListener("click", reset);
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
            if (playerLives === 0) {
                setTimeout(() => reset(), 800);
            }
        }
    }
    //Check if we won the game
    if (toggledCards.length === 16) {
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
        setTimeout(() => {
            //Enabling clicking again
            cards[index].style.pointerEvents = "all";
            //Randomize cards
            faces[index].src = item.imgSrc;
            cards[index].setAttribute("name", item.name);
            section.style.pointerEvents = "all";
        }, 1000);
    });
    playerLives = 6;
    playerLivesCounter.textContent = playerLives.toString();
}

initGame();
