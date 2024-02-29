interface ThemeState {
  theme: 'light' | 'dark';
}
interface NormalizedScore {
  level: number;
  value: number;
  createdAt: string;
  gameId: string;
  gameName: string;
}

export type { NormalizedScore, ThemeState };
