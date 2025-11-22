/* ---------------------------
   SIDEBAR NAVIGATION
----------------------------*/
function showSection(id) {
    document.querySelectorAll("section").forEach(sec => sec.classList.remove("active"));
    document.getElementById(id).classList.add("active");
}

/* ---------------------------
   POMODORO TIMER
----------------------------*/
let timerInterval;
let timeLeft = 1500; // 25 minutes

function updateTimerDisplay() {
    let mins = Math.floor(timeLeft / 60);
    let secs = timeLeft % 60;
    document.getElementById("timer").textContent =
        `${mins}:${secs < 10 ? "0" + secs : secs}`;
}

function startPomodoro() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert("Pomodoro Complete!");
        }
    }, 1000);
}

function pausePomodoro() {
    clearInterval(timerInterval);
}

function resetPomodoro() {
    clearInterval(timerInterval);
    timeLeft = 1500;
    updateTimerDisplay();
}

/* ---------------------------
   NOTES SYSTEM
----------------------------*/
function saveNotes() {
    let notes = document.getElementById("notesInput").value;
    localStorage.setItem("userNotes", notes);
    alert("Notes saved!");
}

window.onload = () => {
    let savedNotes = localStorage.getItem("userNotes");
    if (savedNotes) document.getElementById("notesInput").value = savedNotes;
};

/* ---------------------------
   FLASHCARDS
----------------------------*/
const flashcards = [
    "What is photosynthesis?",
    "Define gravity.",
    "What is 5 × 6?",
    "Who wrote 'Hamlet'?",
    "Name the largest planet."
];

let flashIndex = 0;

function nextFlashcard() {
    document.getElementById("flashcard-text").textContent =
        flashcards[flashIndex];
    flashIndex = (flashIndex + 1) % flashcards.length;
}

/* ---------------------------
   QUIZ SYSTEM
----------------------------*/
const quizQuestions = [
    { q: "What is 10 + 5?", a: "15" },
    { q: "Who invented the lightbulb?", a: "thomas edison" },
    { q: "Which planet is called the Red Planet?", a: "mars" },
    { q: "What gas do plants release?", a: "oxygen" },
];

let quizIndex = 0;
let score = 0;

function startQuiz() {
    quizIndex = 0;
    score = 0;
    document.getElementById("quiz-question").textContent =
        quizQuestions[quizIndex].q;
}

function submitAnswer() {
    let userAnswer = document.getElementById("quiz-answer").value.toLowerCase();

    if (userAnswer === quizQuestions[quizIndex].a) {
        score++;
    }

    quizIndex++;

    if (quizIndex < quizQuestions.length) {
        document.getElementById("quiz-question").textContent =
            quizQuestions[quizIndex].q;
    } else {
        document.getElementById("quiz-question").textContent =
            `Quiz Finished! Score: ${score}/${quizQuestions.length}`;
        updateLeaderboard(score);
    }

    document.getElementById("quiz-answer").value = "";
}

/* ---------------------------
   LEADERBOARD SYSTEM
----------------------------*/
function updateLeaderboard(score) {
    let board = JSON.parse(localStorage.getItem("leaderboard")) || [];
    board.push(score);
    board.sort((a, b) => b - a); // high → low

    localStorage.setItem("leaderboard", JSON.stringify(board));
    displayLeaderboard();
}

function displayLeaderboard() {
    let board = JSON.parse(localStorage.getItem("leaderboard")) || [];
    let list = document.getElementById("leaderboard-list");
    list.innerHTML = "";

    board.forEach((score, i) => {
        let li = document.createElement("li");
        li.textContent = `#${i + 1} — ${score} points`;
        list.appendChild(li);
    });
}

displayLeaderboard();

/* ---------------------------
   PROGRESS TRACKING
----------------------------*/
function updateProgress() {
    let notes = localStorage.getItem("userNotes") ? "✔ Notes saved" : "❌ No notes";
    let board = JSON.parse(localStorage.getItem("leaderboard")) || [];
    let best = board[0] ? board[0] : "None";

    document.getElementById("progress-data").innerHTML = `
        <strong>Your Study Summary:</strong><br><br>
        📝 Notes: ${notes}<br>
        🧠 Best Quiz Score: ${best}<br>
        🎴 Flashcards practiced: ${flashIndex}<br>
        ⏱ Pomodoro sessions: (tracked later)
    `;
}

setInterval(updateProgress, 1000);

/* ---------------------------
   CHATBOT (MOCK AI)
----------------------------*/
function sendChat() {
    let input = document.getElementById("chatInput").value;
    if (!input) return;

    addMessage(input, "user");

    // Fake AI reply for now
    setTimeout(() => {
        addMessage("I'm your study assistant! Try asking me a study question.", "bot");
    }, 500);

    document.getElementById("chatInput").value = "";
}

function addMessage(text, type) {
    let chatWindow = document.getElementById("chat-window");
    let msg = document.createElement("div");
    msg.className = type === "user" ? "chat-msg-user" : "chat-msg-bot";
    msg.textContent = text;

    chatWindow.appendChild(msg);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

/* ---------------------------
   FOCUS MODE
----------------------------*/
let inFocus = false;

function toggleFocus() {
    inFocus = !inFocus;

    if (inFocus) {
        document.body.style.filter = "grayscale(100%)";
        alert("Focus Mode ON — distractions blocked!");
    } else {
        document.body.style.filter = "grayscale(0%)";
    }
}
