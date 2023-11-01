import { Route, Routes, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Sidebar, { SidebarItem } from './components/global/Sidebar';
import {
  BarChart3,
  Boxes,
  LayoutDashboard,
  LifeBuoy,
  Package,
  Receipt,
  Settings,
  UserCircle,
} from 'lucide-react';
import Students from './pages/Students';
import Score from './pages/Score';

function App() {
  const currentLocation: string = useLocation()?.pathname;
  const firstPath: string = currentLocation?.split('/')[1];
  const isCurrentLocation = (path: string) => path === firstPath;

  return (
    <div className="w-full p-3">
      <main className="w-full flex">
        {/* sidebar */}
        <Sidebar>
          <SidebarItem
            icon={<LayoutDashboard size={20} />}
            text="Dashboard"
            path="/"
            alert={true}
            active={isCurrentLocation('')}
          />
          <SidebarItem
            icon={<UserCircle size={20} />}
            text="Students"
            path="/student"
            alert={false}
            active={isCurrentLocation('student')}
          />
          <SidebarItem
            icon={<BarChart3 size={20} />}
            text="Score"
            path="/score"
            alert={false}
            active={isCurrentLocation('score')}
          />
          <SidebarItem
            icon={<Boxes size={20} />}
            text="Inventory"
            path="/"
            alert={false}
            active={false}
          />
          <SidebarItem
            icon={<Package size={20} />}
            text="Orders"
            path="/"
            alert={true}
            active={false}
          />
          <SidebarItem
            icon={<Receipt size={20} />}
            text="Billings"
            path="/"
            alert={false}
            active={false}
          />
          <hr className="my-3" />
          <SidebarItem
            icon={<Settings size={20} />}
            text="Setting"
            path="/"
            alert={false}
            active={false}
          />
          <SidebarItem
            icon={<LifeBuoy size={20} />}
            text="Help"
            path="/"
            alert={false}
            active={false}
          />
        </Sidebar>
        {/* main content */}
        <section className="p-7 w-[calc(100%-288px)] ml-auto">
          <Routes>
            <Route
              path="/"
              element={<Dashboard />}
            />
            <Route
              path="/student"
              element={<Students />}
            />
            <Route
              path="/score"
              element={<Score />}
            />
          </Routes>
        </section>
      </main>
    </div>
  );
}

export default App;
