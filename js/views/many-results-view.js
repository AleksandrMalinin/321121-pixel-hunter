import AbstractView from "./abstract-view";
import FooterView from "./footer-view";
import GameResultsView from "./game-results-view";
import Application from "../application";
import constants from "../constants";

class ManyResultsView extends AbstractView {
  constructor(data) {
    super();
    this.data = data.reverse();
    this.win = this.data[0].win;
    this.results = [];

    // выодить только три последних результата
    for (let i = 0; i <= constants.MAX_RESULTS_NUMBER; i++) {
      this.results.push(new GameResultsView(this.data[i], i + 1).template);
    }
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
    </header>
    <div class="result">
      <h1>${this.win === true ? `Победа! 💁‍♂️` : `Поражение! 🤦‍`}</h1>
      ${this.results}
    </div>
    ${new FooterView().template}`;
  }

  bind() {
    const backButton = this.element.querySelector(`.back`);

    backButton.onclick = () => {
      Application.showGreeting();
    };
  }
}

export default ManyResultsView;
