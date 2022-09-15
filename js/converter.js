/**
 * Add on click listener to trigger the page functionallity
 */
function startListeners(){
    let converterBtn = document.getElementById("converter-btn");

    converterBtn.addEventListener("click", e => {
        let json = document.getElementById("payload-json").value;
        let csvTextArea = document.getElementById("payload-csv");

        converter(json,csvTextArea)
    });
};

/**
 * Convert JSON payload to CSV using an external endpoint
 * @param {object} json - Well formed JSON payload to be converted 
 * @param {object} textarea - Html element to display the CSV result
 */
async function converter(json, textarea){
    let endpoint = "https://enifi.stage.duettosystems.com/nifi-tools/jsontocsv";
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
    if(response.ok){
        const data = await response.text();
        textarea.value = data;
    }else{
        const data = await response.json();
        Swal.fire({
            icon: 'error',
            html: `${data.Message}`,
            showConfirmButton: false
        });
        console.log(response.status);
    }
};

startListeners();