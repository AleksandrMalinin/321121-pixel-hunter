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
  static async loadData() {
    const response = await fetch(`${constants.SERVER_URL}/questions`);
    checkStatus(response);
    return await toJSON(response);
  }

  static async loadResults(name = DEFAULT_NAME) {
    const response = await fetch(`${constants.SERVER_URL}/stats/${APP_ID}-${name}`);
    checkStatus(response);
    return await toJSON(response);
  }

  static async saveResults(data, name = DEFAULT_NAME) {
    const requestSettings = {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };
    const response = await fetch(`${constants.SERVER_URL}/stats/${APP_ID}-${name}`, requestSettings);
    return checkStatus(response);
  }
}

