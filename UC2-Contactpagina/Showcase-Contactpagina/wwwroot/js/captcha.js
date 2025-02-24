const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const captchaResponse = grecaptcha.getResponse();

    if (captchaResponse.length === 0) {
        alert("Captcha niet ingevuld!");
        return;
    }

    const fd = new FormData(e.target);
    const params = new URLSearchParams();
    fd.forEach((value, key) => {
        params.append(key, value);
    });

    fetch('http://localhost:3000/upload', {
        method: "POST",
        body: params,
    })
        .then(res => res.json())
        .then(data => {
            console.log("Response data:", data);
            if (data.captchaSuccess) {
                console.log("Validatie succesvol!");
                form.submit(); // Handmatig verzenden als de captcha succesvol is
            } else {
                console.log("Validatie mislukt!");
                alert("Captcha validatie mislukt. Probeer opnieuw.");
            }
        })
        .catch(err => console.error("Fout bij API-aanroep:", err));
});
