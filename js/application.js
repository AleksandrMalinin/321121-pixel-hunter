import GreetingView from "./views/greeting-view";
import RulesView from "./views/rules-view";
import GameScreen from "./logic/game-screen";
import GameModel from "./logic/game-model";
import GameResultsView from "./views/game-results-view";
import SplashScreen from "./splash/splash-screen";
import constants from "./constants";
import {showErrorMessage} from "./util";

const changeScreen = (domElement) => {
  const screen = document.querySelector(`.central`);
  screen.innerHTML = ``;
  screen.appendChild(domElement);
};

const checkStatus = (response) => {
  if (response.ok) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

let gameData;

class Application {
  static start() {
    const splash = new SplashScreen();
    changeScreen(splash.element);
    splash.start();
    window.fetch(constants.SERVER_URL).
        then(checkStatus).
        then((response) => response.json()).
        // then(() => {
        //   setTimeout(() => {
        //     this.showGreeting();
        //   }, 3000);
        // }).
        then(Application.showGreeting).
        catch(showErrorMessage).
        then(() => splash.stop());
  }

  static showGreeting(data) {
    gameData = data;
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

  static showResults(state) {
    const results = new GameResultsView(state);
    changeScreen(results.element);
  }
}

export default Application;
