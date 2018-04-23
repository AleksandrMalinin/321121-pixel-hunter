import LoadView from "../views/load-view";
import changeScreen from "../logic/change-screen";
import renderGreetingScreen from "./greeting-screen";

const renderLoadScreen = () => {
  const loadScreen = new LoadView();

  loadScreen.onButtonClick = () => {
    changeScreen(renderGreetingScreen().element);
  };

  return loadScreen;
};

export default renderLoadScreen;
