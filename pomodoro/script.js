// Sélection des éléments du DOM
let pomodoro = document.getElementById("pomodoro-timer"); // Minuteur Pomodoro
let short = document.getElementById("short-timer"); // Minuteur Pause courte
let long = document.getElementById("long-timer"); // Minuteur Pause longue
let timers = document.querySelectorAll(".timer-display"); // Liste de tous les minuteurs

let session = document.getElementById("pomodoro-session"); // Bouton Pomodoro
let shortBreak = document.getElementById("short-break"); // Bouton Pause courte
let longBreak = document.getElementById("long-break"); // Bouton Pause longue

let startBtn = document.getElementById("start"); // Bouton START
let stopBtn = document.getElementById("stop"); // Bouton STOP
let resetBtn = document.getElementById("RESET"); // Bouton RESET

let timerMsg = document.getElementById("timer-message"); // Message d'erreur si aucun minuteur n'est sélectionné

// Variables globales
let currentTimer = pomodoro; // Minuteur actif par défaut
let myInterval = null; // Stocke l'intervalle du minuteur
let endTimestamp = null; // Stocke le moment de fin du minuteur

// Fonction pour cacher tous les minuteurs
function hideAllTimers() {
    timers.forEach(timer => (timer.style.display = "none")); // Cache chaque minuteur
}

// Fonction pour afficher un minuteur spécifique
function showTimer(timer) {
    hideAllTimers(); // Cache tous les minuteurs avant d'afficher le bon
    timer.style.display = "block"; // Affiche le minuteur sélectionné
    currentTimer = timer; // Met à jour le minuteur actif
}

// Sélectionne le minuteur Pomodoro par défaut
showTimer(pomodoro);

// Gestion du changement de minuteur
session.addEventListener("click", () => {
    showTimer(pomodoro); // Affiche le minuteur Pomodoro
    session.classList.add("active"); // Active visuellement le bouton
    shortBreak.classList.remove("active"); // Désactive les autres boutons
    longBreak.classList.remove("active");
});

shortBreak.addEventListener("click", () => {
    showTimer(short); // Affiche le minuteur Pause courte
    session.classList.remove("active");
    shortBreak.classList.add("active");
    longBreak.classList.remove("active");
});

longBreak.addEventListener("click", () => {
    showTimer(long); // Affiche le minuteur Pause longue
    session.classList.remove("active");
    shortBreak.classList.remove("active");
    longBreak.classList.add("active");
});

// Fonction pour démarrer le minuteur
function startTimer() {
    if (myInterval) {
        clearInterval(myInterval); // Stoppe le minuteur s'il est déjà en cours
    }

    let timerDisplay = currentTimer.querySelector(".time"); // Sélectionne l'affichage du temps
    let timerDuration = parseInt(currentTimer.getAttribute("data-duration")); // Récupère la durée
    let timeRemaining = timerDuration * 60 * 1000; // Convertit en millisecondes

    endTimestamp = Date.now() + timeRemaining; // Calcule l'heure de fin

    myInterval = setInterval(() => {
        let now = Date.now(); // Récupère l'heure actuelle
        let remaining = endTimestamp - now; // Calcule le temps restant

        if (remaining <= 0) {
            clearInterval(myInterval); // Arrête le minuteur
            timerDisplay.textContent = "00:00"; // Affiche 00:00
            let alarm = new Audio("mixkit-happy-bells-notification-937.wav"); // Charge un son d'alarme
            alarm.play(); // Joue l'alarme
        } else {
            let minutes = Math.floor(remaining / 60000); // Calcule les minutes
            let seconds = Math.floor((remaining % 60000) / 1000); // Calcule les secondes
            timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`; // Met à jour l'affichage
        }
    }, 1000);

    timerMsg.style.display = "none"; // Cache le message d'erreur
}

// Gestion des boutons
startBtn.addEventListener("click", () => {
    if (currentTimer) {
        startTimer(); // Démarre le minuteur actif
    } else {
        timerMsg.style.display = "block"; // Affiche un message d'erreur
    }
});

stopBtn.addEventListener("click", () => {
    if (myInterval) {
        clearInterval(myInterval); // Stoppe le minuteur
        myInterval = null;
    }
});

resetBtn.addEventListener("click", () => {
    if (myInterval) {
        clearInterval(myInterval); // Stoppe le minuteur
        myInterval = null;
    }

    let defaultDuration = parseInt(currentTimer.getAttribute("data-duration")); // Récupère la durée initiale
    currentTimer.querySelector(".time").textContent = `${defaultDuration}:00`; // Réinitialise l'affichage
});

// Gestion des tâches
document.getElementById("add-task-btn").addEventListener("click", () => {
    const taskInput = document.getElementById("task-input"); // Récupère l'input
    const taskList = document.getElementById("task-list"); // Liste des tâches
    const taskText = taskInput.value.trim(); // Récupère le texte de la tâche

    if (taskText) {
        const taskItem = document.createElement("li"); // Crée un élément de liste
        taskItem.textContent = taskText; // Ajoute le texte

        const deleteBtn = document.createElement("button"); // Crée un bouton Supprimer
        deleteBtn.textContent = "Supprimer";
        deleteBtn.classList.add("delete-btn");

        deleteBtn.addEventListener("click", () => {
            taskItem.remove(); // Supprime la tâche au clic
        });

        taskItem.appendChild(deleteBtn); // Ajoute le bouton à la tâche
        taskList.appendChild(taskItem); // Ajoute la tâche à la liste
        taskInput.value = ""; // Réinitialise l'input
    }
});
