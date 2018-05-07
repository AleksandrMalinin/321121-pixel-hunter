import HeaderView from "../views/header-view";
import Application from "../application";
import StatisticView from "../views/statistic-view";
import FooterView from "../views/footer-view";
import GameFirstView from "../views/game-first-view";
import GameSecondView from "../views/game-second-view";
import GameThirdView from "../views/game-third-view";
import ModalView from "../views/modal-view";

const getLevel = (game, model) => {
  if (game === `two-of-two`) {
    return new GameFirstView(model.getCurrentLevel());
  }
  if (game === `tinder-like`) {
    return new GameSecondView(model.getCurrentLevel());
  }
  return new GameThirdView(model.getCurrentLevel());
};

class GameScreen {
  constructor(model) {
    this.model = model;
    this.header = this._getHeader();
    this.content = this._getNeededView();
    this.statistic = new StatisticView(this.model.state.answers);
    this.footer = new FooterView();

    this.root = document.createElement(`div`);
    this.root.appendChild(this.header.element);
    this.root.appendChild(this.content.element);
    this.root.appendChild(this.statistic.element);
    this.root.appendChild(this.footer.element);

    this._interval = null;
  }

  get element() {
    return this.root;
  }

  _getHeader() {
    const header = new HeaderView(this.model.state);
    header.onButtonClick = () => {
      this._stopGame();
      this.root.appendChild(this._getModal().element);
    };

    return header;
  }

  _getModal() {
    const modal = new ModalView();
    modal.onExitClick = () => {
      Application.showGreeting();
    };
    modal.onContinueClick = () => {
      this.root.lastChild.remove();
      this._startTimer();
    };
    return modal;
  }

  _stopGame() {
    clearInterval(this._interval);
  }

  _startTimer() {
    this._interval = setInterval(() => {
      this.model.tick();
      if (this.model.state.time <= 0) {
        this._stopGame();
        this._userAnswer(false);
      }
      this._updateHeader();
    }, 1000);
  }

  _getNeededView() {
    const gameType = this.model.data[this.model.state.level].type;
    return getLevel(gameType, this.model);
  }

  init() {
    this._changeLevel();
    this._startTimer();
  }

  _userAnswer(answer) {
    this._stopGame();
    this.model.addAnswer(answer);

    if (!answer) {
      this.model.die();
    }

    if (this.model.isDead() || !this.model.hasNextLevel()) {
      if (!this.model.isDead()) {
        this.model.win();
      }
      this._endGame();
    } else {
      this.model.nextLevel();
      this.init();
    }
  }

  _endGame() {
    Application.showResults(this.model);
    this.model.restart();
  }

  _updateHeader() {
    const header = this._getHeader();
    this.root.replaceChild(header.element, this.header.element);
    this.header = header;
  }

  _updateStatistic() {
    const statistic = new StatisticView(this.model.state.answers);
    this.root.replaceChild(statistic.element, this.statistic.element);
    this.statistic = statistic;
  }

  _changeLevel() {
    this.model.rebootTime();
    this._updateHeader();
    this._updateStatistic();

    const gameType = this.model.getCurrentLevel().type;
    const level = getLevel(gameType, this.model);
    level.onAnswer = this._userAnswer.bind(this);
    this._changeContentView(level);
  }

  _changeContentView(view) {
    this.root.replaceChild(view.element, this.content.element);
    this.content = view;
  }
}

export default GameScreen;
