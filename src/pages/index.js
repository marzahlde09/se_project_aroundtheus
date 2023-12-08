import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupDeleteConfirmation from "../components/PopupDeleteConfirmation.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import {
  /*initialCards,*/
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

/* ************************* */
/* Declaration of Api object */
/* ************************* */
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  authorization: "a0548a22-3cdf-48eb-9822-7e7daf1b0604",
});

/* ****************************** */
/* Declaration of UserInfo object */
/* ****************************** */
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__job",
  avatarSelector: ".profile__avatar",
});

/* ********************** */
/* Declarations of popups */
/* ********************** */
const cardForm = new PopupWithForm("form[name='card-form']", (data) => {
  api
    .addNewCard({ name: data.name, link: data.link })
    .then((res) => (res.ok ? true : res.status))
    .then(() => {
      cardGallery.addItem(data);
      cardForm.close();
    })
    .catch((err) => console.error(err));
});
cardForm.setEventListeners();

const profileForm = new PopupWithForm("form[name='profile-form']", (data) => {
  api
    .editUserInfo({ name: data.name, job: data.job })
    .then((res) => (res.ok ? true : res.status))
    .then(() => {
      api
        .getUserInfo()
        .then((res) => (res.ok ? res.json() : res.status))
        .then((res) => {
          userInfo.setUserInfo(res);
        })
        .catch((err) => console.error(err));
    })
    .catch((err) => console.error(err));
  profileForm.close();
});
profileForm.setEventListeners();

const confirmDeletePopup = new PopupDeleteConfirmation(
  "form[name='delete-form']"
);
confirmDeletePopup.setEventListeners();

const picturePopup = new PopupWithImage(".popup__picture");
picturePopup.setEventListeners();

/* *********************************** */
/* Declaration of card gallery section */
/* *********************************** */
const cardGallery = new Section((data) => {
  const card = new Card(
    data,
    ".card-template",
    (data) => {
      picturePopup.open(data);
    },
    () => {
      confirmDeletePopup.setSubmitAction(() => {
        api.deleteCard(data._id);
        card.deleteCard();
        confirmDeletePopup.close();
      });
      confirmDeletePopup.open();
    }
  );
  const cardElement = card.generateCard();
  cardGallery.container.prepend(cardElement);
}, ".gallery__cards");
api
  .getCardInfo()
  .then((res) => (res.ok ? res.json() : res.status))
  .then((res) => {
    cardGallery.setItems(res);
    cardGallery.renderItems();
  })
  .catch((err) => console.error(err));

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
