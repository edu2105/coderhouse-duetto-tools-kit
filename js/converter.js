function startListeners(){
    let converterBtn = document.getElementById("converter-btn");

    converterBtn.addEventListener("click", e => {
        let json = document.getElementById("payload-json").value;
        let csvTextArea = document.getElementById("payload-csv");

        converter(json,csvTextArea)
    });
};

async function converter(json, textarea){
    let endpoint = "https://enifi.stage.duettosystems.com/tools/jsontocsv";
    let requestHeaders = {
        'Content-Type': 'application/json'
    };
    let requestOptions = {
        method: 'POST',
        headers: requestHeaders,
        body: json
      };

    const response = await fetch(endpoint, requestOptions);
    console.log(response);
    const data = await response.text();
    console.log(data);
    if(response.ok){
        textarea.value = data;
    }else{
        Swal.fire({
            icon: 'error',
            html: `Error`,
            showConfirmButton: false
        });
        console.log(response.status);
    }
};

startListeners();