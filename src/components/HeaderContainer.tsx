import { PlusIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

import type { HeaderContainerProps } from '../types';

function HeaderContainer({
  title,
  subtitle,
  btnHref,
  btnText,
}: HeaderContainerProps) {
  return (
    <div className="flex justify-between">
      <div className="">
        <h5 className="font-semibold text-3xl mb-1.5">{title}</h5>
        <p className="text-gray-500">{subtitle}</p>
      </div>
      {btnHref && btnText && (
        <div className="">
          <Link
            type="button"
            className="leading-normal ml-4 inline-flex justify-center rounded-lg border border-transparent bg-violet-600 px-4 py-2.5 text-sm font-medium text-gray-100 hover:bg-violet-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-violet-500 disabled:focus-visible:ring-2 disabled:focus-visible:ring-violet-500 disabled:focus-visible:ring-offset-2 dark:hover:bg-violet-700"
            to={btnHref}>
            <PlusIcon
              size={20}
              className="mr-1.5 stroke-current"
              strokeWidth={2}
            />
            <span className="line-clamp-1">{btnText}</span>
          </Link>
        </div>
      )}
    </div>
  );
}

export default HeaderContainer;
