import { useEffect } from 'react';
import { useAppDispatch } from '../app/hooks';
import { useGetDashboardQuery } from '../services/dashboardApi';
import { setBreadcrumb } from '../features/breadcrumbSlice';
import Breadcrumb from '../components/Breadcrumb';
import { showErrorToast } from '../components/Toast';

import type { Game, School } from '../types';
import { getPercentage } from '../utilities/numberUtils';

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
                <div className="grid grid-cols-2 gap-y-3">
                  <div className="">
                    <h5 className="text-2xl font-bold mb-0.5">
                      {dashboards?.data?.gameCount}
                    </h5>
                    <h5 className="mb-0.5">Total Permainan</h5>
                  </div>
                </div>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-700">
                <div className="grid grid-cols-2 gap-y-3">
                  <div className="">
                    <h5 className="text-2xl font-bold mb-0.5">
                      {dashboards?.data?.schoolCount}
                    </h5>
                    <h5 className="mb-0.5">Total Sekolah</h5>
                  </div>
                </div>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-700">
                <div className="grid grid-cols-2 gap-y-3">
                  <div className="">
                    <h5 className="text-2xl font-bold mb-0.5">
                      {dashboards?.data?.adminCount}
                    </h5>
                    <h5 className="mb-0.5">Total Admin</h5>
                    <p className="text-gray-400 text-xs">
                      {dashboards?.data?.activeAdmin} admin aktif
                    </p>
                  </div>
                  <div className="">
                    <p className="text-2xl font-bold">
                      {getPercentage(
                        dashboards?.data?.activeAdmin,
                        dashboards?.data?.adminCount
                      )}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-700">
                <div className="grid grid-cols-2 gap-y-3">
                  <div className="">
                    <h5 className="text-2xl font-bold mb-0.5">
                      {dashboards?.data?.studentsCount}
                    </h5>
                    <h5 className="mb-0.5">Total Siswa</h5>
                    <p className="text-gray-400 text-xs">
                      {dashboards?.data?.activeStudents} siswa aktif
                    </p>
                  </div>
                  <div className="">
                    <p className="text-2xl font-bold">
                      {' '}
                      {getPercentage(
                        dashboards?.data?.activeStudents,
                        dashboards?.data?.studentsCount
                      )}
                    </p>
                  </div>
                </div>
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
