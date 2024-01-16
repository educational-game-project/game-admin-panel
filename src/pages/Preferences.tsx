import { useEffect } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import { useAppDispatch } from '../app/hooks';
import { setBreadcrumb } from '../features/breadcrumbSlice';

function Preferences() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const newBreadcrumb = [
      {
        icon: 'preferences',
        label: 'Preferences',
        path: '/preferences',
      },
    ];
    dispatch(setBreadcrumb(newBreadcrumb));
  }, [dispatch]);

  return (
    <div className="">
      <div className="mb-6">
        <Breadcrumb />
        <h5 className="font-semibold text-3xl mb-1.5">Preferences</h5>
        <p className="text-gray-500">Lihat dan ubah preferensi pengguna.</p>
      </div>
      <div className="h-[1500px] bg-white p-5 rounded-xl"></div>
    </div>
  );
}

export default Preferences;
