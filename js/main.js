document.addEventListener("DOMContentLoaded", function() {

    const form = document.getElementById("contactForm");

    form.addEventListener("submit", function(event){
        event.preventDefault();

        let isValid = true;   

        const firstName = document.querySelector("input[name='firstName']");
        const lastName = document.querySelector("input[name='lastName']");
        const email = document.querySelector("input[name='email']");
        const subject = document.querySelector("input[name='subject']");
        const message = document.querySelector("textarea");

        document.querySelectorAll(".error-message").forEach(msg => msg.remove());

        function showError(field, message) {
            const error = document.createElement("div");
            error.className = "error-message";
            error.style.color = "red";
            error.textContent = message;
            field.insertAdjacentElement("afterend", error);
            field.focus();
        }

        //checks if the fields are empty
        [firstName, lastName, email, subject].forEach(field => {
            if (field.value.trim() === " ") {
                isValid = false;
                showError(field, `${field.placeholder}  cannot be empty!`);
            }
        });
        [message].forEach(field =>{
            if(field.value.trim() === " "){
                isValid = false;
                showError(field, `This field cannot be empty`)
            }
        })

        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/;

        if (email.value && !emailPattern.test(email.value)) {

            isValid = false;
            showError(email, "Please enter a valid email address (example@domain.com).");
        }

        if (isValid) {
            const submissionMessage = document.getElementById("submissionMessage");
            submissionMessage.style.display = "block";
            submissionMessage.textContent = "Form submitted successfully!";

            form.reset();
           
            setTimeout(() => {
                submissionMessage.style.display = "none";
            }, 3000);
        }
    })
});