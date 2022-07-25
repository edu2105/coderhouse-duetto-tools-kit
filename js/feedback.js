function loopChallenge(){
    let questions = [
        "Have you ever been intersting in the Integrations team?\n(Yes/No)",
        "How many years you have been working at Duetto?",
        "Do you want to be updated of our last changes?\n(Yes/No)",
        "Which is the integration you worked the most?"
    ];
    let responses = new Array();
    let do_questionnaire = prompt("Hi! before sending us feedback we'd like to ask you some questions.\n" +
    "Would you like to continue?\n(Y/N)").toLowerCase();

    console.log(`Use response to taking questionnaire: <${do_questionnaire}>`);
    if(do_questionnaire == "yes" || do_questionnaire == "y"){
        for(question in questions){
            responses[question] = prompt(questions[question]);
        };
        console.log(`Questionnaire responses are: ${responses}`);
        alert("Thank you for your time! :)");
    }else{
        alert("We understand your time is valuable.\n" +
        "If you change your mind please refresh this page\n" +
        "Thank you!");
    };
};

loopChallenge();