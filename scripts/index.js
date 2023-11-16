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

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const editProfileModal = document.querySelector(".modal__form_type_profile");
const profileModalCloseButton = editProfileModal.querySelector(
  ".modal__close-button"
);
const profileModalName = editProfileModal.querySelector(
  ".modal__form-field:first-of-type"
);
const profileModalDescription = editProfileModal.querySelector(
  ".modal__form-field:last-of-type"
);
const profileModalSubmitButton = editProfileModal.querySelector(
  ".modal__form-submit"
);
const addModal = document.querySelector(".modal__form_type_add");
const addModalCloseButton = addModal.querySelector(".modal__close-button");
const addModalTitle = addModal.querySelector(
  ".modal__form-field:first-of-type"
);
const addModalLink = addModal.querySelector(".modal__form-field:last-of-type");
const addModalCreateButton = addModal.querySelector(".modal__form-submit");
const pictureModal = document.querySelector(".modal__picture");
const pictureModalCloseButton = pictureModal.querySelector(
  ".modal__close-button"
);
const pictureModalImage = pictureModal.querySelector(".modal__picture-image");
const pictureModalDescription = pictureModal.querySelector(
  ".modal__picture-description"
);
const cardGallery = document.querySelector(".gallery__cards");
const cardTemplate = document.querySelector("#card").content;

editButton.addEventListener("click", function () {
  profileModalName.value = profileName.textContent;
  profileModalDescription.value = profileDescription.textContent;

  toggleModal(editProfileModal);
});

profileModalCloseButton.addEventListener("click", function () {
  toggleModal(editProfileModal);
});

editProfileModal.addEventListener("submit", submitProfileForm);

addButton.addEventListener("click", function () {
  toggleModal(addModal);
});

addModalCloseButton.addEventListener("click", function () {
  toggleModal(addModal);
});

addModal.addEventListener("submit", submitAddForm);

function toggleModal(modal) {
  modal.closest(".modal").classList.toggle("modal_opened");
}

function submitProfileForm(event) {
  event.preventDefault();

  profileName.textContent = profileModalName.value;
  profileDescription.textContent = profileModalDescription.value;

  toggleModal(editProfileModal);
}

function submitAddForm(event) {
  event.preventDefault();

  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardImageLink = addModalLink.value;
  const cardName = addModalTitle.value;

  cardElement.querySelector(".card__image").src = cardImageLink;
  cardElement.querySelector(".card__image").alt = cardName;
  cardElement.querySelector(".card__title").textContent = cardName;
  cardElement
    .querySelector(".card__favorite")
    .addEventListener("click", toggleFavorite);
  cardElement
    .querySelector(".card__delete")
    .addEventListener("click", () => cardElement.remove());
  cardElement
    .querySelector(".card__image")
    .addEventListener("click", function () {
      openPictureModal(cardImageLink, cardName);
    });

  cardGallery.prepend(cardElement);

  toggleModal(addModal);
}

function getCardElement(data) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardImageLink = data.link;
  const cardName = data.name;

  cardElement.querySelector(".card__image").src = cardImageLink;
  cardElement.querySelector(".card__image").alt = cardName;
  cardElement.querySelector(".card__title").textContent = cardName;
  cardElement
    .querySelector(".card__favorite")
    .addEventListener("click", toggleFavorite);
  cardElement
    .querySelector(".card__delete")
    .addEventListener("click", () => cardElement.remove());
  cardElement
    .querySelector(".card__image")
    .addEventListener("click", function () {
      openPictureModal(cardImageLink, cardName);
    });

  return cardElement;
}

function toggleFavorite(event) {
  event.target.classList.toggle("card__favorite_active");
}

function openPictureModal(link, name) {
  pictureModalImage.src = link;
  pictureModalImage.alt = name;
  pictureModalDescription.textContent = name;
  toggleModal(pictureModal);
}

pictureModalCloseButton.addEventListener("click", function () {
  toggleModal(pictureModal);
});

initialCards.forEach((card) => cardGallery.append(getCardElement(card)));
