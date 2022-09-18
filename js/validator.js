/**
 * Add on click listener to trigger the page functionallity
 */
function startListeners(){
    let validatorBtn = document.getElementById("validator-btn");

    validatorBtn.addEventListener("click", e => {
        let payload = document.getElementById("floatingTextarea").value;
        htngValidator(payload);
    });
};

/**
 * Send an XML payload to an external API which will validate the structure based on an XSD
 * @param {String} payload - XML body to validate
 */
async function htngValidator(payload){
    let loader = document.getElementById("loader-container");
    let endpoint = "https://g2q49hzy5e.execute-api.sa-east-1.amazonaws.com/default/htngValidator";
    let requestHeaders = {
        'Content-Type': 'application/xml'
    };
    let requestOptions = {
        method: 'POST',
        headers: requestHeaders,
        body: payload
      };

    loader.style.display = "block";
    const response = await fetch(endpoint, requestOptions);
    loader.style.display = "none";
    console.log(response);
    const data = await response.json();
    console.log(data);
    if(response.ok){
        Swal.fire({
            icon: 'success',
            html: `<b>${data.Message}</b>`,
            showConfirmButton: false,
            timer: 3000
        });
        console.log(data.Message);
    }else{
        Swal.fire({
            icon: 'error',
            html: `<b>${data.Message}</b><br><br>${data.Reason} at<br><br>${data.Path}`,
            showConfirmButton: false
        });
        console.log(response.status);
    }
};

startListeners();