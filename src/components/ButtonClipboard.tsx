import { ReactNode } from 'react';
import { showDefaultToast, showErrorToast } from '../utilities/toastUtils';

type ButtonClipboardProps = {
  linkToCopy: string;
  children: ReactNode;
};

const ButtonClipboard = ({ linkToCopy, children }: ButtonClipboardProps) => {
  const handleCopyClick = () => {
    try {
      navigator.clipboard.writeText(linkToCopy);
      showDefaultToast('Link copied to clipboard');
    } catch (error) {
      console.error('Failed to copy link: ', error);
      showErrorToast('Failed to copy link');
    }
  };

  return (
    <button
      onClick={handleCopyClick}
      className="w-full bg-violet-500 rounded-md px-4 2xsm:px-6 py-3 2xsm:py-4.5 text-base font-semibold text-gray-200 transition-all-200 hover:bg-indigo-500 hover:text-gray-50">
      {children}
    </button>
  );
};

export default ButtonClipboard;
