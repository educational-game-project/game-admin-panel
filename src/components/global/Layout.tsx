import { Outlet, useLocation } from 'react-router-dom';
import Sidebar, { SeparateSidebar, SidebarItem } from './Sidebar';
import {
  Headphones,
  HomeIcon,
  LineChart,
  MousePointerClick,
  Settings,
  UserSquare2,
} from 'lucide-react';
import { useSidebar } from '../../context/SidebarContext';

function Layout() {
  const currentLocation: string = useLocation()?.pathname;
  const firstPath: string = currentLocation?.split('/')[1];
  const isCurrentLocation = (path: string) => path === firstPath;
  const { expanded } = useSidebar();

  return (
    <main className="w-full flex">
      {/* sidebar */}
      <Sidebar currentPath={firstPath}>
        <SeparateSidebar caption="Administrator" />
        <SidebarItem
          icon={<HomeIcon size={20} />}
          text="Home"
          path="/"
          alert={true}
          active={isCurrentLocation('')}
        />
        <SidebarItem
          icon={<UserSquare2 size={20} />}
          text="Students"
          path="/student"
          alert={false}
          active={isCurrentLocation('student')}
        />
        <SidebarItem
          icon={<MousePointerClick size={20} />}
          text="Score"
          path="/score"
          alert={true}
          active={isCurrentLocation('score')}
        />
        <SidebarItem
          icon={<LineChart size={20} />}
          text="Analysis"
          path="/analysis"
          alert={false}
          active={isCurrentLocation('analysis')}
        />
        <hr className="my-6" />
        <SeparateSidebar caption="Settings" />
        <SidebarItem
          icon={<Settings size={20} />}
          text="Preferences"
          path="/preferences"
          alert={false}
          active={isCurrentLocation('preferences')}
        />
        <SidebarItem
          icon={<Headphones size={20} />}
          text="Support"
          path="/support"
          alert={false}
          active={isCurrentLocation('support')}
        />
      </Sidebar>
      {/* main content */}
      <section
        className={`p-7 ml-auto transition-all-200 ${
          expanded ? 'w-[calc(100%-288px)]' : 'w-[calc(100%-76px)]'
        }`}>
        <Outlet />
      </section>
    </main>
  );
}

export default Layout;