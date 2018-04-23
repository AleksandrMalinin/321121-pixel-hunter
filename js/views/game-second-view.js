import AbstractView from "./abstract-view";
import GameType from "../data/game-data";

class GameSecondView extends AbstractView {
  constructor(type) {
    super();
    this.question = type.question;
    this.images = type.images;
  }

  get template() {
    return `
    <div class="game">
      <p class="game__task">${this.question}</p>
      <form class="game__content  game__content--wide">
        <div class="game__option">
          <img src="${this.images.paint}" alt="Option 1" width="705" height="455">
          <label class="game__answer  game__answer--photo">
            <input name="question1" type="radio" value="photo">
            <span>Фото</span>
          </label>
          <label class="game__answer  game__answer--wide  game__answer--paint">
            <input name="question1" type="radio" value="paint">
            <span>Рисунок</span>
          </label>
        </div>
      </form>
    </div>`;
  }

  onAnswer() {
  }

  bind() {
    const form = this.element.querySelector(`.game__content`);

    form.onchange = (evt) => {
      let target = evt.target;
      let answer;

      if (target.tagName === `INPUT`) {
        answer = target;
      }

      const userAnswer = answer.value === GameType.second.answer.answer1;
      this.onAnswer(userAnswer);
      form.reset();
    };
  }
}

export default GameSecondView;
