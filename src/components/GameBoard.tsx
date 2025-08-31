import React, { useState } from 'react';
import { Question, Team } from '../types/game';
import Card from './Card';
import AnswerModal from './AnswerModal';

interface GameBoardProps {
  questions: Question[];
  teams: Team[];
  currentTeam: number;
  answeredCards: Set<number>;
  onAnswer: (questionId: number, answer: boolean, isCorrect: boolean) => void;
}

const GameBoard: React.FC<GameBoardProps> = ({
  questions,
  teams,
  currentTeam,
  answeredCards,
  onAnswer,
}) => {
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [revealedCards, setRevealedCards] = useState<Set<number>>(new Set());

  const handleCardClick = (question: Question) => {
    if (answeredCards.has(question.id)) return;
    
    setRevealedCards(prev => new Set([...prev, question.id]));
    setTimeout(() => {
      setSelectedQuestion(question);
    }, 600);
  };

  const handleAnswer = (answer: boolean) => {
    if (!selectedQuestion) return;
    
    const isCorrect = answer === selectedQuestion.answer;
    onAnswer(selectedQuestion.id, answer, isCorrect);
    setSelectedQuestion(null);
  };

  return (
    <>
      <div className="grid grid-cols-4 gap-6 max-w-6xl mx-auto">
        {questions.map((question) => (
          <Card
            key={question.id}
            question={question}
            isRevealed={revealedCards.has(question.id)}
            isAnswered={answeredCards.has(question.id)}
            onClick={() => handleCardClick(question)}
          />
        ))}
      </div>

      {selectedQuestion && (
        <AnswerModal
          question={selectedQuestion}
          currentTeam={teams[currentTeam]}
          onAnswer={handleAnswer}
          onClose={() => setSelectedQuestion(null)}
        />
      )}
    </>
  );
};

export default GameBoard;