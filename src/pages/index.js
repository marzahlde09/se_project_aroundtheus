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
  editButton,
  addButton,
  avatarButton,
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
  header: {
    authorization: "a0548a22-3cdf-48eb-9822-7e7daf1b0604",
    "Content-Type": "application/json",
  },
});

/* ****************************** */
/* Declaration of UserInfo object */
/* ****************************** */
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__job",
  avatarSelector: ".profile__picture",
});

/* ********************** */
/* Declarations of popups */
/* ********************** */
const avatarForm = new PopupWithForm("form[name='avatar-form']", (data) => {
  avatarForm.renderLoading(true);
  api
    .editProfilePicture(data.link)
    .then(() => {
      userInfo.setAvatar(data.link);
      avatarForm.close();
    })
    .catch((err) => console.error(err))
    .finally(() => {
      avatarForm.renderLoading(false);
    });
});
avatarForm.setEventListeners();

const cardForm = new PopupWithForm("form[name='card-form']", (data) => {
  cardForm.renderLoading(true);
  api
    .addNewCard({ name: data.name, link: data.link })
    .then((res) => {
      cardGallery.prependItem(res);
      cardForm.close();
    })
    .catch((err) => console.error(err))
    .finally(() => {
      cardForm.renderLoading(false);
    });
});
cardForm.setEventListeners();

const profileForm = new PopupWithForm("form[name='profile-form']", (data) => {
  profileForm.renderLoading(true);
  api
    .editUserInfo({ name: data.name, job: data.job })
    .then(() => {
      userInfo.setUserInfo({ name: data.name, about: data.job });
      profileForm.close();
    })
    .catch((err) => console.error(err))
    .finally(() => {
      profileForm.renderLoading(false);
    });
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
      picturePopup.open({ name: data.name, link: data.link });
    },
    () => {
      confirmDeletePopup.setSubmitAction(() => {
        api
          .deleteCard(data._id)
          .then(() => {
            card.deleteCard();
            confirmDeletePopup.close();
          })
          .catch((err) => console.error(err));
      });
      confirmDeletePopup.open();
    },
    () => {
      if (card.getIsLiked()) {
        api
          .removeLike(card.getId())
          .then(() => {
            card.removeLike();
          })
          .catch((err) => console.error(err));
      } else {
        api
          .addLike(card.getId())
          .then(() => {
            card.addLike();
          })
          .catch((err) => console.error(err));
      }
    }
  );
  const cardElement = card.generateCard();
  return cardElement;
}, ".gallery__cards");

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

avatarButton.addEventListener("click", function () {
  formValidators["avatar-form"].resetValidation();
  avatarForm.open();
});

/* ************************* */
/* Promises for initial data */
/* ************************* */
Promise.all([api.getUserInfo(), api.getCardInfo()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo({ name: userData.name, about: userData.about });
    userInfo.setAvatar(userData.avatar);
    cardGallery.setItems(cards);
    cardGallery.renderItems();
  })
  .catch((err) => console.error(err));
