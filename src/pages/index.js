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
  authorization: "a0548a22-3cdf-48eb-9822-7e7daf1b0604",
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
  avatarForm.submitButton.textContent = "Saving...";
  api
    .editProfilePicture(data.link)
    .then((res) => (res.ok ? true : res.status))
    .then(() => {
      userInfo.setAvatar(data.link);
    })
    .catch((err) => console.error(err))
    .finally(() => {
      avatarForm.submitButton.textContent = "Save";
      avatarForm.close();
    });
});
avatarForm.setEventListeners();

const cardForm = new PopupWithForm("form[name='card-form']", (data) => {
  cardForm.submitButton.textContent = "Saving...";
  api
    .addNewCard({ name: data.name, link: data.link })
    .then((res) => (res.ok ? res.json() : res.status))
    .then((res) => {
      cardGallery.addItem(res);
    })
    .catch((err) => console.error(err))
    .finally(() => {
      cardForm.submitButton.textContent = "Create";
      cardForm.close();
    });
});
cardForm.setEventListeners();

const profileForm = new PopupWithForm("form[name='profile-form']", (data) => {
  profileForm.submitButton.textContent = "Saving...";
  api
    .editUserInfo({ name: data.name, job: data.job })
    .then((res) => (res.ok ? true : res.status))
    .then(() => {
      userInfo.setUserInfo({ name: data.name, about: data.job });
    })
    .catch((err) => console.error(err))
    .finally(() => {
      profileForm.submitButton.textContent = "Save";
      profileForm.close();
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
      picturePopup.open(data);
    },
    () => {
      confirmDeletePopup.setSubmitAction(() => {
        api.deleteCard(data._id);
        card.deleteCard();
        confirmDeletePopup.close();
      });
      confirmDeletePopup.open();
    },
    () => {
      const cardLikeIcon = card.card.querySelector(".card__like");
      if (card.liked) {
        api
          .removeLike(card.id)
          .then((res) => (res.ok ? true : res.status))
          .then(() => {
            cardLikeIcon.classList.remove("card__like_active");
            card.liked = false;
          })
          .catch((err) => console.error(err));
      } else {
        api
          .addLike(card.id)
          .then((res) => (res.ok ? true : res.status))
          .then(() => {
            cardLikeIcon.classList.add("card__like_active");
            card.liked = true;
          })
          .catch((err) => console.error(err));
      }
    }
  );
  const cardElement = card.generateCard();
  cardGallery.container.append(cardElement);
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
const initialCards = api
  .getCardInfo()
  .then((res) => (res.ok ? res.json() : res.status))
  .then((res) => {
    cardGallery.setItems(res);
    cardGallery.renderItems();
  })
  .catch((err) => console.error(err));

const initialProfile = api
  .getUserInfo()
  .then((res) => (res.ok ? res.json() : res.status))
  .then((res) => {
    userInfo.setUserInfo({ name: res.name, about: res.about });
    userInfo.setAvatar(res.avatar);
  })
  .catch((err) => console.error(err));

Promise.all([initialCards, initialProfile])
  .then((res) => (res.ok ? res.json() : res.status))
  .catch((err) => console.error(err));
