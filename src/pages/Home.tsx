import { useEffect } from 'react';
import { useAppDispatch } from '../app/hooks';
import { useGetDashboardQuery } from '../services/dashboardApi';
import { setBreadcrumb } from '../features/breadcrumbSlice';
import Breadcrumb from '../components/Breadcrumb';
import { showErrorToast } from '../components/Toast';

import type { Game, School } from '../types';

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
      <div className="bg-white p-5 rounded-xl dark:bg-gray-800">
        {isLoading && <p>Loading...</p>}
        {isSuccess && (
          <div className="mb-12">
            <h3 className="mb-4 text-lg font-semibold">Analitik</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-700">
                <h5 className="mb-2 text-lg font-semibold">Total Game</h5>
                <p>{dashboards?.data?.gameCount}</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-700">
                <h5 className="mb-2 text-lg font-semibold">Total Sekolah</h5>
                <p>{dashboards?.data?.schoolCount}</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-700">
                <h5 className="mb-2 text-lg font-semibold">Total Siswa</h5>
                <p>{dashboards?.data?.studentsCount}</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-700">
                <h5 className="mb-2 text-lg font-semibold">Admin Aktif</h5>
                <p>{dashboards?.data?.activeAdmin}</p>
                <p className="text-gray-500 text-sm">
                  {dashboards?.data?.adminCount} total admin
                </p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-700">
                <h5 className="mb-2 text-lg font-semibold">Siswa Aktif</h5>
                <p>{dashboards?.data?.activeStudents}</p>
                <p className="text-gray-500 text-sm">
                  {dashboards?.data?.studentsCount} total siswa
                </p>
              </div>
            </div>
          </div>
        )}
        {isSuccess && (
          <div className="mb-12">
            <h3 className="mb-4 text-lg font-semibold">Permainan</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {dashboards?.data?.games?.map((game: Game) => (
                <div
                  key={game._id}
                  className="bg-gray-100 p-4 rounded-lg dark:bg-gray-700">
                  <h5 className="mb-2 text-lg font-semibold">{game.name}</h5>
                  <p>{game.description}</p>
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
                  <p>{school.address}</p>
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
