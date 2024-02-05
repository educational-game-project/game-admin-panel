import { useEffect } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import { useAppDispatch } from '../app/hooks';
import { setBreadcrumb } from '../features/breadcrumbSlice';
import HeaderContainer from '../components/HeaderContainer';

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
        <HeaderContainer
          title="Preferences"
          subtitle="Lihat dan ubah preferensi pengguna."
        />
      </div>
      <div className="bg-white p-5 rounded-xl dark:bg-gray-800"></div>
    </div>
  );
}

export default Preferences;
