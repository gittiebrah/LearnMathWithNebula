
export interface Game {
  id: string;
  title: string;
  category: GameCategory;
  thumbnail: string;
  description: string;
  rating: number;
  tags: string[];
  url: string;
  warning?: string;
}

export enum GameCategory {
  ACTION = 'Action',
  STRATEGY = 'Strategy',
  PUZZLE = 'Puzzle',
  ARCADE = 'Arcade',
  DRIVING = 'Driving',
  SCIFI = 'Sci-Fi'
}

export interface UserState {
  favorites: string[];
  recent: string[];
}
