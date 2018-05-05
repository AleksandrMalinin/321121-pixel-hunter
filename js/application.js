import GreetingView from "./views/greeting-view";
import RulesView from "./views/rules-view";
import GameScreen from "./logic/game-screen";
import GameModel from "./logic/game-model";
import SplashScreen from "./splash/splash-screen";
import {showErrorMessage} from "./util";
import Loader from "./loader";
import ManyResultsView from "./views/many-results-view";

const changeScreen = (domElement) => {
  const screen = document.querySelector(`.central`);
  screen.innerHTML = ``;
  screen.appendChild(domElement);
};

let gameData;

class Application {
  static start() {
    const splash = new SplashScreen();
    const greeting = new GreetingView();
    greeting.hide();
    greeting.addElement(splash.element);
    changeScreen(greeting.element);
    Loader.loadData().
        then((data) => {
          gameData = data;
          return gameData;
        }).
        then(() => greeting.fadeIn()).
        then(() =>splash.fadeOut()).
        then(() =>
          setTimeout(() => {
            greeting.removeElement(splash.element);
          }, 3000));
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
    const game = new GameScreen(new GameModel(gameData, player));
    changeScreen(game.element);
    game.init();
  }

  static showResults(model) {
    const playerName = model.player;
    Loader.saveResults(model.state, playerName).
        then(() => Loader.loadResults(playerName)).
        then((data) => {
          const results = new ManyResultsView(data, playerName);
          changeScreen(results.element);
        });
        // catch(showErrorMessage);
  }
}

export default Application;
