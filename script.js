// ==========================================
// JUNIOR ASTRONAUT MISSION TRAINER
// ==========================================

// GAME VARIABLES

let score = 0;
let currentQuestion = 0;
let missionStage = 0;

let missionTime = 60;
let timerInterval = null;

let selectedDifficulty = "medium";
let selectedMissionDuration = 60;
let startingResourceLevel = 75;


// ==========================================
// RESOURCES
// ==========================================

let resources = {
    oxygen: 100,
    water: 100,
    food: 100,
    power: 100
};


// ==========================================
// SCIENCE QUIZ QUESTIONS
// ==========================================

const questions = [
    {
        question: "🌍 Which planet do we live on?",
        options: ["Earth", "Mars", "Jupiter"],
        answer: "Earth",
        explanation: "Earth is our home planet. It has liquid water and supports life."
    },
    {
        question: "🌙 What is Earth's natural satellite?",
        options: ["The Sun", "The Moon", "Mars"],
        answer: "The Moon",
        explanation: "The Moon is Earth's natural satellite. It travels around Earth."
    },
    {
        question: "🚀 What do astronauts wear in space?",
        options: ["Space suit", "Raincoat", "School uniform"],
        answer: "Space suit",
        explanation: "A spacesuit helps protect astronauts and provides oxygen in space."
    },
    {
        question: "☀️ What is the main source of light for Earth?",
        options: ["The Moon", "The Sun", "Mars"],
        answer: "The Sun",
        explanation: "The Sun is a star that provides Earth with light and heat."
    },
    {
        question: "🛰️ What do we use to explore space?",
        options: ["Spacecraft", "Bicycle", "Boat"],
        answer: "Spacecraft",
        explanation: "Spacecraft carry instruments and sometimes astronauts to explore space."
    }
];

// ==========================================
// HOME / DIFFICULTY SELECTION
// ==========================================

function startMission() {

    clearInterval(timerInterval);
    timerInterval = null;

    document.body.innerHTML = `
        <div class="container">

            <h1>🚀 Choose Your Mission Difficulty</h1>

            <p class="subtitle">
                Junior Astronaut, choose your challenge!
            </p>

            <div class="mission-card">

                <button onclick="selectDifficulty('easy')">
                    🟢 EASY - Beginner Astronaut
                    <br>90 Seconds
                </button>

                <button onclick="selectDifficulty('medium')">
                    🟡 MEDIUM - Space Explorer
                    <br>60 Seconds
                </button>

                <button onclick="selectDifficulty('hard')">
                    🔴 HARD - Expert Astronaut
                    <br>40 Seconds
                </button>
                <hr>

<h2>🌌 Explore Real NASA Discoveries</h2>

<button onclick="loadNasaPicture()">
    🪐 VIEW NASA PICTURE OF THE DAY
</button>

<div id="nasaPicture"></div>
<hr>

<h2>🔴 MARS ROVER EXPLORATION</h2>
<p>Explore real photographs captured on Mars!</p>

<button onclick="loadMarsPhotos()">
    🚀 EXPLORE MARS
</button>

<div id="marsPhotos"></div>

<hr>

<h2>🪐 PLANET EXPLORER</h2>
<p>Discover all 8 planets in our solar system!</p>

<button onclick="explorePlanets()">
    🌍 EXPLORE PLANETS
</button>

<div id="planetExplorer"></div>
<hr>

<h2>🌍 EARTH PROTECTION MISSION</h2>

<p>Become a guardian of Earth! Make choices to protect our planet.</p>

<button onclick="startEarthMission()">
    🌱 START EARTH MISSION
</button>

<div id="earthMission"></div>

            </div>

        </div>
    `;
}


// ==========================================
// SELECT DIFFICULTY
// ==========================================

function selectDifficulty(level) {

    selectedDifficulty = level;

    if (level === "easy") {

        selectedMissionDuration = 90;
        startingResourceLevel = 100;

    } else if (level === "medium") {

        selectedMissionDuration = 60;
        startingResourceLevel = 75;

    } else if (level === "hard") {

        selectedMissionDuration = 40;
        startingResourceLevel = 50;

    }

    startQuiz();
}


// ==========================================
// SCIENCE QUIZ
// ==========================================

