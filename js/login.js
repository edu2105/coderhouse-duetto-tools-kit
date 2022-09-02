//bcrypt for hashing passwords with salt
let bcrypt = dcodeIO.bcrypt;

/**
 * Removes any active session
 */
const initializeState = () => {
    sessionStorage.removeItem("userLoggedIn");
    localStorage.removeItem("keepLoggedIn");
};

/**
 * Functionallity for all inputs available
 */
const loginListeners = () => {
    let signUpBtn = document.getElementById("sign-up-btn");
    let signInBtn = document.getElementById("sign-in-btn");
    let loginForm = document.getElementById("login-form");
    let registerForm = document.getElementById("sign-up-form");
    let signInFormPage = document.getElementById("sign-in-form-page");
    let signUpFormPage = document.getElementById("sign-up-form-page");
    let signInOptionPage = document.getElementById("sign-in-option-page");
    let signUpOptionPage = document.getElementById("sign-up-option-page");
    let password = document.getElementById("sign-up-ff-password");
    let rPassword = document.getElementById("sign-up-ff-rpassword");
    let passwordMessage = document.getElementById("sign-up-message-password");
    let transitionFromClick = false;
    let typeMaxInterval = 1100;
    let typeTimer;
    const checkPassRepetead = () => {
        if(password.value !== rPassword.value){
            password.classList.add("error-pass");
            rPassword.classList.add("error-pass");
            passwordMessage.innerHTML = "Password does not match";
        }else{
            password.classList.remove("error-pass");
            rPassword.classList.remove("error-pass");
            passwordMessage.innerHTML = "";
        };
    };

    //Hide sign in form when sign up button is clicked
    signUpBtn.addEventListener("click", (e) => {
        console.log("Sign Up button clicked");
        transitionFromClick = true;
        signInFormPage.classList.add("hide-form");
    });

    //Hide sign up form when sign in button is clicked
    signInBtn.addEventListener("click", (e) => {
        console.log("Sign In button clicked");
        transitionFromClick = true;
        signUpFormPage.classList.add("hide-form");
    });

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        console.log("Login form submitted");

        let username = document.getElementById("login-username").value;
        let password = document.getElementById("login-password").value;
        let keepLogged = document.getElementById("keep-logged").checked;
        let loginMessage = document.getElementById("login-message");
        //Get all users saved in localStorage, if no users are found then return empty array
        let currentUsers = JSON.parse(localStorage.getItem("users") || "[]");
        //Find and return user
        let userFound = currentUsers.find( (user) => {
            return user.username === username && user;
        });;

        //If user was found then compare plain password vs password hashed
        if(userFound){
            bcrypt.compare(password, userFound.password, function(err, result){
                if(result){
                    keepLogged && localStorage.setItem("keepLoggedIn", keepLogged.toString());
                    sessionStorage.setItem("userLoggedIn", true.toString());
                    window.location.replace('../index.html');
                }else{
                    loginMessage.innerHTML = "Incorrect Password";
                };
            });
        }else{
            loginMessage.innerHTML = "User does not exist";
        };
    });

    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();

        let inputsRegex = '[id  ^= "sign-up-ff"]';
        let inputsArray = document.querySelectorAll(inputsRegex);
        let signUpFormInput = {};
        let signUpMessage = document.getElementById("sign-up-message");

        inputsArray.forEach(input => {
            let id = input.id.split('sign-up-ff-')[1];
            signUpFormInput[id] = input.value;
        });
        
        //Get all users saved in localStorage, if no users are found then return empty array
        let currentUsers = JSON.parse(localStorage.getItem("users") || "[]");
        let userPresent = currentUsers.find( (user) => {
            return user.username === signUpFormInput.username && true;
        });

        if(userPresent){
            signUpMessage.innerHTML = "User already exists";
            signUpMessage.style.color = "red";
        }else{
            let newUser = {
                "name": signUpFormInput.name,
                "username": signUpFormInput.username,
                "password": signUpFormInput.password,
                "isActive": true
            };

            //Hash plain password and save user in localStorage
            bcrypt.genSalt(5, (err, salt) => {
                bcrypt.hash(signUpFormInput.password, salt, function(err, hash) {
                    newUser.password = hash;
                    currentUsers.push(newUser);
                    console.log(currentUsers);
                    localStorage.setItem("users", JSON.stringify(currentUsers));
                    console.log("New user added: ");
                    console.log({newUser});
                });
            });

            signInBtn.click();
        };
    });

    signInFormPage.addEventListener("transitionend", (e) =>{
        console.log("Sign In form page transition end");
        if(window.getComputedStyle(signUpFormPage).visibility == "hidden" && transitionFromClick){
            signUpOptionPage.style.display = "none";
            signUpFormPage.classList.remove("hide-form");
            signUpFormPage.classList.add("display-form");
            signInOptionPage.style.display = "flex";
            transitionFromClick = false;
        }
    });

    signUpFormPage.addEventListener("transitionend", (e) => {
        console.log("Sign Up form page transition end");
        if(window.getComputedStyle(signInFormPage).visibility == "hidden" && transitionFromClick){
            signInOptionPage.style.display = "none";
            signInFormPage.classList.remove("hide-form");
            signInFormPage.classList.add("display-form");
            signUpOptionPage.style.display = "flex";
            transitionFromClick = false;
        };
    });

    rPassword.addEventListener("keyup", () => {
        clearTimeout(typeTimer);
        typeTimer = setTimeout(checkPassRepetead, typeMaxInterval);
    });

    rPassword.addEventListener("keydown", () => {
        clearTimeout(typeTimer);
    });

};

initializeState();
loginListeners();