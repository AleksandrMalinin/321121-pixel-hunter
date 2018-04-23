import RulesView from "../views/rules-view";
import {renderScreen} from "../logic/game";
import {gameType} from "../logic/game";
import getRandomNumber from "../util";

const renderRulesScreen = () => {
  const rulesScreen = new RulesView();

  rulesScreen.onButtonClick = () => {
    renderScreen(gameType[getRandomNumber(0, 2)]);
  };

  return rulesScreen;
};

export default renderRulesScreen;
