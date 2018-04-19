import getElementFromTemplate from "../util";
import {templates} from "../data/game-data";
import gameState from "./game-state";
import changeScreen from "./change-screen";
import statsDomElement from "../screens/stats";
import {GameType} from "../data/game-data";
import headerTemplate from "../screens/header";
import getResultTemplate from "./result";

const CHECKED_RADIO_COUNT = 2;

const screen = document.querySelector(`.central`);

export const renderScreen = (template) => {
  screen.innerHTML = ``;
  const newTemplate = template.type(template.game);
  const gameScreen = screen.appendChild(getElementFromTemplate(headerTemplate(gameState)));
  gameScreen.appendChild(getElementFromTemplate(newTemplate));
  const game = gameScreen.querySelector(`.game`);
  game.appendChild(getElementFromTemplate(getResultTemplate(gameState.answers)));

  const form = gameScreen.querySelector(`.game__content`);
  const gameAnswer = form.querySelectorAll(`.game__answer`);
  const radio = form.querySelectorAll(`[type=radio]`);

  if (gameState.answers.length < 10) {
    if (gameState.lives === 0) {
      changeScreen(statsDomElement);
    }

    if (form.classList.contains(`game__content--wide`)) {
      gameAnswer.forEach(function (element) {
        element.addEventListener(`click`, (evt) => {
          let target = evt.target;
          let answer;

          if (target.tagName === `INPUT`) {
            answer = target;
          }
          if (answer.value === GameType.second.answer.answer1) {
            gameState.answers.push({correct: true, time: 15});
          } else {
            gameState.lives--;
            gameState.answers.push({correct: false, time: 15});
          }

          form.reset();
          renderScreen(templates[2]);
        });
      });
    } else if (form.classList.contains(`game__content--triple`)) {
      form.addEventListener(`click`, (evt) => {
        let target = evt.target;
        if (target.children[0].src === GameType.third.answer.answer1) {
          gameState.answers.push({correct: true, time: 15});
        } else {
          gameState.lives--;
          gameState.answers.push({correct: false, time: 15});
        }

        renderScreen(templates[0]);
      });
    } else {
      gameAnswer.forEach(function (element) {
        element.addEventListener(`click`, () => {
          let checked = [];

          for (const item of radio) {
            // запись чекнутого элемента в массив
            if (item.checked) {
              checked.push(item);
            }
          }

          if (checked.length === CHECKED_RADIO_COUNT) {
            if (checked[0].value === GameType.first.answer.answer1 && checked[1].value === GameType.first.answer.answer2) {
              gameState.answers.push({correct: true, time: 15});
            } else {
              gameState.lives--;
              gameState.answers.push({correct: false, time: 15});
            }
            form.reset();
            renderScreen(templates[1]);
          }
        });
      });
    }
  } else {
    const answerWrong = gameState.answers.filter((answer) => {
      return answer.correct === false;
    });
    gameState.win = answerWrong > 3 ? false : true;
    changeScreen(statsDomElement);
  }
};
