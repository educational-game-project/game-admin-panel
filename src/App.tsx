import { Route, Routes } from 'react-router-dom';
import { ToastContainer, Slide } from 'react-toastify';
import { Share2Icon } from 'lucide-react';
import Layout from './common/Layout';
import Home from './pages/Home';
import Students from './pages/Students';
import Score from './pages/Score';
import Analysis from './pages/Analysis';
import Preferences from './pages/Preferences';
import Support from './pages/Support';
import Profile from './pages/Profile';
import ErrorPage from './pages/Error';
import Login from './pages/Auth/Login';
import AutoTopProvider from './components/AutoTopProvider';
import ToastProvider from './components/ToastProvider';
import { useResponsiveLayout } from './context/ResponsiveContext';
import { desktopIcon } from './assets/img';

import 'react-toastify/dist/ReactToastify.min.css';
import ButtonClipboard from './components/ButtonClipboard';
import { BreadcrumbsProvider } from './context/BreadcrumbsContext';

function App() {
  const isDesktopView = useResponsiveLayout();
  return (
    <>
      {isDesktopView ? (
        <>
          <BreadcrumbsProvider>
            <AutoTopProvider />
            <ToastProvider>
              <ToastContainer
                limit={3}
                transition={Slide}
                draggable={false}
                closeOnClick={true}
              />
              <Routes>
                {/* routes with layout */}
                <Route
                  path="/"
                  element={<Layout />}>
                  <Route
                    index
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
                </Route>
                {/* routes without layout */}
                <Route
                  path="/login"
                  element={<Login />}
                />
                {/* not exist routes */}
                <Route
                  path="*"
                  element={<ErrorPage />}
                />
              </Routes>
            </ToastProvider>
          </BreadcrumbsProvider>
        </>
      ) : (
        <ToastProvider>
          <ToastContainer
            limit={3}
            transition={Slide}
            draggable={false}
            closeOnClick={true}
          />
          <main className="w-full min-h-screen bg-gradient-to-br from-indigo-400 from-20% via-sky-400 via-40% to-emerald-400 to-90% px-6">
            <div className="h-full w-full min-h-screen flex justify-center items-center">
              <div className="bg-white p-6 sm:p-8 rounded-xl w-auto sm:w-96">
                <p className="mb-4">
                  <img
                    src={desktopIcon}
                    alt="desktop icon"
                    className="h-14"
                  />
                </p>
                <h4 className="mb-20 sm:mb-24 font-bold text-2xl text-gray-700">
                  Gameon is only available on desktop for now.
                </h4>
                <p className="text-center mb-3 text-gray-400">
                  Open this link on your desktop to access
                </p>
                <ButtonClipboard linkToCopy={window.location.href}>
                  <Share2Icon
                    size={20}
                    className="inline-block mr-2.5"
                    strokeWidth={3}
                  />
                  <span>Share</span>
                </ButtonClipboard>
              </div>
            </div>
          </main>
        </ToastProvider>
      )}
    </>
  );
}

export default App;
