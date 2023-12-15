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
    this._isLiked = data.isLiked;
    this._id = data._id;
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
    this._cardTrash.addEventListener("click", () => {
      this._handleDeleteClick();
    });
    this._likeIcon.addEventListener("click", () => {
      this._handleLikeClick();
    });
    this._cardImageElement.addEventListener("click", () => {
      this._handleImageClick({ name: this._name, link: this._link });
    });
  }

  getId() {
    return this._id;
  }

  getIsLiked() {
    return this._isLiked;
  }

  deleteCard() {
    this._card.remove();
    this._card = null;
  }

  addLike() {
    this._likeIcon.classList.add("card__like_active");
    this._isLiked = true;
  }

  removeLike() {
    this._likeIcon.classList.remove("card__like_active");
    this._isLiked = false;
  }

  generateCard() {
    this._card = this._getTemplate();
    this._cardImageElement = this._card.querySelector(".card__image");
    this._likeIcon = this._card.querySelector(".card__like");
    this._cardTrash = this._card.querySelector(".card__delete");
    this._cardImageElement.src = this._link;
    this._cardImageElement.alt = this._name;
    this._card.querySelector(".card__name").textContent = this._name;
    if (this._isLiked) {
      this._likeIcon.classList.add("card__like_active");
    }

    this._setEventListeners();

    return this._card;
  }
}
