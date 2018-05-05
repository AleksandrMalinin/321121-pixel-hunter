import AbstractView from "./abstract-view";
import StatisticView from "./statistic-view";
import {countPoints, getAnswersQuantity} from "../logic/game-statistic";
import constants from "../constants";

class GameResultsView extends AbstractView {
  constructor(state, index) {
    super();
    this.index = index;
    this.state = state;
    this.answers = this.state.answers;
    this.win = this.state.win;
    this.statsview = new StatisticView(this.answers).template;
    this.answerResult = getAnswersQuantity(state);
    this.totalResult = countPoints(this.answerResult);
  }

  get template() {
    return `
          <table class="result__table">
        <tr>
          <td class="result__number">${this.index}</td>
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
      </table>`;
  }
}

export default GameResultsView;
