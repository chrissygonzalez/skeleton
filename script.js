// color constants
const pink = "#fbc1ce";
const red = "#d8063b";
const black = "#000000";
const white = "#ffffff";
const blue = "#4b49b4";
const lime = "#ccff00";
const foregrounds = [red, white, lime];
const backgrounds = [pink, black, blue];

// get all the elements
const favicon = document.getElementById("favicon");
const [body] = document.getElementsByTagName("body");
const [headers] = document.getElementsByTagName("hgroup");
const [codeHeading, designHeading, linksHeading] =
  document.getElementsByTagName("h3");
const [main] = document.getElementsByTagName("main");
const editMenu = document.getElementById("edit-menu");
const [code, design] = document.getElementsByClassName("work-type");
const foregroundPicker = document.getElementById("foreground");
const backgroundPicker = document.getElementById("background");
const [
  closeButton,
  invertButton,
  serifButton,
  cursiveButton,
  sansButton,
  editButton,
] = document.getElementsByTagName("button");
const [theme1, theme2, theme3] = document.getElementsByClassName("color-theme");
const foregroundItems = [headers, editButton, code, design];
const backgroundItems = [body, main, editButton];
const headlines = [headers];
const subheads = [codeHeading, designHeading, linksHeading];
const [dialog] = document.getElementsByTagName("dialog");
const testScreens = document.getElementsByClassName("screenshot-link"); //rename
const [dialogHead] = document.getElementsByClassName("dialog-head");

// draw the little theme things
[...document.getElementsByClassName("color-theme-left")].forEach(
  (elem, index) =>
    elem.style.setProperty("background-color", backgrounds[index])
);
[...document.getElementsByClassName("color-theme-right")].forEach(
  (elem, index) =>
    elem.style.setProperty("background-color", foregrounds[index])
);

// color, font, edit, and modal content state
const pageState = {
  showEdit: false,
  foregroundColor: lime,
  backgroundColor: blue,
  dialogImages: [],
};

const setFavicon = () => {
  const faviconData = `<svg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'><g clip-path='url(#clip0_1623_2)'><circle cx='16' cy='16' r='16' fill='${pageState.foregroundColor}'/><path d='M16.776 26.936C14.6853 26.936 12.808 26.52 11.144 25.688C9.50133 24.8347 8.2 23.576 7.24 21.912C6.28 20.2267 5.8 18.168 5.8 15.736C5.8 13.7733 6.248 11.9387 7.144 10.232C8.04 8.52533 9.27733 7.16 10.856 6.136C12.4347 5.112 14.2053 4.6 16.168 4.6C18.024 4.6 19.6773 4.952 21.128 5.656C22.5787 6.33867 23.6987 7.27733 24.488 8.472C25.2987 9.66667 25.704 11 25.704 12.472C25.704 13.4107 25.4267 14.2213 24.872 14.904C24.3387 15.5867 23.5707 15.928 22.568 15.928C21.8213 15.928 21.2453 15.8 20.84 15.544C20.4347 15.288 20.008 14.8933 19.56 14.36C19.112 13.8267 18.6747 13.432 18.248 13.176C17.8427 12.8987 17.2453 12.76 16.456 12.76C15.4533 12.76 14.5893 13.144 13.864 13.912C13.16 14.6587 12.808 15.576 12.808 16.664C12.808 17.8373 13.1067 18.8293 13.704 19.64C14.3227 20.4293 15.1547 20.824 16.2 20.824C17.0107 20.824 17.6507 20.7067 18.12 20.472C18.6107 20.2373 19.1227 19.896 19.656 19.448C20.104 19.064 20.5093 18.776 20.872 18.584C21.256 18.392 21.7253 18.296 22.28 18.296C23.1333 18.296 23.8053 18.5627 24.296 19.096C24.7867 19.608 25.032 20.28 25.032 21.112C25.032 22.0933 24.6693 23.032 23.944 23.928C23.24 24.824 22.2587 25.5493 21 26.104C19.7413 26.6587 18.3333 26.936 16.776 26.936Z' fill='${pageState.backgroundColor}'/></g><defs><clipPath id='clip0_1623_2'><rect width='32' height='32' fill='white'/></clipPath></defs></svg>`;
  const encoded = "data:image/svg+xml;base64," + btoa(faviconData);
  favicon.setAttribute("href", encoded);
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
  foregroundPicker.value = pageState.foregroundColor;
  backgroundPicker.value = pageState.backgroundColor;
  document.documentElement.style.setProperty(
    "--main-text-color",
    pageState.foregroundColor
  );
  document.documentElement.style.setProperty(
    "--main-bg-color",
    pageState.backgroundColor
  );
  setFavicon();
};

const invertColors = () => {
  const bgColor = pageState.backgroundColor;
  const background = pageState.foregroundColor;
  const foreground = bgColor;
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
    subSize: "1.1rem",
  },
  serif: {
    font: "Caprasimo, sans-serif",
    size: "2.5rem",
    subSize: "1.2rem",
  },
  cursive: {
    font: "Bellota, sans-serif",
    size: "2.7rem",
    subSize: "1.3rem",
  },
};

const changeFont = (style) => {
  document.documentElement.style.setProperty(
    "--font-family",
    fonts[style].font
  );
  headlines.forEach((item) => {
    item.style.setProperty("font-size", fonts[style].size);
  });
  subheads.forEach((item) => {
    item.style.setProperty("font-size", fonts[style].subSize);
  });
};

// functions to do things with modal content
function setModalContent() {
  switch (this.dataset.name) {
    case "crab": {
      dialogHead.innerHTML = "PhotoCrab";
      break;
    }
    case "board": {
      dialogHead.innerHTML = "Single Board Computing";
      break;
    }
    case "mongo": {
      dialogHead.innerHTML = "MongoDB";
      break;
    }
    case "etsy": {
      dialogHead.innerHTML = "Etsy";
      break;
    }
    case "google": {
      dialogHead.innerHTML = "Google";
      break;
    }
  }
  dialog.showModal();
}

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

editButton.classList.remove("hide-edit");
changeColors();
setFavicon();

[...testScreens].forEach((link) =>
  link.addEventListener("click", setModalContent)
);
closeButton.addEventListener("click", () => dialog.close());
