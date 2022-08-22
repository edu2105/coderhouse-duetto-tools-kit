import Scoring from './classes/scoring.js';
import Trivia from './classes/trivia.js';

/**
 * Saves a key and value to the local storage
 * @param {string} key 
 * @param {string} value 
 */
const saveLocal = (key, value) => { localStorage.setItem(key, value) };

/**
 * Sets the main feedback form submit listener
 */
function feedbackFormListener(){
    let feedbackForm = document.getElementById("feedback-form");
    let inputsRegex = '[id ^= "ff"]';
    //Gets all the inputs that starts with id "ff-"
    let inputsArray = document.querySelectorAll(inputsRegex);
    //Empty object that will populate based on each input value
    let feedbackContent = {};

    feedbackForm.addEventListener("submit", (e) => {
        e.preventDefault();

        console.log("Form Submit button clicked");
        /**
         * For each input DOM object get the name after "ff-"
         * use it as the feedbackContent key name and then
         * use the input DOM object value as value for the key
        **/ 
        inputsArray.forEach(input => {
            let id = input.id.split('-')[1];
            if(input.type == "checkbox"){
                feedbackContent[id] = input.checked;    
            }else{
                feedbackContent[id] = input.value;
            };
        });
        Swal.fire({
            icon: 'success',
            title: 'Your feedback has been submitted, thank you!',
            showConfirmButton: false,
            timer: 2500
        });
        console.log("Feedback Form responses object: ");
        console.log({feedbackContent});
    });
};

/**
 * Sets the listeners and actions for the Trivia Result Form buttons
 * @param {object} container - The main DIV where the Trivia Result Form lives
 * @param {object} submit - Submit button from the Trivia Result Form
 * @param {object} cancel - The Hide/Cancel button from the Trivia Result Form
 */
function triviaResultListeners(container, submit, cancel){

    submit.addEventListener("submit", (e) => {
        e.preventDefault();

        console.log("Trivia Submit button clicked");
        Swal.fire({
            icon: 'success',
            title: 'Your score has been saved',
            showConfirmButton: false,
            timer: 1500
        });
        
        container.style.display = "none";
    });

    /** 
     * When Hide/Cancel button is clicked then the main DIV 
     * that contains the Trivia Result Form will be hidden
    **/ 
    cancel.addEventListener("click", (e) => {
        e.preventDefault();

        console.log("Trivia Cancel/Hide button clicked");
        
        container.style.display = "none";
    });
};

/**
 * Creates a new Trivia object containing an array with possible responses
 * and a message to be prompted in the beginning
 * @returns Trivia object
 */
function createTrivia(){
    console.log("Trivia accepted");
    let trivia = new Trivia();
    //Message to be prompt
    trivia.setPromptMessage = "Type an integration name and press ENTER or click 'Submit'. Click 'Finish' or type 'quit' to abort or get your score.";
    //Object array containing all the possible answers with their weights.
    trivia.setResponses = [
        {"integration": "amadeus", "weight": 0.04},
        {"integration": "avalon", "weight": 0.08},
        {"integration": "cambridge", "weight": 0.05},
        {"integration": "comanche", "weight": 0.09},
        {"integration": "guestcentric", "weight": 0.04},
        {"integration": "h world", "weight": 0.09},
        {"integration": "hms", "weight": 0.04},
        {"integration": "ihotelier", "weight": 0.04},
        {"integration": "lms", "weight": 0.02},
        {"integration": "maestro", "weight": 0.04},
        {"integration": "mews", "weight": 0.02},
        {"integration": "opera", "weight": 0.01},
        {"integration": "prestige", "weight": 0.06},
        {"integration": "protel", "weight": 0.04},
        {"integration": "rguest", "weight": 0.03},
        {"integration": "rms", "weight": 0.03},
        {"integration": "sihot", "weight": 0.03},
        {"integration": "siteminder", "weight": 0.03},
        {"integration": "sms", "weight": 0.04},
        {"integration": "tca", "weight": 0.03},
        {"integration": "tms", "weight": 0.04},
        {"integration": "v1", "weight": 0.02},
        {"integration": "winks", "weight": 0.09}
    ];
    console.log("Trivia created");
    return trivia;
};

/**
 * Start the trivia process using a Trivia object.
 * @param {Trivia} trivia - Get the possible responses and initial prompt message.
 */
