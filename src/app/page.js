// src/app/page.js
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import "./page.css";

export default function HomePage() {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [audio, setAudio] = useState(null);

  // Инициализация музыки
  useEffect(() => {
    // Создаём аудио объект (можно заменить на свой файл)
    const audioElement = new Audio("/sounds/background-music.mp3");
    audioElement.loop = true;
    audioElement.volume = 0.3;
    setAudio(audioElement);

    return () => {
      if (audioElement) {
        audioElement.pause();
      }
    };
  }, []);

  const toggleMusic = () => {
    if (audio) {
      if (isMusicPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

  return (
    <div className="home-container">
      {/* Фоновый градиент */}
      <div className="background-gradient"></div>
      
      {/* Основной контент */}
      <div className="hero-section">
        <div className="logo-container">
          <div className="logo-icon">🎮</div>
          <h1 className="game-title">Кинотест</h1>
          <p className="game-subtitle">Проверь свои знания о фильмах и мемах</p>
        </div>

        {/* Карточки выбора режима */}
        <div className="modes-container">
          <Link href="/film" className="mode-card mode-films">
            <div className="mode-icon">🎬</div>
            <h2 className="mode-title">Фильмы</h2>
            <p className="mode-description">
              Угадай фильм по кадру и цитатам
            </p>
            <div className="mode-stats">
              <span>⭐ 15+ вопросов</span>
              <span>🎯 Проверь себя</span>
            </div>
            <div className="play-button">Начать →</div>
          </Link>

          <Link href="/memes" className="mode-card mode-memes">
            <div className="mode-icon">😂</div>
            <h2 className="mode-title">Мемы</h2>
            <p className="mode-description">
              Узнай, откуда взялся популярный мем
            </p>
            <div className="mode-stats">
              <span>⭐ 10+ вопросов</span>
              <span>🔥 Скоро</span>
            </div>
            <div className="play-button coming-soon">Скоро →</div>
          </Link>
        </div>

        {/* Панель управления */}
        <div className="control-panel">
          <button 
            onClick={toggleMusic} 
            className={`music-btn ${isMusicPlaying ? 'playing' : 'paused'}`}
          >
            <span className="music-icon">
              {isMusicPlaying ? '🔊' : '🔇'}
            </span>
            <span className="music-text">
              {isMusicPlaying ? 'Выключить музыку' : 'Включить музыку'}
            </span>
          </button>
          
          <div className="info-text">
            <span>🎓 Образовательный режим</span>
            <span>⚡ Без рекламы</span>
          </div>
        </div>
      </div>

      {/* Подвал */}
      <footer className="footer">
        <p>Создано с ❤️ для тестирования знаний</p>
      </footer>
    </div>
  );
}