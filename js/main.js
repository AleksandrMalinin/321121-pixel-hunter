import changeScreen from './change-screen';
import greetingDomElement from './greeting';

const asterisk = document.querySelector(`.intro__asterisk`);

asterisk.addEventListener(`click`, () => {
  changeScreen(greetingDomElement);
});
