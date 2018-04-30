import GreetingView from "./views/greeting-view";
import RulesView from "./views/rules-view";
import GameScreen from "./logic/game-screen";
import GameModel from "./logic/game-model";
import LoadView from "./views/load-view";
import GameResultsView from "./views/game-results-view";

const changeScreen = (domElement) => {
  const screen = document.querySelector(`.central`);
  screen.innerHTML = ``;
  screen.appendChild(domElement);
};

class Application {
  static showLoad() {
    const load = new LoadView();
    changeScreen(load.element);
  }

  static showGreeting() {
    const greeting = new GreetingView();
    changeScreen(greeting.element);
  }

  static showRules() {
    const rules = new RulesView();
    changeScreen(rules.element);
  }

  static showGame(player) {
    const game = new GameScreen(new GameModel(player));
    changeScreen(game.element);
    game.init();
  }

  static showResults(state) {
    const results = new GameResultsView(state);
    changeScreen(results.element);
  }
}

export default Application;
