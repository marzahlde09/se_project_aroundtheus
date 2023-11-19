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
const profileForm = document.forms["profile-form"];
const profileFormName = profileForm.querySelector(
  ".modal__form-field:first-of-type"
);
const profileFormDescription = profileForm.querySelector(
  ".modal__form-field:last-of-type"
);
const profileFormSubmitButton = profileForm.querySelector(
  ".modal__form-submit"
);
const cardForm = document.forms["card-form"];
const cardFormTitle = cardForm.querySelector(
  ".modal__form-field:first-of-type"
);
const cardFormLink = cardForm.querySelector(".modal__form-field:last-of-type");
const cardFormCreateButton = cardForm.querySelector(".modal__form-submit");
const pictureModal = document.querySelector(".modal__picture");
const pictureModalImage = pictureModal.querySelector(".modal__picture-image");
const pictureModalDescription = pictureModal.querySelector(
  ".modal__picture-description"
);
const cardGallery = document.querySelector(".gallery__cards");
const cardTemplate = document.querySelector("#card").content;
const closeButtons = document.querySelectorAll(".modal__close-button");

editButton.addEventListener("click", function () {
  profileFormName.value = profileName.textContent;
  profileFormDescription.value = profileDescription.textContent;

  openModal(profileForm);
});

profileForm.addEventListener("submit", submitProfileForm);

addButton.addEventListener("click", function () {
  openModal(cardForm);
});

cardForm.addEventListener("submit", submitAddForm);

function openModal(modal) {
  modal.closest(".modal").classList.add("modal_opened");
  document.addEventListener("mousedown", closeOnOverlayClick);
  document.addEventListener("keydown", closeOnEscape);
}

function closeModal(modal) {
  modal.closest(".modal").classList.remove("modal_opened");
  document.removeEventListener("mousedown", closeOnOverlayClick);
  document.removeEventListener("keydown", closeOnEscape);
}

function submitProfileForm(event) {
  event.preventDefault();

  profileName.textContent = profileFormName.value;
  profileDescription.textContent = profileFormDescription.value;

  closeModal(profileForm);
}

function submitAddForm(event) {
  event.preventDefault();

  const data = {
    name: event.target.title.value,
    link: event.target.link.value,
  };
  const newCard = getCardElement(data);

  cardGallery.prepend(newCard);

  event.target.reset();
  cardFormCreateButton.disabled = true;
  cardFormCreateButton.classList.add("modal__form-submit_disabled");
  closeModal(event.target);
}

function getCardElement(data) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardElementImage = cardElement.querySelector(".card__image");
  const cardImageLink = data.link;
  const cardName = data.name;

  cardElementImage.src = cardImageLink;
  cardElementImage.alt = cardName;
  cardElement.querySelector(".card__title").textContent = cardName;
  cardElement
    .querySelector(".card__favorite")
    .addEventListener("click", toggleLike);
  cardElement
    .querySelector(".card__delete")
    .addEventListener("click", () => cardElement.remove());
  cardElementImage.addEventListener("click", function () {
    openPictureModal(cardImageLink, cardName);
  });

  return cardElement;
}

function toggleLike(event) {
  event.target.classList.toggle("card__favorite_active");
}

function openPictureModal(link, name) {
  pictureModalImage.src = link;
  pictureModalImage.alt = name;
  pictureModalDescription.textContent = name;
  openModal(pictureModal);
}

closeButtons.forEach((button) => {
  const modal = button.closest(".modal");
  button.addEventListener("click", () => closeModal(modal));
});

initialCards.forEach((card) => cardGallery.append(getCardElement(card)));

function closeOnOverlayClick(evt) {
  if (evt.target.classList.contains("modal_opened")) {
    closeModal(evt.target);
  }
}

function closeOnEscape(evt) {
  if (evt.key === "Escape") {
    closeModal(document.querySelector(".modal_opened"));
  }
}
