// Variables
const modalForm = document.querySelector(".bground");
const modalConfirm = document.querySelector(".confirm-modal");
const modalConfirmBtn = document.querySelector(".confirm-modal-btn");
const modalConfirmClose = document.querySelector(".confirm-close");
const form = document.querySelector("form");
const firstNameInput = document.getElementById("first");
const lastNameInput = document.getElementById("last");
const emailInput = document.getElementById("email");
const birthdateInput = document.getElementById("birthdate");
const quantityInput = document.getElementById("quantity");
const locationInput = document.querySelectorAll(
  '.checkbox-input[type="radio"]'
);
const checkboxInput = document.getElementById("checkbox1");
const confirmModal = document.getElementById("confirm-modal");

//Messages d'erreurs
const errorMessages = {
  firstName: "Veuillez entrer 2 caractères ou plus pour le champ du prénom.",
  lastName: "Veuillez entrer 2 caractères ou plus pour le champ du nom.",
  email: "Veuillez entrer une adresse email valide.",
  birthdate: "Veuillez entrer votre date de naissance.",
  quantity: "Veuillez entrer un nombre entre 0 et 9.",
  location: "Veuillez sélectionner une ville.",
  checkbox: "Veuillez accepter les termes et conditions.",
};

//Alerte invalide
function isInvalid(element, message) {
  let target;
  if (NodeList.prototype.isPrototypeOf(element)) target = element[0].parentNode;
  else target = element.parentNode;
  target.setAttribute("data-error-visible", true);
  target.setAttribute("data-error", message);
}
// console.log(isInvalid);

//Alerte valide
function isValid() {
  modalForm.style.display = "none";
  modalConfirm.style.display = "flex";
  modalConfirmBtn.addEventListener("click", () => {
    modalConfirm.style.display = "none";
  });
  modalConfirmClose.addEventListener("click", () => {
    modalConfirm.style.display = "none";
  });
}
//console.log(isValid);

//Suppression des alertes
function removeAlerts() {
  let alerts = document.querySelectorAll(".alert");
  for (let i = 0; i < alerts.length; i++) {
    alerts[i].removeAttribute("data-error-visible");
    alerts[i].removeAttribute("data-error");
  }
}
// console.log(removeAlerts);

//Vérification du prénom
function checkFirstName() {
  let inputValue = firstNameInput.value;
  if (inputValue !== null && inputValue.length < 2) {
    isInvalid(firstNameInput, errorMessages.firstName);
    return false;
  } else {
    isValid(firstNameInput);
    return true;
  }
}
// console.log(firstNameInput.value.length);

//Vérification du nom
function checkLastName() {
  let inputValue = lastNameInput.value;
  if (inputValue !== null && inputValue.length < 2) {
    isInvalid(lastNameInput, errorMessages.lastName);
    return false;
  } else {
    isValid(lastNameInput);
    return true;
  }
}
// console.log(lastNameInput.value.length);

//Vérification de l'email
function checkEmail() {
  let inputValue = emailInput.value;
  if (inputValue !== null && inputValue.length < 2) {
    isInvalid(emailInput, errorMessages.email);
    return false;
  } else {
    isValid(emailInput);
    return true;
  }
}
// console.log(emailInput.value.length);

//Vérification da la date de naissance
function checkBirthdate() {
  let birthdate = new Date(birthdateInput.value);
  let today = new Date();
  if (birthdate.toString() !== "Invalid Date") {
    if (
      birthdate.getDate() >= today.getDate() &&
      birthdate.getMonth() == today.getMonth() &&
      birthdate.getFullYear() == today.getFullYear()
    ) {
      isInvalid(birthdateInput, errorMessages.birthdate);
      return false;
    } else {
      isValid(birthdateInput);
      return true;
    }
  } else {
    isInvalid(birthdateInput, errorMessages.birthdate);
    return false;
  }
}
// console.log(birthdateInput.value);

//Vérification de la quantité
function checkQuantity() {
  let inputValue = quantityInput.value;
  if ((inputValue !== null && inputValue < 0) || inputValue > 9) {
    isInvalid(quantityInput, errorMessages.quantity);
    return false;
  } else {
    isValid(quantityInput);
    return true;
  }
}
//console.log(checkQuantity());

//Vérification de la ville
function checkLocation() {
  for (let i = 0; i < locationInput.length; i++) {
    if (locationInput[i].checked) {
      isValid(locationInput[i]);
      return true;
    }
  }
  isInvalid(locationInput, errorMessages.location);
  return false;
}

//Debug de la fonction checkLocation
if (checkLocation()) {
  console.log("At least one radio button is checked");
} else {
  console.log("No radio button is checked");
}

function checkCheckbox() {
  if (checkboxInput.checked) {
    isValid(checkboxInput);
    return true;
  } else {
    isInvalid(checkboxInput, errorMessages.checkbox);
    return false;
  }
}
//console.log(checkCheckbox());

// valide le formulaire
function validate(event) {
  event.preventDefault();
  let isValid = true;
  removeAlerts();
  if (!checkFirstName()) isValid = false;
  if (!checkLastName()) isValid = false;
  if (!checkEmail()) isValid = false;
  if (!checkBirthdate()) isValid = false;
  if (!checkQuantity()) isValid = false;
  if (!checkLocation()) isValid = false;
  if (!checkCheckbox()) isValid = false;
  if (isValid) sendData();
}

// form.addEventListener("submit", validate);

function sendData() {
  let data = {
    firstName: firstNameInput.value,
    lastName: lastNameInput.value,
    email: emailInput.value,
    birthdate: birthdateInput.value,
    quantity: quantityInput.value,
    location: locationInput.value,
    checkbox: checkboxInput.value,
  };
  console.log(data);
}