function startQuiz() {

    score = 0;
    currentQuestion = 0;

    showQuestion();
}


function showQuestion() {

    const q = questions[currentQuestion];

    document.body.innerHTML = `
        <div class="container">

            <h1>🧠 Science Quiz</h1>

            <div class="mission-card">

                <h2>
                    Question ${currentQuestion + 1}
                    of ${questions.length}
                </h2>

                <p>${q.question}</p>

                <div id="options"></div>

            </div>

        </div>
    `;

    const optionsDiv = document.getElementById("options");

    q.options.forEach(option => {

        const button = document.createElement("button");

        button.textContent = option;

        button.onclick = function () {
            checkAnswer(option);
        };

        optionsDiv.appendChild(button);

    });
}


function checkAnswer(answer) {

    const q = questions[currentQuestion];

    if (answer === q.answer) {

        score++;

        alert(
            "✅ Correct!\n\n" +
            "📚 Learn More:\n" +
            q.explanation
        );

    } else {

        alert(
            "❌ Incorrect!\n\n" +
            "Correct Answer: " + q.answer +
            "\n\n📚 Learn More:\n" +
            q.explanation
        );

    }

    currentQuestion++;

    if (currentQuestion < questions.length) {

        showQuestion();

    } else {

        showResult();

    }
}
// ==========================================
// QUIZ RESULT
// ==========================================

function showResult() {

    document.body.innerHTML = `
        <div class="container">

            <h1>🏆 Training Complete!</h1>

            <div class="mission-card">

                <h2>⭐ Training Score</h2>

                <p>
                    You scored
                    <strong>${score}</strong>
                    out of
                    <strong>${questions.length}</strong>
                </p>

                <button onclick="startSpaceMission()">
                    🚀 BEGIN SPACE MISSION
                </button>

            </div>

        </div>
    `;
}


// ==========================================
// START SPACE MISSION
// ==========================================

function startSpaceMission() {

    clearInterval(timerInterval);
    timerInterval = null;

    resources.oxygen = startingResourceLevel;
    resources.water = startingResourceLevel;
    resources.food = startingResourceLevel;
    resources.power = startingResourceLevel;

    missionStage = 0;

    startMissionTimer();

    showMissionStage();
}


// ==========================================
// MISSION TIMER
// ==========================================

function updateMissionTimer() {

    missionTime--;

    const timerElement = document.getElementById("missionTimer");

    if (timerElement) {

        timerElement.textContent = missionTime;

        if (missionTime <= 10) {

            timerElement.style.color = "red";
            timerElement.style.fontSize = "30px";

        }

    }

    if (missionTime === 10) {

        alert("🚨 WARNING! Only 10 seconds left, Astronaut!");

    }

    if (missionTime <= 0) {

        clearInterval(timerInterval);
        timerInterval = null;

        alert("⏰ Mission time is over!");

        showMissionFailure();

    }
}


function startMissionTimer() {

    clearInterval(timerInterval);

    missionTime = selectedMissionDuration;

    timerInterval = setInterval(function () {

        updateMissionTimer();

    }, 1000);

}


function pauseMission() {

    if (timerInterval !== null) {

        clearInterval(timerInterval);
        timerInterval = null;

        alert("⏸️ Mission Paused!");

    }

}


function resumeMission() {

    if (timerInterval !== null || missionTime <= 0) {

        return;

    }

    timerInterval = setInterval(function () {

        updateMissionTimer();

    }, 1000);

}


// ==========================================
// MISSION STAGE CONTROL
// ==========================================

function showMissionStage() {

    if (missionStage === 0) {

        showOrbitMission();

    } else if (missionStage === 1) {

        showMoonMission();

    } else if (missionStage === 2) {

        showEmergencyMission();

    } else {

        showMissionSuccess();

    }

}


// ==========================================
// STAGE 1 - ORBIT CHECK
// ==========================================

function showOrbitMission() {

    document.body.innerHTML = `
        <div class="container">

            <h1>🛰️ Mission Stage 1</h1>

            <div class="mission-card">

                <h2>🌍 Orbit Check</h2>

                <p>
                    Your spacecraft has successfully entered orbit.
                    Prepare the spacecraft for the next stage.
                </p>

                ${resourceDisplay()}

                <h3>What should you do?</h3>

                <button onclick="orbitChoice(1)">
                    🔬 Start scientific research
                </button>

                <button onclick="orbitChoice(2)">
                    ⚡ Save power
                </button>

                <button onclick="orbitChoice(3)">
                    🛠️ Check spacecraft systems
                </button>

            </div>

        </div>
    `;
}


