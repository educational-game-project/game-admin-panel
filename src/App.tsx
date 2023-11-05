import { Route, Routes } from 'react-router-dom';
import { ToastContainer, Slide } from 'react-toastify';
import Layout from './common/Layout';
import Home from './pages/Home';
import Students from './pages/Students';
import Score from './pages/Score';
import Analysis from './pages/Analysis';
import Preferences from './pages/Preferences';
import Support from './pages/Support';
import Profile from './pages/Profile';
import ErrorPage from './pages/Error';
import Login from './pages/auth/Login';
import AutoTopProvider from './components/AutoTopProvider';
import ToastProvider from './components/ToastProvider';

import 'react-toastify/dist/ReactToastify.min.css';

function App() {
  return (
    <>
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
    </>
  );
}

export default App;
