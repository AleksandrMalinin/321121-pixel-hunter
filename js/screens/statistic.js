const getAnswerType = (answer) => {
  let answerType = ``;
  if (answer.correct) {
    answerType = `correct`;
  }

  if (!answer.correct) {
    answerType = `wrong`;
  }

  if (answer.correct && answer.time < 10) {
    answerType = `fast`;
  }

  if (answer.correct && answer.time > 20) {
    answerType = `slow`;
  }

  return answerType;
};

const getResultTemplate = (answers) => {
  const answersTypeArray = answers.map((answer) => getAnswerType(answer));
  return `
  <div class="stats">
    <ul class="stats">
    ${answersTypeArray.map((answerType) => `<li class="stats__result stats__result--${answerType}"></li>`)
      .join(``)}
    ${new Array(10 - answersTypeArray.length)
      .fill(`<li class="stats__result stats__result--unknown"></li>`)
      .join(``)}
    </ul>
  </div>`;
};

export default getResultTemplate;
