import { useState } from "react";
import { questionsDatabase } from "./QuestionsDatabase";

export default function Quiz() {

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);

    const handleAnswerButtonClick = (selectedOptionIndex) => {
        const selectedOption = questionsDatabase[currentQuestion].answers[selectedOptionIndex];
        const correctAnswer = questionsDatabase[currentQuestion].correctAnswer;
        selectedOption === correctAnswer ? alert("Correct!") : alert("Wrong!");
    }

    const handleNextButtonClick = () => {
        const nextQuestion = currentQuestion + 1;
        nextQuestion < questionsDatabase.length ? setCurrentQuestion(nextQuestion) : setShowScore(true);
    }

    return (
        <> 
            {showScore ? (
                <div>Score</div>
            ) : (
                <>
                    <div className="questionBlock">{questionsDatabase[currentQuestion].question}</div>
                    {questionsDatabase[currentQuestion].answers.map((option, index) => (
                    <div>                    
                    <button className="answerBtn" key={index} onClick={() => handleAnswerButtonClick(index)}>{option}</button>
                    </div>
                    ))}
                    <button className="nextBtn" onClick={() => handleNextButtonClick()}>Next question</button>
                    </>
                )}
        </>
    )
};