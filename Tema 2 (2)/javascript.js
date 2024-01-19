document.getElementById("registrationForm").addEventListener("submit", function(event) {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;
  
    var emailError = document.getElementById("emailError");
    var passwordError = document.getElementById("passwordError");
    var confirmPasswordError = document.getElementById("confirmPasswordError");
  
    // Validare e-mail
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      emailError.textContent = "Adresa de e-mail nu este validă.";
      event.preventDefault(); // Oprire trimitere formular
    } else {
      emailError.textContent = "";
    }
  
    // Validare parolă
    var passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
      passwordError.textContent = "Parola trebuie să conțină cel puțin 8 caractere, o literă mică, o literă mare și un număr.";
      event.preventDefault();
    } else {
      passwordError.textContent = "";
    }
  
    // Validare confirmare parolă
    if (password !== confirmPassword) {
      confirmPasswordError.textContent = "Parola de confirmare nu corespunde.";
      event.preventDefault();
    } else {
      confirmPasswordError.textContent = "";
    }
  });
  