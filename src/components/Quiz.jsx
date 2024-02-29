// import { useState, useEffect } from "react";
// import { questionsDatabase } from "./QuestionsDatabase";

// export default function Quiz() {

//     const [questions, setQuestions] = useState({});
//     const [currentQuestion, setCurrentQuestion] = useState(0);
//     const [showScore, setShowScore] = useState(false);
//     const [score, setScore] = useState(0);
//     const [isCorrect, setIsCorrect] = useState(null);
//     const [isAnswered, setIsAnswered] = useState(false);
//     const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);


//     useEffect(() => {
//         fetch("https://opentdb.com/api.php?amount=10&type=multiple")
//             .then((response) => {
//                 if (!response.ok) throw new Error(`Error: ${response.status}`)
//                 return response.json()
//             })
//             .then(parseData => setQuestions(parseData))
//             .catch((error) => alert(error.message))
//     }, []);

//     const handleAnswerButtonClick = (selectedOptionIndex) => {
//         if (!isAnswered) {
//         const selectedOption = questionsDatabase[currentQuestion].answers[selectedOptionIndex];
//         const correctAnswer = questionsDatabase[currentQuestion].correctAnswer;
//         setIsCorrect(selectedOption === correctAnswer);
//         selectedOption === correctAnswer && setScore(score + 1);
//         setIsAnswered(true);
//         setSelectedOptionIndex(selectedOptionIndex);
//         }
//     }

//     const handleNextButtonClick = () => {
//         const nextQuestion = currentQuestion + 1;
//         nextQuestion < questionsDatabase.length ? setCurrentQuestion(nextQuestion) : setShowScore(true);
//         setIsCorrect(null);
//         setIsAnswered(false);
//         setSelectedOptionIndex(null);
//     }

//     return (
//         <> 
//             {showScore ? (
//                 <>
//                     {score <= 1 && <iframe className="scorePicture" src="https://giphy.com/embed/YT95XJOLvY1t2SJgpR" style={{ margin: '4em' }} width="400" height="400" frameBorder="0" allowFullScreen></iframe>}
//                     {(score > 1 & score <= 4) && <iframe  className="scorePicture" src="https://giphy.com/embed/Lk023zZqHJ3Zz4rxtV" style={{ margin: '2em' }} width="441" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>}
//                     {(score > 4 & score <= 6) && <iframe className="scorePicture" src="https://giphy.com/embed/dkGhBWE3SyzXW" style={{ margin: '4em' }} width="480" height="360" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>}
//                     <div className="scoreSection">You scored {score} out of {questionsDatabase.length} questions!</div>
//                 </>
//             ) : (
//                 <>
//                     <div className="questionBlock">{questionsDatabase[currentQuestion].question}</div>
                    
//                     { isAnswered ? (

//                     <>
                        
//                         <div className="checkAnswer">
//                             {isCorrect ? (
//                                 <div style={{color: '#3fc97d'}}>Yay, correct!</div>
//                                 ) : (
//                                 <div style={{color: '#e07070'}}>Argh... false!</div>
//                                 )}
//                         </div>

//                         {questionsDatabase[currentQuestion].answers.map((option, index) => (
//                         <div key={index}>
//                             <button
//                             className={`answerBtn ${
//                                 isCorrect && option === questionsDatabase[currentQuestion].correctAnswer
//                                   ? 'correctAnswer'
//                                   : ''
//                                 } ${
//                                 !isCorrect && index === selectedOptionIndex
//                                 ? 'wrongAnswer'
//                                 : ''
//                             } ${
//                                 !isCorrect && option === questionsDatabase[currentQuestion].correctAnswer
//                                   ? 'correctAnswer'
//                                   : ''
//                                 }`}
//                             style={{ pointerEvents: isAnswered ? 'none' : 'auto' }}
//                             onClick={() => handleAnswerButtonClick(index)}
//                             >
//                             {option}
//                             </button>
//                         </div>
//                         ))}


//                         <button 
//                             className="nextBtn" 
//                             style={{border: '3px solid #7b81fb', color: '#3b43de'}} 
//                             onClick={() => handleNextButtonClick()}>
//                                 Next question
//                         </button>
//                     </>    
                        
//                     ) : (
                    
//                     <>
//                         <div className="checkAnswer">
//                             <div style={{color: 'white'}}>Placeholder</div>
//                         </div>

//                         {questionsDatabase[currentQuestion].answers.map((option, index) => (
//                         <div key={index} > 
//                             <button 
//                                 className="answerBtn" 
                                
//                                 onClick={() => handleAnswerButtonClick(index)}>
//                                     {option}
//                             </button>
//                         </div>
//                         ))}
//                         <button className="nextBtn" onClick={() => handleNextButtonClick()}>Next question</button>
//                     </>
//                     )
//                     }
//                 </>
//                 )}
//         </>
//     )
// };