import AbstractView from "./abstract-view";
import Application from "../application";
import FooterView from "./footer-view";

class GreetingView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `
    <div class="greeting central--blur">
      <div class="greeting__logo"><img src="img/logo_big.png" width="201" height="89" alt="Pixel Hunter"></div>
      <h1 class="greeting__asterisk">*</h1>
      <div class="greeting__challenge">
        <h3>Лучшие художники-фотореалисты бросают&nbsp;тебе&nbsp;вызов!</h3>
        <p>Правила игры просты.<br>
          Нужно отличить рисунок&nbsp;от фотографии и сделать выбор.<br>
          Задача кажется тривиальной, но не думай, что все так просто.<br>
          Фотореализм обманчив и коварен.<br>
          Помни, главное — смотреть очень внимательно.</p>
      </div>
      <div class="greeting__continue"><span><img src="img/arrow_right.svg" width="64" height="64" alt="Next"></span></div>
    </div>
    ${new FooterView().template}`;
  }

  bind() {
    const continueButton = this.element.querySelector(`.greeting__continue`);
    continueButton.onclick = () => {
      Application.showRules();
    };
  }

  hide() {
    this.element.children[0].style.opacity = `0`;
  }

  fadeIn() {
    this.element.children[1].style.opacity = `1`;
    this.element.children[1].classList.add(`fade--in`);
  }

  addElement(element) {
    this.element.insertAdjacentElement(`afterbegin`, element);
    this.element.children[0].style = `position: absolute; top: 0;`;
  }

  removeElement(element) {
    element.remove();
  }
}

export default GreetingView;
