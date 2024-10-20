// Game stages represented as objects
const story = {
    start: {
        text: "You stand at the entrance of a dark forest. Do you take the left or right path?",
        choices: [
            { text: "Take the left path", consequence: "river" },
            { text: "Take the right path", consequence: "cave" }
        ],
        image: "images/start.jpg"
    },
    river: {
        text: "You arrive at a river. Do you swim across or wait for a bridge?",
        choices: [
            { text: "Swim across", consequence: "drown" },
            { text: "Wait for a bridge", consequence: "treasure" }
        ],
        image: "images/river.jpg"
    },
    cave: {
        text: "You enter a dark cave. Do you explore deeper or return to the forest?",
        choices: [
            { text: "Explore deeper", consequence: "bear" },
            { text: "Return to the forest", consequence: "safeExit" }
        ],
        image: "images/cave.jpg"
    },
    drown: {
        text: "You tried to swim, but the current was too strong. Game over.",
        choices: [],
        image: "images/drown.jpg"
    },
    treasure: {
        text: "You waited patiently and found a treasure chest on the bridge. You win!",
        choices: [],
        image: "images/treasure.jpg"
    },
    bear: {
        text: "A bear captures you! Game over.",
        choices: [],
        image: "images/bear.jpg"
    },
    safeExit: {
        text: "You safely return to the forest entrance. Well done!",
        choices: [],
        image: "images/safeExit.jpg"
    }
};

// Track the current stage
let currentStage = "start";

// Start or restart the game
function startGame() {
    currentStage = "start";
    updatePage();
}

// Update the page based on the current stage
function updatePage() {
    const stage = story[currentStage];
    const storyText = document.getElementById("story-text");
    const choicesDiv = document.getElementById("choices");
    const storyImage = document.getElementById("story-image");

    // Update the story text and image
    storyText.textContent = stage.text;
    storyImage.src = stage.image;

    // Clear previous choices
    choicesDiv.innerHTML = "";

    // Create buttons for each choice
    stage.choices.forEach(choice => {
        const button = document.createElement("button");
        button.textContent = choice.text;
        button.onclick = () => {
            currentStage = choice.consequence;
            updatePage();
        };
        choicesDiv.appendChild(button);
    });

    // If there are no choices, the game ends and a restart button appears
    if (stage.choices.length === 0) {
        const restartButton = document.createElement("button");
        restartButton.textContent = "Restart";
        restartButton.onclick = startGame;
        choicesDiv.appendChild(restartButton);
    }
}

// Start the game when the page loads
startGame();
