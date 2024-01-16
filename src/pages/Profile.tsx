import { useEffect } from 'react';
import { useAppDispatch } from '../app/hooks';
import { useAuth } from '../hook/authHooks';
import { setBreadcrumb } from '../features/breadcrumbSlice';
import Breadcrumb from '../components/Breadcrumb';

function Profile() {
  const dispatch = useAppDispatch();
  const { user } = useAuth();

  useEffect(() => {
    const newBreadcrumb = [
      {
        icon: 'profile',
        label: user?.name,
        path: '/profile',
      },
    ];
    dispatch(setBreadcrumb(newBreadcrumb));
  }, [dispatch, user]);
  return (
    <div className="">
      <div className="mb-6">
        <Breadcrumb />
        <h5 className="font-semibold text-3xl mb-1.5">Profil</h5>
        <p className="text-gray-500">Lihat dan ubah profil pengguna.</p>
      </div>
      <div className="h-[1500px] bg-white p-5 rounded-xl"></div>
    </div>
  );
}

export default Profile;
