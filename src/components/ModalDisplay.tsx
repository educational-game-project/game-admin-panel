import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

import type { ModalDisplayProps } from '../types';

function ModalDisplay({
  children,
  isOpen,
  onCloseModal,
  title,
}: ModalDisplayProps) {
  return (
    <Transition
      appear
      show={isOpen}
      as={Fragment}>
      <Dialog
        as="div"
        className="relative z-30"
        onClose={() => true}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
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
              leaveTo="opacity-0 scale-95">
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-gray-800">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-200">
                  {title}
                </Dialog.Title>
                <div className="mt-2">{children}</div>
                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    className="leading-normal inline-flex justify-center rounded-md border border-gray-300 bg-transparent px-4 py-1.5 text-sm font-medium text-gray-900 transition hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:focus-visible:ring-2 disabled:focus-visible:ring-gray-500 disabled:focus-visible:ring-offset-2 dark:border-gray-500 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:border-gray-600 dark:disabled:bg-gray-700 dark:disabled:hover:border-gray-500"
                    onClick={onCloseModal}>
                    Batal
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
