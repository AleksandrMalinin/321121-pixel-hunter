const screen = document.querySelector(`.central`);

const changeScreen = (domElement) => {
  screen.innerHTML = ``;
  screen.appendChild(domElement);
};

export default changeScreen;
