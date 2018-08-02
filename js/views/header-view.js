import AbstractView from "./abstract-view";
import constants from "../constants";

class HeaderView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
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
      <h1 class="game__timer">${this.state.time}</h1>
      <div class="game__lives">
        ${new Array(constants.INITIAL_STATE.lives - this.state.lives)
      .fill(`<img src="img/heart__empty.svg" class="game__heart" alt="Life" width="32" height="32">`)
      .join(``)}
        ${new Array(this.state.lives)
      .fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="32" height="32">`)
      .join(``)}
      </div>
    </header>`;
  }

  bind() {
    this.element.querySelector(`.back`).addEventListener(`click`, () => {
      this.onButtonClick();
      this.stopFlashing();
    });

    if (this.state.time <= constants.LAST_SEC) {
      this.element.querySelector(`.game__timer`).classList.add(`flashing`);
    }
  }

  onButtonClick() {
  }

  stopFlashing() {
    this.element.querySelector(`.game__timer`).classList.remove(`flashing`);
  }
}

export default HeaderView;
