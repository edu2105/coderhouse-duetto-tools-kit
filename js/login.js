let bcrypt = dcodeIO.bcrypt;

const initializeState = () => {
    sessionStorage.clear();
};

const loginListeners = () => {
    let signUpBtn = document.getElementById("sign-up-btn");
    let signInBtn = document.getElementById("sign-in-btn");
    let loginForm = document.getElementById("login-form");
    let registerForm = document.getElementById("sign-up-form");
    let signInFormPage = document.getElementById("sign-in-form-page");
    let signUpFormPage = document.getElementById("sign-up-form-page");
    let signInOptionPage = document.getElementById("sign-in-option-page");
    let signUpOptionPage = document.getElementById("sign-up-option-page");
    let transitionFromClick = false;

    signUpBtn.addEventListener("click", (e) => {
        console.log("Sign Up button clicked");
        transitionFromClick = true;
        signInFormPage.classList.add("hide-form");
    });

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
        let loginMessage = document.getElementById("login-message");
        let currentUsers = JSON.parse(localStorage.getItem("users") || "[]");
        let userFound = currentUsers.find( (user) => {
            if(user.username === username){
                return user;
            };
        });;

        if(userFound){
            bcrypt.compare(password, userFound.password, function(err, result){
                if(result){
                    sessionStorage.setItem("userLoggedIn", "true");
                    window.location.replace('../index.html');
                }else{
                    loginMessage.innerHTML = "Incorrect Password";
                    loginMessage.style.color = "red";
                };
            });
        }else{
            loginMessage.innerHTML = "User does not exist";
            loginMessage.style.color = "red";
        };
    });

    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();

        let name = document.getElementById("sign-up-name").value;
        let username = document.getElementById("sign-up-username").value;
        let password = document.getElementById("sign-up-password").value;
        let signUpMessage = document.getElementById("sign-up-message");
        let currentUsers = JSON.parse(localStorage.getItem("users") || "[]");
        let userPresent = currentUsers.find( (user) => {
            if(user.username === username){
                return true;
            };
            return false;
        });

        if(userPresent){
            signUpMessage.innerHTML = "User already exists";
            signUpMessage.style.color = "red";
        }else{
            let newUser = {
                "name": name,
                "username": username,
                "password": password,
                "isActive": true
            };

            bcrypt.genSalt(5, (err, salt) => {
                bcrypt.hash(password, salt, function(err, hash) {
                    newUser.password = hash;
                    currentUsers.push(newUser);
                    console.log(currentUsers);
                    localStorage.setItem("users", JSON.stringify(currentUsers));
                    console.log("New user added: ");
                    console.log({newUser});
                });
            });

            Swal.fire({
                icon: 'success',
                title: 'Your user has been created',
                showConfirmButton: false,
                timer: 2500
            });
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
};

initializeState();
loginListeners();