document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".form-contactpagina");
    const submitButton = document.getElementById("submit-btn");
    const spinner = document.getElementById("spinner");

    if (!form || !submitButton || !spinner) {
        console.error("Formulier, knop of spinner niet gevonden!");
        return;
    }

    form.addEventListener("submit", function () {
        // Toon de spinner en disable de knop
        spinner.style.display = "block";
        submitButton.disabled = true;
    });

    // Controleer bij het laden van de pagina of de spinner moet verdwijnen
    window.addEventListener("load", function () {
        spinner.style.display = "none";
        submitButton.disabled = false;
    });
});
