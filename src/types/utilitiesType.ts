interface ThemeState {
	theme: "light" | "dark";
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
interface WidgetConfigType {
	color: {
		default: string;
		dark: string;
	};
	icon: JSX.Element;
}
interface SchoolChartType {
	name: string;
	admin: number;
	student: number;
}
interface WidgetConfigList {
	permainan: WidgetConfigType;
	sekolah: WidgetConfigType;
	admin: WidgetConfigType;
	siswa: WidgetConfigType;
}

export type {
	NormalizedScore,
	NormalizeScoreChartDataEntry,
	SchoolChartType,
	ThemeState,
	WidgetConfigList,
};
