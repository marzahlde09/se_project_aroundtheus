export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  _handleDeleteCard() {
    this._card.remove();
  }

  _handleLike() {
    this._card
      .querySelector(".card__like")
      .classList.toggle("card__like_active");
  }

  _setEventListeners() {
    this._card.querySelector(".card__delete").addEventListener("click", () => {
      this._handleDeleteCard();
    });
    this._card.querySelector(".card__like").addEventListener("click", () => {
      this._handleLike();
    });
    this._cardImageElement.addEventListener("click", () => {
      this._handleImageClick(this);
    });
  }

  generateCard() {
    this._card = this._getTemplate();
    this._cardImageElement = this._card.querySelector(".card__image");

    this._cardImageElement.src = this._link;
    this._cardImageElement.alt = this._name;
    this._card.querySelector(".card__title").textContent = this._name;

    this._setEventListeners();

    return this._card;
  }
}
