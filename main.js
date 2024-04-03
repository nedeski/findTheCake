let wrapper = document.querySelector(".wrapper");
let target = document.querySelector(".target");
let modalWrapper = document.querySelector(".modal-wrapper");
let cake = document.querySelector("#cake");
let heading = document.querySelector("h3");
let timer = document.querySelector("#timer");

const formatTime = (seconds) => {
  minutes = Math.floor(seconds / 60);
  remainingSeconds = seconds - minutes * 60;
  sDisplay = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
  mDisplay = minutes < 10 ? `0${minutes}` : minutes;
  return `${mDisplay}: ${sDisplay}`;
};

function initTimer(time) {
  timer.innerText = `${formatTime(time)}`;

  timerInterval = setInterval(() => {
    if (time == 0) {
      clearInterval(timerInterval);
      window.localStorage.removeItem("timer");
      modalWrapper.setAttribute("style", "display: flex");
      heading.innerText = "You lost!";
      counter = 0;
      return;
    }

    time--;
    localStorage.setItem("timer", time);

    timer.innerText = `${formatTime(time)}`;
  }, 1000);
}
function onCakeClickHandler() {
  modalWrapper.setAttribute("style", "display: none");
  initTimer(180);
}

cake.addEventListener("click", onCakeClickHandler);

wrapper.setAttribute("style", "background-image: url(img/bg5.jpg)");

function targetPositioning() {
  let widthRange = window.innerWidth - target.clientWidth;
  let heightRange = window.innerHeight - target.clientHeight;

  let randomTop = Math.floor(Math.random() * heightRange);
  let randomLeft = Math.floor(Math.random() * widthRange);

  target.setAttribute("style", `left: ${randomLeft}px; top: ${randomTop}px`);
}

targetPositioning();

let counter = Number(localStorage.getItem("scoreVal")) || 0;

function onTargetClickHandler() {
  let popup = document.createElement("div");
  let text = document.createElement("p");
  let btn = document.createElement("button");
  let score = document.createElement("p");
  let resetBtn = document.createElement("button");

  text.innerText = "Bravo!";
  btn.innerText = "Next round";
  counter++;

  localStorage.setItem("scoreVal", counter);

  score.innerText = `Score: ${localStorage.getItem("scoreVal")}`;

  resetBtn.innerText = "Reset score";

  popup.appendChild(text);
  popup.appendChild(btn);
  popup.appendChild(score);
  popup.appendChild(resetBtn);
  wrapper.appendChild(popup);

  popup.setAttribute(
    "style",
    "background-color:white; font-size:20px; color:green; position:absolute; top:50%; left:50%; transform:translate(-50%, -50%); padding: 20px 50px; text-align:center; border-radius:10px"
  );
  btn.setAttribute(
    "style",
    "background-color:green; color:white; padding:10px 15px; border-radius:4px; border:0; cursor:pointer;"
  );
  resetBtn.setAttribute(
    "style",
    "background-color:red; color:white; padding:10px 15px; border-radius:4px; border:0; cursor:pointer;"
  );
  btn.classList.add("btn");
  text.setAttribute("style", "margin-top:0;");

  function onBtnClickHandler() {
    targetPositioning();
    popup.setAttribute("style", "display: none");
    if (counter < 10) {
      if (counter % 2 === 0) {
        wrapper.setAttribute("style", "background-image: url(img/bg5.jpg)");
      } else {
        wrapper.setAttribute("style", "background-image: url(img/bg6.jpg)");
      }
    } else if (counter < 20) {
      if (counter % 2 === 0) {
        wrapper.setAttribute("style", "background-image: url(img/bg3.jpg)");
      } else {
        wrapper.setAttribute("style", "background-image: url(img/bg4.jpg)");
      }
    } else {
      if (counter % 2 === 0) {
        wrapper.setAttribute("style", "background-image: url(img/bg1.jpg)");
      } else {
        wrapper.setAttribute("style", "background-image: url(img/bg2.jpg)");
      }
    }
  }

  function onResetBtnClickHandler() {
    counter = 0;
    targetPositioning();
    popup.setAttribute("style", "display: none");
  }
  btn.addEventListener("click", onBtnClickHandler);
  resetBtn.addEventListener("click", onResetBtnClickHandler);
  if (counter >= 30) {
    modalWrapper.setAttribute("style", "display: flex");
    heading.innerText = "Your Victory!";
    onResetBtnClickHandler();
  }
}

target.addEventListener("click", onTargetClickHandler);
