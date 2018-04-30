import AbstractView from "./abstract-view";
import constants from "../constants";
import FooterView from "./footer-view";

class GameFirstView extends AbstractView {
  constructor(level) {
    super();
    this.question = level.question;
    this.images = level.images;
    this.answer = level.answer;
  }

  get template() {
    return `
    <div class="game">
      <p class="game__task">${this.question}</p>
      <form class="game__content">
        <div class="game__option">
          <img src="${this.images.paint}" alt="Option 1" width="468" height="458">
          <label class="game__answer game__answer--photo">
            <input name="question1" type="radio" value="photo">
            <span>Фото</span>
          </label>
          <label class="game__answer game__answer--paint">
            <input name="question1" type="radio" value="paint">
            <span>Рисунок</span>
          </label>
        </div>
        <div class="game__option">
          <img src="${this.images.photo}" alt="Option 2" width="468" height="458">
          <label class="game__answer  game__answer--photo">
            <input name="question2" type="radio" value="photo">
            <span>Фото</span>
          </label>
          <label class="game__answer  game__answer--paint">
            <input name="question2" type="radio" value="paint">
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
    const radio = form.querySelectorAll(`[type=radio]`);

    form.addEventListener(`change`, () => {
      let checked = [];

      for (const item of radio) {
        // запись чекнутого элемента в массив
        if (item.checked) {
          checked.push(item);
        }
      }

      if (checked.length === constants.CHECKED_RADIO_COUNT) {
        const userAnswer = checked[0].value === this.answer.answer1 && checked[1].value === this.answer.answer2;
        this.onAnswer(userAnswer);
        form.reset();
      }
    });
  }
}

export default GameFirstView;