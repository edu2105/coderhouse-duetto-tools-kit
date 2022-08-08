import Score from './classes/score.js';

/**
 * Start the trivia using a prompt for user input.
 * Difficulty can be changed here, default is EASY.
 */
function triviaStart(){
    //Constants that will define the bias for the trivia difficulty.
    const EASY = 6;
    const MEDIUM = 3;
    const HARD = 0;

    //Message to be prompt
    let question = "Type an integration name and press ENTER. Type 'quit', 'QUIT' or click 'Cancel' to get your score.";
    //Object array containing all the possible answers with their weights.
    let triviaData = [
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
    let input = new String;
    let points = 0;
    let matches = new Array;
    let startTime = performance.now();
    
    while(input !== "quit"){
        input = prompt(question);
        //Check if user hits "Cancel"
        input = input != null ? input.toLowerCase() : "quit";
        //Check if the user input it is present in the object array with the possible answers.
        let response = triviaData.find(element => element.integration === input);
        if(response){
            points = points + response.weight;
            //Avoid the same valid answer more than one time.
            if(!matches.includes(input)){
                matches.push(response.integration);
            };
        };
    };

    let endTime = performance.now();
    //Trivia time in seconds.
    let time = (endTime - startTime) / 1000;
    //Create score object with EASY difficulty.
    let result = new Score(points, matches.length, triviaData.length, time, HARD);
    console.log("Trivia Mode");
    console.log(`Difficulty: <${result.getDifficulty()}>`);
    let weights = result.getWeights();
    for(const weight of weights) {
        console.log(`<${weight.type}> weight: ${weight.points}`);
    }

    //Get final score
    let finalScore = result.score;

    //Evaluate the score returned to show an alert with the final result.
    switch(true) {
        case (finalScore <= 0):
            Swal.fire({
                title: "Let me call an expert",
                html: "Seems like you are new in the company or you don't want to take this trivia seriously." +
                "<br>"+
                "Better luck next time!",
                imageUrl: 'https://i.postimg.cc/PJbMLzDB/Pawn-Stars-640x367.jpg',
                imageWidth: 300,
                imageHeight: 200,
                imageAlt: 'Pawned Star',
              });
            break;
        case (finalScore > 0 && finalScore < 0.4):
            Swal.fire({
                title: "Little Yoda",
                html: "Your Score is: <b>" + (finalScore * 10).toFixed(1) + "</b> out of 10." +
                "<br>" +
                `${matches.length} Matches --> ${matches}` +
                "<br>" +
                "<br>" +
                "Good job! you've type a few of all of the integrations we currently have." +
                "<br>"+
                "If you are interested please check our Documentation section to find out all of our integrations.",
                imageUrl: 'https://i.postimg.cc/MH965gJx/little-yoda.jpg',
                imageWidth: 300,
                imageHeight: 200,
                imageAlt: 'Little Yoda',
              });
            break;
        case (finalScore >= 0.4 && finalScore < 0.7):
            Swal.fire({
                title: "Cristiano",
                html: "Your Score is: <b>" + (finalScore * 10).toFixed(1) + "</b> out of 10." +
                "<br>" +
                `${matches.length} Matches --> ${matches}` +
                "<br>" +
                "<br>" +
                "It is evident that you work with integrations every day, however, you'll need a little more to be the best!" +
                "<br>"+
                "You can still learn more about us in our Documentation section whenever you want.",
                imageUrl: 'https://i.postimg.cc/BZm4rWRf/cristiano-ronaldo-655x368.jpg',
                imageWidth: 300,
                imageHeight: 200,
                imageAlt: 'Cristiano Ronaldo',
              });
            break;
        case (finalScore >= 0.7 && finalScore <= 1):
            Swal.fire({
                title: "Animal",
                html: "Your Score is: <b>" + (finalScore * 10).toFixed(1) + "</b> out of 10." +
                "<br>" +
                `${matches.length} Matches --> ${matches}` +
                "<br>" +
                "<br>" +
                "You are a black panther from the african savannah. Integrations fear you!" +
                "<br>"+
                "Congratulations, your feedback will be highly appreciate it.",
                imageUrl: 'https://i.postimg.cc/7LJ56P8z/black-panther1.jpg',
                imageWidth: 300,
                imageHeight: 200,
                imageAlt: 'Black Panther',
              });
            break;
        default:
            break;
    };
};

/**
 * Alert for trivia declined.
 */
function triviaDismiss(){
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
 * Request the user to take a trivia using sweetalert2.
 */
 let runTrivia = () => {
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
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: "Yes, I'm ready!"
      }).then((result) => {
        if(result.isConfirmed) {
            triviaStart();
        }else{
            triviaDismiss();
        };
      });
};

//Run the trivia.
runTrivia();