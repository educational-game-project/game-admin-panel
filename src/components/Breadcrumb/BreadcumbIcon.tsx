import {
  ActivityIcon,
  CopyPlusIcon,
  Gamepad2Icon,
  HomeIcon,
  LineChartIcon,
  MousePointerClickIcon,
  MousePointerSquareIcon,
  PenBoxIcon,
  SchoolIcon,
  SettingsIcon,
  UserCircle2Icon,
  UserCogIcon,
  UserPlusIcon,
  UserSquare2Icon,
} from 'lucide-react';

import type { BreadcrumbIconProps } from '../../types';

function BreadcumbIcon({ name }: BreadcrumbIconProps) {
  const breadcrumbConfig = [
    {
      id: 1,
      name: 'admin',
      icon: (
        <UserCogIcon
          size={16}
          className="mr-1.5"
        />
      ),
    },
    {
      id: 2,
      name: 'analysis',
      icon: (
        <LineChartIcon
          size={16}
          className="mr-1.5"
        />
      ),
    },
    {
      id: 3,
      name: 'edit',
      icon: (
        <PenBoxIcon
          size={16}
          className="mr-1.5"
        />
      ),
    },
    {
      id: 4,
      name: 'home',
      icon: (
        <HomeIcon
          size={16}
          className="mr-1.5"
        />
      ),
    },
    {
      id: 5,
      name: 'preferences',
      icon: (
        <SettingsIcon
          size={16}
          className="mr-1.5"
        />
      ),
    },
    {
      id: 6,
      name: 'profile',
      icon: (
        <UserCircle2Icon
          size={16}
          className="mr-1.5"
        />
      ),
    },
    {
      id: 7,
      name: 'school',
      icon: (
        <SchoolIcon
          size={16}
          className="mr-1.5"
        />
      ),
    },
    {
      id: 8,
      name: 'add',
      icon: (
        <CopyPlusIcon
          size={16}
          className="mr-1.5"
        />
      ),
    },
    {
      id: 9,
      name: 'detail',
      icon: (
        <MousePointerSquareIcon
          size={16}
          className="mr-1.5"
        />
      ),
    },
    {
      id: 10,
      name: 'score',
      icon: (
        <MousePointerClickIcon
          size={16}
          className="mr-1.5"
        />
      ),
    },
    {
      id: 11,
      name: 'student',
      icon: (
        <UserSquare2Icon
          size={16}
          className="mr-1.5"
        />
      ),
    },
    {
      id: 12,
      name: 'user_add',
      icon: (
        <UserPlusIcon
          size={16}
          className="mr-1.5"
        />
      ),
    },
    {
      id: 13,
      name: 'game',
      icon: (
        <Gamepad2Icon
          size={16}
          className="mr-1.5"
        />
      ),
    },
    {
      id: 14,
      name: 'activity',
      icon: (
        <ActivityIcon
          size={16}
          className="mr-1.5"
        />
      ),
    },
  ];

  const breadcrumb = breadcrumbConfig.find(
    (breadcrumb) => breadcrumb.name === name
  );

  return <>{breadcrumb?.icon}</>;
}

export default BreadcumbIcon;
