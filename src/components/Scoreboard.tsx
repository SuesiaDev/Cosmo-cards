import React from 'react';
import { Team } from '../types/game';

interface ScoreboardProps {
  teams: Team[];
  currentTeam: number;
}

const Scoreboard: React.FC<ScoreboardProps> = ({ teams, currentTeam }) => {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8 border border-white/20">
      <h2 className="text-white text-xl font-bold text-center mb-4">Placar</h2>
      <div className="grid grid-cols-3 gap-4">
        {teams.map((team, index) => (
          <div
            key={team.id}
            className={`
              text-center p-4 rounded-xl transition-all duration-300
              ${index === currentTeam 
                ? 'bg-white/20 border-2 border-white/40 scale-105' 
                : 'bg-white/10 border border-white/20'
              }
            `}
          >
            <div className={`w-8 h-8 rounded-full mx-auto mb-2 ${team.color}`} />
            <div className="text-white font-semibold">{team.name}</div>
            <div className="text-2xl font-bold text-white">{team.score}</div>
            {index === currentTeam && (
              <div className="text-yellow-300 text-xs mt-1 animate-pulse">Vez atual</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Scoreboard;