//form validation
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(
    `.${inputElement.name}-input-error`
  );
  inputElement.classList.add("modal__form-field_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("modal__form-input-error_active");
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(
    `.${inputElement.name}-input-error`
  );
  inputElement.classList.remove("modal__form-field_type_error");
  errorElement.textContent = "";
  errorElement.classList.remove("modal__form-input-error_active");
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    console.log(inputElement.validity.valid);
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("button_inactive");
  } else {
    buttonElement.classList.remove("button_inactive");
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(
    formElement.querySelectorAll(".modal__form-field")
  );
  const buttonElement = formElement.querySelector(".modal__form-submit");
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".modal__form"));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });

    setEventListeners(formElement);
  });
};

enableValidation();
