import { Route, Routes } from 'react-router-dom';
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

function App() {
  return (
    <main className="w-full flex">
      {/* sidebar */}
      <Sidebar>
        <SidebarItem
          icon={<LayoutDashboard size={20} />}
          text="Dashboard"
          alert={true}
          active={false}
        />
        <SidebarItem
          icon={<BarChart3 size={20} />}
          text="Statistics"
          alert={false}
          active={true}
        />
        <SidebarItem
          icon={<UserCircle size={20} />}
          text="Users"
          alert={false}
          active={false}
        />
        <SidebarItem
          icon={<Boxes size={20} />}
          text="Inventory"
          alert={false}
          active={false}
        />
        <SidebarItem
          icon={<Package size={20} />}
          text="Orders"
          alert={true}
          active={false}
        />
        <SidebarItem
          icon={<Receipt size={20} />}
          text="Billings"
          alert={false}
          active={false}
        />
        <hr className="my-3" />
        <SidebarItem
          icon={<Settings size={20} />}
          text="Setting"
          alert={false}
          active={false}
        />
        <SidebarItem
          icon={<LifeBuoy size={20} />}
          text="Help"
          alert={false}
          active={false}
        />
      </Sidebar>
      {/* main content */}
      <section className="p-7 flex-1">
        <Routes>
          <Route
            path="/"
            element={<Dashboard />}
          />
        </Routes>
      </section>
    </main>
  );
}

export default App;
