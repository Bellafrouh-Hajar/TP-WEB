document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Empêche l'envoi du formulaire

    let isValid = true;

    // Récupérer les champs
    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const phone = document.getElementById("phone");
    const gender = document.getElementById("gender");
    const dob = document.getElementById("dob");

    // Fonction pour afficher les erreurs
    function showError(input, message) {
        const errorSpan = input.nextElementSibling;
        errorSpan.textContent = message;
        isValid = false;
    }

    // Réinitialiser les erreurs
    document.querySelectorAll(".error-message").forEach(span => span.textContent = "");

    // Validation des champs
    if (firstName.value.trim() === "") showError(firstName, "Le prénom est requis.");
    if (lastName.value.trim() === "") showError(lastName, "Le nom est requis.");
    
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email.value)) showError(email, "Email invalide.");

    if (password.value.length < 6) showError(password, "Le mot de passe doit contenir au moins 6 caractères.");

    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phone.value)) showError(phone, "Numéro de téléphone invalide.");

    if (gender.value === "") showError(gender, "Veuillez sélectionner votre genre.");

    if (dob.value === "") showError(dob, "Veuillez entrer votre date de naissance.");

    // Si tout est valide, afficher un message de succès
    if (isValid) {
        alert(`Bienvenue, ${firstName.value} ! Votre inscription est réussie.`);
        document.getElementById("signupForm").reset();
    }
});
