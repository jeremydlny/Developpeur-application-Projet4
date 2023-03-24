// Initialisation de la page avec des écouteurs d'événements sur les boutons pour ouvrir et fermer la fenêtre modale
function init() {
  // modalBtn est un tableau qui contient tous les éléments HTML ayant la classe .modal-btn
  const modalBtn = document.querySelectorAll(".modal-btn");
  // closeBtn est un tableau qui contient tous les éléments HTML ayant la classe .close
  const closeBtn = document.querySelectorAll(".close");
  // closeBtnsenddata est un tableau qui contient tous les éléments HTML ayant l'ID closemodal
  const closeBtnsenddata = document.querySelectorAll("#closemodal");

  // Un événement click est ajouté à chaque élément du tableau avec addEventListener() et l'appel de la fonction launchModal().
  modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
  // Un événement click est ajouté à chaque élément du tableau avec addEventListener() et l'appel de la fonction closeModal().
  closeBtnsenddata.forEach((btn) => btn.addEventListener("click", closeModal));
  // Un événement click est ajouté à chaque élément du tableau avec addEventListener() et l'appel de la fonction closeModal().
  closeBtn.forEach((btn) => btn.addEventListener("click", closeModal));
  // Envoi des données du formulaire
  sendmodal();
}

init();

// Ouverture de la fenêtre de formulaire
// Fonction appelée lorsqu'un élément ayant la classe "modal-btn" est cliqué
function launchModal() {
  // Sélection de l'élément HTML ayant la classe "bground" et stockage dans la variable modalbg
  const modalbg = document.querySelector(".bground");
  // Modification de la propriété CSS "display" de modalbg pour afficher la fenêtre modale
  modalbg.style.display = "block";
}

// Fermeture de la fenêtre de formulaire
// Fonction appelée lorsqu'un élément ayant la classe "close" est cliqué
function closeModal() {
  // Sélection de l'élément HTML ayant la classe "bground" et stockage dans la variable modalbg
  const modalbg = document.querySelector(".bground");
  // Modification de la propriété CSS "display" de modalbg pour cacher la fenêtre modale
  modalbg.style.display = "none";
}

// Menu responsive
function editNav() {
  // Sélection de l'élément HTML ayant l'ID "myTopnav" et stockage dans la variable x
  var x = document.getElementById("myTopnav");
  // Si la classe "topnav" est présente, on l'enlève et on ajoute la classe "responsive"
  if (x.className === "topnav") {
    x.className += " responsive";
    // Sinon, on ajoute la classe "topnav" et on enlève la classe "responsive"
  } else {
    x.className = "topnav";
  }
}

// Envoi du formulaire
// Fonction appelée lorsqu'un élément ayant l'ID "SendData" est cliqué
function sendmodal() {
  // Sélection de l'élément HTML ayant l'ID "SendData" et stockage dans la variable senddata
  // Ajout d'un écouteur d'événement sur le bouton "Envoyer" pour envoyer les données du formulaire
  let senddata = document.getElementById("SendData");
  senddata.addEventListener("click", function (e) {
    // Sélection de tous les éléments HTML ayant la classe "formData" et stockage dans la variable Data
    const Data = document.querySelectorAll(".formData");
    e.preventDefault();
    // Vérification du formulaire et affichage du message de confirmation
    if (verifmodal(Data)) {
      document.getElementById("modalB").style.display = "none";
      document.querySelector(".confirm-modal-message").style.display = "block";
      document.querySelector("#closemodal").style.display = "block";
    }
    // Si le formulaire n'est pas valide, affichage d'un message d'erreur
    else {
      alert("Veuillez remplir tous les champs");
    }
  });
}

