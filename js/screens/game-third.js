const gameThirdTemplate = (type) => {
  return `
  <div class="game">
    <p class="game__task">${type.question}</p>
    <form class="game__content  game__content--triple">
      <div class="game__option">
        <img src="${type.images.photo1}" alt="Option 1" width="304" height="455">
      </div>
      <div class="game__option  game__option--selected">
        <img src="${type.images.paint}" alt="Option 1" width="304" height="455">
      </div>
      <div class="game__option">
        <img src="${type.images.photo2}" alt="Option 1" width="304" height="455">
      </div>
    </form>
  </div>
  <footer class="footer">
    <a href="https://htmlacademy.ru" class="social-link social-link--academy">HTML Academy</a>
    <span class="footer__made-in">Сделано в <a href="https://htmlacademy.ru" class="footer__link">HTML Academy</a> &copy; 2016</span>
    <div class="footer__social-links">
      <a href="https://twitter.com/htmlacademy_ru" class="social-link  social-link--tw">Твиттер</a>
      <a href="https://www.instagram.com/htmlacademy/" class="social-link  social-link--ins">Инстаграм</a>
      <a href="https://www.facebook.com/htmlacademy" class="social-link  social-link--fb">Фэйсбук</a>
      <a href="https://vk.com/htmlacademy" class="social-link  social-link--vk">Вконтакте</a>
    </div>
  </footer>`;
};

export default gameThirdTemplate;
