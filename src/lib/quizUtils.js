// src/lib/quizUtils.js
import { allMovies } from "../data/movies.js";  // ← исправлен путь

// Перемешивание массива (алгоритм Фишера-Йетса)
export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Генерация случайных НЕправильных ответов (без дубликатов и без правильного)
export const generateWrongOptions = (correctFilm, count = 3) => {
  // Фильтруем правильный ответ из списка
  const availableFilms = allMovies.filter(film => film !== correctFilm);
  
  // Перемешиваем
  const shuffled = shuffleArray(availableFilms);
  
  // Берём нужное количество уникальных фильмов
  const selected = [];
  for (let i = 0; i < shuffled.length && selected.length < count; i++) {
    if (!selected.includes(shuffled[i])) {
      selected.push(shuffled[i]);
    }
  }
  
  return selected;
};

// Генерация полного набора опций (3 неправильных + 1 правильный + перемешивание)
export const generateOptions = (correctFilm) => {
  const wrongOptions = generateWrongOptions(correctFilm, 3);
  const allOptions = [...wrongOptions, correctFilm];
  return shuffleArray(allOptions);
};