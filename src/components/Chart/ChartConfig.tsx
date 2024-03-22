import { useAppSelector } from "../../app/hooks";
import { selectTheme } from "../../features/themeSlice";
import {
	convertLevelLegend,
	getItemUnit,
	getLabelCharts,
} from "../../utilities/stringUtils";

import type { RectangleProps, LegendProps, TooltipProps } from "recharts";

export const RoundedBar = ({ ...props }: RectangleProps) => {
	const { x, y, width, height } = props;

	return (
		<rect
			x={x}
			y={y}
			width={width}
			height={height}
			rx={8}
			ry={8}
			fill={props.fill}
		/>
	);
};

export const CustomLegend = (props: LegendProps) => {
	const { payload, verticalAlign } = props;

	return (
		<ul
			className={`m-0 p-0 list-none ${
				verticalAlign === "top" ? "!mt-0 !pb-4 text-right" : "!mt-2 text-center"
			}`}
		>
			{payload?.map((entry, index: number) => (
				<li key={`item-${index}`} className="inline-block mr-3.5">
					<div
						className="inline-block mr-1 align-middle size-3.5 rounded"
						style={{
							backgroundColor: entry?.color,
						}}
					/>
					<span
						className="align-middle"
						style={{
							color: entry?.color,
						}}
					>
						{convertLevelLegend(entry?.value, "short")}
					</span>
				</li>
			))}
		</ul>
	);
};

export const CustomTooltip = (props: TooltipProps<string, string>) => {
	const { active, payload, label } = props;

	if (active && payload) {
		return (
			<div className="bg-gray-900 p-3 rounded-lg">
				<p className="text-gray-300 mb-0.5 text-3.25xs">
					{getLabelCharts(label)}
				</p>
				{payload.map((data, index: number) => (
					<div key={index} className="flex items-center">
						<div
							className="size-3 rounded-full border-2 border-gray-300 mr-2"
							style={{ backgroundColor: data.color }}
						/>
						<p className="text-3.25xs">
							<span className="text-gray-400">
								{convertLevelLegend(data?.dataKey, "long")}:{" "}
							</span>
							<span className="font-medium text-gray-200">
								{data.value} {getItemUnit(label)}
							</span>
						</p>
					</div>
				))}
			</div>
		);
	}

	return null;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SkewAxisTick = (props: any) => {
	const { x, y, payload } = props;

	return (
		<g transform={`translate(${x},${y})`}>
			<text
				x={0}
				y={0}
				dy={16}
				textAnchor="end"
				fill="#666"
				transform="rotate(-35)"
			>
				{payload.value}
			</text>
		</g>
	);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const CustomAxisTick = (props: any) => {
	const theme = useAppSelector(selectTheme);
	const axisColor = theme === "dark" ? "#6b7280" : "#9ca3af";
	const { x, y, payload } = props;

	return (
		<g transform={`translate(${x},${y})`}>
			<text
				x={0}
				y={0}
				dy={16}
				textAnchor="middle"
				fill={axisColor}
				fontSize={14}
			>
				{getLabelCharts(payload.value)}
			</text>
		</g>
	);
};
