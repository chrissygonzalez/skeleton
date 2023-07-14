const headState = {
  headline: 'Chrissy Gonzalez',
  tagline:
    'Chrissy Gonzalez is a frontend engineer and designer in Brooklyn, New York.',
  inEditMod: false,
};

const headline = document.getElementById('head');
const tagline = document.getElementById('tagline');
const headlineInput = document.getElementById('headInput');
const inputs = document.getElementById('inputs');

const editHeader = document.getElementsByTagName('button')[0];
const headlineButton = document.getElementsByTagName('button')[1];
const fontButton = document.getElementsByTagName('button')[2];

function turnOnEditHeadline() {
  headline.classList.add('hide');
  tagline.classList.add('hide');
  headlineInput.classList.remove('hide');
  headlineButton.classList.remove('hide');
  inputs.classList.remove('hide');
  createInputs();
}

function turnOffEditHeadline() {
  headline.innerText = headlineInput.value;
  headline.classList.remove('hide');
  tagline.classList.remove('hide');
  headlineInput.classList.add('hide');
  headlineButton.classList.add('hide');
  inputs.replaceChildren();
}

function createInputs() {
  const taglineInput = document.createElement('input');
  taglineInput.size = 75;
  taglineInput.value = tagline.textContent.replace(/\s+/g, ' ').trim();
  document.getElementById('inputs').append(taglineInput);
}

editHeader.addEventListener('click', function () {
  turnOnEditHeadline();
});
headline.addEventListener('click', function () {
  turnOnEditHeadline();
});
headlineInput.addEventListener('keydown', function (e) {
  if (e.key == 'Enter' || e.code == 'Enter') {
    headlineInput.size = headlineInput.value.length - 1;
    turnOffEditHeadline();
  } else if (e.key == 'Escape' || e.code == 'Escape') {
    headlineInput.value = headline.innerText;
    turnOffEditHeadline();
  }
});
headlineButton.addEventListener('click', function () {
  turnOffEditHeadline();
});
fontButton.addEventListener('click', function () {
  headline.classList.add('font');
});
