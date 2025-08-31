import React, { useEffect } from 'react';
import { Check, X } from 'lucide-react';

interface AnswerFeedbackProps {
  isCorrect: boolean;
  onComplete: () => void;
}

const AnswerFeedback: React.FC<AnswerFeedbackProps> = ({ isCorrect, onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className={`
        p-8 rounded-2xl text-center transform animate-bounce
        ${isCorrect ? 'bg-green-500' : 'bg-red-500'}
      `}>
        {isCorrect ? (
          <>
            <Check className="w-16 h-16 text-white mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Correto!</h3>
            <p className="text-white/90">+5 pontos</p>
          </>
        ) : (
          <>
            <X className="w-16 h-16 text-white mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Incorreto!</h3>
            <p className="text-white/90">0 pontos</p>
          </>
        )}
      </div>
    </div>
  );
};

export default AnswerFeedback;