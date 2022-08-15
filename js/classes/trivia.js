export default class Trivia{

    constructor(promptMessage, responses){
        this.promptMessage = promptMessage;
        this.responses = responses;
    };

    get getPromptMessage(){
        return this.promptMessage;
    };

    get getResponses(){
        return this.responses;
    };
    set setPromptMessage(promptMessage){
        this.promptMessage = promptMessage;
    };

    set setResponses(responses){
        this.responses = responses;
    };
};