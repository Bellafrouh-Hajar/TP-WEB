// Sélection des éléments du DOM
let pomodoro = document.getElementById("pomodoro-timer");
let short = document.getElementById("short-timer");
let long = document.getElementById("long-timer");
let timers = document.querySelectorAll(".timer-display");

let session = document.getElementById("pomodoro-session");
let shortBreak = document.getElementById("short-break");
let longBreak = document.getElementById("long-break");

let startBtn = document.getElementById("start");
let stopBtn = document.getElementById("stop");
let resetBtn = document.getElementById("RESET");

let timerMsg = document.getElementById("timer-message");

// Variables globales
let currentTimer = pomodoro; // Par défaut, on commence avec Pomodoro
let myInterval = null;
let endTimestamp = null;

// Fonction pour afficher uniquement le minuteur actif
function hideAllTimers() {
    timers.forEach(timer => (timer.style.display = "none"));
}

function showTimer(timer) {
    hideAllTimers();
    timer.style.display = "block";
    currentTimer = timer;
}

// Sélection par défaut (Pomodoro)
showTimer(pomodoro);

// Gestion des boutons Pomodoro, Pause courte et Pause longue
session.addEventListener("click", () => {
    showTimer(pomodoro);
    session.classList.add("active");
    shortBreak.classList.remove("active");
    longBreak.classList.remove("active");
});

shortBreak.addEventListener("click", () => {
    showTimer(short);
    session.classList.remove("active");
    shortBreak.classList.add("active");
    longBreak.classList.remove("active");
});

longBreak.addEventListener("click", () => {
    showTimer(long);
    session.classList.remove("active");
    shortBreak.classList.remove("active");
    longBreak.classList.add("active");
});

// Fonction pour démarrer le minuteur
function startTimer() {
    if (myInterval) {
        clearInterval(myInterval);
    }

    let timerDisplay = currentTimer.querySelector(".time");
    let timerDuration = parseInt(currentTimer.getAttribute("data-duration"));
    let timeRemaining = timerDuration * 60 * 1000;

    endTimestamp = Date.now() + timeRemaining;

    myInterval = setInterval(() => {
        let now = Date.now();
        let remaining = endTimestamp - now;

        if (remaining <= 0) {
            clearInterval(myInterval);
            timerDisplay.textContent = "00:00";
            let alarm = new Audio("mixkit-happy-bells-notification-937.wav");
            alarm.play();
        } else {
            let minutes = Math.floor(remaining / 60000);
            let seconds = Math.floor((remaining % 60000) / 1000);
            timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;
        }
    }, 1000);

    timerMsg.style.display = "none";
}

// Bouton START
startBtn.addEventListener("click", () => {
    if (currentTimer) {
        startTimer();
    } else {
        timerMsg.style.display = "block";
    }
});

// Bouton STOP
stopBtn.addEventListener("click", () => {
    if (myInterval) {
        clearInterval(myInterval);
        myInterval = null;
    }
});

// Bouton RESET (corrigé : réinitialise seulement le minuteur actif)
resetBtn.addEventListener("click", () => {
    if (myInterval) {
        clearInterval(myInterval);
        myInterval = null;
    }

    // Réinitialiser uniquement le minuteur sélectionné
    let defaultDuration = parseInt(currentTimer.getAttribute("data-duration"));
    currentTimer.querySelector(".time").textContent = `${defaultDuration}:00`;
});

// Gestion des tâches
const addTaskBtn = document.getElementById("add-task-btn");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

addTaskBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();

    if (taskText) {
        const taskItem = document.createElement("li");
        taskItem.textContent = taskText;

        // Ajouter un bouton de suppression
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Supprimer";
        deleteBtn.classList.add("delete-btn");

        // Fonction de suppression
        deleteBtn.addEventListener("click", () => {
            taskItem.remove();
        });

        // Ajouter le bouton de suppression à la tâche
        taskItem.appendChild(deleteBtn);
        taskList.appendChild(taskItem);

        // Réinitialiser le champ de saisie
        taskInput.value = "";
    }
});
