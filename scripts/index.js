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
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const editButton = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector(".form_type_profile");
const profileModalCloseButton = editProfileModal.querySelector(
  ".form__close-button"
);
const profileModalName = editProfileModal.querySelector(
  ".form__field:first-of-type"
);
const profileModalDescription = editProfileModal.querySelector(
  ".form__field:last-of-type"
);
const profileModalSubmitButton =
  editProfileModal.querySelector(".form__submit");
const cardGallery = document.querySelector(".gallery__cards");
const cardTemplate = document.querySelector("#card").content;

editButton.addEventListener("click", function () {
  profileModalName.value = profileName.textContent;
  profileModalDescription.value = profileDescription.textContent;

  openModal(editProfileModal);
});

profileModalCloseButton.addEventListener("click", function () {
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

  profileName.textContent = profileModalName.value;
  profileDescription.textContent = profileModalDescription.value;

  closeModal(editProfileModal);
}

function getCardElement(data) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardImageLink = data.link;
  const cardName = data.name;

  cardElement.querySelector(".card__image").src = cardImageLink;
  cardElement.querySelector(".card__image").alt = cardName;
  cardElement.querySelector(".card__title").textContent = cardName;

  return cardElement;
}

for (let card of initialCards) {
  cardGallery.append(getCardElement(card));
}