function triviaStart(trivia){
    //Constants top map the bias for the trivia difficulty
    const EASY = 6;
    const MEDIUM = 3;
    const HARD = 0;

    let trMainDiv = document.getElementById("tr-main-div");
    let trUiForm = document.getElementById("trui-form");
    let trUiMessage = document.getElementById("trui-message");
    let trUiFinish = document.getElementById("trui-finish");
    let points = 0;
    let matches = [];
    //Get trivia possible responses
    let triviaResponses = trivia.getResponses;
    //Get initial message to be prompted
    let question = trivia.getPromptMessage;
    console.log("Trivia started");
    trMainDiv.classList.add("justify-trivia");
    trUiMessage.innerHTML = question;
    trUiForm.style.display = "flex";
    let startTime = performance.now();
    
    trUiForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        let input = document.getElementById("trui-input");
        let inputValue = input.value.toLowerCase();
        if(inputValue === "quit"){
            trUiFinish.click();
        };
        input.value = "";
        //Check if the user input it is present in the object array with the possible answers.
        let response = triviaResponses.find(element => element.integration === inputValue);
        if(response){
            points = points + response.weight;
            //Avoid the same valid answer more than one time
            if(!matches.includes(inputValue)){
                matches.push(response.integration);
            };
        };
    });

    trUiFinish.addEventListener("click", (e) => {
        e.preventDefault();

        console.log("Trivia finished/quit");
        trUiForm.style.display = "none";
        let endTime = performance.now();
        //Trivia time in seconds
        let time = (endTime - startTime) / 1000;
        //Create scoring object and call triviaFinish
        let score = new Scoring(points, matches, triviaResponses, time);
        triviaFinish(score);
    });
};

/**
 * Calculates the final score and populates the messages that will be shown 
 * in the showTriviaResult function
 * @param {Scoring} score - calculates the final result
 */
function triviaFinish(score){
    let matches = score.getInputs;
    let triviaMode = score.getWeights();
    console.log("Trivia Mode");
    triviaMode.push({type: "difficulty", points: score.getDifficulty()});
    console.table(triviaMode);

    //Get final score
    let finalScore = score.getScore;
    console.log(`Final score: <${finalScore}>`);
    //Creates an empty object to populate the dynamic form that will be created
    let uiResult = {
        "imageUrl": '',
        "imageAlt": '',
        "titleText": '',
        "scoreText": '',
        "descriptionText": ''
    };

    //Evaluate the score returned to show an alert with the final result
    switch(true) {
        case (finalScore <= 0):
            uiResult.imageUrl = 'https://i.postimg.cc/PJbMLzDB/Pawn-Stars-640x367.jpg';             
            uiResult.imageAlt = "Pawned Star",
            uiResult.titleText = "Let me call an expert";
            uiResult.scoreText = "Seems like you are new in the company or you don't want to take this trivia seriously.";
            uiResult.descriptionText = "Better luck next time!";
            break;
        case (finalScore > 0 && finalScore < 0.4):
            uiResult.imageUrl = 'https://i.postimg.cc/MH965gJx/little-yoda.jpg';
            uiResult.imageAlt = "Little Yoda",
            uiResult.titleText = "Little Yoda";
            uiResult.scoreText = "Your Score is: <b>" + (finalScore * 10).toFixed(1) + "</b> out of 10.";
            uiResult.descriptionText = "Good job! you've type a few of all of the integrations we currently have. If you are interested please check our Documentation section to find out all of our integrations.";
            break;
        case (finalScore >= 0.4 && finalScore < 0.7):
            uiResult.imageUrl = 'https://i.postimg.cc/BZm4rWRf/cristiano-ronaldo-655x368.jpg';
            uiResult.imageAlt = "Cristiano Ronaldo",
            uiResult.titleText = "Cristiano";
            uiResult.scoreText = "Your Score is: <b>" + (finalScore * 10).toFixed(1) + "</b> out of 10.";
            uiResult.descriptionText = "It is evident that you work with integrations every day, however, you'll need a little more to be the best! You can still learn more about us in our Documentation section whenever you want.";
            break;
        case (finalScore >= 0.7 && finalScore <= 1):
            uiResult.imageUrl = 'https://i.postimg.cc/7LJ56P8z/black-panther1.jpg';
            uiResult.imageAlt = "Black Panther",
            uiResult.titleText = "Animal";
            uiResult.scoreText = "Your Score is: <b>" + (finalScore * 10).toFixed(1) + "</b> out of 10.";
            uiResult.descriptionText = "You are a black panther from the african savannah. Integrations fear you! Congratulations, your feedback will be highly appreciate it.";
        default:
            break;
    };

    showTriviaResult(uiResult, matches);
};

/**
 * Dynamically updates the DOM using the following structure
 * DIV --> FORM --> FIELDSET --> SECTION / UL / DIV
 * Where SECTION contains the details of the result
 * UL contains the matches the user did
 * DIV contains 2 buttons to save or hide the result
 * @param {object} uiResult 
 * @param {array} matches 
 */
