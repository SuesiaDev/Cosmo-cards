export interface Question {
  id: number;
  text: string;
  answer: boolean;
}

export interface Team {
  id: 'red' | 'blue' | 'yellow';
  name: string;
  color: string;
  score: number;
}

export interface GameState {
  currentTeam: number;
  teams: Team[];
  questions: Question[];
  answeredCards: Set<number>;
  gamePhase: 'menu' | 'playing' | 'finished';
}

export interface GameHistory {
  id: string;
  date: string;
  winner: string;
  scores: { team: string; score: number }[];
}