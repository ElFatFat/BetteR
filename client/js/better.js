let regexPassword = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-Z]).{8,}$/;
let regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
let regexUsername = /^[a-zA-Z0-9_]{3,16}$/;
let regexTag = /^[a-z0-9_]{3,16}$/;
let loginAfficher = true;
let loginContainer = document.getElementById("loginContainer");
let registerContainer = document.getElementById("registerContainer");
let password = document.getElementById("passwordRegister");
let passwordConfirm = document.getElementById("confirmPassword");
let bigBtn = document.getElementsByClassName("bigBtn")[0];
let usernameRegister = document.getElementById("usernameRegister");
let tagRegister = document.getElementById("tagRegister");
let emailRegister = document.getElementById("emailRegister");

function switchLogin() {
    if (loginAfficher) {
        loginContainer.className = "hide";
        setTimeout(() => {
            registerContainer.className = "show";
        }, 250);
        loginAfficher = false;
    } else {
        registerContainer.className = "hide";
        setTimeout(() => {
            loginContainer.className = "show";
        }, 250);
        loginAfficher = true;
    }
}

function checkPassword() {
    console.log('test');
    if (password.value == passwordConfirm.value && usernameRegister.value != "" && tagRegister.value != "" && emailRegister.value != "") {
        passwordConfirm.className = "goodPass";
        bigBtn.classList.remove("disabledBtn");
        bigBtn.classList.add("enabledBtn");
    }
    else {
        passwordConfirm.className = "wrongPass";
        bigBtn.classList.remove("enabledBtn");
        bigBtn.classList.add("disabledBtn");
    }

}

//verify password with regexPassword
function checkPasswordRegex() {
    const isValide = regexPassword.test(password.value);
    if (isValide) {
    }
}
