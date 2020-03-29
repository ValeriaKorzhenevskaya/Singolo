//! Header !!!

const Navigation = document.getElementById("navigation");

document.querySelector(".header__burger").addEventListener("click", event => {
  document.querySelector(".header__burger").classList.toggle("target");
  document.querySelector(".header__navigation").classList.toggle("target");
  document.querySelector(".logo").classList.toggle("target");
});
// document.querySelector("body").classList.toggle("lock");

Navigation.addEventListener("click", event => {
  Navigation.querySelectorAll("a").forEach(Element =>
    Element.classList.remove("nav_active")
  );
  event.target.classList.add("nav_active");
});

document.addEventListener("scroll", onScroll);
function onScroll(event) {
  const currentPosition = window.scrollY;
  const header = document.querySelector("header");
  const sections = document.querySelectorAll("body > *");
  const navigations = document.querySelectorAll("#navigation li a");

  sections.forEach(element => {
    if (element.hasAttribute("id")) {
      if (
        element.offsetTop - header.clientHeight <= currentPosition &&
        element.offsetTop + element.clientHeight > currentPosition
      ) {
        navigations.forEach(link => {
          link.classList.remove("nav_active");
          if (
            element.getAttribute("id") ===
            link.getAttribute("href").substring(1)
          ) {
            link.classList.add("nav_active");
          }
        });
      }
    }
  });
}

//! Slider !!!!

let items = document.querySelectorAll(".items");
let currentItems = 0;
let isEnabled = true;

function changeActiveItem(n) {
  currentItems = (n + items.length) % items.length;
}

function hideItem(direction) {
  isEnabled = false;
  items[currentItems].classList.add(direction);
  items[currentItems].addEventListener("animationend", function() {
    this.classList.remove("active", direction);
  });
}

function showItem(direction) {
  items[currentItems].classList.add("next", direction);
  items[currentItems].addEventListener("animationend", function() {
    this.classList.remove("next", direction);
    this.classList.add("active");
    isEnabled = true;
  });

  if (currentItems === 1) {
    document.querySelector("body > main").style.backgroundColor = "#648BF0";
    document.querySelector("body > main").style.borderColor = "#6f92ef";
  } else {
    document.querySelector("body > main").style.backgroundColor = "#f06c64";
    document.querySelector("body > main").style.borderColor = "#ea676b";
  }
}

function previousItem(n) {
  hideItem("to-right");
  changeActiveItem(n - 1);
  showItem("from-left");
}

function nexItem(n) {
  hideItem("to-left");
  changeActiveItem(n + 1);
  showItem("from-right");
}

document.querySelector(".arrows .left").addEventListener("click", function() {
  if (isEnabled) {
    previousItem(currentItems);
  }
});

document.querySelector(".arrows .right").addEventListener("click", function() {
  if (isEnabled) {
    nexItem(currentItems);
  }
});

//? Black Screen

const ButtonIphone = document.querySelectorAll(".home-button");
ButtonIphone.forEach(button =>
  button.addEventListener("click", function(event) {
    let verticalPhone = document.querySelector(".vertical-phone");
    let verticalBlackScreen = document.querySelector(
      ".vertical-phone .black-screen_vertical"
    );

    let horizontalPhone = document.querySelector(".horizontal-phone");
    let horizontalBlackScreen = document.querySelector(
      ".horizontal-phone .black-screen_horizontal"
    );

    if (verticalPhone.contains(button))
      verticalBlackScreen.hidden = !verticalBlackScreen.hidden;
    if (horizontalPhone.contains(button))
      horizontalBlackScreen.hidden = !horizontalBlackScreen.hidden;
  })
);

//! Portfolio !!!!!

const Portfolio = document.querySelector(".portfolio-button");

Portfolio.addEventListener("click", event => {
  Portfolio.querySelectorAll("button").forEach(Element =>
    Element.classList.remove("active_button")
  );
  event.target.classList.add("active_button");

  document
    .querySelector(".box")
    .querySelectorAll(".box__image")
    .forEach(element => {
      element.style.order = Math.floor(1 + Math.random() * 12);
    });
});

//? Border Image !!!!

const Box = document.getElementById("image");

Box.addEventListener("click", event => {
  Box.querySelectorAll(".box__image").forEach(element =>
    element.classList.remove("selected")
  );
  event.target.classList.add("selected");
});

//!! Form !!!!
const closeButton = document.getElementById("close-button");
const formBlock = document.getElementById("form");
const subject = document.getElementById("subject");
const textarea = document.getElementById("textarea");
const message = document.getElementById("message");

formBlock.addEventListener("submit", event => {
  event.preventDefault();
  document.getElementById("message-block").classList.remove("hidden");

  message.querySelector("#subj_result").textContent = subject.value
    ? `Subject: ${subject.value}`
    : "No subject";
  message.querySelector("#description_result").textContent = textarea.value
    ? `Description: ${textarea.value}`
    : "No description";
});

closeButton.addEventListener("click", () => {
  document.getElementById("message-block").classList.add("hidden");
  textarea.value = "";
  subject.value = "";
  formBlock.reset();
});
