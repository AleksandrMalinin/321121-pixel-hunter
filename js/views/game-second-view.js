import AbstractView from "./abstract-view";

class GameSecondView extends AbstractView {
  constructor(level) {
    super();
    this.question = level.question;
    this.answers = level.answers;
  }

  get template() {
    return `
    <div class="game">
      <p class="game__task">${this.question}</p>
      <form class="game__content  game__content--wide">
        <div class="game__option">
          <img src="${this.answers[0].image.url}" alt="Option 1" width="705" height="455">
          <label class="game__answer  game__answer--photo">
            <input name="question1" type="radio" value="photo">
            <span>Фото</span>
          </label>
          <label class="game__answer  game__answer--wide  game__answer--paint">
            <input name="question1" type="radio" value="painting">
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

    form.addEventListener(`change`, (evt) => {
      let target = evt.target;
      let answer;

      if (target.tagName === `INPUT`) {
        answer = target;
      }

      const userAnswer = answer.value === this.answers[0].type;
      this.onAnswer(userAnswer);
      form.reset();
    });
  }
}

export default GameSecondView;
