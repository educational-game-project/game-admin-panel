import { Outlet, useLocation } from 'react-router-dom';
import {
  Headphones,
  HomeIcon,
  LineChart,
  MousePointerClick,
  SchoolIcon,
  Settings,
  UserCogIcon,
  UserSquare2,
} from 'lucide-react';
import { useAppSelector } from '../app/hooks';
import { selectExpanded } from '../features/sidebarSlice';
import { useUser } from '../hook/authHooks';
import Sidebar, { SeparateSidebar, SidebarItem } from './Sidebar';
import Navbar from './Navbar';

function Layout() {
  const currentLocation: string = useLocation()?.pathname;
  const firstPath: string = currentLocation?.split('/')[1];
  const isCurrentLocation = (path: string) => path === firstPath;
  const isExpanded = useAppSelector(selectExpanded);
  const { user } = useUser();

  return (
    <main className="w-full p-3 min-h-screen">
      <div className="w-full flex">
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
            alert={true}
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
          {user?.role === 'Super Admin' ? (
            <>
              <div className="mt-5">
                <SeparateSidebar caption="Advanced" />
              </div>
              <SidebarItem
                icon={<UserCogIcon size={20} />}
                text="Admin"
                path="/admin"
                alert={false}
                active={isCurrentLocation('admin')}
              />
              <SidebarItem
                icon={<SchoolIcon size={20} />}
                text="School"
                path="/school"
                alert={false}
                active={isCurrentLocation('school')}
              />
            </>
          ) : null}
          <hr className="mb-6 mt-5 dark:border-gray-600/80" />
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
          className={`pl-4 ml-auto transition-all-200 ${
            isExpanded ? 'w-[calc(100%-288px)]' : 'w-[calc(100%-76px)]'
          }`}>
          <div className="relative w-full">
            <Navbar />
            <div className="mt-24">
              <Outlet />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Layout;
