import { useState, useCallback } from 'react';
import { GameState, Team, GameHistory } from '../types/game';
import { questions } from '../data/questions';

const initialTeams: Team[] = [
  { id: 'red', name: 'Vermelha', color: 'bg-red-500', score: 0 },
  { id: 'blue', name: 'Azul', color: 'bg-blue-500', score: 0 },
  { id: 'yellow', name: 'Amarela', color: 'bg-yellow-500', score: 0 },
];

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>({
    currentTeam: 0,
    teams: initialTeams,
    questions: questions.slice(0, 12),
    answeredCards: new Set(),
    gamePhase: 'menu',
  });

  const [gameHistory, setGameHistory] = useState<GameHistory[]>(() => {
    const saved = localStorage.getItem('cosmocards-history');
    return saved ? JSON.parse(saved) : [];
  });

  const [showFeedback, setShowFeedback] = useState<{ isCorrect: boolean } | null>(null);

  const startGame = useCallback(() => {
    // Shuffle questions and pick 16
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    setGameState({
      currentTeam: 0,
      teams: initialTeams.map(team => ({ ...team, score: 0 })),
      questions: shuffled.slice(0, 16),
      answeredCards: new Set(),
      gamePhase: 'playing',
    });
  }, []);

  const handleAnswer = useCallback((questionId: number, answer: boolean, isCorrect: boolean) => {
    setShowFeedback({ isCorrect });
    
    setTimeout(() => {
      setGameState(prev => {
        const newAnsweredCards = new Set([...prev.answeredCards, questionId]);
        const newTeams = [...prev.teams];
        
        if (isCorrect) {
          newTeams[prev.currentTeam].score += 5;
        }

        const nextTeam = (prev.currentTeam + 1) % 3;
        const isGameFinished = newAnsweredCards.size === 16;

        if (isGameFinished) {
          // Save game to history
          const winner = newTeams.reduce((prev, current) => 
            prev.score > current.score ? prev : current
          );
          
          const newGame: GameHistory = {
            id: Date.now().toString(),
            date: new Date().toLocaleDateString('pt-BR'),
            winner: winner.name,
            scores: newTeams.map(team => ({ team: team.name, score: team.score })),
          };

          const updatedHistory = [...gameHistory, newGame];
          setGameHistory(updatedHistory);
          localStorage.setItem('cosmocards-history', JSON.stringify(updatedHistory));

          return {
            ...prev,
            teams: newTeams,
            answeredCards: newAnsweredCards,
            gamePhase: 'finished' as const,
          };
        }

        return {
          ...prev,
          currentTeam: nextTeam,
          teams: newTeams,
          answeredCards: newAnsweredCards,
        };
      });
      
      setShowFeedback(null);
    }, 2000);
  }, [gameHistory]);

  const backToMenu = useCallback(() => {
    setGameState(prev => ({ ...prev, gamePhase: 'menu' }));
  }, []);

  const restartGame = useCallback(() => {
    startGame();
  }, [startGame]);

  return {
    gameState,
    gameHistory,
    showFeedback,
    startGame,
    handleAnswer,
    backToMenu,
    restartGame,
  };
};