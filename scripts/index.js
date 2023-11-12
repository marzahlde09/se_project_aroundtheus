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

const modalBlock = document.querySelector(".modal");
const editButton = document.querySelector(".profile__edit-button");
const closeButton = document.querySelector(".modal__close-button");
const editProfileModal = document.querySelector("#profile-form");
const editSubmitButton = editProfileModal.querySelector(".form__submit");
const cardGallery = document.querySelector(".gallery__cards");
const profileFormName = editProfileModal.querySelector(
  ".form__field:first-of-type"
);
const profileFormDescription = editProfileModal.querySelector(
  ".form__field:last-of-type"
);
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

editButton.addEventListener("click", function () {
  let formName = document.querySelector(".form__field:first-of-type");
  let formDescription = document.querySelector(".form__field:last-of-type");

  let profileName = document.querySelector(".profile__name");
  let profileDescription = document.querySelector(".profile__description");

  formName.value = profileName.textContent;
  formDescription.value = profileDescription.textContent;

  openModal(editProfileModal);
});

closeButton.addEventListener("click", function () {
  closeModal(editProfileModal);
});

editProfileModal.addEventListener("submit", submitProfileForm);

function openModal(modal) {
  modalBlock.classList.add("modal_opened");
  modal.classList.add("form_active");
}

function closeModal(modal) {
  modalBlock.classList.remove("modal_opened");
  modal.classList.remove("form_active");
}

function submitProfileForm(event) {
  event.preventDefault();

  profileName.textContent = profileFormName.value;
  profileDescription.textContent = profileFormDescription.value;

  closeModal(editProfileModal);
}

function getCardElement(data) {
  let cardTemplate = document.querySelector("#card").content;
  let cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  let cardImageLink = data.link;
  let cardName = data.name;

  cardElement.querySelector(".card__image").src = cardImageLink;
  cardElement.querySelector(".card__image").alt = cardName;
  cardElement.querySelector(".card__title").textContent = cardName;

  return cardElement;
}

for (let card of initialCards) {
  cardGallery.append(getCardElement(card));
}
