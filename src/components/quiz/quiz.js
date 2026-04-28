// src/components/quiz/QuizQuestion.jsx
"use client";

import React from 'react';
import './quiz.css';

const QuizQuestion = ({ 
  question, 
  image, 
  options, 
  onAnswer, 
  selectedAnswer,
  questionNumber,
  totalQuestions,
  score 
}) => {
  const handleAnswer = (option) => {
    if (!selectedAnswer) {
      onAnswer(option);
    }
  };

  const getOptionClassName = (option) => {
    let className = 'option-btn';
    
    if (selectedAnswer) {
      if (option === question.correct) {
        className += ' correct';
      } else if (selectedAnswer === option) {
        className += ' wrong';
      }
    }
    
    return className;
  };

  return (
    <div className="quiz-container">
      {/* Верхняя панель с прогрессом */}
      <div className="quiz-header">
        <div className="progress-info">
          <span className="question-counter">
            Вопрос {questionNumber} из {totalQuestions}
          </span>
          <span className="score-badge">
            ⭐ Счёт: {score}
          </span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Вопрос */}
      <div className="question-section">
        <h2 className="question-text">{question.question}</h2>
      </div>

      {/* Картинка */}
      <div className="image-section">
        <img 
          src={image} 
          alt="Кадр из фильма"
          className="quiz-image"
          onError={(e) => {
            e.target.src = '/images/quiz/placeholder.jpg';
          }}
        />
      </div>

      {/* Варианты ответов */}
      <div className="options-section">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(option)}
            disabled={selectedAnswer !== null}
            className={getOptionClassName(option)}
          >
            <span className="option-letter">
              {String.fromCharCode(65 + index)}
            </span>
            <span className="option-text">{option}</span>
          </button>
        ))}
      </div>

      {/* Сообщение о результате */}
      {selectedAnswer && (
        <div className="feedback-message">
          {selectedAnswer === question.correct ? (
            <div className="correct-feedback">
              🎉 Правильно! +1 очко
            </div>
          ) : (
            <div className="wrong-feedback">
              ❌ Неправильно! Правильный ответ: {question.correct}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuizQuestion;