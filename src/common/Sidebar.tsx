import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useUser } from '../hook/authHooks';
import { useLogoutMutation } from '../services/authApi';
import { setUnAuth } from '../features/authSlice';
import { selectExpanded, toggleSidebar } from '../features/sidebarSlice';
import { setAllowedToast } from '../features/toastSlice';
import { selectTheme, toggleTheme } from '../features/themeSlice';
import { showDefaultToast, showErrorToast } from '../components/Toast';
import { transformStringPlus } from '../utilities/stringUtils';
import {
  MoreVertical,
  ChevronLast,
  ChevronFirst,
  UserCog,
  Activity,
  LogOut,
  MoonIcon,
  SunIcon,
} from 'lucide-react';

import type {
  SeparateSidebarProps,
  SidebarItemProps,
  SidebarProps,
} from '../types';

export default function Sidebar({ children, currentPath }: SidebarProps) {
  const [profileToggle, setProfileToggle] = useState(false);
  const toggleProfileRef = useRef<HTMLButtonElement>(null);
  const modalProfileRef = useRef<HTMLDivElement>(null);
  const currentLocation: string = useLocation()?.pathname;
  const firstPath: string = currentLocation?.split('/')[1];
  const isProfileLocation = firstPath === 'profile';
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isExpanded = useAppSelector(selectExpanded);
  const theme = useAppSelector(selectTheme);
  const [logout, { isLoading }] = useLogoutMutation();
  const { user } = useUser();

  const handleSidebarToggle = () => {
    dispatch(toggleSidebar());
  };

  const handleLogout = async () => {
    try {
      const result = await logout().unwrap();
      dispatch(setUnAuth());
      setProfileToggle(false);
      navigate('/login');
      if (result.success) {
        dispatch(setAllowedToast());
        showDefaultToast('Logout berhasil!');
      }
    } catch (error) {
      setProfileToggle(false);
      showErrorToast('Logout gagal!');
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        toggleProfileRef.current &&
        !toggleProfileRef.current.contains(event.target as Node) &&
        modalProfileRef.current &&
        !modalProfileRef.current.contains(event.target as Node)
      ) {
        setProfileToggle(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <aside className="h-full fixed z-20">
      <nav className="h-[calc(100%-24px)] flex flex-col bg-white rounded-xl relative dark:bg-gray-800">
        {/* head */}
        <div className="px-4 py-5 flex justify-between items-center">
          <Link to="/">
            <img
              src="https://img.logoipsum.com/297.svg"
              className={`overflow-hidden transition-all ${
                isExpanded ? 'w-32' : 'w-0'
              } dark:filter-invert dark:grayscale-100`}
              alt="logo admin panel"
            />
          </Link>
          <button
            onClick={handleSidebarToggle}
            className={`p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 ${
              isExpanded ? 'm-0' : 'mx-auto'
            } dark:bg-gray-700 dark:hover:bg-gray-600`}
            title={`${isExpanded ? 'Sidebar Close' : 'Sidebar Open'}`}>
            {isExpanded ? (
              <ChevronFirst className="dark:stroke-gray-300" />
            ) : (
              <ChevronLast className="dark:stroke-gray-300" />
            )}
          </button>
        </div>
        {/* sidebar list */}
        <ul className="flex-1 px-4">{children}</ul>
        {/* bottom */}
        <div className="border-t p-3 dark:border-t-gray-600/30">
          <button
            ref={toggleProfileRef}
            className={`flex p-2 rounded-md transition-all-200 text-left group ${
              isProfileLocation
                ? 'bg-gradient-to-tr from-indigo-200 to-indigo-100 dark:from-indigo-600 dark:to-indigo-400'
                : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600'
            }`}
            onClick={() => setProfileToggle((curr) => !curr)}>
            <img
              src={
                user?.image?.fileLink ??
                `https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true&name=${transformStringPlus(
                  user?.name
                )}`
              }
              alt={`${user?.name} profile`}
              className={`${
                isExpanded ? 'w-10 h-10' : 'w-9 h-9'
              } rounded-full object-cover object-center`}
            />
            <div
              className={`
              flex justify-between items-center
              overflow-hidden transition-all ${isExpanded ? 'w-48 ml-3' : 'w-0'}
          `}>
              <div className="leading-4 max-w-40">
                <h4 className="font-semibold mb-0.5 text-sm line-clamp-1 text-ellipsis">
                  {user?.name}
                </h4>
                <span
                  className={`text-xs text-gray-600 line-clamp-1 block text-ellipsis ${
                    isProfileLocation
                      ? 'dark:text-gray-300'
                      : 'dark:text-gray-400'
                  }`}>
                  {user?.email}
                </span>
              </div>
              <div title="Profile Preference">
                <MoreVertical size={20} />
              </div>
            </div>
            {!isExpanded && (
              <div
                className={`
          absolute left-full rounded-md px-2 py-1 ml-2 whitespace-nowrap
          bg-gray-800 text-slate-200 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 ${
            profileToggle ? 'hidden' : 'block'
          } dark:bg-gray-950 dark:text-slate-300 z-30`}>
                {user?.name}
                <div className="absolute top-1/2 -left-2 -mt-1 border-4 border-solid border-t-transparent border-r-gray-800 border-b-transparent border-l-transparent dark:border-r-gray-950" />
              </div>
            )}
          </button>
        </div>
        {/* modal profile preference */}
        <div
          ref={modalProfileRef}
          className={`absolute bottom-0 -right-60 transition-all-200 -translate-x-3 ${
            profileToggle
              ? 'visible opacity-100 z-10 translate-x-0'
              : 'invisible opacity-20 -z-10'
          }`}>
          <div className="bg-white w-56 rounded-lg p-3 shadow border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex mb-2.5">
              <img
                src={
                  user?.image?.fileLink ??
                  `https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true&name=${transformStringPlus(
                    user?.name
                  )}`
                }
                alt={`${user?.name} profile`}
                className="w-9 h-9 rounded-full object-cover object-center"
              />
              <div className="flex justify-between items-center overflow-hidden ml-2">
                <div className="leading-4">
                  <h4 className="font-semibold mb-0.5 text-3.25xs line-clamp-1 text-ellipsis">
                    {user?.name}
                  </h4>
                  <span className="text-xs text-gray-600 line-clamp-1 block text-ellipsis dark:text-gray-400/90">
                    {user?.role === 'Admin'
                      ? 'Administrator'
                      : 'Super Administrator'}
                  </span>
                </div>
              </div>
            </div>
            <div
              className="relative flex items-center justify-between py-1.5 px-2 mb-1 font-medium rounded-md cursor-pointer transition-colors group text-gray-600 dark:text-gray-400"
              title="Dark Mode">
              <div className="flex items-center">
                {theme === 'dark' ? (
                  <MoonIcon size={17} />
                ) : (
                  <SunIcon size={17} />
                )}
                <span className="ml-2.5 text-sm">Dark Mode</span>
              </div>
              {profileToggle && (
                <div className="absolute right-2">
                  <label className="relative inline-block w-10 h-5">
                    <input
                      id="darkMode"
                      name="darkMode"
                      type="checkbox"
                      checked={theme === 'dark'}
                      onChange={() => dispatch(toggleTheme())}
                      className="peer/darkMode opacity-0 w-0 h-0"
                    />
                    <span className="slider round absolute cursor-pointer top-0 bottom-0 right-0 left-0 bg-gray-300 transition-all duration-400 rounded-8.5 before:absolute before:content-empty before:h-4 before:w-4 before:left-0.5 before:bottom-0.5 before:bg-white before:transition-all before:duration-400 before:rounded-half peer-checked/darkMode:bg-indigo-500 peer-checked/darkMode:before:translate-x-5"></span>
                  </label>
                </div>
              )}
            </div>
            <hr className="mt-2 mb-1.5 dark:border-gray-600/80" />
            <div className="">
              <Link
                className={`relative flex items-center py-1.5 px-2 mb-1 font-medium rounded-md cursor-pointer transition-colors group ${
                  currentPath === 'profile'
                    ? 'bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800 dark:from-indigo-600 dark:to-indigo-400 dark:text-gray-100'
                    : 'hover:bg-indigo-50 text-gray-600 dark:hover:bg-gray-700 dark:text-gray-400'
                }`}
                to="/profile/account"
                onClick={() => setProfileToggle(false)}
                title="Account Settings">
                <UserCog size={17} />
                <span className="ml-2.5 text-sm">Pengaturan Akun</span>
              </Link>
              <Link
                className={`relative flex items-center py-1.5 px-2 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
                  currentPath === 'activity'
                    ? 'bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800 dark:from-indigo-600 dark:to-indigo-400 dark:text-gray-100'
                    : 'hover:bg-indigo-50 text-gray-600 dark:hover:bg-gray-700 dark:text-gray-400'
                }`}
                to="/profile/activity"
                onClick={() => setProfileToggle(false)}
                title="Activity">
                <Activity size={17} />
                <span className="ml-2.5 text-sm">Aktivitas</span>
              </Link>
            </div>
            <hr className="mt-2 mb-1.5 dark:border-gray-600/80" />
            <button
              className="group profile-logout relative flex items-center py-1.5 px-2 font-medium rounded-md cursor-pointer transition-colors hover:bg-red-50 hover:text-red-500 text-gray-600 w-full dark:text-gray-400 dark:hover:bg-red-700/20 dark:hover:text-red-600"
              title="Logout"
              onClick={handleLogout}
              role="button">
              {isLoading ? (
                <svg
                  className="animate-spin-fast h-4.5 w-4.5 group-hover-[.profile-logout]:text-red-500 text-gray-600 inline-block dark:group-hover-[.profile-logout]:text-red-600 dark:text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <LogOut size={17} />
              )}
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
  const isExpanded = useAppSelector(selectExpanded);

  return (
    <li className="relative">
      <Link
        className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${
          active
            ? 'bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800 dark:from-indigo-600 dark:to-indigo-400 dark:text-gray-100'
            : 'hover:bg-indigo-50 text-gray-600 dark:hover:bg-gray-700 dark:text-gray-400'
        }`}
        to={path}
        title={`Menu ${text}`}>
        {icon}
        <span
          className={`overflow-hidden transition-all ${
            isExpanded ? 'w-48 ml-3' : 'w-0'
          }`}>
          {text}
        </span>
        {alert && (
          <div
            className={`absolute right-2 text-2xs rounded-full text-center ${
              isExpanded
                ? 'py-px px-1.5 min-w-6.5 bg-red-400 text-slate-50 dark:bg-red-500'
                : 'w-2.5 h-2.5 top-1.5'
            }`}>
            {isExpanded ? (
              '10'
            ) : (
              <>
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-300 opacity-75 dark:bg-red-400"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500 translate-x-px -translate-y-0.75"></span>
              </>
            )}
          </div>
        )}

        {!isExpanded && (
          <div
            className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-gray-800 text-slate-200 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 dark:bg-gray-950 dark:text-slate-300 z-30
      `}>
            {text}
            <div className="absolute top-1/2 -left-2 -mt-1 border-4 border-solid border-t-transparent border-r-gray-800 border-b-transparent border-l-transparent dark:border-r-gray-950" />
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
  const isExpanded = useAppSelector(selectExpanded);
  return (
    <p
      className={`transition-all text-xs uppercase tracking-wide font-medium text-slate-500 mb-3 ${
        isExpanded ? 'w-full' : 'w-11 line-clamp-1 break-words'
      } dark:text-slate-500`}>
      {caption}
    </p>
  );
}
