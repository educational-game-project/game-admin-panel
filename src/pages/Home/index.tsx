import { useEffect } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { useGetDashboardQuery } from '../../services/dashboardApi';
import { setBreadcrumb } from '../../features/breadcrumbSlice';
import { showErrorToast } from '../../components/Toast';
import Breadcrumb from '../../components/Breadcrumb';
import PerformanceWidget from './components/PerformanceWidget';

import type { Game, School } from '../../types';

function Home() {
  const dispatch = useAppDispatch();
  const {
    data: dashboards,
    isLoading,
    isSuccess,
    isError,
  } = useGetDashboardQuery();

  if (isError) {
    showErrorToast('Gagal memuat data');
  }

  useEffect(() => {
    dispatch(setBreadcrumb([]));
  }, [dispatch]);

  return (
    <div className="">
      <div className="mb-6">
        <Breadcrumb />
        <h5 className="font-semibold text-3xl mb-1.5">Home (Test)</h5>
        <p className="text-gray-500">Selamat datang di Dashboard Gameon.</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-6 gap-4">
        <PerformanceWidget
          countItem={dashboards?.data?.gameCount}
          name="permainan"
          type="simple"
        />
        <PerformanceWidget
          countItem={dashboards?.data?.schoolCount}
          name="sekolah"
          type="simple"
        />
        <PerformanceWidget
          activeItem={dashboards?.data?.activeAdmin}
          countItem={dashboards?.data?.adminCount}
          name="admin"
          type="advanced"></PerformanceWidget>
        <PerformanceWidget
          activeItem={dashboards?.data?.activeStudents}
          countItem={dashboards?.data?.studentsCount}
          name="siswa"
          type="advanced"></PerformanceWidget>
      </div>
      <div className="bg-white p-5 rounded-xl dark:bg-gray-800">
        {isLoading && <p>Loading...</p>}
        {isSuccess && (
          <div className="mb-12">
            <h3 className="mb-4 text-lg font-semibold">Permainan</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {dashboards?.data?.games?.map((game: Game) => (
                <div
                  key={game._id}
                  className="bg-gray-100 p-4 rounded-lg dark:bg-gray-700">
                  <h5 className="mb-2 text-lg font-semibold">{game.name}</h5>
                  <p className="text-gray-400">{game.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        {isSuccess && (
          <div className="mb-3">
            <h3 className="mb-4 text-lg font-semibold">Sekolah</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {dashboards?.data?.schools?.map((school: School) => (
                <div
                  key={school._id}
                  className="bg-gray-100 p-4 rounded-lg dark:bg-gray-700">
                  <h5 className="mb-2 text-lg font-semibold">{school.name}</h5>
                  <p className="text-gray-400">{school.address}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
