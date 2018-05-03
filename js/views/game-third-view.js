import AbstractView from "./abstract-view";

class GameThirdView extends AbstractView {
  constructor(level) {
    super();
    this.question = level.question;
    this.answers = level.answers;
    // this.answer = level.answer;
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
    console.log(answers);

    for (let i = 0; i <= answers.length; i++) {
      if (answers[i].type === answer) {
        answerUrl = answers[i].image.url;
        console.log(answers[i]);
      }
    }

    form.onclick = (evt) => {
      let target = evt.target;
      const userAnswer = target.children[0].src === answerUrl;
      console.log(answer);
      console.log(userAnswer);
      console.log(answers);
      this.onAnswer(userAnswer);
    };
  }
}

export default GameThirdView;
