import React from 'react';
import { Trophy, RotateCcw, Home } from 'lucide-react';
import { Team } from '../types/game';

interface GameOverModalProps {
  teams: Team[];
  onRestart: () => void;
  onBackToMenu: () => void;
}

const GameOverModal: React.FC<GameOverModalProps> = ({
  teams,
  onRestart,
  onBackToMenu,
}) => {
  const sortedTeams = [...teams].sort((a, b) => b.score - a.score);
  const winner = sortedTeams[0];
  const hasWinner = winner.score > 0;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl text-center">
        <div className="mb-6">
          <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {hasWinner ? 'Jogo Finalizado!' : 'Empate!'}
          </h2>
          {hasWinner && (
            <p className="text-lg text-gray-600">
              Equipe <span className="font-semibold">{winner.name}</span> venceu!
            </p>
          )}
        </div>

        <div className="mb-8 space-y-3">
          {sortedTeams.map((team, index) => (
            <div
              key={team.id}
              className={`
                flex items-center justify-between p-3 rounded-lg
                ${index === 0 && hasWinner ? 'bg-yellow-50 border-2 border-yellow-200' : 'bg-gray-50'}
              `}
            >
              <div className="flex items-center gap-3">
                {index === 0 && hasWinner && <Trophy className="w-5 h-5 text-yellow-500" />}
                <div className={`w-4 h-4 rounded-full ${team.color}`} />
                <span className="font-medium text-gray-800">{team.name}</span>
              </div>
              <span className="text-xl font-bold text-gray-800">{team.score}</span>
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <button
            onClick={onBackToMenu}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-xl font-semibold transition-all duration-200"
          >
            <Home className="w-5 h-5" />
            Menu
          </button>
          <button
            onClick={onRestart}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl font-semibold transition-all duration-200"
          >
            <RotateCcw className="w-5 h-5" />
            Jogar Novamente
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameOverModal;