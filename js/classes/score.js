 export default class Score{

    constructor(points, numberOfInputs, numberOfPossibleAnswers, time, difficulty = 6, timeWeight = 0.65, pointsWeight = 0.25, inputsWeight = 0.1){
        this.points = points;
        this.numberOfInputs = numberOfInputs;
        this.numberOfPossibleAnswers = numberOfPossibleAnswers;
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
    
    get score(){
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
        let timeBonus = this.numberOfInputs / (this.time - TIME_BIAS);
        let numberOfInputsBonus = this.numberOfInputs / (this.numberOfPossibleAnswers - INPUTS_BIAS);

        if(timeBonus < 0 || timeBonus > 1){
            timeBonus = 1;
        };

        if(numberOfInputsBonus > 1){
            numberOfInputsBonus = 1;
        };

        if(this.numberOfInputs >= 0){
            score = (this.points * this.pointsWeight) + (numberOfInputsBonus * this.inputsWeight) + (timeBonus * this.timeWeight);
        };

        return score;
    };
};