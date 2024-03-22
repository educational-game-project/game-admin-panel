import { useAppSelector } from "../../../app/hooks";
import { selectTheme } from "../../../features/themeSlice";
import {
	Gamepad2Icon,
	GraduationCapIcon,
	SchoolIcon,
	UserIcon,
} from "lucide-react";
import { getPercentage } from "../../../utilities/numberUtils";

import type { PerformanceWidgetProps, WidgetConfigList } from "../../../types";

function PerformanceWidget({
	type,
	countItem,
	activeItem,
	name,
	children,
}: PerformanceWidgetProps) {
	const theme = useAppSelector(selectTheme);
	const widgetConfig: WidgetConfigList = {
		permainan: {
			color: {
				default: "bg-red-400",
				dark: "bg-red-500",
			},
			icon: (
				<Gamepad2Icon
					size={24}
					className="stroke-gray-50 dark:stroke-gray-200"
				/>
			),
		},
		sekolah: {
			color: {
				default: "bg-indigo-400",
				dark: "bg-indigo-500",
			},
			icon: (
				<SchoolIcon size={24} className="stroke-gray-50 dark:stroke-gray-200" />
			),
		},
		admin: {
			color: {
				default: "bg-amber-400",
				dark: "bg-amber-500",
			},
			icon: (
				<UserIcon size={24} className="stroke-gray-50 dark:stroke-gray-200" />
			),
		},
		siswa: {
			color: {
				default: "bg-emerald-400",
				dark: "bg-emerald-500",
			},
			icon: (
				<GraduationCapIcon
					size={24}
					className="stroke-gray-50 dark:stroke-gray-200"
				/>
			),
		},
	};

	return (
		<div className="bg-white p-5 rounded-xl dark:bg-gray-800">
			<div className={type === "advanced" ? "flex justify-between" : ""}>
				<div
					className={`flex size-10 rounded-lg ${
						theme === "dark"
							? widgetConfig[name as keyof WidgetConfigList].color.dark
							: widgetConfig[name as keyof WidgetConfigList].color.default
					}
        items-center justify-center mb-8`}
				>
					{widgetConfig[name as keyof WidgetConfigList].icon}
				</div>
				{type === "advanced" && (
					<div className="text-right">
						<p className="font-medium text-right text-2xl dark:text-gray-200">
							{getPercentage(activeItem, countItem)}
						</p>
						<p className="text-xs text-gray-400 dark:text-gray-400">
							{activeItem} {name} aktif
						</p>
					</div>
				)}
			</div>
			<div className={type === "advanced" ? "grid grid-cols-2 gap-x-3" : ""}>
				<div className="">
					<h5 className="text-gray-600 mb-1 capitalize dark:text-gray-400">
						Performa {name}
					</h5>
					<p className="dark:text-gray-100 text-2xl">
						{countItem}{" "}
						<span className="text-lg text-gray-600 dark:text-gray-400">
							{name === "admin" || name === "siswa" ? "orang" : "item"}
						</span>
					</p>
				</div>
				{type === "advanced" && <div className="">{children}</div>}
			</div>
		</div>
	);
}

export default PerformanceWidget;
