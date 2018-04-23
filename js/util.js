// функция, возвращающая DOM элемент
export const getElementFromTemplate = (markup) => {
  let domElement = document.createElement(`div`);
  domElement.innerHTML = markup;
  return domElement;
};

// генератор случайного числа
const getRandomNumber = (minValue, maxValue) => {
  return Math.round(Math.random() * (maxValue - minValue) + minValue);
};

export default getRandomNumber;
