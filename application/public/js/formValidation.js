const usernameRegex = /^[A-Z|a-z]+[A-Z|a-z|0-9]$/;
// regex taken from Santiago Jaramillo: https://regexr.com/2ri2c
const emailRegex = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi;
const specialCharRegex = /[/*-+!@#$^&*]/g;
const uppercaseRegex = /[A-Z]/g;
const numberRegex = /[1-9]/g;
// obtain all needed dom elements
let form = (document.getElementsByTagName('form'))[0];
let username = (document.getElementsByClassName('username'))[0];
let email = (document.getElementsByClassName('email'))[0];
let password = (document.getElementsByClassName('password'))[0];
let passwordConf = (document.getElementsByClassName('password_conf'))[0];
let ageConf = (document.getElementsByClassName('age_conf'))[0];
let tosConf = (document.getElementsByClassName('tos_conf'))[0];

let usernameError = (document.getElementsByClassName('username_error'))[0];
let emailError = (document.getElementsByClassName('email_error'))[0];
let passwordError = (document.getElementsByClassName('password_error'))[0];
let passwordConfError = (document.getElementsByClassName('password_conf_error'))[0]

let usernameValidity = false;
let emailValidity = false;
let passwordValidity = false;
let passwordConfValidity = false;

// validate username:
username.addEventListener('input', function (event) {
  if (!(username.value.match(usernameRegex))) {
    usernameError.className = 'error_active username_error';
    usernameError.innerHTML = "Username must begin with a character and be alphanumeric.";
    usernameValidity = false;
  } else if ((username.value.length < 3)){
    usernameError.className = 'error_active username_error';
    usernameError.innerHTML = "Username must be at least 3 characters long.";
    usernameValidity = false;
  } else {
    usernameError.className = 'error username_error';
    usernameError.innerHTML = "";
    usernameValidity = true;
  }
});
// validate email:
email.addEventListener('input', function (event) {
  if (!(email.value.match(emailRegex))) {
    emailError.className = 'error_active email_error';
    emailError.innerHTML = "Email must be valid.";
    emailValidity = false;
  } else {
    emailError.className = 'error email_error';
    emailError.innerHTML = "";
    emailValidity = true;
  }
});
// validate password:
password.addEventListener('input', function (event) {
  if (!(password.value.match(specialCharRegex))) {
    passwordError.className = 'error_active password_error';
    passwordError.innerHTML = "Password must contain a special character.";
    passwordValidity = false;
  } else if (!(password.value.match(uppercaseRegex)) || !(password.value.match(numberRegex))) {
    passwordError.className = 'error_active password_error';
    passwordError.innerHTML = "Password must contain an uppercase letter and a number.";
    passwordValidity = false;
  } else if (password.value.length < 8) {
    passwordError.className = 'error_active password_error';
    passwordError.innerHTML = "Password must be at least 8 characters long.";
    passwordValidity = false;
  } else {
    passwordError.className = 'error email_error';
    passwordError.innerHTML = "";
    passwordValidity = true;
  }
});
// validate password Retype
passwordConf.addEventListener('input', function (event) {
  if (!(password.value == passwordConf.value)) {
    passwordConfError.className = 'error_active password_conf_error';
    passwordConfError.innerHTML = "Passwords must match.";
    passwordConfValidity = false;
  } else {
    passwordConfError.className = 'error password_conf_error';
    passwordConfError.innerHTML = "";
    passwordConfValidity = true;
  }
});
// validate age done on submit

// validate TOS done on submit

// form submission prevention:
form.addEventListener('submit', function (event) {
  if (!usernameValidity | !emailValidity | !passwordValidity | !passwordConfValidity) {
    event.preventDefault();
  }
});
