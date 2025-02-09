class GDPR {

    constructor() {
        const status = this.cookieStatus();
        this.showStatus();
        this.showContent();
        if (!(status === 'accept' || status === 'reject')) {
            this.showGDPR();
        }
        this.bindEvents();
    }

    bindEvents() {
        let buttonAccept = document.querySelector('.gdpr-consent__button--accept');
        let buttonReject = document.querySelector('.gdpr-consent__button--reject');

        buttonAccept.addEventListener('click', () => {
            this.cookieStatus('accept');
            this.updateUI();
        });

        buttonReject.addEventListener('click', () => {
            this.cookieStatus('reject');
            this.updateUI();
        })
    }

    updateUI() {
        this.showStatus();
        this.showContent();
        this.hideGDPR();
    }

    showContent() {
        this.resetContent();
        const status = this.cookieStatus() == null ? 'not-chosen' : this.cookieStatus();
        const element = document.querySelector(`.content-gdpr-${status}`);
        element.classList.add('show');
    }

    resetContent() {
        const classes = [
            '.content-gdpr-accept',
            '.content-gdpr-reject',
            '.content-gdpr-not-chosen'];

        for (const c of classes) {
            document.querySelector(c).classList.add('hide');
            document.querySelector(c).classList.remove('show');
        }
    }

    showStatus() {
        document.getElementById('content-gdpr-consent-status').innerHTML =/*
        showStatus() {
            const statusElement = document.getElementById('content-gdpr-consent-status');
            if (statusElement) {
                statusElement.innerHTML = 'Your status message here';
            } else {
                console.error('Element with ID content-gdpr-consent-status not found');
            }
        }
        document.addEventListener('DOMContentLoaded', (event) => {
            const gdpr = new GDPR();
        });*/
            this.cookieStatus() == null ? 'Niet gekozen' : this.cookieStatus();
    }

    cookieStatus(status) {
        if (status) this.saveConsent(status);
        return this.getConsent();
    }

    getConsent() {
        let consentData = localStorage.getItem("gdpr-consent");
        if (consentData) {
            let consentObject = JSON.parse(consentData);
            return consentObject.choice;
        }
        return null;
    }

    hideGDPR() {
        document.querySelector(`.gdpr-consent`).classList.add('hide');
        document.querySelector(`.gdpr-consent`).classList.remove('show');
    }

    showGDPR() {
        document.querySelector(`.gdpr-consent`).classList.add('show');
    }

    saveConsent(status) {
        const date = new Date();
        var day = date.getDate();
        var month = date.getMonth() + 1; //getMonth function range 0-11 so have to add 1
        var year = date.getFullYear();

        var hours = date.getHours();
        var minutes = date.getMinutes();

        let consentObject = {
            choice: status,
            date: `${day}-${month}-${year}`,
            time: `${hours}:${minutes}`
        };

        localStorage.setItem("gdpr-consent", JSON.stringify(consentObject));
    }
}

const gdpr = new GDPR();

