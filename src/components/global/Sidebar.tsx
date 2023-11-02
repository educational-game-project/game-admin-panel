import {
  MoreVertical,
  ChevronLast,
  ChevronFirst,
  UserCog,
  Activity,
  LogOut,
} from 'lucide-react';
import { ReactNode, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSidebar } from '../../context/SidebarContext';

type SidebarItemProps = {
  icon: ReactNode;
  text: string;
  path: string;
  active: boolean;
  alert: boolean;
};
type SidebarProps = {
  children: ReactNode;
};
type SeparateSidebarProps = {
  caption: string;
};

export default function Sidebar({ children }: SidebarProps) {
  const { expanded, sidebarToggle } = useSidebar();
  const [profileToggle, setProfileToggle] = useState(false);

  return (
    <aside className="h-full fixed">
      <nav className="h-[calc(100%-24px)] flex flex-col bg-white rounded-xl relative">
        {/* head */}
        <div className="px-4 py-5 flex justify-between items-center">
          <Link to="/">
            <img
              src="https://img.logoipsum.com/243.svg"
              className={`overflow-hidden transition-all ${
                expanded ? 'w-32' : 'w-0'
              }`}
              alt="logo admin panel"
            />
          </Link>
          <button
            onClick={() => sidebarToggle()}
            className={`p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 ${
              expanded ? 'm-0' : 'mx-auto'
            }`}>
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>
        {/* sidebar list */}
        <ul className="flex-1 px-4">{children}</ul>
        {/* bottom */}
        <div className="border-t p-3">
          <button
            className="flex p-2 rounded-md bg-gray-100 hover:bg-gray-200 transition-all-200 text-left"
            onClick={() => setProfileToggle((curr) => !curr)}>
            <img
              src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true&name=Iwan+Suryaningrat"
              alt="iwan suryaningrat profile"
              className="w-10 h-10 rounded-full object-cover object-center"
            />
            <div
              className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? 'w-48 ml-3' : 'w-0'}
          `}>
              <div className="leading-4 max-w-[10rem]">
                <h4 className="font-semibold mb-0.5 text-sm line-clamp-1 text-ellipsis">
                  Iwan Suryaningrat
                </h4>
                <span className="text-xs text-gray-600 line-clamp-1 block text-ellipsis">
                  iwansuryaningrat@gmail.com
                </span>
              </div>
              <div title="Profile Preference">
                <MoreVertical size={20} />
              </div>
            </div>
          </button>
        </div>
        {/* modal profile preference */}
        <div
          className={`absolute bottom-0 -right-60 transition-all-200 -translate-x-3 ${
            profileToggle
              ? 'visible opacity-100 z-10 translate-x-0'
              : 'invisible opacity-20 -z-10'
          }`}>
          <div className="bg-white w-56 rounded-lg p-3">
            <div className="flex">
              <img
                src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true&name=Iwan+Suryaningrat"
                alt="iwan suryaningrat profile"
                className="w-8 h-8 rounded-full object-cover object-center"
              />
              <div className="flex justify-between items-center overflow-hidden transition-all ml-2">
                <div className="leading-4">
                  <h4 className="font-semibold mb-0.5 text-xs line-clamp-1 text-ellipsis">
                    Iwan Suryaningrat
                  </h4>
                  <span className="text-2xs text-gray-600 line-clamp-1 block text-ellipsis">
                    Administrator
                  </span>
                </div>
              </div>
            </div>
            <hr className="mt-2 mb-1.5" />
            <div className="">
              <Link
                className="relative flex items-center py-1.5 px-2 mb-1 font-medium rounded-md cursor-pointer transition-colors group hover:bg-indigo-50 text-gray-600"
                to="/profile"
                title="Account Settings">
                <UserCog size={17} />
                <span className="ml-2.5 text-sm">Account Settings</span>
              </Link>
              <Link
                className="relative flex items-center py-1.5 px-2 my-1 font-medium rounded-md cursor-pointer transition-colors group hover:bg-indigo-50 text-gray-600"
                to="/activity"
                title="Activity">
                <Activity size={17} />
                <span className="ml-2.5 text-sm">Activity</span>
              </Link>
            </div>
            <hr className="mt-2 mb-1.5" />
            <button
              className="relative flex items-center py-1.5 px-2 font-medium rounded-md cursor-pointer transition-colors group hover:bg-red-50 hover:text-red-500 text-gray-600 w-full"
              title="Activity"
              role="button">
              <LogOut size={17} />
              <span className="ml-2.5 text-sm">Logout</span>
            </button>
          </div>
        </div>
      </nav>
    </aside>
  );
}

export function SidebarItem({
  icon,
  text,
  path,
  active,
  alert,
}: SidebarItemProps) {
  const { expanded } = useSidebar();

  return (
    <li className="relative">
      <Link
        className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${
          active
            ? 'bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800'
            : 'hover:bg-indigo-50 text-gray-600'
        }`}
        to={path}
        title={`Menu ${text}`}>
        {icon}
        <span
          className={`overflow-hidden transition-all ${
            expanded ? 'w-48 ml-3' : 'w-0'
          }`}>
          {text}
        </span>
        {alert && (
          <div
            className={`absolute right-2 bg-red-400 text-slate-50 text-xs rounded-full text-center ${
              expanded ? 'py-1 px-2 min-w-[26px]' : 'w-2 h-2 top-2'
            }`}>
            {expanded && '10'}
          </div>
        )}

        {!expanded && (
          <div
            className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-gray-800 text-slate-200 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}>
            {text}
          </div>
        )}
      </Link>
      {/* active condition */}
      <div className="absolute -left-4 top-2">
        <div
          className={`w-1 h-6 rounded-r-xl ${
            active ? 'bg-indigo-800 visible' : 'bg-transparent invisible'
          }`}
        />
      </div>
    </li>
  );
}

export function SeparateSidebar({ caption }: SeparateSidebarProps) {
  const { expanded } = useSidebar();
  return (
    <p
      className={`transition-all text-xs uppercase tracking-wide font-medium text-slate-500 mb-3 ${
        expanded ? 'w-full' : 'w-11 line-clamp-1 break-words'
      }`}>
      {caption}
    </p>
  );
}
