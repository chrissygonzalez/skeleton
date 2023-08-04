// color constants
const pink = "#ffbac2";
const red = "#de1447";
const black = "#000000";
const white = "#ffffff";
const blue = "#4b49b4";
const lime = "#ccff00";
const foregrounds = [red, white, lime];
const backgrounds = [pink, black, blue];

// get all the elements
const [body] = document.getElementsByTagName("body");
const [headers] = document.getElementsByTagName("hgroup");
const [codeHeading, designHeading] = document.getElementsByTagName("h3");
const [main] = document.getElementsByTagName("main");
const editMenu = document.getElementById("edit-menu");
const [code, design] = document.getElementsByClassName("work-type");
const foregroundPicker = document.getElementById("foreground");
const backgroundPicker = document.getElementById("background");
const [invertButton, serifButton, cursiveButton, sansButton, editButton] =
  document.getElementsByTagName("button");
const [theme1, theme2, theme3] = document.getElementsByClassName("color-theme");
const foregroundItems = [headers, editButton, code, design];
const backgroundItems = [body, main, editButton];
const headlines = [headers];
const subheads = [codeHeading, designHeading];

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
    main.classList.add("main-show-edit");
    editMenu.classList.add("show-edit");
    editButton.classList.add("editing");
    editButton.innerHTML = "&larr;";
  } else {
    main.classList.remove("main-show-edit");
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
  foregroundItems.forEach((item) => {
    item.style.setProperty("--main-text-color", pageState.foregroundColor);
  });
  backgroundItems.forEach((item) =>
    item.style.setProperty("--main-bg-color", pageState.backgroundColor)
  );
  foregroundPicker.value = pageState.foregroundColor;
  backgroundPicker.value = pageState.backgroundColor;
  document.documentElement.style.setProperty(
    "--main-text-color",
    pageState.foregroundColor
  );
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
const fonts = {
  sans: {
    font: "Unbounded, cursive",
    size: "2.3rem",
    subSize: "1rem",
  },
  serif: {
    font: "Caprasimo, sans-serif",
    size: "2.5rem",
    subSize: "1.2rem",
  },
  cursive: {
    font: "Bellota, sans-serif",
    size: "2.4rem",
    subSize: "1.1rem",
  },
};

const changeFont = (style) => {
  headlines.forEach((item) => {
    item.style.setProperty("--font-family", fonts[style].font);
    item.style.setProperty("font-size", fonts[style].size);
  });
  subheads.forEach((item) => {
    item.style.setProperty("--font-family", fonts[style].font);
    item.style.setProperty("font-size", fonts[style].subSize);
  });
};

// register event listeners
editButton.addEventListener("click", () => {
  toggleEditing();
});
theme1.addEventListener("click", () => {
  setColors({ foreground: red, background: pink });
  changeFont("cursive");
});
theme2.addEventListener("click", () => {
  setColors({ foreground: white, background: black });
  changeFont("serif");
});
theme3.addEventListener("click", () => {
  setColors({ foreground: lime, background: blue });
  changeFont("sans");
});
invertButton.addEventListener("click", invertColors);
sansButton.addEventListener("click", () => changeFont("sans"));
serifButton.addEventListener("click", () => changeFont("serif"));
cursiveButton.addEventListener("click", () => changeFont("cursive"));
foregroundPicker.addEventListener("input", pickForeground);
backgroundPicker.addEventListener("input", pickBackground);

changeColors();
