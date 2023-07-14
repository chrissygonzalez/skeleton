const [h1] = document.getElementsByTagName("h1");
const [h2] = document.getElementsByTagName("h2");
const [main] = document.getElementsByTagName("main");
const [content] = document.getElementsByClassName("content");

const [pinkButton, blackButton, blueButton, invertButton, editButton] =
  document.getElementsByTagName("button");

const editMenu = document.getElementById("edit-menu");
let shouldShow = true;

const toggleEditing = () => {
  if (shouldShow) {
    content.classList.add("squish");
    editMenu.classList.add("show-edit");
    editButton.classList.add("editing");
    editButton.innerHTML = "&larr;";
    shouldShow = !shouldShow;
  } else {
    content.classList.remove("squish");
    editMenu.classList.remove("show-edit");
    editButton.classList.remove("editing");
    editButton.innerHTML = "&rarr;";
    shouldShow = !shouldShow;
  }
};

const invertColors = () => {
  const bgColor =
    getComputedStyle(editButton).getPropertyValue("--main-bg-color");
  const textColor =
    getComputedStyle(editButton).getPropertyValue("--main-text-color");
  changeColor(bgColor, textColor);
};

pinkButton.addEventListener("click", () => changeColor("#c70f18", "#ffb0b1"));
blackButton.addEventListener("click", () => changeColor("#fff", "#000"));
blueButton.addEventListener("click", () => changeColor("#ccff00", "#4b49b4"));
invertButton.addEventListener("click", invertColors);

editButton.addEventListener("click", () => {
  toggleEditing();
});

const changeColor = (textColor, bgColor) => {
  editButton.style.setProperty("--main-text-color", textColor);
  editButton.style.setProperty("--main-bg-color", bgColor);
  h1.style.setProperty("--main-text-color", textColor);
  h2.style.setProperty("--main-text-color", textColor);
  main.style.setProperty("--main-bg-color", bgColor);
};
