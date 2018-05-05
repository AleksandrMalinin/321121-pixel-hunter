import HeaderView from "../views/header-view";
import Application from "../application";
import StatisticView from "../views/statistic-view";
import FooterView from "../views/footer-view";
import GameFirstView from "../views/game-first-view";
import GameSecondView from "../views/game-second-view";
import GameThirdView from "../views/game-third-view";
import ModalView from "../views/modal-view";

class GameScreen {
  constructor(model) {
    this.model = model;
    this.header = this.getHeader();
    this.content = this.getNeededView();
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

  getHeader() {
    const header = new HeaderView(this.model.state);
    header.onButtonClick = () => {
      this.stopGame();
      this.root.appendChild(this.getModal().element);
      this.root.lastChild.style = `position: fixed; top: 25%; left: 50%; transform: translateX( -50%); z-index: 1;`;
    };

    return header;
  }

  getModal() {
    const modal = new ModalView();
    modal.onExitClick = () => {
      Application.showGreeting();
    };
    modal.onContinueClick = () => {
      this.root.lastChild.remove();
      this.startTimer();
    };
    return modal;
  }

  stopGame() {
    clearInterval(this._interval);
  }

  startTimer() {
    this._interval = setInterval(() => {
      this.model.tick();
      if (this.model.state.time <= 0) {
        this.stopGame();
        this.userAnswer(false);
      }
      this.updateHeader();
    }, 1000);
  }

  getNeededView() {
    const gameType = this.model.data[this.model.state.level].type;
    let level;

    if (gameType === `two-of-two`) {
      level = new GameFirstView(this.model.getCurrentLevel());
    }

    if (gameType === `tinder-like`) {
      level = new GameSecondView(this.model.getCurrentLevel());
    }

    if (gameType === `one-of-three`) {
      level = new GameThirdView(this.model.getCurrentLevel());
    }
    return level;
  }

  init() {
    this.changeLevel();
    this.startTimer();
  }

  userAnswer(answer) {
    this.stopGame();
    this.model.addAnswer(answer);

    if (!answer) {
      this.model.die();
    }

    if (this.model.isDead() || !this.model.hasNextLevel()) {
      if (!this.model.isDead()) {
        this.model.win();
      }
      this.endGame();
    } else {
      this.model.nextLevel();
      this.init();
    }
  }

  endGame() {
    Application.showResults(this.model);
    this.model.restart();
  }

  updateHeader() {
    const header = this.getHeader();
    this.root.replaceChild(header.element, this.header.element);
    this.header = header;
  }

  updateStatistic() {
    const statistic = new StatisticView(this.model.state.answers);
    this.root.replaceChild(statistic.element, this.statistic.element);
    this.statistic = statistic;
  }

  changeLevel() {
    this.model.rebootTime();
    this.updateHeader();
    this.updateStatistic();

    const gameType = this.model.getCurrentLevel().type;
    let level;

    if (gameType === `two-of-two`) {
      level = new GameFirstView(this.model.getCurrentLevel());
    }

    if (gameType === `tinder-like`) {
      level = new GameSecondView(this.model.getCurrentLevel());
    }

    if (gameType === `one-of-three`) {
      level = new GameThirdView(this.model.getCurrentLevel());
    }

    level.onAnswer = this.userAnswer.bind(this);
    this.changeContentView(level);
  }

  changeContentView(view) {
    this.root.replaceChild(view.element, this.content.element);
    this.content = view;
  }
}

export default GameScreen;
