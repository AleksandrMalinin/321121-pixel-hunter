import AbstractView from "./abstract-view";
import StatisticView from "./statistic-view";
import {countPoints, getAnswersQuantity} from "../logic/game-statistic";
import renderGreetingScreen from "../screens/greeting-screen";
import changeScreen from "../logic/change-screen";
import constants from "../constants";

class GameResultsView extends AbstractView {
  constructor(state) {
    super();
    this.state = state.answers;
    this.state.win = state.win;
    this.statsview = new StatisticView(this.state).template;
    this.answerResult = getAnswersQuantity(state);
    this.totalResult = countPoints(this.answerResult);
  }

  get template() {
    return `
    <header class="header">
      <div class="header__back">
        <button class="back">
          <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
          <img src="img/logo_small.svg" width="101" height="44">
        </button>
      </div>
    </header>
    <div class="result">
      <h1>${this.state.win === true ? `Победа! 💁‍♂️` : `Поражение! 🤦‍`}</h1>
      <table class="result__table">
        <tr>
          <td class="result__number">1.</td>
          <td colspan="2">
            ${this.statsview}
          </td>
          <td class="result__points">×&nbsp;100</td>
          <td class="result__total">${this.answerResult.correct * constants.CORRECT_ANSWER}</td>
        </tr>
        <tr>
          <td></td>
          <td class="result__extra">Бонус за скорость:</td>
          <td class="result__extra">${this.answerResult.fast}&nbsp;<span class="stats__result stats__result--fast"></span></td>
          <td class="result__points">×&nbsp;50</td>
          <td class="result__total">${this.answerResult.fast * constants.ADDITIONAL_POINTS}</td>
        </tr>
        <tr>
          <td></td>
          <td class="result__extra">Бонус за жизни:</td>
          <td class="result__extra">${this.answerResult.lives}&nbsp;<span class="stats__result stats__result--alive"></span></td>
          <td class="result__points">×&nbsp;50</td>
          <td class="result__total">${this.answerResult.lives * constants.ADDITIONAL_POINTS}</td>
        </tr>
        <tr>
          <td></td>
          <td class="result__extra">Штраф за медлительность:</td>
          <td class="result__extra">${this.answerResult.lives}&nbsp;<span class="stats__result stats__result--slow"></span></td>
          <td class="result__points">×&nbsp;50</td>
          <td class="result__total">${this.answerResult.slow * -constants.ADDITIONAL_POINTS}</td>
        </tr>
        <tr>
          <td colspan="5" class="result__total  result__total--final">${this.totalResult}</td>
        </tr>
      </table>
      <table class="result__table">
        <tr>
          <td class="result__number">2.</td>
          <td>
            <ul class="stats">
              <li class="stats__result stats__result--wrong"></li>
              <li class="stats__result stats__result--slow"></li>
              <li class="stats__result stats__result--fast"></li>
              <li class="stats__result stats__result--correct"></li>
              <li class="stats__result stats__result--wrong"></li>
              <li class="stats__result stats__result--unknown"></li>
              <li class="stats__result stats__result--slow"></li>
              <li class="stats__result stats__result--wrong"></li>
              <li class="stats__result stats__result--fast"></li>
              <li class="stats__result stats__result--wrong"></li>
            </ul>
          </td>
          <td class="result__total"></td>
          <td class="result__total  result__total--final">fail</td>
        </tr>
      </table>
      <table class="result__table">
        <tr>
          <td class="result__number">3.</td>
          <td colspan="2">
            <ul class="stats">
              <li class="stats__result stats__result--wrong"></li>
              <li class="stats__result stats__result--slow"></li>
              <li class="stats__result stats__result--fast"></li>
              <li class="stats__result stats__result--correct"></li>
              <li class="stats__result stats__result--wrong"></li>
              <li class="stats__result stats__result--unknown"></li>
              <li class="stats__result stats__result--slow"></li>
              <li class="stats__result stats__result--unknown"></li>
              <li class="stats__result stats__result--fast"></li>
              <li class="stats__result stats__result--unknown"></li>
            </ul>
          </td>
          <td class="result__points">×&nbsp;100</td>
          <td class="result__total">900</td>
        </tr>
        <tr>
          <td></td>
          <td class="result__extra">Бонус за жизни:</td>
          <td class="result__extra">2&nbsp;<span class="stats__result stats__result--alive"></span></td>
          <td class="result__points">×&nbsp;50</td>
          <td class="result__total">100</td>
        </tr>
        <tr>
          <td colspan="5" class="result__total  result__total--final">950</td>
        </tr>
      </table>
    </div>`;
  }

  bind() {
    const backButton = this.element.querySelector(`.back`);

    backButton.onclick = () => {
      changeScreen(renderGreetingScreen().element);
    };
  }
}

export default GameResultsView;
