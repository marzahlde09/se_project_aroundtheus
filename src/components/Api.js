export default class Api {
  constructor({ baseUrl, header }) {
    this._baseUrl = baseUrl;
    this._header = header;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return res.status;
    }
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._header,
    })
      .then((res) => this._checkResponse(res))
      .then((res) => {
        return res;
      })
      .catch((err) => console.error(err));
  }

  getCardInfo() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._header,
    })
      .then((res) => this._checkResponse(res))
      .then((res) => {
        return res;
      })
      .catch((err) => console.error(err));
  }

  editUserInfo({ name, job }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._header,
      body: JSON.stringify({
        name: name,
        about: job,
      }),
    })
      .then((res) => this._checkResponse(res))
      .then((res) => {
        return res;
      })
      .catch((err) => console.error(err));
  }

  editProfilePicture(link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._header,
      body: JSON.stringify({
        avatar: link,
      }),
    })
      .then((res) => this._checkResponse(res))
      .then((res) => {
        return res;
      })
      .catch((err) => console.error(err));
  }

  addNewCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._header,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    })
      .then((res) => this._checkResponse(res))
      .then((res) => {
        return res;
      })
      .catch((err) => console.error(err));
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._header,
    })
      .then((res) => this._checkResponse(res))
      .then((res) => {
        return res;
      })
      .catch((err) => console.error(err));
  }

  addLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._header,
    })
      .then((res) => this._checkResponse(res))
      .then((res) => {
        return res;
      })
      .catch((err) => console.error(err));
  }

  removeLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._header,
    })
      .then((res) => this._checkResponse(res))
      .then((res) => {
        return res;
      })
      .catch((err) => console.error(err));
  }
}
