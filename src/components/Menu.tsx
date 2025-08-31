import React from 'react';
import { Play, History, Atom } from 'lucide-react';
import { GameHistory } from '../types/game';

interface MenuProps {
  gameHistory: GameHistory[];
  onStartGame: () => void;
}

const Menu: React.FC<MenuProps> = ({ gameHistory, onStartGame }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-2xl w-full">
        {/* Logo */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <Atom className="w-16 h-16 text-white animate-spin" style={{ animationDuration: '8s' }} />
            <div>
              <h1 className="text-6xl font-bold text-white mb-2">CosmoCards</h1>
              <p className="text-purple-200 text-xl">Física Interativa</p>
            </div>
          </div>
          <p className="text-white/80 text-lg max-w-md mx-auto">
            Teste seus conhecimentos de Física do 3º ano com cartas interativas no espaço!
          </p>
        </div>

        {/* Start Game Button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={onStartGame}
            className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-2xl font-bold text-xl transition-all duration-200 transform hover:scale-105 shadow-2xl"
          >
            <Play className="w-6 h-6" />
            Iniciar Jogo
          </button>
        </div>

        {/* Game History */}
        {gameHistory.length > 0 && (
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 w-full max-w-lg mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <History className="w-5 h-5 text-white" />
              <h3 className="text-white font-semibold text-lg">Histórico de Partidas</h3>
            </div>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {gameHistory.slice(-5).reverse().map((game) => (
                <div key={game.id} className="bg-white/10 rounded-lg p-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white font-medium">Vencedor: {game.winner}</span>
                    <span className="text-purple-200 text-sm">{game.date}</span>
                  </div>
                  <div className="flex gap-4 text-sm">
                    {game.scores.map((score) => (
                      <span key={score.team} className="text-white/80">
                        {score.team}: {score.score}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;