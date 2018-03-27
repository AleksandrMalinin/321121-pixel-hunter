const arrowLeftKey = 37;
const arrowRightKey = 39;
const screen = document.querySelector(`.central`);
const template = document.querySelectorAll(`template`);
let currentScreen = 0;

// приведение темплэйта к массиву
const screens = Array.from(template);

// получение клонированного содержимого темплэйта
const getTemplate = (array, number) => array[number].content.cloneNode(true);

// функция показа экрана
const changeScreen = (number) => {
  screen.innerHTML = ``;
  screen.appendChild(getTemplate(screens, number));
  return screen;
};

// экран приветствия
changeScreen(currentScreen);

document.addEventListener(`keydown`, (evt) => {
  if (evt.altKey && evt.keyCode === arrowRightKey && currentScreen < screens.length - 1) {
    currentScreen++;
  } else if (evt.altKey && evt.keyCode === arrowLeftKey && currentScreen > 0) {
    currentScreen--;
  }
  return changeScreen(currentScreen);
});
