import React from 'react';
import { RotateCcw } from 'lucide-react';
import StarField from './components/StarField';
import Menu from './components/Menu';
import Scoreboard from './components/Scoreboard';
import GameBoard from './components/GameBoard';
import GameOverModal from './components/GameOverModal';
import AnswerFeedback from './components/AnswerFeedback';
import { useGameState } from './hooks/useGameState';

function App() {
  const {
    gameState,
    gameHistory,
    showFeedback,
    startGame,
    handleAnswer,
    backToMenu,
    restartGame,
  } = useGameState();

  return (
    <div className="min-h-screen relative">
      <StarField />
      
      <div className="relative z-10">
        {gameState.gamePhase === 'menu' && (
          <Menu gameHistory={gameHistory} onStartGame={startGame} />
        )}

        {gameState.gamePhase === 'playing' && (
          <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-4xl font-bold text-white">CosmoCards</h1>
              <button
                onClick={restartGame}
                className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all duration-200 backdrop-blur-sm border border-white/20"
              >
                <RotateCcw className="w-4 h-4" />
                Reiniciar
              </button>
            </div>

            <Scoreboard teams={gameState.teams} currentTeam={gameState.currentTeam} />
            
            <GameBoard
              questions={gameState.questions}
              teams={gameState.teams}
              currentTeam={gameState.currentTeam}
              answeredCards={gameState.answeredCards}
              onAnswer={handleAnswer}
            />
          </div>
        )}

        {gameState.gamePhase === 'finished' && (
          <GameOverModal
            teams={gameState.teams}
            onRestart={restartGame}
            onBackToMenu={backToMenu}
          />
        )}

        {showFeedback && (
          <AnswerFeedback
            isCorrect={showFeedback.isCorrect}
            onComplete={() => {}}
          />
        )}
      </div>
    </div>
  );
}

export default App;