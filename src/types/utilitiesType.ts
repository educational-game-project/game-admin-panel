interface ThemeState {
  theme: 'light' | 'dark';
}
interface NormalizedScore {
  level: number;
  value: number;
  createdAt: string;
  gameId: string;
  gameName: string;
  gamePlayed: number | undefined;
}
interface NormalizeScoreChartDataEntry {
  [key: string]: number | string | undefined;
}

export type { NormalizedScore, NormalizeScoreChartDataEntry, ThemeState };
