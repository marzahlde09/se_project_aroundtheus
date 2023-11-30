import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popupElement.querySelector("img");
    this._popupCaption = this._popupElement.querySelector("figcaption");
  }

  open({ name, link }) {
    this._popupImage.alt = name;
    this._popupImage.src = link;
    this._popupCaption.textContent = name;
    super.open();
  }
}
