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
let bigBtn2 = document.getElementsByClassName("bigBtn")[1];
let usernameRegister = document.getElementById("usernameRegister");
let tagRegister = document.getElementById("tagRegister");
let emailRegister = document.getElementById("emailRegister");
let usernameLogin = document.getElementById("usernameLogin");
let passwordLogin = document.getElementById("passwordLogin");

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

function enableRegisterBtn() {
    if (usernameRegister.value != "" && tagRegister.value != "" && emailRegister.value != "" && password.value != "" && passwordConfirm.value != "" && password.value == passwordConfirm.value && regexPassword.test(password.value) && regexEmail.test(emailRegister.value) && regexUsername.test(usernameRegister.value) && regexTag.test(tagRegister.value)) {
        bigBtn.classList.remove("disabledBtn");
        bigBtn.classList.add("enabledBtn");
    }
    else {
        bigBtn.classList.remove("enabledBtn");
        bigBtn.classList.add("disabledBtn");
    }
}

function enableLoginBtn() {
    if (usernameLogin.value != "" && passwordLogin.value != "") {
        bigBtn2.classList.remove("disabledBtn");
        bigBtn2.classList.add("enabledBtn");
    }
    else {
        bigBtn2.classList.remove("enabledBtn");
        bigBtn2.classList.add("disabledBtn");
    }
}

function checkPassword() {
    console.log('test');
    if (password.value == passwordConfirm.value) {
        passwordConfirm.className = "goodPass";
    }
    else {
        passwordConfirm.className = "wrongPass";
    }

}

//verify password with regexPassword
function checkPasswordRegex() {
    const isValide = regexPassword.test(password.value);
    if (isValide) {
        password.className = "goodPass";
    }
    else {
        password.className = "wrongPass";
    }
}

//verify email with regexEmail
function checkEmailRegex() {
    const isValide = regexEmail.test(emailRegister.value);
    if (isValide) {
        emailRegister.className = "goodPass";
    }
    else {
        emailRegister.className = "wrongPass";
    }
}

//verify username with regexUsername
function checkUsernameRegex() {
    const isValide = regexUsername.test(usernameRegister.value);
    if (isValide) {
        usernameRegister.className = "goodPass";
    }
    else {
        usernameRegister.className = "wrongPass";
    }
}

//verify tag with regexTag
function checkTagRegex() {
    const isValide = regexTag.test(tagRegister.value);
    if (isValide) {
        tagRegister.className = "goodPass";
    }
    else {
        tagRegister.className = "wrongPass";
    }
}