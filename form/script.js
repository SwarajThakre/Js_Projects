let form = document.querySelector('form');
let username = document.getElementById('name');
let email = document.getElementById('email');
let password = document.getElementById('password');
let error = document.querySelectorAll('.error')

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  let emailValid = emailRegex.test(email.value); 

    let isValid = true;

    if (username.value === ""){
        error[0].style.display = "initial";
        isValid = false;
    }

    if (!emailValid){
        error[1].style.display = "initial";
        isValid = false;
    }

    if (password.value.length < 6){
        error[2].style.display = "initial";
        isValid = false;
    }

    if (isValid){
        alert("Form submitted successfully!");
        form.reset();
    }
});