function showTriviaResult(uiResult, matches){
    let trMainDiv = document.getElementById("tr-main-div");
    let trDiv = document.getElementById("trivia-results");

    let trForm = document.createElement("form");
    let trFieldSet = document.createElement("fieldset");
    let trImage = document.createElement("img");
    let trLegend = document.createElement("legend");
    let trBody = document.createElement("section");
    let trTitle = document.createElement("h4");
    let trScore = document.createElement("p");
    let trDescription = document.createElement("p");
    let trUl = document.createElement("ul");
    let trInputDiv = document.createElement("div");
    let trBtnSave = document.createElement("input");
    let trBtnDiscard = document.createElement("button");

    trForm.setAttribute("class", "trForm");

    trLegend.setAttribute("class", "trLegend");
    trLegend.innerHTML = "Trivia Result";
    trFieldSet.setAttribute("class", "fieldset");

    trImage.setAttribute("src", uiResult.imageUrl);
    trImage.setAttribute("alt", uiResult.imageAlt);
    trImage.setAttribute("class", "trImage");
    
    trBody.setAttribute("class", "trBody");
    trScore.setAttribute("class", "trScore");
    trScore.innerHTML = uiResult.scoreText;
    trTitle.setAttribute("class", "trTitle");
    trTitle.innerHTML = uiResult.titleText;
    trDescription.setAttribute("class", "trDescription");
    trDescription.innerHTML = uiResult.descriptionText;
    trBody.appendChild(trTitle);
    trBody.appendChild(trScore);
    trBody.appendChild(trDescription);

    trUl.setAttribute("class", "trMatchItems");

    trInputDiv.setAttribute("class", "trInputDiv");
    trBtnSave.setAttribute("class", "trBtn");
    trBtnSave.setAttribute("type", "submit");
    trBtnDiscard.setAttribute("class", "trBtn");
    trBtnDiscard.innerHTML = "Hide";
    trInputDiv.appendChild(trBtnSave);
    trInputDiv.appendChild(trBtnDiscard);

    trFieldSet.appendChild(trLegend);
    trFieldSet.appendChild(trImage);
    trFieldSet.appendChild(trBody);
    trFieldSet.appendChild(trUl);
    trFieldSet.appendChild(trInputDiv);

    trForm.appendChild(trFieldSet)
    trDiv.appendChild(trForm);

    console.log("Trivia result displayed in DOM");

    /**Dynamically add one list element for each item on the matches array
     * Then append each list element to the UL
    **/
    for(const item in matches){
        let trLi = document.createElement("li");
        trLi.setAttribute("class", "trMatchItem");
        trLi.innerHTML = matches[item];

        trUl.appendChild(trLi);
    };

    /**If there is no matches or the array is empty then the Submit button
     * will not be displayed. Otherwise the button will be present and the
     * Div containing the 2 buttons needs to be aligned properly
    **/ 
    if(!matches.length){
        console.log("User has quit without any matches");
        trBtnSave.style.display = "none";
    }

    trMainDiv.classList.add("justify-trivia");

    //Activate the buttons listeners
    triviaResultListeners(trDiv, trForm, trBtnDiscard);
};

/**
 * Shows an Alert when trivia is declined.
 */
function triviaDismiss(){
    console.log("Trivia cancelled");
    Swal.fire({
        title: "That's Ok!",
        html: "No problem, we understand your time is valuable!" +
        "<br>"+
        "If you change your mind please refresh this page or send us any feedback by completing the form.",
        imageUrl: 'https://i.postimg.cc/JhPcy8n5/homer-sad-ok.jpg',
        imageWidth: 300,
        imageHeight: 200,
        imageAlt: 'Homer sad',
      })
};

/**
 * Requests the user to take a trivia using sweetalert2.
 */
const triviaRequest = () => {
    Swal.fire({
        title: 'Trivia Time',
        html: "Would you like to take a quick trivia?" +
        "<br>" +
        "You'll be prompted to write any integration name you have in mind and hit ENTER. Type 'quit', 'QUIT' or click 'Cancel' when you are done to get your score." +
        "<br>" +
        "<br>" +
        "<i>We will be ranking you based on your speed (this makes the big difference), which integrations you can name (if they are not common the more points you can get) and how many matches you can make.</i>",
        imageUrl: "https://i.postimg.cc/VLwTp3vB/lenny-pensando.jpg",
        imageWidth: 300,
        imageHeight: 200,
        imageAlt: 'Lenny thinking',
        showCancelButton: true,
        showDenyButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        denyButtonColor: '#B0B0B0',
        confirmButtonText: "Yes, I'm ready!",
        denyButtonText: "Don't ask me again"
      }).then((result) => {
        if(result.isConfirmed) {
            let trivia = createTrivia();
            triviaStart(trivia);
        }else{
            triviaDismiss();
            if(result.isDenied){
                saveLocal("triviaRequest", false.toString());
            };
        };
      });
};

const checkTriviaSession = () => {
    let requestTrivia = localStorage.getItem("triviaRequest");
    if(requestTrivia !== "false"){
        triviaRequest();
    };
};

//Setting up the feedback form submit listener
feedbackFormListener();
//Check local storage and run trivia request if needed
checkTriviaSession();