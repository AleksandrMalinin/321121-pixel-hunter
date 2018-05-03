import AbstractView from "../views/abstract-view";
import FooterView from "../views/footer-view";

class SplashScreen extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `
    <div id="main" class="central__content">
      <div id="intro" class="intro">
        <h1 class="intro__asterisk load">*</h1>
        <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
      </div>
    </div>
    ${new FooterView().template}`;
  }

  start() {
    this.timeout = setTimeout(() => this.start(), 4000);
  }

  stop() {
    clearTimeout(this.timeout);
  }
}

export default SplashScreen;
