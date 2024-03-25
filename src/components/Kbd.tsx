import type { KbdProps } from "../types";

function Kbd({ children }: KbdProps): JSX.Element {
	return (
		<>
			<kbd className="rounded-md border border-b-2 border-gray-300 bg-gray-50 px-2 py-0.5 text-sm dark:border-gray-700 dark:bg-gray-800">
				{children}
			</kbd>
		</>
	);
}

export default Kbd;
