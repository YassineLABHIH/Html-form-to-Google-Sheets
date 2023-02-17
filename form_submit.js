const scriptURL = 'https://script.google.com/macros/s/AKfycbwz1nmq8yPIoG8-T7DvGwm7OXvxl8JC5LdgRrJ9eAyt8c8naf6phgmIAEozykBfetPtwQ/exec'
const form = document.forms['toGoogleSheets']

form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => alert("Thank you! your form is submitted successfully."))
        .then(() => { window.location.reload(); })
        .catch(error => console.error('Error!', error.message))
})
