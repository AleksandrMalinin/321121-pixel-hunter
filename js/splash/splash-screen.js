import AbstractView from "../views/abstract-view";

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
    </div>`;
  }

  fadeOut() {
    this.element.classList.add(`fade--out`);
  }
}

export default SplashScreen;
