/**
 * If user has not active session then will be redirected to login page
 */
const checkLoggedIn = () => {
    let loggedIn = sessionStorage.getItem("userLoggedIn");
    let keepLoggedIn = localStorage.getItem("keepLoggedIn");
    if((loggedIn !== "true") && (keepLoggedIn !== "true")){
        window.location.replace('../sections/login.html');
    };
};

checkLoggedIn();