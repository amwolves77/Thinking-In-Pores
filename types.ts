
export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export interface QuestionSet {
  id: number;
  topic: string;
  difficultyLabel: string;
  difficultyIcon: string;
  statements: {
    A: string;
    B: string;
    C: string;
  };
  incorrect: 'A' | 'B' | 'C';
  explanation: string;
}

export interface LeaderboardEntry {
  username: string;
  score: number;
  time: number;
  date: string;
}

export type GameState = 'LOGIN' | 'LANDING' | 'PLAYING' | 'FINISHED';
