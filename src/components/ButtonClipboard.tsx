import { showDefaultToast, showErrorToast } from './Toast';

import type { ButtonClipboardProps } from '../types';

const ButtonClipboard = ({ linkToCopy, children }: ButtonClipboardProps) => {
  const handleCopyClick = () => {
    try {
      navigator.clipboard.writeText(linkToCopy);
      showDefaultToast('Link copied to clipboard');
    } catch (error) {
      console.log('🚀 ~ handleCopyClick ~ error:', error);
      showErrorToast('Failed to copy link');
    }
  };

  return (
    <button
      onClick={handleCopyClick}
      className="w-full bg-violet-500 rounded-md px-4 2xsm:px-6 py-3 2xsm:py-4.5 text-base font-semibold text-gray-200 transition-all-200 hover:bg-indigo-500 hover:text-gray-50 dark:bg-violet-700 dark:hover:bg-violet-600">
      {children}
    </button>
  );
};

export default ButtonClipboard;
