import getRandomNumber, {getElementFromTemplate} from "../util";
import gameState from "./game-state";
import changeScreen, {footer} from "./change-screen";
import GameType from "../data/game-data";
import GameFirstView from "../views/game-first-view";
import GameSecondView from "../views/game-second-view";
import GameThirdView from "../views/game-third-view";
import GameResultsView from "../views/game-results-view";
import StatisticView from "../views/statistic-view";
import renderHeader from "../screens/header-screen";

const gameScreen = document.querySelector(`.central`);

export const gameType = [new GameFirstView(GameType.first), new GameSecondView(GameType.second), new GameThirdView(GameType.third)];

export const renderScreen = (game) => {
  gameScreen.innerHTML = ``;
  gameScreen.appendChild(renderHeader(gameState).element);
  gameScreen.appendChild(game.element);
  gameScreen.appendChild(new StatisticView(gameState.answers).element);
  gameScreen.appendChild(getElementFromTemplate(footer));
};

const onUserAnswer = (userAnswer) => {
  gameState.answers.push({correct: userAnswer, time: 15});

  if (!userAnswer) {
    gameState.lives--;
  }

  if (gameState.answers.length === 10 || gameState.lives === 0) {
    const answerWrong = gameState.answers.filter((answer) => {
      return answer.correct === false;
    });
    gameState.win = answerWrong < 3 ? true : false;
    changeScreen(new GameResultsView(gameState).element);
  } else {
    renderScreen(gameType[getRandomNumber(0, 2)]);
  }
};

gameType.forEach((element) => {
  element.onAnswer = onUserAnswer;
});
