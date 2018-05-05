export const getElementFromTemplate = (markup) => {
  let domElement = document.createElement(`div`);
  domElement.innerHTML = markup;
  return domElement;
};

export const showErrorMessage = (message) => {
  const template = document.createElement(`div`);
  template.textContent = message;

  const styles = [
    `position: fixed`,
    `top: 25%`,
    `left: 50%`,
    `z-index: 100`,
    `width: 800px`,
    `padding: 20px`,
    `color: #fff`,
    `text-align: center`,
    `transform: translate(-50%, -50%)`,
    `border-radius: 2px`,
    `background-color: #DC143C`
  ];

  template.style.cssText = styles.join(`;`);
  document.body.appendChild(template);
};
