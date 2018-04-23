import GreetingView from "../views/greeting-view";
import changeScreen from "../logic/change-screen";
import renderRulesScreen from "./rules-screen";

const renderGreetingScreen = () => {
  const greetingScreen = new GreetingView();

  greetingScreen.onButtonClick = () => {
    changeScreen(renderRulesScreen().element);
  };

  return greetingScreen;
};

export default renderGreetingScreen;