function orbitChoice(choice) {

    if (choice === 1) {

        resources.power -= 15;
        resources.oxygen -= 5;
        score += 10;

        alert("🔬 Research completed! +10 mission points.");

    } else if (choice === 2) {

        resources.power += 5;
        score += 5;

        alert("⚡ Good decision! You saved power. +5 points.");

    } else {

        resources.power -= 5;
        score += 10;

        alert("🛠️ Systems are healthy. +10 points.");

    }

    missionStage++;

    checkMissionResources();
}


// ==========================================
// STAGE 2 - MOON RESEARCH
// ==========================================

function showMoonMission() {

    document.body.innerHTML = `
        <div class="container">

            <h1>🌑 Mission Stage 2</h1>

            <div class="mission-card">

                <h2>🔬 Moon Research</h2>

                <p>
                    Your spacecraft has reached the Moon.
                    Choose how you will conduct your research.
                </p>

                ${resourceDisplay()}

                <h3>Choose your research plan:</h3>

                <button onclick="moonChoice(1)">
                    🔭 Study the lunar surface
                </button>

                <button onclick="moonChoice(2)">
                    📡 Send data to Earth
                </button>

                <button onclick="moonChoice(3)">
                    💧 Check water supplies
                </button>

            </div>

        </div>
    `;
}


function moonChoice(choice) {

    if (choice === 1) {

        resources.power -= 10;
        resources.oxygen -= 5;
        score += 15;

        alert("🔭 Lunar surface research successful! +15 points.");

    } else if (choice === 2) {

        resources.power -= 15;
        score += 15;

        alert("📡 Data successfully transmitted to Earth! +15 points.");

    } else {

        resources.water -= 5;
        score += 10;

        alert("💧 Water supplies checked. +10 points.");

    }

    missionStage++;

    checkMissionResources();
}


// ==========================================
// STAGE 3 - EMERGENCY
// ==========================================

function showEmergencyMission() {

    document.body.innerHTML = `
        <div class="container">

            <h1>🚨 Mission Stage 3</h1>

            <div class="mission-card">

                <h2>⚠️ Emergency!</h2>

                <p>
                    Warning! Your spacecraft has detected
                    an unexpected system problem.
                </p>

                ${resourceDisplay()}

                <h3>What is your first response?</h3>

                <button onclick="emergencyChoice(1)">
                    🛠️ Repair the system
                </button>

                <button onclick="emergencyChoice(2)">
                    ⚡ Shut down unnecessary systems
                </button>

                <button onclick="emergencyChoice(3)">
                    🚀 Continue the mission
                </button>

            </div>

        </div>
    `;
}


function emergencyChoice(choice) {

    if (choice === 1) {

        resources.power -= 10;
        resources.oxygen -= 5;
        score += 20;

        alert("🛠️ Emergency repair successful! +20 points.");

    } else if (choice === 2) {

        resources.power += 10;
        score += 15;

        alert("⚡ Excellent decision! Power was conserved. +15 points.");

    } else {

        resources.oxygen -= 15;
        resources.power -= 15;
        score -= 5;

        alert("⚠️ Continuing was risky. -5 points.");

    }

    missionStage++;

    checkMissionResources();
}


// ==========================================
// RESOURCE DISPLAY
// ==========================================

