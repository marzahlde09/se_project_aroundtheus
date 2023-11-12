let initialCards = [
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

const editButton = document.querySelector(".profile__edit-button");
const closeButton = document.querySelector(".modal__close-button");
const modalBlock = document.querySelector(".modal");
const editSubmitButton = document.querySelector(".form__submit");
const cardGallery = document.querySelector(".gallery__cards");

editButton.addEventListener("click", function () {
  let formName = document.querySelector(".form__field_type_name");
  let formDescription = document.querySelector(".form__field_type_description");

  let profileName = document.querySelector(".profile__name");
  let profileDescription = document.querySelector(".profile__description");

  formName.value = profileName.innerHTML;
  formDescription.value = profileDescription.innerHTML;

  modalBlock.classList.add("modal_opened");
});

closeButton.addEventListener("click", function () {
  let formName = document.querySelector(".form__field_type_name");
  let formDescription = document.querySelector(".form__field_type_description");

  modalBlock.classList.remove("modal_opened");

  formName.value = "";
  formDescription.value = "";
});

editSubmitButton.addEventListener("click", function (event) {
  event.preventDefault();

  let formName = document.querySelector(".form__field_type_name");
  let formDescription = document.querySelector(".form__field_type_description");

  let profileName = document.querySelector(".profile__name");
  let profileDescription = document.querySelector(".profile__description");

  profileName.innerHTML = formName.value;
  profileDescription.innerHTML = formDescription.value;

  formName.value = "";
  formDescription.value = "";

  modalBlock.classList.remove("modal_opened");
});

function getCardElement(data) {
  let cardTemplate = document.querySelector("#card").content;
  let cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__image").src = data.link;
  cardElement.querySelector(".card__image").alt = data.name;
  cardElement.querySelector(".card__title").innerHTML = data.name;

  return cardElement;
}

for (let card of initialCards) {
  cardGallery.append(getCardElement(card));
}