// Vérification du formulaire
// Fonction appelée lorsqu'un élément ayant l'ID "SendData" est cliqué
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

  // Variables des regex
  const stringRegex = /^[a-zA-Z-]+$/;
  const emailRegex = /^\w+([.-]?\w+)@\w+([.-]?\w+).(.\w{2,3})+$/;
  const today = new Date();
  const minBirthdate = new Date(today.getFullYear() - 118, today.getMonth(), today.getDate());
  const maxBirthdate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

  const date_regex = /^[0-9]{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])/;

  const birthdateValue = Data[3].children[2].value.trim();
  const birthdate = new Date(birthdateValue);

  // Variable qui contient tous les éléments HTML ayant la classe "checkbox-input" et le type "radio"
  const locationInput = document.querySelectorAll(
    '.checkbox-input[type="radio"]'
  );

  // Variable de validation du formulaire
  let valid = true;

  // Vérification si la valeur est une chaîne de caractères
  // Data[0].children[2].value.match(stringRegex) retourne true si la valeur est une chaîne de caractères ou Data[0].children[2].value.length retourne la longueur de la chaîne de caractères 
  if (!Data[0].children[2].value.trim().match(stringRegex) || Data[0].children[2].value.length < 2) {
    document.getElementById("FirstNameError").innerText = errorMessages.firstName;
    valid = false;
  } else {
    document.getElementById("FirstNameError").innerText = "";
  }


  // Vérification si la valeur est une chaîne de caractères
  // Data[1].children[2].value.match(stringRegex) retourne true si la valeur est une chaîne de caractères ou Data[1].children[2].value.length retourne la longueur de la chaîne de caractères
  if (!Data[1].children[2].value.trim().match(stringRegex) || Data[1].children[2].value.length < 2) {
    document.getElementById("LastNameError").innerText = errorMessages.lastName;
    valid = false;
  } else {
    document.getElementById("LastNameError").innerText = "";
  }


  // Vérification si la valeur est une adresse email
  // Data[2].children[2].value.match(emailRegex) retourne true si la valeur correspond à l'expression régulière
  if (!Data[2].children[2].value.trim().match(emailRegex)) {
    document.getElementById("EmailError").innerText = errorMessages.email;
    valid = false;
  } else {
    document.getElementById("EmailError").innerText = "";
  }


  if (!birthdateValue.match(date_regex) || birthdate <= minBirthdate || birthdate > maxBirthdate) {
    document.getElementById("BirthdateError").innerText = errorMessages.birthdate;
    valid = false;
  } else {
    document.getElementById("BirthdateError").innerText = "";
  }


  // Vérification si la valeur est un nombre entre 0 et 9
  if (Data[4].children[2].value === "") {
    document.getElementById("QuantityError").innerText = errorMessages.quantity;
    valid = false;
  } else if (!/^[0-9]{1}$/.test(Data[4].children[2].value)) {
    document.getElementById("QuantityError").innerText = errorMessages.quantity;
    valid = false;
  } else {
    document.getElementById("QuantityError").innerText = "";
  }


  // Boucle pour vérifier si une ville est sélectionnée
  let count = 0;
  // locationInput.length retourne le nombre d'éléments ayant la classe "checkbox-input"
  // Si aucune ville n'est sélectionnée, count reste à 0
  // Si une ville est sélectionnée, count est incrémenté de 1
  for (let i = 0; i < locationInput.length; i++) {
    if (locationInput[i].checked) {
      count++;
    }
  }


  // Vérification si une ville est sélectionnée
  // Si aucune ville n'est sélectionnée, on affiche le message d'erreur
  if (count == 0) {
    document.getElementById("LocationError").innerText = errorMessages.location;
    valid = false;
  } else {
    document.getElementById("LocationError").innerText = "";
  }


  // Vérification si la checkbox est cochée
  // Si la checkbox n'est pas cochée, on affiche le message d'erreur
  if (!document.getElementById("checkbox1").checked) {
    document.getElementById("CheckboxError").innerText = errorMessages.checkbox;
    valid = false;
  } else {
    document.getElementById("CheckboxError").innerText = "";
  }


  // Vérification si le formulaire est valide
  // Si le formulaire est valide, on retourne true
  if (valid) {
    return true;
  }
  // Si le formulaire n'est pas valide, on retourne false
  else {
    return false;
  }

}