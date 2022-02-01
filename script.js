const timerEl = document.getElementById("timer");
const playPause = document.getElementById("playPause");
const container = document.querySelector(".container");
const optionBtnContainer = document.querySelector(".option-btn-container");
const optionBtns = document.querySelectorAll(".option-btn");

/////////////////////////////////////////////////////////

// Presets

const timersSettings = {
  pomodoro: {
    time: 10, //1500
    classe: "red",
  },
  shortBreak: {
    time: 5, // 300
    classe: "green",
  },
  longBreak: {
    time: 7, // 900
    classe: "blue",
  },
};

let currentTimerInterval,
  currentTimerSetting,
  definedTime,
  timerIsRunning,
  round,
  maxRound;

// Functions

const init = function () {
  currentTimerSetting = timersSettings.pomodoro;
  definedTime = currentTimerSetting.time;
  timerIsRunning = false;
  round = 0;
  maxRound = 4;
};

init();

const updateTimerEl = function () {
  const min = String(Math.trunc(definedTime / 60)).padStart(2, 0);
  const sec = String(Math.trunc(definedTime % 60)).padStart(2, 0);
  timerEl.innerHTML = `${min}:${sec}`;
};

const resetTimer = function () {
  clearInterval(currentTimerInterval);
  timerIsRunning = false;
  playPause.innerHTML = "PLAY";
  container.classList.remove("red", "green", "blue");
  optionBtns.forEach((btn) => btn.classList.remove("active-option-btn"));
};

const changeTimerInterface = function (id) {
  currentTimerSetting = timersSettings[id];
  definedTime = timersSettings[id].time;
  document.getElementById(`${id}`).classList.add("active-option-btn");
  container.classList.add(timersSettings[id].classe);
  updateTimerEl();
};

const startTimer = function () {
  const tick = function () {
    definedTime--;
    updateTimerEl();

    if (definedTime === 0) {
      resetTimer();
      if (currentTimerSetting === timersSettings.pomodoro) {
        round++;
        if (round >= maxRound) {
          maxRound += 4;
          changeTimerInterface("longBreak");
        } else {
          changeTimerInterface("shortBreak");
        }
      } else {
        changeTimerInterface("pomodoro");
      }
    }
  };

  timerIsRunning = true;
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};

// Event handlers

playPause.addEventListener("click", function () {
  if (!timerIsRunning) {
    currentTimerInterval = startTimer();
    playPause.innerHTML = "PAUSE";
  } else {
    clearInterval(currentTimerInterval);
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
