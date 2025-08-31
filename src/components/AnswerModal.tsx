import React from 'react';
import { X, Check, X as XIcon } from 'lucide-react';
import { Question, Team } from '../types/game';

interface AnswerModalProps {
  question: Question;
  currentTeam: Team;
  onAnswer: (answer: boolean) => void;
  onClose: () => void;
}

const AnswerModal: React.FC<AnswerModalProps> = ({
  question,
  currentTeam,
  onAnswer,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 shadow-2xl">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-3">
            <div className={`w-6 h-6 rounded-full ${currentTeam.color}`} />
            <span className="font-semibold text-gray-800">Equipe {currentTeam.name}</span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="mb-8">
          <div className="text-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mx-auto mb-3 flex items-center justify-center">
              <span className="text-white font-bold">{question.id}</span>
            </div>
          </div>
          <p className="text-gray-800 text-lg leading-relaxed text-center">
            {question.text}
          </p>
        </div>

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => onAnswer(true)}
            className="flex items-center gap-3 px-8 py-4 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            <Check className="w-6 h-6" />
            Verdadeiro
          </button>
          <button
            onClick={() => onAnswer(false)}
            className="flex items-center gap-3 px-8 py-4 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            <XIcon className="w-6 h-6" />
            Falso
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnswerModal;