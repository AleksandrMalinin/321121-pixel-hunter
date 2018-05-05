import AbstractView from "./abstract-view";
import constants from "../constants";

const getAnswerType = (answer) => {
  if (!answer.correct) {
    return `wrong`;
  }

  if (answer.correct && answer.time < constants.LOWER_TIME_LIMIT) {
    return `fast`;
  }

  if (answer.correct && answer.time > constants.HIGHER_TIME_LIMIT) {
    return `slow`;
  }

  return `correct`;
};

class StatisticView extends AbstractView {
  constructor(answers) {
    super();
    this.answers = answers;
    this.answersType = this.answers.map((answer) => getAnswerType(answer));
  }

  get template() {
    return `
    <div class="stats">
      <ul class="stats">
      ${this.answersType.map((answerType) => `<li class="stats__result stats__result--${answerType}"></li>`)
      .join(``)}
      ${new Array(10 - this.answersType.length)
      .fill(`<li class="stats__result stats__result--unknown"></li>`)
      .join(``)}
      </ul>
    </div>`;
  }
}

export default StatisticView;
