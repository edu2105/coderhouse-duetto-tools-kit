const checkLoggedIn = () => {
    let loggedIn = sessionStorage.getItem("userLoggedIn");
    if(loggedIn !== "true"){
        window.location.replace('../sections/login.html');
    };
};

checkLoggedIn();