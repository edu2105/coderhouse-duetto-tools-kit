 /**
  * Class Score that will contain the logic to calculate a final score based on different attributes.
  */
 export default class Scoring{

    constructor(points, inputs, possibleAnswers, time, difficulty = 3, timeWeight = 0.65, pointsWeight = 0.25, inputsWeight = 0.1){
        this.points = points;
        this.inputs = inputs;
        this.possibleAnswers = possibleAnswers;
        this.time = time;
        this.difficulty = difficulty;
        this.timeWeight = timeWeight;
        this.pointsWeight = pointsWeight;
        this.inputsWeight = inputsWeight;
    };

    getWeights(){
        let weights = new Array;
        weights.push({type: "time", points: this.timeWeight});
        weights.push({type: "points", points: this.pointsWeight});
        weights.push({type: "inputs", points: this.inputsWeight});
        return weights;
    };

    getDifficulty(){
        return this.difficulty;
    };

    get getInputs(){
        return this.inputs;
    };
    
    get getScore(){
        return this.calculateScore();
    };
    
    setWeights(weights){
        this.timeWeight = weights.time;
        this.pointsWeight = weights.points;
        this.inputsWeight = weights.inputs;
    };

    setDifficulty(difficulty){
        this.difficulty = difficulty;
    };

    /**
     * 
     * @returns The final score calculated based on all the properties of this class.
     */
    calculateScore(){
        const TIME_BIAS = this.difficulty;
        const INPUTS_BIAS = this.difficulty;

        let score = 0;
        let numberOfInputs = this.inputs.length;
        let numberOfPossibleAnswers = this.possibleAnswers.length;
        let timeBonus = numberOfInputs / (this.time - TIME_BIAS);
        let numberOfInputsBonus = numberOfInputs / (numberOfPossibleAnswers - INPUTS_BIAS);

        if(timeBonus < 0 || timeBonus > 1){
            timeBonus = 1;
        };

        if(numberOfInputsBonus > 1){
            numberOfInputsBonus = 1;
        };

        if(numberOfInputs >= 0){
            score = (this.points * this.pointsWeight) + (numberOfInputsBonus * this.inputsWeight) + (timeBonus * this.timeWeight);
        };

        return score;
    };
};