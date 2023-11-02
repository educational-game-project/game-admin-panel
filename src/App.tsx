import { Route, Routes, useLocation } from 'react-router-dom';
import Sidebar, {
  SeparateSidebar,
  SidebarItem,
} from './components/global/Sidebar';
import {
  Headphones,
  HomeIcon,
  LineChart,
  MousePointerClick,
  Settings,
  UserSquare2,
} from 'lucide-react';
import Home from './pages/Home';
import Students from './pages/Students';
import Score from './pages/Score';
import Analysis from './pages/Analysis';
import Preferences from './pages/Preferences';
import Support from './pages/Support';
import ErrorPage from './pages/Error';
import { useSidebar } from './context/SidebarContext';
import Profile from './pages/Profile';

function App() {
  const currentLocation: string = useLocation()?.pathname;
  const firstPath: string = currentLocation?.split('/')[1];
  const isCurrentLocation = (path: string) => path === firstPath;
  const { expanded } = useSidebar();

  return (
    <div className="w-full p-3">
      <main className="w-full flex">
        {/* sidebar */}
        <Sidebar>
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
          <Routes>
            <Route
              path="/"
              element={<Home />}
            />
            <Route
              path="/student"
              element={<Students />}
            />
            <Route
              path="/score"
              element={<Score />}
            />
            <Route
              path="/analysis"
              element={<Analysis />}
            />
            <Route
              path="/preferences"
              element={<Preferences />}
            />
            <Route
              path="/support"
              element={<Support />}
            />
            <Route
              path="/profile"
              element={<Profile />}
            />
            <Route
              path="*"
              element={<ErrorPage />}
            />
          </Routes>
        </section>
      </main>
    </div>
  );
}

export default App;
