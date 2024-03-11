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
  [key: string]: number | string;
}
interface WidgetIconType {
  permainan: JSX.Element;
  sekolah: JSX.Element;
  admin: JSX.Element;
  siswa: JSX.Element;
}

export type {
  NormalizedScore,
  NormalizeScoreChartDataEntry,
  ThemeState,
  WidgetIconType,
};
