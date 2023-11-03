import { Route, Routes } from 'react-router-dom';
import Layout from './components/global/Layout';
import Home from './pages/Home';
import Students from './pages/Students';
import Score from './pages/Score';
import Analysis from './pages/Analysis';
import Preferences from './pages/Preferences';
import Support from './pages/Support';
import Profile from './pages/Profile';
import ErrorPage from './pages/Error';

function App() {
  return (
    <div className="w-full p-3">
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
          path="*"
          element={<ErrorPage />}
        />
      </Routes>
    </div>
  );
}

export default App;
