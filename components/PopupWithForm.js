import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this.formElement = this._popupElement.querySelector(".form");
    this._submitForm = submitForm;
  }

  _getInputValues() {
    const inputFields = Array.from(
      this.formElement.querySelectorAll(".form__field")
    );
    const data = {};
    inputFields.forEach((field) => {
      data[`${field.name}`] = field.value;
    });
    return data;
  }

  setEventListeners() {
    this.formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitForm(this._getInputValues());
    });

    super.setEventListeners();
  }
}