import AbstractView from "./abstract-view";
import Application from "../application";
import FooterView from "./footer-view";

class LoadView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `
    <div id="main" class="central__content">
      <div id="intro" class="intro">
        <h1 class="intro__asterisk">*</h1>
        <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
      </div>
    </div>
    ${new FooterView().template}`;
  }

  bind() {
    const asterisk = this.element.querySelector(`.intro__asterisk`);

    asterisk.onclick = () => {
      Application.showGreeting();
    };
  }
}

export default LoadView;
