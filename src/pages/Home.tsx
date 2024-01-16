import { useEffect } from 'react';
import {
  showErrorToast,
  showInfoToast,
  showSuccessToast,
  showWarningToast,
} from '../components/Toast';

import 'react-toastify/dist/ReactToastify.min.css';
import { useAppDispatch } from '../app/hooks';
import { setBreadcrumb } from '../features/breadcrumbSlice';
import Breadcrumb from '../components/Breadcrumb';

function Home() {
  const dispatch = useAppDispatch();
  const notify_1 = () => showSuccessToast('Login successfully !');
  const notify_2 = () => showInfoToast('Login successfully !');
  const notify_3 = () => showWarningToast('Login successfully !');
  const notify_4 = () => showErrorToast('Login successfully !');

  useEffect(() => {
    dispatch(setBreadcrumb([]));
  }, [dispatch]);

  return (
    <div className="">
      <div className="mb-6">
        <Breadcrumb />
        <h5 className="font-semibold text-3xl mb-1.5">Home</h5>
        <p className="text-gray-500">Selamat datang di Dashboard Gameon.</p>
      </div>
      <div className="h-[1500px] bg-white p-5 rounded-xl">
        <div className="flex space-x-4 items-center">
          <button
            onClick={notify_1}
            className="px-4 py-2 font-medium rounded-lg bg-green-500 text-gray-100 transition-all-200 hover:bg-green-600">
            Notify 1 !
          </button>
          <button
            onClick={notify_2}
            className="px-4 py-2 font-medium rounded-lg bg-indigo-500 text-gray-100 transition-all-200 hover:bg-indigo-600">
            Notify 2 !
          </button>
          <button
            onClick={notify_3}
            className="px-4 py-2 font-medium rounded-lg bg-amber-500 text-gray-100 transition-all-200 hover:bg-amber-600">
            Notify 3 !
          </button>
          <button
            onClick={notify_4}
            className="px-4 py-2 font-medium rounded-lg bg-red-500 text-gray-100 transition-all-200 hover:bg-red-600">
            Notify 4 !
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
