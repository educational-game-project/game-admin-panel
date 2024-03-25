import { useEffect } from "react";
import {
	KBarPortal,
	KBarPositioner,
	KBarAnimator,
	KBarSearch,
	useKBar,
} from "kbar";
import GlobalSearchResults from "./GlobalSearchResults";
import Kbd from "../Kbd";

import { SearchIcon } from "lucide-react";

function GlobalSearch() {
	const { query } = useKBar();

	useEffect(() => {
		function handleSpotlightShortcut(event: KeyboardEvent) {
			if (
				event.ctrlKey &&
				event.key === "/" &&
				event.defaultPrevented === false
			) {
				query.toggle();
			}
		}
		window.addEventListener("keydown", handleSpotlightShortcut, true);
		return () =>
			window.removeEventListener("keydown", handleSpotlightShortcut, true);
	}, [query]);

	return (
		<KBarPortal>
			<KBarPositioner className="bg-black/25 z-[9999] backdrop-blur-md dark:bg-black/60">
				<KBarAnimator className="mx-auto max-w-2xl w-full bg-white rounded-xl overflow-hidden drop-shadow-xl border border-gray-200/70 dark:border-gray-700/60 dark:bg-gray-900">
					<div className="px-5 flex items-center justify-between py-4 !border-b !border-b-gray-200/70 dark:bg-gray-900 dark:!border-b-gray-700/80">
						<SearchIcon
							size={22}
							className="mr-2.5 stroke-gray-500 dark:stroke-gray-600"
						/>
						<KBarSearch className="w-full text-sm border-none outline-none placeholder:text-gray-400 dark:placeholder:text-gray-500 bg-white dark:bg-gray-900" />
						<Kbd>
							<span className="text-xs mr-0.5">⌘</span>K
						</Kbd>
					</div>
					<GlobalSearchResults />
					<div className="mt-4 px-5 py-5 flex items-center space-x-4 !border-t !border-t-gray-200/70 dark:bg-gray-900 dark:!border-t-gray-700/80">
						<div className="flex items-center gap-x-2">
							<Kbd>↑</Kbd>
							<Kbd>↓</Kbd>
							<span className="text-sm text-gray-500 dark:text-gray-400">
								to navigate
							</span>
						</div>
						<div className="flex items-center gap-x-2">
							<Kbd>↵</Kbd>
							<span className="text-sm text-gray-500 dark:text-gray-400">
								to select
							</span>
						</div>
						<div className="flex items-center gap-x-2">
							<Kbd>esc</Kbd>
							<span className="text-sm text-gray-500 dark:text-gray-400">
								to close
							</span>
						</div>
						<div className="flex items-center gap-x-2">
							<Kbd>←</Kbd>
							<span className="text-sm text-gray-500 dark:text-gray-400">
								return to parent
							</span>
						</div>
					</div>
				</KBarAnimator>
			</KBarPositioner>
		</KBarPortal>
	);
}

export default GlobalSearch;
