// Game data: stages of the story
const story = {
    start: {
        text: "You find yourself at a crossroads in a forest. Will you go left or right?",
        choices: [
            { text: "Go left", next: "leftPath" },
            { text: "Go right", next: "rightPath" }
        ],
        image: "images/crossroad.jpg"
    },
    leftPath: {
        text: "You encounter a friendly deer. Do you follow it or continue on your way?",
        choices: [
            { text: "Follow the deer", next: "followDeer" },
            { text: "Continue on your way", next: "continueAlone" }
        ],
        image: "images/deer.jpg"
    },
    rightPath: {
        text: "You stumble upon a strange glowing stone. Do you touch it or leave it?",
        choices: [
            { text: "Touch the stone", next: "touchStone" },
            { text: "Leave it", next: "leaveStone" }
        ],
        image: "images/stone.jpg"
    },
    followDeer: {
        text: "The deer leads you to a hidden waterfall. You've reached a peaceful ending!",
        choices: [],
        image: "images/waterfall.jpg"
    },
    continueAlone: {
        text: "You continue wandering and find yourself lost. This is a sad ending.",
        choices: [],
        image: "images/lost.jpg"
    },
    touchStone: {
        text: "The stone grants you magical powers. You've achieved a magical ending!",
        choices: [],
        image: "images/magic.jpg"
    },
    leaveStone: {
        text: "You walk away from the stone and find your way back home. It's a safe ending.",
        choices: [],
        image: "images/home.jpg"
    }
};

// Initialize the game state
let currentStage = "start";

// Start or restart the game
function startGame() {
    currentStage = "start";
    updatePage();
}

// Update the page based on the current stage
function updatePage() {
    const stage = story[currentStage];
    document.getElementById("story-text").textContent = stage.text;

    const image = document.getElementById("story-image");
    image.src = stage.image;
    image.alt = stage.text;

    const choicesDiv = document.getElementById("choices");
    choicesDiv.innerHTML = ""; // Clear previous choices

    stage.choices.forEach(choice => {
        const button = document.createElement("button");
        button.textContent = choice.text;
        button.addEventListener("click", () => {
            currentStage = choice.next;
            updatePage();
        });
        choicesDiv.appendChild(button);
    });

    // If no more choices, end the game
    if (stage.choices.length === 0) {
        const restartButton = document.createElement("button");
        restartButton.textContent = "Restart";
        restartButton.addEventListener("click", startGame);
        choicesDiv.appendChild(restartButton);
    }
}

// Start the game when the page loads
startGame();
