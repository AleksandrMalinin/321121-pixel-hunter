// функция, возвращающая DOM элемент
const getElementFromTemplate = (markup) => {
  let domElement = document.createElement(`div`);
  domElement.innerHTML = markup;
  return domElement;
};

export default getElementFromTemplate;
