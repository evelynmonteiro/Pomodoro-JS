const timerEl = document.getElementById("timer");
const playPause = document.getElementById("playPause");
const container = document.querySelector(".container");
const optionBtnContainer = document.querySelector(".option-btn-container");
const optionBtns = document.querySelectorAll(".option-btn");

/////////////////////////////////////////////////////////

// Presets

const timersSettings = [
  { id: "pomodoro", time: 1500, classe: "red" },
  { id: "shortBreak", time: 300, classe: "green" },
  { id: "longBreak", time: 900, classe: "blue" },
];

let currentTimer;
let definedTime = timersSettings.find(
  (timerSetting) => timerSetting.id === "pomodoro"
).time;
let timerIsRunning = false;

// Functions

const startTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(definedTime / 60)).padStart(2, 0);
    const sec = String(Math.trunc(definedTime % 60)).padStart(2, 0);

    if (definedTime === 0) {
      clearInterval(timer);
    }

    timerEl.innerHTML = `${min}:${sec}`;
    definedTime--;
  };

  timerIsRunning = true;
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};

const changeTimerInterface = function (id) {
  const timerSetting = timersSettings.find((obj) => obj.id === id);
  definedTime = timerSetting.time;
  const min = String(Math.trunc(definedTime / 60)).padStart(2, 0);
  const sec = String(Math.trunc(definedTime % 60)).padStart(2, 0);
  timerEl.innerHTML = `${min}:${sec}`;
  container.classList.add(timerSetting.classe);
};

const resetTimer = function () {
  clearInterval(currentTimer);
  timerIsRunning = false;
  playPause.innerHTML = "PLAY";
  container.classList.remove("red", "green", "blue");
  optionBtns.forEach((btn) => btn.classList.remove("active-option-btn"));
};

// Event handlers

playPause.addEventListener("click", function () {
  if (!timerIsRunning) {
    currentTimer = startTimer();
    playPause.innerHTML = "PAUSE";
  } else {
    clearInterval(currentTimer);
    timerIsRunning = false;
    playPause.innerHTML = "PLAY";
  }
});

optionBtnContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("option-btn")) {
    resetTimer();
    e.target.classList.add("active-option-btn");
    changeTimerInterface(e.target.id);
  }
});
