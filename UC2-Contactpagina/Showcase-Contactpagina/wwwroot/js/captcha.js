const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
    console.log("jiajia");
    e.preventDefault();

    const captchaResponse = grecaptcha.getResponse();

    if (!captchaResponse.length > 0) {
        throw new Error("Captcha not complete");
    }

    const fd = new FormData(e.target);
    const params = new URLSearchParams(fd);

    fetch('https://httpbin.org/post', {
        method: "POST",
        body: params,
    })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.error(err))

});