function resourceDisplay() {

    return `
        <div class="resources">

            <div class="resource">

                <div class="resource-info">
                    <span>🫁 Oxygen</span>
                    <strong>${resources.oxygen}%</strong>
                </div>

                <div class="resource-bar">
                    <div
                        class="resource-fill oxygen-fill"
                        style="width: ${resources.oxygen}%">
                    </div>
                </div>

            </div>


            <div class="resource">

                <div class="resource-info">
                    <span>💧 Water</span>
                    <strong>${resources.water}%</strong>
                </div>

                <div class="resource-bar">
                    <div
                        class="resource-fill water-fill"
                        style="width: ${resources.water}%">
                    </div>
                </div>

            </div>


            <div class="resource">

                <div class="resource-info">
                    <span>🍎 Food</span>
                    <strong>${resources.food}%</strong>
                </div>

                <div class="resource-bar">
                    <div
                        class="resource-fill food-fill"
                        style="width: ${resources.food}%">
                    </div>
                </div>

            </div>


            <div class="resource">

                <div class="resource-info">
                    <span>⚡ Power</span>
                    <strong>${resources.power}%</strong>
                </div>

                <div class="resource-bar">
                    <div
                        class="resource-fill power-fill"
                        style="width: ${resources.power}%">
                    </div>
                </div>

            </div>


            <div class="objective">
                🎯 Mission Progress: Stage ${missionStage + 1} / 3
            </div>


            <div class="timer">
                ⏱️ Mission Time:
                <span id="missionTimer">${missionTime}</span>s
            </div>


            <button onclick="pauseMission()">
                ⏸️ PAUSE MISSION
            </button>

            <button onclick="resumeMission()">
                ▶️ RESUME MISSION
            </button>


            <div class="progress-bar">
                <div
                    class="progress-fill"
                    style="width: ${((missionStage + 1) / 3) * 100}%">
                </div>
            </div>


            <div class="mission-status">
                🟢 Mission Status: ACTIVE
            </div>


            <div class="score-display">
                ⭐ Mission Score: ${score}
            </div>

        </div>
    `;
}


// ==========================================
// CHECK RESOURCES
// ==========================================

function checkMissionResources() {

    // Keep resource values between 0 and 100.

    resources.oxygen = Math.max(0, Math.min(100, resources.oxygen));
    resources.water = Math.max(0, Math.min(100, resources.water));
    resources.food = Math.max(0, Math.min(100, resources.food));
    resources.power = Math.max(0, Math.min(100, resources.power));

    if (
        resources.oxygen <= 0 ||
        resources.water <= 0 ||
        resources.food <= 0 ||
        resources.power <= 0
    ) {

        showMissionFailure();

    } else {

        showMissionStage();

    }

}


// ==========================================
// MISSION FAILURE
// ==========================================

function showMissionFailure() {

    clearInterval(timerInterval);
    timerInterval = null;

    document.body.innerHTML = `
        <div class="container">

            <h1>🚨 Mission Failed</h1>

            <div class="mission-card">

                <h2>⚠️ Mission Resources Depleted</h2>

                <p>
                    One or more critical resources reached zero,
                    or mission time ran out.
                </p>

                <p>
                    ⭐ Final Score:
                    <strong>${score}</strong>
                </p>

                <button onclick="startSpaceMission()">
                    🔄 TRY MISSION AGAIN
                </button>

                <button onclick="location.reload()">
                    🏠 RETURN TO HOME
                </button>

            </div>

        </div>
    `;
}


// ==========================================
// MISSION SUCCESS
// ==========================================

