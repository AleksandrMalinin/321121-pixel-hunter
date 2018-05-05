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
      elem.onclick = () => {
        if (elem.classList.contains(`modal__yes`)) {
          this.onExitClick();
        } else {
          this.onContinueClick();
        }
      };
    });
  }

  onExitClick() {
  }

  onContinueClick() {
  }
}

export default ModalView;
