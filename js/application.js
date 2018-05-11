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
  static async start() {
    const splash = new SplashScreen();
    const greeting = new GreetingView();
    greeting.hide();
    greeting.addElement(splash.element);
    changeScreen(greeting.element);
    try {
      gameData = await Loader.loadData();
      greeting.fadeIn();
      splash.fadeOut();
      setTimeout(() => {
        greeting.removeElement(splash.element);
      }, 3000);
    } catch (e) {
      showErrorMessage(e);
    }
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

  static async showResults(model) {
    const playerName = model.player;
    try {
      await Loader.saveResults(model.state, playerName);
      const results = new ManyResultsView(await Loader.loadResults(playerName), playerName);
      changeScreen(results.element);
    } catch (e) {
      showErrorMessage(e);
    }
  }
}

export default Application;
