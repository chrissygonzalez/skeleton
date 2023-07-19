const [body] = document.getElementsByTagName("body");
const [h1] = document.getElementsByTagName("h1");
const [h2] = document.getElementsByTagName("h2");
const [main] = document.getElementsByTagName("main");
const [content] = document.getElementsByClassName("content");

const [
  pinkButton,
  blackButton,
  blueButton,
  invertButton,
  serifButton,
  chiseledButton,
  wideButton,
  editButton,
] = document.getElementsByTagName("button");

const [theme1, theme2, theme3] = document.getElementsByClassName("color-theme");
const [left1, left2, left3] =
  document.getElementsByClassName("color-theme-left");
const [right1, right2, right3] =
  document.getElementsByClassName("color-theme-right");

const pink = "#ffcfd5";
const red = "#de1447";
const black = "#000";
const white = "#fff";
const blue = "#4b49b4";
const lime = "#ccff00";

const editMenu = document.getElementById("edit-menu");
let shouldShow = true;

pinkButton.style.setProperty("background-color", pink);
blackButton.style.setProperty("background-color", black);
blueButton.style.setProperty("background-color", blue);

const toggleEditing = () => {
  if (shouldShow) {
    content.classList.add("content-show-edit");
    editMenu.classList.add("show-edit");
    editButton.classList.add("editing");
    editButton.innerHTML = "&larr;";
    shouldShow = !shouldShow;
  } else {
    content.classList.remove("content-show-edit");
    editMenu.classList.remove("show-edit");
    editButton.classList.remove("editing");
    editButton.innerHTML = "&rarr;";
    shouldShow = !shouldShow;
  }
};

const changeColor = (textColor, bgColor) => {
  editButton.style.setProperty("--main-text-color", textColor);
  editButton.style.setProperty("--main-bg-color", bgColor);
  h1.style.setProperty("--main-text-color", textColor);
  h2.style.setProperty("--main-text-color", textColor);
  main.style.setProperty("--main-bg-color", bgColor);
  body.style.setProperty("--main-bg-color", bgColor);
};

const invertColors = () => {
  const bgColor =
    getComputedStyle(editButton).getPropertyValue("--main-bg-color");
  const textColor =
    getComputedStyle(editButton).getPropertyValue("--main-text-color");
  changeColor(bgColor, textColor);
};

const changeFont = (font) => {
  h1.style.setProperty("--font-family", font);
  h2.style.setProperty("--font-family", font);
};

editButton.addEventListener("click", () => {
  toggleEditing();
});

pinkButton.addEventListener("click", () => changeColor(red, pink));
blackButton.addEventListener("click", () => changeColor(white, black));
blueButton.addEventListener("click", () => changeColor(lime, blue));
invertButton.addEventListener("click", invertColors);

serifButton.addEventListener("click", () => changeFont("Caprasimo, cursive"));
chiseledButton.addEventListener("click", () =>
  changeFont("Bellota, sans-serif")
);
wideButton.addEventListener("click", () => changeFont("Unbounded, cursive"));
