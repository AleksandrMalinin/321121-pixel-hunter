import AbstractView from "./abstract-view";
import constants from "../constants";
import Application from "../application";
import FooterView from "./footer-view";

class RulesView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `
    <header class="header">
      <div class="header__back">
        <button class="back">
          <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
          <img src="img/logo_small.svg" width="101" height="44">
        </button>
      </div>
    </header>
    <div class="rules">
      <h1 class="rules__title">Правила</h1>
      <p class="rules__description">Угадай 10 раз для каждого изображения фото <img
        src="img/photo_icon.png" width="16" height="16"> или рисунок <img
        src="img/paint_icon.png" width="16" height="16" alt="">.<br>
        Фотографиями или рисунками могут быть оба изображения.<br>
        На каждую попытку отводится 30 секунд.<br>
        Ошибиться можно не более 3 раз.<br>
        <br>
        Готовы?
      </p>
      <form class="rules__form">
        <input class="rules__input" type="text" placeholder="Ваше Имя">
        <button class="rules__button  continue" type="submit" disabled>Go!</button>
      </form>
    </div>
    ${new FooterView().template}`;
  }

  bind() {
    const input = this.element.querySelector(`.rules__input`);
    const button = this.element.querySelector(`.rules__button`);
    const backButton = this.element.querySelector(`.back`);
    const form = this.element.querySelector(`.rules__form`);
    // имя не может состоять < чем из двух символов
    input.oninput = () => {
      button.disabled = input.value.length < constants.MIN_NAME_LENGTH;
    };

    button.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      Application.showGame(input.value);
      form.reset();
    });

    backButton.addEventListener(`click`, () => {
      Application.showGreeting();
    });
  }
}

export default RulesView;
