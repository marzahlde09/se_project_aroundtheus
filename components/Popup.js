export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popupElement = document
      .querySelector(this._popupSelector)
      .closest(".popup");
  }

  open() {
    this._popupElement.classList.add("popup_opened");
  }

  close() {
    this._popupElement.classList.remove("popup_opened");
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popupElement
      .querySelector(".popup__close-button")
      .addEventListener("click", () => {
        this.close();
      });

    this._popupElement.addEventListener("keydown", (evt) => {
      this._handleEscClose(evt);
    });

    this._popupElement.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains("popup_opened")) {
        this.close();
      }
    });
  }
}
