import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import {
  initialCards,
  formSettings,
  initialUserData,
  editButton,
  addButton,
  profileFormName,
  profileFormJob,
} from "../utils/constants.js";
import "./index.css";

/* **************************** */
/* Add form validation to forms */
/* **************************** */
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

/* ****************************** */
/* Declaration of UserInfo object */
/* ****************************** */
const userInfo = new UserInfo(initialUserData, {
  nameSelector: ".profile__name",
  jobSelector: ".profile__job",
});

/* ********************** */
/* Declarations of popups */
/* ********************** */
const cardForm = new PopupWithForm("form[name='card-form']", (data) => {
  console.log(data);
  cardGallery.addItem(data);
  cardForm.formElement.reset();
  formValidators["card-form"].disableButton();
  cardForm.close();
});
cardForm.setEventListeners();

const profileForm = new PopupWithForm("form[name='profile-form']", (data) => {
  userInfo.setUserInfo(data);
  profileForm.close();
});
profileForm.setEventListeners();

const picturePopup = new PopupWithImage(".popup__picture");
picturePopup.setEventListeners();

/* *********************************** */
/* Declaration of card gallery section */
/* *********************************** */
const cardGallery = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const card = new Card(data, ".card-template", (data) => {
        picturePopup.open(data);
      });
      const cardElement = card.generateCard();
      cardGallery.container.prepend(cardElement);
    },
  },
  ".gallery__cards"
);

cardGallery.renderItems();

/* ********************************* */
/* Event listeners for opening forms */
/* ********************************* */
editButton.addEventListener("click", function () {
  const data = userInfo.getUserInfo();
  profileFormName.value = data.name;
  profileFormJob.value = data.job;

  formValidators["profile-form"].resetValidation();
  profileForm.open();
});

addButton.addEventListener("click", function () {
  formValidators["card-form"].resetValidation();
  cardForm.open();
});
