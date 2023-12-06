import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Loader2Icon } from 'lucide-react';

interface AlertDialogProps {
  isOpen: boolean;
  message: string;
  isLoading: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

function AlertDelete({
  isOpen,
  message,
  isLoading,
  onCancel,
  onConfirm,
}: AlertDialogProps) {
  return (
    <>
      <Transition
        appear
        show={isOpen}
        as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => true}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900">
                    Apakah Anda yakin?
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Data {message} akan dihapus. Anda tidak dapat
                      mengembalikan data yang telah dihapus.
                    </p>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      className="leading-normal inline-flex justify-center rounded-md border border-gray-300 bg-transparent px-4 py-1.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:focus-visible:ring-2 disabled:focus-visible:ring-gray-500 disabled:focus-visible:ring-offset-2"
                      disabled={isLoading}
                      onClick={onCancel}>
                      Batal
                    </button>
                    <button
                      type="button"
                      className="leading-normal ml-3 inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-1.5 text-sm font-medium text-gray-100 hover:bg-red-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-red-500 disabled:focus-visible:ring-2 disabled:focus-visible:ring-red-500 disabled:focus-visible:ring-offset-2"
                      disabled={isLoading}
                      onClick={onConfirm}>
                      {isLoading ? (
                        <>
                          <span className="translate-y-[1px]">
                            <Loader2Icon
                              size={18}
                              className="mr-1.5 animate-spin-fast"
                            />
                          </span>
                          <span>Menghapus...</span>
                        </>
                      ) : (
                        'Hapus'
                      )}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default AlertDelete;
