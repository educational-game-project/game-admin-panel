import {
  Gamepad2Icon,
  GraduationCapIcon,
  SchoolIcon,
  UserIcon,
} from 'lucide-react';
import { getPercentage } from '../../../utilities/numberUtils';

import type { PerformanceWidgetProps, WidgetIconType } from '../../../types';

function PerformanceWidget({
  type,
  countItem,
  activeItem,
  name,
  children,
}: PerformanceWidgetProps) {
  const widgetIcon: WidgetIconType = {
    permainan: (
      <Gamepad2Icon
        size={24}
        className="dark:stroke-gray-200"
      />
    ),
    sekolah: (
      <SchoolIcon
        size={24}
        className="dark:stroke-gray-200"
      />
    ),
    admin: (
      <UserIcon
        size={24}
        className="dark:stroke-gray-200"
      />
    ),
    siswa: (
      <GraduationCapIcon
        size={24}
        className="dark:stroke-gray-200"
      />
    ),
  };

  return (
    <div className="bg-white p-5 rounded-xl dark:bg-gray-800">
      <div className={type === 'advanced' ? 'flex justify-between' : ''}>
        <div className="flex size-10 rounded-lg dark:bg-gray-700/70 items-center justify-center mb-8">
          {widgetIcon[name as keyof WidgetIconType]}
        </div>
        {type === 'advanced' && (
          <div className="text-right">
            <p className="font-medium dark:text-gray-200 text-right text-2xl">
              {getPercentage(activeItem, countItem)}
            </p>
            <p className="text-xs dark:text-gray-400">
              {activeItem} {name} aktif
            </p>
          </div>
        )}
      </div>
      <div className={type === 'advanced' ? 'grid grid-cols-2 gap-x-3' : ''}>
        <div className="">
          <h5 className="dark:text-gray-400 mb-1 capitalize">
            Performa {name}
          </h5>
          <p className="dark:text-gray-100 text-2xl">
            {countItem}{' '}
            <span className="text-lg dark:text-gray-400">
              {name === 'admin' || name === 'siswa' ? 'orang' : 'item'}
            </span>
          </p>
        </div>
        {type === 'advanced' && <div className="">{children}</div>}
      </div>
    </div>
  );
}

export default PerformanceWidget;