function showMissionSuccess() {

    const achievement = getAstronautAchievement();

    clearInterval(timerInterval);
    timerInterval = null;

    let rating = "";

    if (score >= 70) {

        rating = "🏆 Excellent Astronaut!";

    } else if (score >= 50) {

        rating = "🌟 Great Mission!";

    } else {

        rating = "💪 Good Training! Keep practicing!";

    }

    document.body.innerHTML = `
        <div class="container">

            <h1>🏆 MISSION COMPLETE</h1>

            <div class="mission-card">

                <div class="astronaut">
                    👨‍🚀
                </div>

                <h2>📋 Mission Report</h2>

                <p>
                    Congratulations, Junior Astronaut!
                    You successfully completed your mission.
                </p>


                <div class="mission-report">

                    <div class="report-item">
                        <span>⭐ Final Score</span>
                        <strong>${score}</strong>
                    </div>


                    <div class="report-item">
                        <span>🎯 Difficulty Level</span>
                        <strong>${selectedDifficulty.toUpperCase()}</strong>
                    </div>


                    <div class="report-item">
                        <span>⏱️ Time Remaining</span>
                        <strong>${missionTime} seconds</strong>
                    </div>


                    <div class="report-item">
                        <span>🫁 Oxygen</span>
                        <strong>${resources.oxygen}%</strong>
                    </div>


                    <div class="report-item">
                        <span>💧 Water</span>
                        <strong>${resources.water}%</strong>
                    </div>


                    <div class="report-item">
                        <span>🍎 Food</span>
                        <strong>${resources.food}%</strong>
                    </div>


                    <div class="report-item">
                        <span>⚡ Power</span>
                        <strong>${resources.power}%</strong>
                    </div>

                </div>


                <h2 class="rating">
                    ${rating}
                </h2>


                <p>
                    🎓 Training Status:
                    <strong>Mission Certified</strong>
                </p>


               <div class="badge">

    <h2>${achievement.badge}</h2>

    <h3>${achievement.name}</h3>

    <p>${achievement.message}</p>

</div>


                <div class="learning-box">

                    <h3>📚 What You Learned</h3>

                    <p>
                        🫁 Astronauts need oxygen to breathe.
                    </p>

                    <p>
                        💧 Water is essential during space missions.
                    </p>

                    <p>
                        ⚡ Spacecraft must carefully manage power.
                    </p>

                    <p>
                        🛰️ Astronauts use science, observation,
                        and decision-making to complete missions safely.
                    </p>

                </div>


                <div class="credits-box">

                    <h3>🛰️ Space Data & Resources</h3>

                    <p>
                        This educational mission trainer is inspired
                        by NASA's space science and astronaut-training concepts.
                    </p>

                    <p>
                        🌍 NASA Open Data & Science Resources
                    </p>

                    <p>
                        🚀 NASA Space Apps Challenge
                    </p>

                </div>


                <button onclick="startMission()">
                    🔄 RESTART TRAINING
                </button>

                <button onclick="downloadCertificate()">
    🏅 DOWNLOAD MY CERTIFICATE
</button>


                <button onclick="location.reload()">
                    🏠 RETURN TO HOME
                </button>

            </div>

        </div>
    `;
}
async function loadMarsPhotos() {
    const box = document.getElementById("marsPhotos");

    box.innerHTML = "🔴 Loading real Mars rover photographs...";

    try {
        // Search NASA's library for both Mars rovers
        const roverNames = ["Curiosity", "Perseverance"];

        const results = await Promise.all(
            roverNames.map(async (rover) => {
                const searchURL =
                    "https://images-api.nasa.gov/search?q=" +
                    encodeURIComponent("Mars rover " + rover) +
                    "&media_type=image&page_size=5";

                const response = await fetch(searchURL);

                if (!response.ok) {
                    throw new Error("NASA search failed.");
                }

                const data = await response.json();

                return {
                    rover: rover,
                    photos: data.collection.items || []
                };
            })
        );

        let html = "";

        results.forEach((result) => {
            html += `<h2>🚀 ${result.rover} Rover</h2>`;

            if (result.photos.length === 0) {
                html += "<p>No photographs found.</p>";
                return;
            }

            result.photos.forEach((photo) => {
                const info = photo.data[0];
                const imageURL = photo.links?.find(
                    link => link.render === "image"
                )?.href;

                if (!imageURL) return;

                html += `
                    <div style="
                        margin: 15px 0;
                        padding: 12px;
                        border: 1px solid #888;
                        border-radius: 12px;
                    ">
                        <h3>${info.title || "Mars Rover Photograph"}</h3>

                        <img
                            src="${imageURL}"
                            alt="${info.title || "Mars rover photo"}"
                            style="
                                width: 100%;
                                max-width: 500px;
                                border-radius: 10px;
                            "
                        >

                        <p>
                            📅 Date:
                            ${info.date_created || "Not available"}
                        </p>

                        <p>
                            🔭 NASA Credit:
                            ${info.center || "NASA"}
                        </p>

                        <p>
                            ${info.description
                                ? info.description.substring(0, 300) + "..."
                                : "No description available."}
                        </p>
                    </div>
                `;
            });
        });

        box.innerHTML = html || "No Mars photographs available.";

    } catch (error) {
        console.error("Mars Rover Error:", error);

        box.innerHTML = `
            <p>⚠️ Could not load Mars photographs.</p>
            <p>Please check your internet connection and try again.</p>
        `;
    }
}

// ==========================================
// NASA PICTURE OF THE DAY
// ==========================================

