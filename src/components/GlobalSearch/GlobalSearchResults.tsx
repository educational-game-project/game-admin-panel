import { cloneElement, type ReactElement } from "react";
import { KBarResults, useMatches } from "kbar";
import Kbd from "../Kbd";
import { ArrowRightIcon } from "lucide-react";

function GlobalSearchResults() {
	const { results } = useMatches();

	return (
		<KBarResults
			items={results}
			onRender={({ item, active }) =>
				typeof item === "string" ? (
					<div className="mx-5 px-2 pt-4 pb-2.5 text-sm text-gray-500 dark:text-gray-400">
						{item}
					</div>
				) : (
					<div
						className={`mx-5 flex cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 transition-colors text-gray-700 dark:text-gray-300 ${
							active ? "bg-gray-100 dark:bg-gray-800" : "bg-transparent"
						}`}
					>
						<div className="flex items-center">
							{item.icon && (
								<div className="mr-3">
									{/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
									{cloneElement(item.icon as ReactElement<any>, {
										className: "w-4 h-4",
									})}
								</div>
							)}
							{item.parent && (
								<>
									<span className="text-gray-400 dark:text-gray-500">
										{
											item.ancestors.find(
												(ancestor) => ancestor.id === item.parent
											)?.name
										}
									</span>
									<span className="text-gray-400 dark:text-gray-500">
										<ArrowRightIcon className="mx-2" size={16} />
									</span>
								</>
							)}
							<span className="text-md">{item.name}</span>
						</div>
						{item.shortcut?.length && (
							<div className="flex items-center justify-center space-x-2">
								{item.shortcut.map((shortcut) => (
									<Kbd key={shortcut}>{shortcut}</Kbd>
								))}
							</div>
						)}
					</div>
				)
			}
		/>
	);
}

export default GlobalSearchResults;
