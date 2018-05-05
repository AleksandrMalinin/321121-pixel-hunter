import constants from "./constants";

const DEFAULT_NAME = `Неопознанный вомбат`;
const APP_ID = 13111983;

const checkStatus = (response) => {
  if (response.ok) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

const toJSON = (response) => response.json();

export default class Loader {
  static loadData() {
    return fetch(`${constants.SERVER_URL}/questions`).
        then(checkStatus).
        then(toJSON);
  }

  static loadResults(name = DEFAULT_NAME) {
    return fetch(`${constants.SERVER_URL}/stats/${APP_ID}-${name}`).
        then(checkStatus).
        then(toJSON);
  }

  static saveResults(data, name = DEFAULT_NAME) {
    const requestSettings = {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };
    return fetch(`${constants.SERVER_URL}/stats/${APP_ID}-${name}`, requestSettings).
        then(checkStatus);
  }
}
