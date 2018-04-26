import HeaderView from "../views/header-view";
import changeScreen from "../logic/change-screen";
import renderGreetingScreen from "./greeting-screen";

const renderHeader = (state) => {
  const header = new HeaderView(state);

  header.onButtonClick = () => {
    changeScreen(renderGreetingScreen().element);
  };

  return header;
};

export default renderHeader;
