/**
 * Add on submit listener to trigger the page functionallity
 */
function startListeners(){
    let rateSumForm = document.getElementById("form-rate-sum");
    let file = document.getElementById("formFile");

    rateSumForm.addEventListener("submit", e => {
        e.preventDefault();

        let formData = new FormData(rateSumForm);
        formData.append("rateFile", file.files[0]);

        rateSum(formData);
    });
};

/**
 * Sends a TSV file to an external endpoint to calculate the rate sum
 * @param {file} formData - TSV File that should contain a "RATE" column with at least 1 row
 */
async function rateSum(formData){
    let endpoint = "https://enifi.stage.duettosystems.com/nifi-tools/rateSum";
    let requestOptions = {
        method: "POST",
        body: formData
    };

    const response = await fetch(endpoint, requestOptions);
    console.log(response);
    const data = await response.json();
    if(response.ok){
        Swal.fire({
            icon: 'success',
            title: "Rate Total",
            html: `${data.rateSum}`
        });
    }else{
        Swal.fire({
            icon: 'error',
            title: "Failed",
            html: `${data.error}`,
            showConfirmButton: false
        });
        console.log(response.status);
    }
};

startListeners();