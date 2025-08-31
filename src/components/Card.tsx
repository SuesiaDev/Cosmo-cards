import React from 'react';
import { Atom } from 'lucide-react';
import { Question } from '../types/game';

interface CardProps {
  question: Question;
  isRevealed: boolean;
  isAnswered: boolean;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ question, isRevealed, isAnswered, onClick }) => {
  return (
    <div
      className={`
        relative w-full aspect-[3/4] cursor-pointer transition-all duration-500 transform-gpu
        ${isAnswered ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 hover:shadow-2xl'}
      `}
      onClick={!isAnswered ? onClick : undefined}
    >
      <div className="relative w-full h-full preserve-3d" style={{
        transformStyle: 'preserve-3d',
        transform: isRevealed ? 'rotateY(180deg)' : 'rotateY(0deg)',
        transition: 'transform 0.6s'
      }}>
        {/* Card Back */}
        <div className="absolute inset-0 w-full h-full backface-hidden rounded-xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-1">
          <div className="w-full h-full bg-gradient-to-br from-indigo-800 to-purple-900 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Atom className="w-12 h-12 text-white mx-auto mb-2 animate-spin" style={{ animationDuration: '8s' }} />
              <div className="text-white font-bold text-lg">COSMO</div>
              <div className="text-purple-200 text-sm">CARDS</div>
            </div>
          </div>
        </div>
        
        {/* Card Front */}
        <div 
          className="absolute inset-0 w-full h-full backface-hidden rounded-xl bg-white p-4 shadow-xl"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <div className="h-full flex flex-col justify-center">
            <div className="text-center mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                <span className="text-white font-bold text-sm">{question.id}</span>
              </div>
            </div>
            <p className="text-gray-800 text-sm leading-relaxed text-center px-2">
              {question.text}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;