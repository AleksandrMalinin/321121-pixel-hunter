import AbstractView from "./abstract-view";
import GameType from "../data/game-data";

class GameThirdView extends AbstractView {
  constructor(type) {
    super();
    this.question = type.question;
    this.images = type.images;
  }

  get template() {
    return `
    <div class="game">
      <p class="game__task">${this.question}</p>
      <form class="game__content  game__content--triple">
        <div class="game__option">
          <img src="${this.images.photo1}" alt="Option 1" width="304" height="455">
        </div>
        <div class="game__option  game__option--selected">
          <img src="${this.images.paint}" alt="Option 1" width="304" height="455">
        </div>
        <div class="game__option">
          <img src="${this.images.photo2}" alt="Option 1" width="304" height="455">
        </div>
      </form>
    </div>`;
  }

  onAnswer() {
  }

  bind() {
    const form = this.element.querySelector(`.game__content`);

    form.onclick = (evt) => {
      let target = evt.target;
      const userAnswer = target.children[0].src === GameType.third.answer.answer1;
      this.onAnswer(userAnswer);
    };
  }
}

export default GameThirdView;
