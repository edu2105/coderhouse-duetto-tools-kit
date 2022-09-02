function startListeners(){
    let validatorBtn = document.getElementById("validator-btn");

    validatorBtn.addEventListener("click", e => {
        let payload = document.getElementById("floatingTextarea").value;
        htngValidator(payload);
    });
};

async function htngValidator(payload){
    let endpoint = "https://g2q49hzy5e.execute-api.sa-east-1.amazonaws.com/default/htngValidator";
    let requestHeaders = {
        'Content-Type': 'application/xml'
    };
    let requestOptions = {
        method: 'POST',
        headers: requestHeaders,
        body: payload
      };

    const response = await fetch(endpoint, requestOptions);
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