import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

/* ********************************************* */
/* The first 6 cards that appear on webpage load */
/* ********************************************* */
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

/* ********************************* */
/* Declarations for webpage elements */
/* ********************************* */
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const picturePopup = document.querySelector(".popup__picture");
const picturePopupImage = picturePopup.querySelector(".picture__image");
const picturePopupDescription = picturePopup.querySelector(
  ".picture__description"
);
const cardGallery = document.querySelector(".gallery__cards");
const profileForm = document.forms["profile-form"];
const profileFormName = profileForm.elements["name"];
const profileFormDescription = profileForm.elements["description"];
const cardForm = document.forms["card-form"];
const closeButtons = document.querySelectorAll(".popup__close-button");

/* **************************** */
/* Add form validation to forms */
/* **************************** */
const formSettings = {
  formSelector: ".form",
  inputSelector: ".form__field",
  submitButtonSelector: ".form__submit",
  inactiveButtonClass: "form__submit_disabled",
  inputErrorClass: "form__field_type_error",
  errorClass: "form__input-error_active",
};

const formValidators = {};

const enableValidation = (formSettings) => {
  const formList = Array.from(
    document.querySelectorAll(formSettings.formSelector)
  );
  formList.forEach((formElement) => {
    const validator = new FormValidator(formSettings, formElement);
    const formName = formElement.getAttribute("name");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(formSettings);

/* ********************************* */
/* Event listeners for opening forms */
/* ********************************* */
editButton.addEventListener("click", function () {
  profileFormName.value = profileName.textContent;
  profileFormDescription.value = profileDescription.textContent;

  formValidators["profile-form"].resetValidation();
  openPopup(profileForm);
});

addButton.addEventListener("click", function () {
  formValidators["card-form"].resetValidation();
  openPopup(cardForm);
});

/* **************************************** */
/* Functions for opening and closing popups */
/* **************************************** */
const openPopup = function (popup) {
  popup.closest(".popup").classList.add("popup_opened");
  document.addEventListener("mousedown", closeOnOverlayClick);
  document.addEventListener("keydown", closeOnEscape);
};

const openPicturePopup = function (card) {
  picturePopupImage.src = card._link;
  picturePopupImage.alt = card._name;
  picturePopupDescription.textContent = card._name;
  openPopup(picturePopup);
};

const closePopup = function (popup) {
  popup.closest(".popup").classList.remove("popup_opened");
  document.removeEventListener("mousedown", closeOnOverlayClick);
  document.removeEventListener("keydown", closeOnEscape);
};

const closeOnOverlayClick = function (evt) {
  if (evt.target.classList.contains("popup_opened")) {
    closePopup(evt.target);
  }
};

const closeOnEscape = function (evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    openedPopup && closePopup(openedPopup);
  }
};

/* ************************************** */
/* Functions for handling form submission */
/* ************************************** */
const submitProfileForm = function (event) {
  event.preventDefault();

  profileName.textContent = profileFormName.value;
  profileDescription.textContent = profileFormDescription.value;

  closePopup(profileForm);
};

const submitCardForm = function (evt) {
  evt.preventDefault();
  const cardData = {
    name: evt.target.title.value,
    link: evt.target.link.value,
  };
  const cardElement = createCard(cardData);
  cardGallery.prepend(cardElement);
  evt.target.reset();
  formValidators["card-form"].disableButton();
  closePopup(evt.target);
};

/* ************************************ */
/* Event listeners for submitting forms */
/* ************************************ */
profileForm.addEventListener("submit", submitProfileForm);
cardForm.addEventListener("submit", submitCardForm);

/* ********************************* */
/* Event listeners for close buttons */
/* ********************************* */
closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});

/* ****************************************************** */
/* Function for creating cards and intial card generation */
/* ****************************************************** */
const createCard = function (data) {
  const card = new Card(data, ".card-template", openPicturePopup);
  return card.generateCard();
};

initialCards.forEach((data) => {
  const cardElement = createCard(data);
  cardGallery.append(cardElement);
});