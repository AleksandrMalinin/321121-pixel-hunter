import AbstractView from "./abstract-view";

class ModalView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `
    <div class="modal">
      <p class="modal__text">Результаты текущей игры будут потеряны. <span>Выйти?</span></p>
      <div class="modal__container">
        <button class="modal__button modal__yes">Да</button>
        <button class="modal__button modal__no">Нет</button>
      </div>
    </div>`;
  }

  bind() {
    this.element.querySelectorAll(`.modal__button`).forEach((elem) => {
      elem.addEventListener(`click`, () => {
        if (elem.classList.contains(`modal__yes`)) {
          this.onExitClick();
        } else {
          this.onContinueClick();
        }
      });
    });

    this.element.style = `position: fixed; top: 0; left: 0; z-index: 1; width: 100%; height: 100vh; background-color: rgba(0, 0, 0, 0.2);`;
  }

  onExitClick() {
  }

  onContinueClick() {
  }
}

export default ModalView;