async function loadNasaPicture() {

    const box = document.getElementById("nasaPicture");

    if (!box) {
        alert("NASA picture section not found!");
        return;
    }

    box.innerHTML = "🌌 Loading NASA's Picture of the Day...";

    try {

        const response = await fetch(
            "https://science.nasa.gov/wp-json/wp/v2/apod-basic/?api_key=DEMO_KEY"
        );

        if (!response.ok) {
            throw new Error("NASA server error: " + response.status);
        }

        const data = await response.json();

        const picture = Array.isArray(data) ? data[0] : data;

        if (!picture || !picture.title) {
            throw new Error("NASA picture information unavailable.");
        }

        box.innerHTML = `
            <div style="
                margin-top: 20px;
                padding: 15px;
                border-radius: 12px;
                border: 1px solid #888;
            ">

                <h2>🌌 ${picture.title}</h2>

                <p>📅 Date: ${picture.date || "Not available"}</p>

                ${
                    picture.media_type === "image" && picture.hdurl
                    ? `
                        <img
                            src="${picture.hdurl}"
                            alt="${picture.alt || picture.title}"
                            style="
                                width: 100%;
                                max-width: 500px;
                                border-radius: 12px;
                            "
                        >
                    `
                    : `
                        <p>🎥 This discovery is not a standard image.</p>
                    `
                }

                <p>${picture.explanation || "No explanation available."}</p>

                <p>🔭 Credit: ${picture.credit || picture.copyright || "NASA"}</p>

                <a href="${picture.permalink}" target="_blank">
                    View on NASA
                </a>

            </div>
        `;

    } catch (error) {

        console.error("NASA Picture Error:", error);

        box.innerHTML = `
            <p>⚠️ NASA picture could not load.</p>
            <p>Please check your internet connection and try again.</p>
        `;
    }
}
// ==========================================
// ASTRONAUT ACHIEVEMENT SYSTEM
// ==========================================

function getAstronautAchievement() {

    if (score >= 50 && selectedDifficulty === "hard") {

        return {
            name: "MISSION MASTER",
            badge: "🏆",
            message: "Outstanding! You are an expert astronaut!"
        };

    } else if (score >= 35) {

        return {
            name: "MOON EXPLORER",
            badge: "🌙",
            message: "Excellent work exploring space!"
        };

    } else {

        return {
            name: "BEGINNER ASTRONAUT",
            badge: "🧑‍🚀",
            message: "Congratulations on completing your first mission!"
        };

    }
}
// ==========================================
// DOWNLOAD ASTRONAUT CERTIFICATE
// ==========================================

