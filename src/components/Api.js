export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  /*getUserInfo() {
    fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
      .then((res) => (res.ok ? res.json() : res.status))
      .then((res) => {
        return {
          name: res.name,
          job: res.about,
          avatar: res.avatar,
        };
      })
      .catch((err) => console.error(err));
  }*/
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    });
  }

  getCardInfo() {
    fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    })
      .then((res) => (res.ok ? res.json() : res.status))
      .then((res) => {
        return res;
      })
      .catch((err) => console.error(err));
  }

  editUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.job,
      }),
    });
  }
}
