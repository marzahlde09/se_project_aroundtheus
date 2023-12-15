import Popup from "./Popup.js";

export default class PopupDeleteConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this.formElement = this._popupElement.querySelector(".form");
  }

  setSubmitAction(action) {
    this._handleSubmitCallback = action;
  }

  setEventListeners() {
    this.formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmitCallback();
    });

    super.setEventListeners();
  }
}
