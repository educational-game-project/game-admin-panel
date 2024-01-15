import { ReactNode } from 'react';

interface SidebarItemProps {
  icon: ReactNode;
  text: string;
  path: string;
  active: boolean;
  alert: boolean;
}
interface SidebarProps {
  children: ReactNode;
  currentPath: string;
}
interface SeparateSidebarProps {
  caption: string;
}

export type { SidebarItemProps, SidebarProps, SeparateSidebarProps };
