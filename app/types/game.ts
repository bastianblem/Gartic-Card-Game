export interface Player {
  id: string;
  name: string;
  score: number;
  isArtist: boolean;
  hasSubmitted: boolean;
}

export interface GameRound {
  id: string;
  roomCode: string;
  roundNumber: number;
  artistId: string;
  poolEmojis: string[];
  artistEmojis: string[];
  status: "waiting" | "drawing" | "evaluation" | "finished";
  timeLeft: number;
}

export interface PlayerGuess {
  playerId: string;
  roomCode: string;
  selectedEmojis: string[];
}

export interface RoundResult {
  playerId: string;
  correctEmojis: string[];
  pointsGained: number;
}
