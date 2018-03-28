const constants = {
  arrowLeftKey: 37,
  arrowRightKey: 39,
};

const screen = document.querySelector(`.central`);
const greeting = document.getElementById(`greeting`);
const rules = document.getElementById(`rules`);
const gameFirst = document.getElementById(`game-1`);
const gameSecond = document.getElementById(`game-2`);
const gameThird = document.getElementById(`game-3`);
const stats = document.getElementById(`stats`);

let currentScreen = 0;

// запись экранов в массив
const screens = [greeting, rules, gameFirst, gameSecond, gameThird, stats];

// получение клонированного содержимого темплэйта
const getTemplate = (array, number) => array[number].content.cloneNode(true);

// функция показа экрана
const changeScreen = (number) => {
  screen.innerHTML = ``;
  screen.appendChild(getTemplate(screens, number));
};

// экран приветствия
changeScreen(currentScreen);

document.addEventListener(`keydown`, (evt) => {
  if (evt.altKey && evt.keyCode === constants.arrowRightKey && currentScreen < screens.length - 1) {
    currentScreen++;
  } else if (evt.altKey && evt.keyCode === constants.arrowLeftKey && currentScreen > 0) {
    currentScreen--;
  }
  return changeScreen(currentScreen);
});
