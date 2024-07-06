import { useCallback } from "react";
import {
	Bar,
	BarChart,
	CartesianGrid,
	Legend,
	ResponsiveContainer,
	Text,
	Tooltip,
	XAxis,
	YAxis,
	type RectangleProps,
} from "recharts";
import { useCurrentPng } from "recharts-to-png";
import FileSaver from "file-saver";
import { useAppSelector } from "../../../app/hooks";
import { selectTheme } from "../../../features/themeSlice";
import {
	CustomLegend,
	CustomTooltip,
} from "../../../components/Chart/ChartConfig";

import type { SchoolChartType } from "../../../types";
import { DownloadIcon, Loader2Icon } from "lucide-react";

const RoundedSchoolBar = ({ ...props }: RectangleProps) => {
	const { x, y, width, height } = props;

	return (
		<rect
			x={x}
			y={y}
			width={width}
			height={height}
			rx={4}
			ry={4}
			fill={props.fill}
		/>
	);
};

function SchoolOverview({ data }: { data: SchoolChartType[] }) {
	const theme = useAppSelector(selectTheme);
	const axisColor = theme === "dark" ? "#6b7280" : "#9ca3af";
	const [getSchoolChartPng, { ref: schoolChartRef, isLoading }] =
		useCurrentPng();

	const handleSchoolChartDownload = useCallback(async () => {
		const png = await getSchoolChartPng();
		if (png) {
			FileSaver.saveAs(png, "school-chart.png");
		}
	}, [getSchoolChartPng]);

	return (
		<div className="bg-white py-5 rounded-xl dark:bg-gray-800 relative">
			<div className="absolute top-5 right-5">
				<button
					type="button"
					onClick={handleSchoolChartDownload}
					className="flex items-center text-xs px-3 py-1.5 rounded-md bg-white dark:bg-gray-700 dark:text-white border dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200 ease-in-out disabled:opacity-60"
					disabled={isLoading}
				>
					{isLoading ? (
						<>
							<span className="">
								<Loader2Icon size={18} className="mr-1.5 animate-spin-fast" />
							</span>
							<span>Exporting...</span>
						</>
					) : (
						<>
							<DownloadIcon size={16} className="mr-1.5" />
							Export
						</>
					)}
				</button>
			</div>
			<div className="px-5">
				<h5 className="font-semibold text-lg mb-0.5">School Overview</h5>
				<p className="text-gray-500">Overview of the school's statistics.</p>
			</div>
			<div className="w-full h-80 school-overview-chart pl-1.5 pr-5">
				<ResponsiveContainer>
					<BarChart width={730} height={250} data={data} ref={schoolChartRef}>
						<CartesianGrid strokeDasharray="3 3" stroke={axisColor} />
						<XAxis
							fontSize={14}
							dataKey="name"
							axisLine={{ stroke: axisColor }}
							tick={{ fill: axisColor }}
							tickSize={8}
						/>
						<YAxis
							fontSize={14}
							axisLine={{ stroke: axisColor }}
							tick={{ fill: axisColor }}
						/>
						<Tooltip content={<CustomTooltip />} />
						<Legend verticalAlign="top" content={<CustomLegend />} />
						<Bar
							dataKey="student"
							fill="#10b981"
							shape={<RoundedSchoolBar />}
						/>
						<Bar dataKey="admin" fill="#f59e0b" shape={<RoundedSchoolBar />} />
						<Text scaleToFit angle={45} />
					</BarChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
}

export default SchoolOverview;
