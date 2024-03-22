import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

import type { ModalDisplayProps } from "../types";
import { XIcon } from "lucide-react";

function ModalDisplay({
	children,
	isOpen,
	onCloseModal,
	title,
}: ModalDisplayProps) {
	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog as="div" className="relative z-30" onClose={() => true}>
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
							<Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-gray-800 relative">
								<Dialog.Title
									as="h3"
									className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-200"
								>
									{title}
								</Dialog.Title>
								<div className="mt-2">{children}</div>
								<div className="absolute top-5 right-5">
									<button
										type="button"
										className="size-10 rounded-full flex items-center justify-center bg-gray-50 transition hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-700/60"
										onClick={onCloseModal}
									>
										<XIcon
											size={20}
											className="stroke-gray-800 dark:stroke-gray-300"
										/>
									</button>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
}

export default ModalDisplay;
