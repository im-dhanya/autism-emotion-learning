import { useState, useEffect } from "react";
import { testDatas } from "./TestDatas";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaHome, FaBook, FaSmile, FaStar, FaQuestionCircle, FaCheck, FaRocket } from "react-icons/fa";
// Option 1: Use an online placeholder or remove the import if the file doesn't exist
// import confetti from "./confetti.png";

function TestModule() {
  const [quizDatas, setQuizDatas] = useState(testDatas);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerSelected, setIsAnswerSelected] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [progressPercent, setProgressPercent] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  const getUserToken = localStorage.getItem("token");
  const getUserData = JSON.parse(localStorage.getItem("userData"));
  const autism_level = localStorage.getItem("autism-level");
  const navigate = useNavigate();

  useEffect(() => {
    // Calculate progress percentage
    setProgressPercent((currentQuestion / quizDatas.length) * 100);
  }, [currentQuestion, quizDatas.length]);

  async function updateMarks() {
    try {
      const url = await axios.post("http://localhost:5000/api/student/quiz/score", {
        name: getUserData.email.slice(0, getUserData.email.indexOf('@')).toUpperCase(),
        marks: `${score}/20`
      });
      const response = url.data;
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  function handleAnswerClick(answer) {
    if (isAnswerSelected) return;
    
    setSelectedAnswer(answer);
    setIsAnswerSelected(true);
    
    const correct = answer === quizDatas[currentQuestion].correctAnswer;
    setIsCorrect(correct);
    
    if (correct) {
      setScore((prevScore) => prevScore + 1);
    }
    
    // Delay moving to next question to show feedback
    setTimeout(() => {
      moveToNextQuestion();
    }, 1500);
  }

  function moveToNextQuestion() {
    let nextQuestion = currentQuestion + 1;
    
    if (nextQuestion >= quizDatas.length) {
      setShowCelebration(true);
      
      setTimeout(() => {
        updateMarks();
        navigate("/dashboard");
        setScore(0);
      }, 5000);
      
      return;
    }
    
    setCurrentQuestion(nextQuestion);
    setSelectedAnswer(null);
    setIsAnswerSelected(false);
    setIsCorrect(null);
  }

  const getOptionButtonStyle = (answer) => {
    if (!isAnswerSelected) {
      return "option-button";
    }
    
    if (answer === quizDatas[currentQuestion].correctAnswer) {
      return "option-button correct";
    }
    
    if (answer === selectedAnswer && answer !== quizDatas[currentQuestion].correctAnswer) {
      return "option-button incorrect";
    }
    
    return "option-button disabled";
  };

  return (
    <div className="app-container">
      <header className="main-header">
        <div className="header-content">
          <h2 className="title">Fun Quiz Time!</h2>
          <div className="character-container">
            <div className="character quiz-character"></div>
          </div>
        </div>
        <nav className="main-nav">
          <ul>
            {!getUserToken ? <li><Link to={"/"} className="nav-link"><FaHome /> Join Us</Link></li> : null}
            {getUserToken ? <li><Link to={"/dashboard"} className="nav-link"><FaHome /> My Home</Link></li> : null}
            {getUserToken && getUserData.name === "parent" ? <li><Link to={"/survey"} className="nav-link"><FaBook /> Parent Survey</Link></li> : null}
            {getUserToken ? <li><Link to={"/study/module"} className="nav-link"><FaBook /> Learning Center</Link></li> : null}
            {getUserToken && autism_level <= 60 ? <li><Link to={"/communication/low/module"} className="nav-link"><FaSmile /> Communication Fun</Link></li> : null}
            {getUserToken && autism_level > 60 ? <li><Link to={"/communication/high/module"} className="nav-link"><FaSmile /> Communication Skills</Link></li> : null}
            {getUserToken ? <li><Link to={"/test/module"} className="nav-link active"><FaStar /> Test Your Skills</Link></li> : null}
          </ul>
        </nav>
      </header>
      
      <div className="page-content">
        {showCelebration ? (
          <div className="celebration-container">
            <h1>Great Job! 🎉</h1>
            <div className="score-display">
              <div className="final-score">{score}</div>
              <div className="total-score">out of {quizDatas.length}</div>
            </div>
            <p className="congrats-message">Wow! You did amazing on the quiz!</p>
            <div className="confetti-container">
              {/* Option 2: Replace with inline SVG confetti */}
              <svg className="confetti left" width="150" height="150" viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg">
                <circle cx="30" cy="30" r="10" fill="#FF9E00" />
                <circle cx="60" cy="20" r="8" fill="#4D6DE3" />
                <circle cx="90" cy="40" r="12" fill="#EF476F" />
                <circle cx="50" cy="70" r="9" fill="#06D6A0" />
                <circle cx="120" cy="50" r="7" fill="#8338EC" />
                <rect x="20" y="90" width="15" height="15" fill="#FF9E00" transform="rotate(30)" />
                <rect x="70" y="60" width="10" height="10" fill="#4D6DE3" transform="rotate(45)" />
                <rect x="100" y="90" width="12" height="12" fill="#EF476F" transform="rotate(15)" />
              </svg>
              <svg className="confetti right" width="150" height="150" viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg">
                <circle cx="30" cy="30" r="10" fill="#06D6A0" />
                <circle cx="60" cy="20" r="8" fill="#8338EC" />
                <circle cx="90" cy="40" r="12" fill="#FF9E00" />
                <circle cx="50" cy="70" r="9" fill="#4D6DE3" />
                <circle cx="120" cy="50" r="7" fill="#EF476F" />
                <rect x="20" y="90" width="15" height="15" fill="#06D6A0" transform="rotate(30)" />
                <rect x="70" y="60" width="10" height="10" fill="#8338EC" transform="rotate(45)" />
                <rect x="100" y="90" width="12" height="12" fill="#FF9E00" transform="rotate(15)" />
              </svg>
            </div>
            <div className="rocket-animation">
              <FaRocket />
            </div>
            <p className="redirect-message">Taking you back to dashboard...</p>
          </div>
        ) : (
          <main className="quiz-main">
            <div className="quiz-container">
              <div className="quiz-progress-container">
                <div className="quiz-progress">
                  <div className="progress-bar" style={{ width: `${progressPercent}%` }}></div>
                </div>
                <div className="progress-text">
                  Question {currentQuestion + 1} of {quizDatas.length}
                </div>
              </div>
              
              <div className="quiz-score-container">
                <div className="quiz-score">
                  <FaStar className="score-icon" />
                  <span>{score} points</span>
                </div>
              </div>
              
              <div className="question-container">
                <div className="question-icon">
                  <FaQuestionCircle />
                </div>
                <h2 className="question-text">{quizDatas[currentQuestion].question}</h2>
              </div>
              
              <div className="options-container">
                {Object.values(quizDatas[currentQuestion].options).map((option, index) => (
                  <button
                    key={index}
                    className={getOptionButtonStyle(option)}
                    onClick={() => handleAnswerClick(option)}
                    disabled={isAnswerSelected}
                  >
                    {option}
                    {isAnswerSelected && option === quizDatas[currentQuestion].correctAnswer && (
                      <FaCheck className="check-icon" />
                    )}
                  </button>
                ))}
              </div>
              
              {isAnswerSelected && (
                <div className={`feedback-container ${isCorrect ? 'correct-feedback' : 'incorrect-feedback'}`}>
                  {isCorrect ? (
                    <p>Great job! That's correct! 🎉</p>
                  ) : (
                    <p>Oops! The correct answer is: {quizDatas[currentQuestion].correctAnswer}</p>
                  )}
                </div>
              )}
            </div>
          </main>
        )}
      </div>
      
      <div className="footer">
        <div className="footer-characters">
          <div className="footer-character character-1"></div>
          <div className="footer-character character-2"></div>
          <div className="footer-character character-3"></div>
        </div>
      </div>

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap');

          :root {
            --primary-color: #4D6DE3;
            --secondary-color: #8338EC;
            --accent-color: #FF9E00;
            --success-color: #06D6A0;
            --error-color: #EF476F;
            --background-color: #F0F7FF;
            --card-background: #FFFFFF;
            --text-color: #333333;
            --light-text: #6B7280;
            --border-radius: 18px;
            --box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          }

          body {
            font-family: 'Nunito', sans-serif;
            margin: 0;
            padding: 0;
            background-color: var(--background-color);
            color: var(--text-color);
            background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          }

          .app-container {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
          }

          .main-header {
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            color: white;
            padding: 15px 20px;
            border-radius: 0 0 var(--border-radius) var(--border-radius);
            box-shadow: var(--box-shadow);
            position: relative;
            overflow: hidden;
          }

          .header-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .character-container {
            position: relative;
            width: 80px;
            height: 80px;
          }

          .character {
            width: 80px;
            height: 80px;
            background-size: contain;
            position: absolute;
            transition: all 0.3s ease;
          }

          .quiz-character {
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='45' fill='%2306D6A0'/%3E%3Ccircle cx='35' cy='40' r='8' fill='%23333'/%3E%3Ccircle cx='65' cy='40' r='8' fill='%23333'/%3E%3Cpath d='M35 65 Q50 80 65 65' stroke='%23333' stroke-width='4' fill='none'/%3E%3C/svg%3E");
          }

          .character:hover {
            transform: scale(1.1) rotate(5deg);
          }

          .title {
            font-size: 2.2rem;
            margin: 0;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
            font-weight: 700;
            letter-spacing: 1px;
          }

          .main-nav {
            margin-top: 15px;
          }

          .main-nav ul {
            list-style: none;
            padding: 0;
            margin: 0;
            display: flex;
            justify-content: center;
            gap: 15px;
            flex-wrap: wrap;
          }

          .nav-link {
            color: white;
            text-decoration: none;
            font-size: 1rem;
            font-weight: 600;
            padding: 8px 15px;
            border-radius: 30px;
            background-color: rgba(255, 255, 255, 0.2);
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            gap: 8px;
          }

          .nav-link:hover, .nav-link.active {
            background-color: white;
            color: var(--primary-color);
            transform: translateY(-2px);
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }

          .page-content {
            flex: 1;
            padding: 20px;
            max-width: 1000px;
            margin: 0 auto;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .quiz-main {
            width: 100%;
            padding: 20px 0;
          }

          .quiz-container {
            background-color: var(--card-background);
            border-radius: var(--border-radius);
            padding: 30px;
            box-shadow: var(--box-shadow);
            width: 100%;
            max-width: 700px;
            margin: 0 auto;
            position: relative;
          }

          .quiz-progress-container {
            margin-bottom: 20px;
          }

          .quiz-progress {
            height: 10px;
            background-color: #e5e7eb;
            border-radius: 10px;
            overflow: hidden;
          }

          .progress-bar {
            height: 100%;
            background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
            border-radius: 10px;
            transition: width 0.5s ease;
          }

          .progress-text {
            font-size: 0.9rem;
            color: var(--light-text);
            margin-top: 8px;
            text-align: right;
          }

          .quiz-score-container {
            position: absolute;
            top: 30px;
            right: 30px;
          }

          .quiz-score {
            display: flex;
            align-items: center;
            gap: 8px;
            background-color: var(--accent-color);
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            font-weight: bold;
          }

          .score-icon {
            font-size: 1.2rem;
          }

          .question-container {
            text-align: center;
            margin: 30px 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 15px;
          }

          .question-icon {
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            width: 60px;
            height: 60px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 28px;
          }

          .question-text {
            font-size: 1.6rem;
            font-weight: 700;
            color: var(--text-color);
            line-height: 1.4;
          }

          .options-container {
            display: grid;
            gap: 15px;
            margin-top: 25px;
          }

          .option-button {
            background-color: white;
            border: 2px solid #e5e7eb;
            border-radius: var(--border-radius);
            padding: 16px 20px;
            font-size: 1.1rem;
            font-weight: 600;
            color: var(--text-color);
            cursor: pointer;
            transition: all 0.2s ease;
            text-align: left;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .option-button:hover {
            border-color: var(--primary-color);
            transform: translateY(-2px);
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          }

          .option-button.correct {
            background-color: var(--success-color);
            color: white;
            border-color: var(--success-color);
          }

          .option-button.incorrect {
            background-color: var(--error-color);
            color: white;
            border-color: var(--error-color);
          }

          .option-button.disabled {
            opacity: 0.7;
            cursor: default;
          }

          .option-button.disabled:hover {
            transform: none;
            box-shadow: none;
          }

          .check-icon {
            font-size: 1.2rem;
          }

          .feedback-container {
            margin-top: 25px;
            padding: 15px;
            border-radius: var(--border-radius);
            text-align: center;
            font-weight: 600;
            animation: fadeIn 0.5s ease;
          }

          .correct-feedback {
            background-color: rgba(6, 214, 160, 0.1);
            color: var(--success-color);
            border: 2px solid var(--success-color);
          }

          .incorrect-feedback {
            background-color: rgba(239, 71, 111, 0.1);
            color: var(--error-color);
            border: 2px solid var(--error-color);
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .celebration-container {
            text-align: center;
            background-color: white;
            border-radius: var(--border-radius);
            padding: 40px;
            box-shadow: var(--box-shadow);
            position: relative;
            overflow: hidden;
            animation: popIn 0.5s ease;
          }

          @keyframes popIn {
            from { transform: scale(0.8); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }

          .celebration-container h1 {
            color: var(--primary-color);
            font-size: 2.5rem;
            margin: 0 0 30px;
          }

          .score-display {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: 30px;
          }

          .final-score {
            font-size: 5rem;
            font-weight: 800;
            color: var(--accent-color);
            line-height: 1;
          }

          .total-score {
            font-size: 1.5rem;
            color: var(--light-text);
          }

          .congrats-message {
            font-size: 1.4rem;
            color: var(--text-color);
            margin-bottom: 40px;
          }

          .confetti-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
          }

          .confetti {
            position: absolute;
            width: 150px;
            height: 150px;
            opacity: 0.6;
          }

          .confetti.left {
            top: -40px;
            left: -40px;
            transform: rotate(-20deg);
          }

          .confetti.right {
            bottom: -40px;
            right: -40px;
            transform: rotate(20deg);
          }

          .rocket-animation {
            font-size: 3rem;
            color: var(--accent-color);
            margin: 20px 0;
            animation: rocketFly 3s infinite;
          }

          @keyframes rocketFly {
            0% { transform: translateY(0) rotate(45deg); }
            50% { transform: translateY(-20px) rotate(45deg); }
            100% { transform: translateY(0) rotate(45deg); }
          }

          .redirect-message {
            color: var(--light-text);
            margin-top: 40px;
            animation: pulse 2s infinite;
          }

          @keyframes pulse {
            0% { opacity: 0.5; }
            50% { opacity: 1; }
            100% { opacity: 0.5; }
          }

          .footer {
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            padding: 20px;
            color: white;
            text-align: center;
            margin-top: 40px;
            border-radius: var(--border-radius) var(--border-radius) 0 0;
            position: relative;
          }

          .footer-characters {
            display: flex;
            justify-content: space-around;
            margin-bottom: -35px;
          }

          .footer-character {
            width: 60px;
            height: 60px;
            background-size: contain;
            position: relative;
            bottom: -30px;
            transition: all 0.3s ease;
          }

          .character-1 {
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='45' fill='%23FF6B6B'/%3E%3Ccircle cx='35' cy='40' r='8' fill='%23FFF'/%3E%3Ccircle cx='65' cy='40' r='8' fill='%23FFF'/%3E%3Cpath d='M35 65 Q50 80 65 65' stroke='%23FFF' stroke-width='4' fill='none'/%3E%3C/svg%3E");
          }

          .character-2 {
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='45' fill='%234ECDC4'/%3E%3Ccircle cx='35' cy='40' r='8' fill='%23FFF'/%3E%3Ccircle cx='65' cy='40' r='8' fill='%23FFF'/%3E%3Cpath d='M30 60 Q50 75 70 60' stroke='%23FFF' stroke-width='4' fill='none'/%3E%3C/svg%3E");
          }

          .character-3 {
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='45' fill='%23FFD166'/%3E%3Ccircle cx='35' cy='40' r='8' fill='%23FFF'/%3E%3Ccircle cx='65' cy='40' r='8' fill='%23FFF'/%3E%3Cpath d='M40 70 Q50 60 60 70' stroke='%23FFF' stroke-width='4' fill='none'/%3E%3C/svg%3E");
          }

          .footer-character:hover {
            transform: translateY(-10px) scale(1.2);
            cursor: pointer;
          }

          /* Responsive Styles */
          @media (max-width: 768px) {
            .title {
              font-size: 1.8rem;
            }
            
            .character-container {
              display: none;
            }
            
            .question-text {
              font-size: 1.4rem;
            }
            
            .quiz-container {
              padding: 20px;
            }
            
            .celebration-container {
              padding: 30px 20px;
            }
            
            .final-score {
              font-size: 4rem;
            }
          }

          @media (max-width: 480px) {
            .title {
              font-size: 1.5rem;
            }
            
            .nav-link {
              font-size: 0.9rem;
              padding: 6px 12px;
            }
            
            .question-text {
              font-size: 1.2rem;
            }
            
            .option-button {
              padding: 12px 15px;
              font-size: 1rem;
            }
            
            .quiz-score {
              padding: 6px 12px;
              font-size: 0.9rem;
            }
            
            .final-score {
              font-size: 3.5rem;
            }
            
            .congrats-message {
              font-size: 1.2rem;
            }
          }
        `}
      </style>
    </div>
  );
}

export default TestModule;