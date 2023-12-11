export default class Card {
  constructor(
    data,
    cardSelector,
    handleImageClick,
    handleDeleteClick,
    handleLikeClick
  ) {
    this._name = data.name;
    this._link = data.link;
    this.liked = data.isLiked;
    this.id = data._id;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this.card.querySelector(".card__delete").addEventListener("click", () => {
      this._handleDeleteClick();
    });
    this.card.querySelector(".card__like").addEventListener("click", () => {
      this._handleLikeClick();
    });
    this._cardImageElement.addEventListener("click", () => {
      this._handleImageClick({ name: this._name, link: this._link });
    });
  }

  deleteCard() {
    this.card.remove();
    this.card = null;
  }

  generateCard() {
    this.card = this._getTemplate();
    this._cardImageElement = this.card.querySelector(".card__image");
    this._cardImageElement.src = this._link;
    this._cardImageElement.alt = this._name;
    this.card.querySelector(".card__name").textContent = this._name;
    if (this.liked) {
      this.card.querySelector(".card__like").classList.add("card__like_active");
    }

    this._setEventListeners();

    return this.card;
  }
}
