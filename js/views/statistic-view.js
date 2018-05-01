import AbstractView from "./abstract-view";
import constants from "../constants";

const getAnswerType = (answer) => {
  let answerType = ``;
  if (answer.correct) {
    answerType = `correct`;
  }

  if (!answer.correct) {
    answerType = `wrong`;
  }

  if (answer.correct && answer.time < constants.LOWER_TIME_LIMIT) {
    answerType = `fast`;
  }

  if (answer.correct && answer.time > constants.HIGHER_TIME_LIMIT) {
    answerType = `slow`;
  }

  return answerType;
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
