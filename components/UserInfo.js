export default class UserInfo {
  constructor({ name, job }, { nameSelector, jobSelector }) {
    this._name = name;
    this._job = job;
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
  }

  getUserInfo() {
    return {
      name: this._name,
      job: this._job,
    };
  }

  setUserInfo({ name, job }) {
    this._nameElement.textContent = name;
    this._jobElement.textContent = job;
    this._name = name;
    this._job = job;
  }
}