function downloadCertificate() {

    const achievement = getAstronautAchievement();

    const certificateWindow = window.open("", "_blank");

    if (!certificateWindow) {
        alert("Please allow pop-ups to download your certificate.");
        return;
    }

    certificateWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Junior Astronaut Certificate</title>

            <style>
                body {
                    background: #07152f;
                    color: white;
                    font-family: Arial, sans-serif;
                    text-align: center;
                    padding: 30px;
                }

                .certificate {
                    background: white;
                    color: #102447;
                    border: 10px solid #d4af37;
                    padding: 35px;
                    max-width: 750px;
                    margin: auto;
                }

                h1 {
                    color: #173c75;
                    font-size: 35px;
                }

                h2 {
                    color: #b8860b;
                    font-size: 28px;
                }

                .badge {
                    font-size: 65px;
                }

                .score {
                    font-size: 24px;
                    font-weight: bold;
                }

                button {
                    padding: 12px 25px;
                    margin: 20px;
                    font-size: 17px;
                    cursor: pointer;
                }

                @media print {
                    button {
                        display: none;
                    }

                    body {
                        background: white;
                    }
                }
            </style>
        </head>

        <body>

            <div class="certificate">

                <div class="badge">🚀 🏅 🌌</div>

                <h1>JUNIOR ASTRONAUT</h1>

                <h2>MISSION CERTIFICATE</h2>

                <p>This certificate is proudly awarded to</p>

                <h2>JUNIOR ASTRONAUT</h2>

                <p>For successfully completing the Space Mission Training!</p>

                <div class="badge">
                    ${achievement.badge}
                </div>

                <h2>${achievement.name}</h2>

                <p>${achievement.message}</p>

                <p class="score">
                    Final Score: ${score}
                </p>

                <p>
                    Difficulty: ${selectedDifficulty.toUpperCase()}
                </p>

                <p>
                    Date: ${new Date().toLocaleDateString()}
                </p>

                <hr>

                <p>🌍 Keep exploring. Keep learning. Reach for the stars!</p>

                <p>Junior Astronaut Mission Trainer</p>

            </div>

            <button onclick="window.print()">
                🏅 PRINT / SAVE AS PDF
            </button>

        </body>
        </html>
    `);

    certificateWindow.document.close();
}
// ==========================================
// PLANET EXPLORER
// ==========================================

const planetData = [
    {
        name: "Mercury",
        emoji: "☿️",
        type: "Smallest Planet",
        fact: "Mercury is the closest planet to the Sun. It has extreme temperatures."
    },
    {
        name: "Venus",
        emoji: "🌕",
        type: "Hottest Planet",
        fact: "Venus is the hottest planet because of its thick atmosphere."
    },
    {
        name: "Earth",
        emoji: "🌍",
        type: "Our Home Planet",
        fact: "Earth is the only planet currently known to support life."
    },
    {
        name: "Mars",
        emoji: "🔴",
        type: "The Red Planet",
        fact: "Mars looks red because of iron-rich dust on its surface."
    },
    {
        name: "Jupiter",
        emoji: "🟠",
        type: "Largest Planet",
        fact: "Jupiter is the largest planet in our solar system."
    },
    {
        name: "Saturn",
        emoji: "🪐",
        type: "Planet with Rings",
        fact: "Saturn has beautiful rings made mostly of ice and rock."
    },
    {
        name: "Uranus",
        emoji: "🔵",
        type: "Ice Giant",
        fact: "Uranus rotates on its side."
    },
    {
        name: "Neptune",
        emoji: "🔷",
        type: "Farthest Planet",
        fact: "Neptune is the farthest planet from the Sun."
    }
];


function explorePlanets() {

    const box = document.getElementById("planetExplorer");

   let html = `
    <h2>🌌 OUR SOLAR SYSTEM</h2>
    <p>Watch all 8 planets orbit around the Sun! ☀️</p>

    <div class="solar-system">
        <div class="sun">☀️</div>

        <div class="orbit orbit-mercury"><span>☿️</span></div>
        <div class="orbit orbit-venus"><span>🌕</span></div>
        <div class="orbit orbit-earth"><span>🌍</span></div>
        <div class="orbit orbit-mars"><span>🔴</span></div>
        <div class="orbit orbit-jupiter"><span>🟠</span></div>
        <div class="orbit orbit-saturn"><span>🪐</span></div>
        <div class="orbit orbit-uranus"><span>🔵</span></div>
        <div class="orbit orbit-neptune"><span>🔷</span></div>
    </div>

    <p>👇 Select a planet to discover amazing facts!</p>
`;
    planetData.forEach((planet, index) => {

        html += `
            <div style="
                background:#172554;
                color:white;
                padding:15px;
                margin:12px 0;
                border-radius:15px;
                border:1px solid #38bdf8;
            ">

                <h3>${planet.emoji} ${planet.name}</h3>

                <p>⭐ ${planet.type}</p>

                <button onclick="showPlanetFact(${index})">
                    🔍 DISCOVER PLANET
                </button>

                <div id="planetFact${index}"></div>

            </div>
        `;

    });

    box.innerHTML = html;
}


function showPlanetFact(index) {

    const planet = planetData[index];

    const factBox = document.getElementById(
        "planetFact" + index
    );

    factBox.innerHTML = `
        <hr>

        <h3>${planet.emoji} ${planet.name}</h3>

        <p>${planet.fact}</p>

        <p>🚀 Keep exploring the universe!</p>
    `;
}
const earthQuestions = [
    {
        question: "🌳 What should we do to reduce air pollution?",
        options: [
            "Plant more trees",
            "Burn more plastic",
            "Cut down forests"
        ],
        answer: 0,
        explanation: "Planting trees helps absorb carbon dioxide and supports cleaner air."
    },
    {
        question: "💧 How can we save water?",
        options: [
            "Leave taps running",
            "Turn off taps when not needed",
            "Waste clean water"
        ],
        answer: 1,
        explanation: "Turning off taps when not needed helps conserve water."
    },
    {
        question: "♻️ What is the best way to manage plastic waste?",
        options: [
            "Throw it into rivers",
            "Burn it everywhere",
            "Reuse and recycle it"
        ],
        answer: 2,
        explanation: "Reusing and recycling plastic helps reduce waste and pollution."
    }
];

let earthQuestionNumber = 0;
let earthScore = 0;

function startEarthMission() {
    earthQuestionNumber = 0;
    earthScore = 0;
    showEarthQuestion();
}

function showEarthQuestion() {
    const box = document.getElementById("earthMission");
    const q = earthQuestions[earthQuestionNumber];

    let html = `
        <h3>🌍 Challenge ${earthQuestionNumber + 1} of ${earthQuestions.length}</h3>
        <h3>${q.question}</h3>
    `;

    q.options.forEach((option, index) => {
        html += `
            <button onclick="checkEarthAnswer(${index})">
                ${option}
            </button>
            <br><br>
        `;
    });

    box.innerHTML = html;
}

function checkEarthAnswer(selectedAnswer) {
    const q = earthQuestions[earthQuestionNumber];
    const box = document.getElementById("earthMission");

    if (selectedAnswer === q.answer) {
        earthScore++;
        alert("✅ Correct! " + q.explanation);
    } else {
        alert("❌ Not quite! " + q.explanation);
    }

    earthQuestionNumber++;

    if (earthQuestionNumber < earthQuestions.length) {
        showEarthQuestion();
   } else {
    let badge = "";

    if (earthScore === 3) {
        badge = `
            <div class="badge">
                <h2>🌱</h2>
                <h3>GREEN GUARDIAN</h3>
                <p>🏆 Amazing! You are a protector of Earth!</p>
            </div>
        `;
    }

    box.innerHTML = `
        <h2>🌎 EARTH MISSION COMPLETE!</h2>
        <h3>⭐ Your Score: ${earthScore} / ${earthQuestions.length}</h3>
        ${badge}
        <p>Thank you for helping protect our planet!</p>

        <button onclick="startEarthMission()">
            🔄 PLAY AGAIN
        </button>

        <button onclick="downloadEarthCertificate()">
            🌳 DOWNLOAD EARTH CERTIFICATE
        </button>
    `;
    }
}
// ==========================================
// EARTH PROTECTION CERTIFICATE
// ==========================================

function downloadEarthCertificate() {

    const certificateWindow = window.open("", "_blank");

    if (!certificateWindow) {
        alert("Please allow pop-ups to download your certificate.");
        return;
    }

    certificateWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Earth Protection Certificate</title>

            <style>
                body {
                    background: #e8f5e9;
                    font-family: Arial, sans-serif;
                    text-align: center;
                    padding: 30px;
                }

                .certificate {
                    background: white;
                    color: #1b4332;
                    border: 10px solid #2e7d32;
                    padding: 35px;
                    max-width: 700px;
                    margin: auto;
                }

                h1 {
                    color: #2e7d32;
                }

                h2 {
                    color: #1b5e20;
                }

                .badge {
                    font-size: 65px;
                }

                button {
                    padding: 12px 25px;
                    margin: 20px;
                    font-size: 17px;
                    cursor: pointer;
                }

                @media print {
                    button {
                        display: none;
                    }
                }
            </style>
        </head>

        <body>

            <div class="certificate">

                <div class="badge">🌍 🌳 🌱</div>

                <h1>EARTH PROTECTION</h1>

                <h2>MISSION CERTIFICATE</h2>

          For completing the Earth Protection Mission
and learning how to protect our planet.
</p>

            <div class="badge">🏆</div>

            <h2>EARTH PROTECTION ACHIEVEMENT</h2>

            <p>Earth Mission Score: ${earthScore} / ${earthQuestions.length}</p>

            <p>Date: ${new Date().toLocaleDateString()}</p>

            <hr>

            <p>🌱 Protect Earth. Protect Life. Build a Greener Future!</p>

            <p>Junior Astronaut Mission Trainer</p>

        </div>

        <button onclick="window.print()">
            🌳 PRINT / SAVE AS PDF
        </button>

    </body>
    </html>
`);

certificateWindow.document.close();

}     
