import { useState, useEffect } from "react";
import he from "he";

export default function QuizAPI() {

    const [questionsDatabase, setQuestionsDatabase] = useState({ decodedResults : []});
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);
    const [isCorrect, setIsCorrect] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);

    const correctAnswerObj = { "correct_answer": questionsDatabase.decodedResults[currentQuestion]?.correct_answer || "" };
    const incorrectAnswerObj = { "incorrect_answers": questionsDatabase.decodedResults[currentQuestion]?.incorrect_answers || [] };

    const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);
    const shuffledAnswers = questionsDatabase.decodedResults.length > 0 ? questionsDatabase.decodedResults[currentQuestion].merged_answers : []

    useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=10")
            .then((response) => {
                if (!response.ok) throw new Error(`Error: ${response.status}`)
                return response.json()
            })
            .then(parseData => {
                const decodedResults = parseData.results.map((questions) => ({
                    ...questions,
                    category: he.decode(questions.category),
                    question: he.decode(questions.question),
                    incorrect_answers: questions.incorrect_answers.map(he.decode),
                    correct_answer: he.decode(questions.correct_answer),
                    merged_answers: shuffle([...questions.incorrect_answers.map(he.decode), he.decode(questions.correct_answer)])
                }))
                console.log('decodedResults', decodedResults);
                setQuestionsDatabase({ decodedResults })})
            .catch((error) => console.log(error.message))
    }, []);

    const handleAnswerButtonClick = (answer) => {
        if (!isAnswered) {
        const selectedOptionIndex = shuffledAnswers.indexOf(answer)
        console.log('handleAnswer',selectedOptionIndex)
        const selectedOption = answer
        console.log("selectedOption", selectedOption)
        const correctAnswer = questionsDatabase.decodedResults[currentQuestion].correct_answer;
        setIsCorrect(selectedOption === correctAnswer);
        selectedOption === correctAnswer && setScore(score + 1);
        setIsAnswered(true);
        setSelectedOptionIndex(selectedOptionIndex);
        }
    }

    const handleNextButtonClick = () => {
        const nextQuestion = currentQuestion + 1;
        nextQuestion < questionsDatabase.decodedResults.length ? setCurrentQuestion(nextQuestion) : setShowScore(true);
        setIsCorrect(null);
        setIsAnswered(false);
        setSelectedOptionIndex(null);
    }

    const startNewQuiz = () => {
        setQuestionsDatabase({ decodedResults: []}); 
        setCurrentQuestion(0); 
        setShowScore(false); 
        setScore(0); 
        setIsCorrect(null);
        setIsAnswered(false);
        setSelectedOptionIndex(null);
    
        fetch("https://opentdb.com/api.php?amount=10")
            .then((response) => {
                if (!response.ok) throw new Error(`Error: ${response.status}`)
                return response.json()
            })
            .then(parseData => {
                const decodedResults = parseData.results.map((questions) => ({
                    ...questions,
                    category: he.decode(questions.category),
                    question: he.decode(questions.question),
                    incorrect_answers: questions.incorrect_answers.map(he.decode),
                    correct_answer: he.decode(questions.correct_answer),
                    merged_answers: shuffle([...questions.incorrect_answers.map(he.decode), he.decode(questions.correct_answer)])
                }))
                console.log('decodedResults', decodedResults);
                setQuestionsDatabase({ decodedResults })})
            .catch((error) => console.log(error.message))
      };

    return (

        <> 
            {showScore ? (
                <>
                    {score <= 2 && <iframe className="scorePicture" src="https://giphy.com/embed/YT95XJOLvY1t2SJgpR" style={{ margin: '4em' }} width="400" height="400" frameBorder="0" allowFullScreen></iframe>}
                    {(score > 2 & score <= 5) && <iframe  className="scorePicture" src="https://giphy.com/embed/Lk023zZqHJ3Zz4rxtV" style={{ margin: '2em' }} width="441" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>}
                    {(score > 5 & score <= 7) && <iframe src="https://giphy.com/embed/n7C5DOuH1m0iA" width="480" height="365" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>}
                    {(score > 7) && <iframe src="https://giphy.com/embed/yoJC2JaiEMoxIhQhY4" width="480" height="192" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>}                
                    <div className="scoreSection">You scored {score} out of {questionsDatabase.decodedResults.length} questions!</div>
                    <button className="newQuizBtn" onClick={startNewQuiz}>Retake quizzz</button>
                </>
            ) : (
                <>
                    {questionsDatabase.decodedResults[currentQuestion] && (
                    <><div className="questionBlock">{questionsDatabase.decodedResults[currentQuestion].question}</div>
                    {/* <div>Category: {questionsDatabase.decodedResults[currentQuestion].category}</div> */}
                    </>
                    )}
                    
                    
                    { isAnswered ? (

                    <>
                        
                        <div className="checkAnswer">
                            {isCorrect ? (
                                <div style={{color: '#3fc97d'}}>Yay, correct!</div>
                                ) : (
                                <div style={{color: '#e07070'}}>Argh... false!</div>
                                )}
                        </div>

                        {shuffledAnswers.map((option,index) => (
                        <div key={option}>
                            <button
                            className={`answerBtn ${
                                isCorrect && option === correctAnswerObj.correct_answer
                                  ? 'correctAnswer'
                                  : ''
                                } ${
                                !isCorrect && index === selectedOptionIndex
                                ? 'wrongAnswer'
                                : ''
                            } ${
                                !isCorrect && option === correctAnswerObj.correct_answer
                                  ? 'correctAnswer'
                                  : ''
                                }`}
                            style={{ pointerEvents: isAnswered ? 'none' : 'auto' }}
                            onClick={() => handleAnswerButtonClick(option)}
                            >
                            {option}
                            </button>
                        </div>
                        ))}

                        <button 
                            className="nextBtn" 
                            style={{border: '3px solid #7b81fb', color: '#3b43de'}} 
                            onClick={() => handleNextButtonClick()}>
                                Next question
                        </button>
                    </>    
                        
                    ) : (
                    
                        
                    <>
                        <div className="checkAnswer">
                            <div style={{color: 'white'}}>Placeholder</div>
                        </div>

                        {shuffledAnswers && shuffledAnswers.map((option) => (
                        <div key={option} > 
                            <button 
                                className="answerBtn" 
                                onClick={() => handleAnswerButtonClick(option)}>
                                    {option}
                            </button>
                        </div>
                        ))}
                        <button className="nextBtn" onClick={() => handleNextButtonClick()}>Next question</button>
                    </>
                    )
                    }
                </>
                )}
        </>
    )
};