import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import { useUser } from "../hook/authHooks";
import { useAppSelector } from "../app/hooks";
import { selectExpanded } from "../features/sidebarSlice";
import { transformStringPlus } from "../utilities/stringUtils";
import { CommandIcon, SearchIcon } from "lucide-react";

function Navbar() {
	const [isOpenGlobalSearch, setIsOpenGlobalSearch] = useState(false);
	const isExpanded = useAppSelector(selectExpanded);
	const { user } = useUser();

	const closeGlobalSearch = () => {
		setIsOpenGlobalSearch(false);
	};
	const openGlobalSearch = () => {
		setIsOpenGlobalSearch(true);
	};
	const toggleGlobalSearch = () => {
		setIsOpenGlobalSearch((prev) => !prev);
	};

	useEffect(() => {
		const handleKeyPress = (e: KeyboardEvent) => {
			if (e.ctrlKey && e.key === "k") {
				e.preventDefault();
				toggleGlobalSearch();
			}
		};

		window.addEventListener("keydown", handleKeyPress);

		return () => {
			window.removeEventListener("keydown", handleKeyPress);
		};
	}, []);

	return (
		<div
			className={`fixed pt-3 pb-6 top-0 z-10 bg-slate-100 ${
				isExpanded ? "w-[calc(100%-328px)]" : "w-[calc(100%-116px)]"
			} dark:bg-gray-900`}
		>
			<nav className="py-4 px-5 rounded-xl bg-white w-full before:content-empty before:absolute before:bg-transparent before:left-0 before:-bottom-12 before:h-12 before:w-full before:rounded-t-xl before:shadow-solid-slate-100 dark:bg-gray-800 dark:before:shadow-solid-gray-900">
				<div className="grid items-center grid-cols-12 gap-2">
					<div className="col-span-7 xl:col-span-5">
						<button
							type="button"
							onClick={openGlobalSearch}
							className="flex items-center justify-between rounded-md bg-gray-50 border border-gray-200 pl-3 pr-4 py-2 text-gray-400 transition-all-200 hover:border-gray-300 w-full cursor-text focus:outline focus:outline-4 focus:outline-offset-0 focus:outline-indigo-500/30 focus:border-indigo-500/80 dark:bg-gray-700 dark:border-gray-700 dark:hover:border-gray-700 dark:text-gray-400 dark:focus:outline-indigo-500/30 dark:focus:border-indigo-600"
						>
							<span className="flex items-center">
								<SearchIcon
									className="inline-block mr-2 dark:stroke-gray-400"
									size={18}
								/>
								Quick search...
							</span>
							<span className="text-xs flex items-center bg-white py-0.5 px-1 rounded border border-gray-100 font-medium dark:bg-gray-800 dark:border-gray-800">
								<CommandIcon size={13} className="mr-1" strokeWidth={2} />K
							</span>
						</button>
					</div>
					<div className="col-span-5 xl:col-span-7">
						<div className="flex items-center justify-end">
							<div className="flex items-center space-x-6">
								{/* <button
									className="text-gray-800 hover:text-indigo-500 relative block dark:text-gray-300 dark:hover:text-indigo-500"
									title="Notification"
								>
									<BellRingIcon size={18} />
									<div className="absolute -right-1 w-2.5 h-2.5 -top-1.5">
										<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-300 opacity-75 dark:bg-red-400" />
										<span className="relative inline-flex rounded-full h-2 w-2 bg-red-500 -translate-y-1.6375 translate-x-0.125" />
									</div>
								</button> */}
								<Link to="/profile/account" title="Profile">
									<img
										src={
											user?.image?.fileLink ??
											`https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true&name=${transformStringPlus(
												user?.name
											)}`
										}
										alt={`${user?.name} profile`}
										className="w-9 h-9 rounded-full object-cover object-center"
									/>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</nav>
			<Transition appear show={isOpenGlobalSearch} as={Fragment}>
				<Dialog as="div" className="relative z-30" onClose={closeGlobalSearch}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black/25 backdrop-blur-sm dark:bg-black/60" />
					</Transition.Child>

					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex min-h-full items-center justify-center p-4 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-gray-800">
									<Dialog.Title
										as="h3"
										className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-200"
									>
										Global Search
									</Dialog.Title>
									<div className="mt-2">
										<p className="text-sm text-gray-500 dark:text-gray-400">
											This is a global search feature. You can use this feature
											to search for anything you want. You can also use the
											shortcut <code>Ctrl + K</code> to open this feature.
										</p>
									</div>
									<div className="mt-4">
										<button
											type="button"
											className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
											onClick={closeGlobalSearch}
										>
											Got it, thanks!
										</button>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</div>
	);
}

export default Navbar;
