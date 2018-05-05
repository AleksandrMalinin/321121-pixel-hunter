import AbstractView from "./abstract-view";

class GameThirdView extends AbstractView {
  constructor(level) {
    super();
    this.question = level.question;
    this.answers = level.answers;
  }

  get template() {
    return `
    <div class="game">
      <p class="game__task">${this.question}</p>
      <form class="game__content  game__content--triple">
        <div class="game__option">
          <img src="${this.answers[0].image.url}" alt="Option 1" width="304" height="455">
        </div>
        <div class="game__option  game__option--selected">
          <img src="${this.answers[1].image.url}" alt="Option 1" width="304" height="455">
        </div>
        <div class="game__option">
          <img src="${this.answers[2].image.url}" alt="Option 1" width="304" height="455">
        </div>
      </form>
    </div>`;
  }

  onAnswer() {
  }

  bind() {
    const form = this.element.querySelector(`.game__content`);
    const answer = this.question.includes(`фото`) ? `photo` : `painting`;
    const answers = this.answers.map((elem) => {
      return elem;
    });
    let answerUrl = ``;

    for (let item of answers) {
      if (item.type === answer) {
        answerUrl = item.image.url;
        break;
      }
    }

    form.addEventListener(`click`, (evt) => {
      let target = evt.target;
      const userAnswer = target.children[0].src === answerUrl;
      this.onAnswer(userAnswer);
    });
  }
}

export default GameThirdView;
