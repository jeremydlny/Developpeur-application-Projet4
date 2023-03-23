function init() {
  const modalBtn = document.querySelectorAll(".modal-btn");
  const closeBtn = document.querySelectorAll(".close");
  const closeBtnsenddata = document.querySelectorAll("#closemodal");

  modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
  closeBtnsenddata.forEach((btn) => btn.addEventListener("click", closeModal));
  closeBtn.forEach((btn) => btn.addEventListener("click", closeModal));

  sendmodal();
}

init();

// Ouverture de la fenêtre de formulaire
function launchModal() {
  const modalbg = document.querySelector(".bground");
  modalbg.style.display = "block";
}

// Fermeture de la fenêtre de formulaire
function closeModal() {
  const modalbg = document.querySelector(".bground");
  modalbg.style.display = "none";
}

// Menu responsive
function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// Envoi du formulaire
function sendmodal() {

  let senddata = document.getElementById("SendData");
  senddata.addEventListener("click", function (e) {
    const Data = document.querySelectorAll(".formData");
    e.preventDefault();
    if (verifmodal(Data)) {

      document.getElementById("modalB").style.display = "none";
      document.querySelector(".confirm-modal-message").style.display = "block";
      document.querySelector("#closemodal").style.display = "block";
    } else {
      alert("Veuillez remplir tous les champs");
    }
  });
}

// Vérification du formulaire
function verifmodal(Data) {

  // Variables des messages d'erreur
  const errorMessages = {
    firstName: "Vous devez entrer votre prénom.",
    lastName: "Vous devez entrer votre nom.",
    email: "Vous devez entrer une adresse email valide.",
    birthdate: "Vous devez entrer votre date de naissance.",
    quantity: "Vous devez entrer un nombre entre 0 et 9.",
    location: "Vous devez choisir une option.",
    checkbox: "Vous devez vérifier que vous acceptez les termes et conditions.",
  };

  // Regex
  const stringRegex = /^[a-zA-Z-]+$/;
  const emailRegex = /^\w+([.-]?\w+)@\w+([.-]?\w+).(.\w{2,3})+$/;
  const date_regex = /^[0-9]{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])/;
  const locationInput = document.querySelectorAll(
    '.checkbox-input[type="radio"]'
  );

  let valid = true;

  // console.log(Data[0].children[2].value);
  // vérification si la valeur est une chaîne de caractères
  if (!Data[0].children[2].value.match(stringRegex) || Data[0].children[2].value.length < 2) {
    document.getElementById("FirstNameError").innerText = errorMessages.firstName;
    valid = false;
  }
  else {
    document.getElementById("FirstNameError").innerText = "";
  }

  // console.log(Data[1].children[2].value);
  // vérification si la valeur est une chaîne de caractères
  if (!Data[1].children[2].value.match(stringRegex) || Data[1].children[2].value.length < 2) {
    document.getElementById("LastNameError").innerText = errorMessages.lastName;
    valid = false;
  } else {
    document.getElementById("LastNameError").innerText = "";
  }

  // console.log(Data[2].children[2].value);
  // vérification si la valeur est une adresse email
  if (!Data[2].children[2].value.match(emailRegex)) {
    document.getElementById("EmailError").innerText = errorMessages.email;
    valid = false;
  } else {
    document.getElementById("EmailError").innerText = "";
  }

  // console.log(Data[3].children[2].value);
  //vérification si la valeur est une date
  if (!Data[3].children[2].value.match(date_regex)) {
    document.getElementById("BirthdateError").innerText = errorMessages.birthdate;
    valid = false;
  } else {
    document.getElementById("BirthdateError").innerText = "";
  }

  if (Data[4].children[2].value === "") {
    document.getElementById("QuantityError").innerText = errorMessages.quantity;
    valid = false;
  } else {
    document.getElementById("QuantityError").innerText = "";
  }

  // boucle pour vérifier si une ville est sélectionnée
  let count = 0;
  for (let i = 0; i < locationInput.length; i++) {
    if (locationInput[i].checked) {
      count++;
    }
  }

  // vérification si une ville est sélectionnée
  if (count == 0) {
    document.getElementById("LocationError").innerText = errorMessages.location;
    valid = false;
  } else {
    document.getElementById("LocationError").innerText = "";
  }

  // vérification si la checkbox est cochée
  if (!document.getElementById("checkbox1").checked) {
    document.getElementById("CheckboxError").innerText = errorMessages.checkbox;
    valid = false;
  } else {
    document.getElementById("CheckboxError").innerText = "";
  }
  // console.log(document.getElementById("checkbox1").checked);

  // console.log(valid);
  // vérification si le formulaire est valide
  if (valid) {
    return true;
  } else {
    return false;
  }

}