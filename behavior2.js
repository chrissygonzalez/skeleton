// color constants
const pink = "#ffcfd5";
const red = "#de1447";
const black = "#000000";
const white = "#ffffff";
const blue = "#4b49b4";
const lime = "#ccff00";
const foregrounds = [red, white, lime];
const backgrounds = [pink, black, blue];

// get all the elements
const [body] = document.getElementsByTagName("body");
const [h1] = document.getElementsByTagName("h1");
const [h2] = document.getElementsByTagName("h2");
const [main] = document.getElementsByTagName("main");
const [content] = document.getElementsByClassName("content");
const editMenu = document.getElementById("edit-menu");
const foregroundPicker = document.getElementById("foreground");
const backgroundPicker = document.getElementById("background");
const [invertButton, serifButton, chiseledButton, wideButton, editButton] =
  document.getElementsByTagName("button");
const [theme1, theme2, theme3] = document.getElementsByClassName("color-theme");
const foregroundItems = [h1, h2, editButton];
const backgroundItems = [body, main, editButton];

// draw the little theme things
[...document.getElementsByClassName("color-theme-left")].forEach(
  (elem, index) =>
    elem.style.setProperty("background-color", backgrounds[index])
);
[...document.getElementsByClassName("color-theme-right")].forEach(
  (elem, index) =>
    elem.style.setProperty("background-color", foregrounds[index])
);

// color, font, and edit state
const pageState = {
  showEdit: false,
  foregroundColor: lime,
  backgroundColor: blue,
};

// functions to control edit mode
const toggleEditing = () => {
  pageState.showEdit = !pageState.showEdit;
  displayCurrentEditState();
};

const displayCurrentEditState = () => {
  if (pageState.showEdit) {
    content.classList.add("content-show-edit");
    editMenu.classList.add("show-edit");
    editButton.classList.add("editing");
    editButton.innerHTML = "&larr;";
  } else {
    content.classList.remove("content-show-edit");
    editMenu.classList.remove("show-edit");
    editButton.classList.remove("editing");
    editButton.innerHTML = "&rarr;";
  }
};

// functions to do things with color
const setColors = ({
  foreground = pageState.foregroundColor,
  background = pageState.backgroundColor,
}) => {
  pageState.foregroundColor = foreground;
  pageState.backgroundColor = background;
  changeColors();
};

const changeColors = () => {
  foregroundItems.forEach((item) =>
    item.style.setProperty("--main-text-color", pageState.foregroundColor)
  );
  backgroundItems.forEach((item) =>
    item.style.setProperty("--main-bg-color", pageState.backgroundColor)
  );
  foregroundPicker.value = pageState.foregroundColor;
  backgroundPicker.value = pageState.backgroundColor;
};

const invertColors = () => {
  const foreground =
    getComputedStyle(editButton).getPropertyValue("--main-bg-color");
  const background =
    getComputedStyle(editButton).getPropertyValue("--main-text-color");
  setColors({ foreground, background });
};

function pickForeground() {
  setColors({ foreground: this.value });
}

function pickBackground() {
  setColors({ background: this.value });
}

// functions to do things with fonts
const changeFont = (font) => {
  h1.style.setProperty("--font-family", font);
  h2.style.setProperty("--font-family", font);
};

// register event listeners
editButton.addEventListener("click", () => {
  toggleEditing();
});
theme1.addEventListener("click", () =>
  setColors({ foreground: red, background: pink })
);
theme2.addEventListener("click", () =>
  setColors({ foreground: white, background: black })
);
theme3.addEventListener("click", () =>
  setColors({ foreground: lime, background: blue })
);
invertButton.addEventListener("click", invertColors);
serifButton.addEventListener("click", () => changeFont("Caprasimo, cursive"));
chiseledButton.addEventListener("click", () =>
  changeFont("Bellota, sans-serif")
);
wideButton.addEventListener("click", () => changeFont("Unbounded, cursive"));
foregroundPicker.addEventListener("input", pickForeground);
backgroundPicker.addEventListener("input", pickBackground);

changeColors();
