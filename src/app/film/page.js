// src/app/films/page.js
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import QuizQuestion from "../../components/quiz/quiz";
import { questionsData, allMovies } from "../../data/movies";
import { shuffleArray, generateOptions } from "../../lib/quizUtils";
import "./page.css";

export default function FilmsQuizPage() {
  const router = useRouter();
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [currentOptions, setCurrentOptions] = useState([]);

  // Инициализация теста
  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    // Перемешиваем вопросы
    const shuffledQuestions = shuffleArray([...questionsData]);
    setQuestions(shuffledQuestions);
    setCurrentIndex(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
  };

  // Генерация опций при смене вопроса
  useEffect(() => {
    if (questions.length > 0 && !showResult) {
      const currentQ = questions[currentIndex];
      if (currentQ) {
        const newOptions = generateOptions(currentQ.correct);
        setCurrentOptions(newOptions);
      }
    }
  }, [currentIndex, questions, showResult]);

  const handleAnswer = (selected) => {
    const currentQ = questions[currentIndex];
    const isCorrect = selected === currentQ.correct;
    
    setSelectedAnswer(selected);
    
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    
    // Автоматический переход через 1.5 секунды
    setTimeout(() => {
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex(prev => prev + 1);
        setSelectedAnswer(null);
      } else {
        setShowResult(true);
      }
    }, 1500);
  };

  const restartQuiz = () => {
    startNewGame();
  };

  const goToMenu = () => {
    router.push("/");
  };

  // Экран результатов
  if (showResult) {
    const percentage = Math.round((score / questions.length) * 100);
    let resultMessage = "";
    let resultIcon = "";
    
    if (percentage >= 80) {
      resultIcon = "🎬";
      resultMessage = "Ты настоящий киноман! Отлично знаешь кино!";
    } else if (percentage >= 60) {
      resultIcon = "🍿";
      resultMessage = "Неплохо! Но можно и лучше. Пересмотри пару фильмов!";
    } else if (percentage >= 40) {
      resultIcon = "📺";
      resultMessage = "Норм, но ты мог бы знать больше!";
    } else {
      resultIcon = "🎪";
      resultMessage = "Похоже, пора устроить киномарафон!";
    }
    
    return (
      <div className="result-page">
        <div className="result-card">
          <div className="result-icon">{resultIcon}</div>
          <h1 className="result-title">Результаты теста</h1>
          <div className="result-score">
            {score} / {questions.length}
          </div>
          <div className="result-percentage">{percentage}%</div>
          <div className="result-message">{resultMessage}</div>
          <div className="result-buttons">
            <button onClick={restartQuiz} className="restart-button">
              🔄 Пройти заново
            </button>
            <button onClick={goToMenu} className="menu-button">
              🏠 Главное меню
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Загрузка
  if (questions.length === 0 || currentOptions.length === 0) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
        <p>Загрузка вопросов...</p>
      </div>
    );
  }

  const currentQ = questions[currentIndex];

  return (
    <div className="films-quiz-page">
      <button onClick={goToMenu} className="back-to-menu">
        ← На главную
      </button>
      
      <QuizQuestion
        question={currentQ}
        image={currentQ.image}
        options={currentOptions}
        onAnswer={handleAnswer}
        selectedAnswer={selectedAnswer}
        questionNumber={currentIndex + 1}
        totalQuestions={questions.length}
        score={score}
        hint={currentQ.hint}
      />
    </div>
  );
}