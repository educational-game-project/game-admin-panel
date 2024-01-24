import { useEffect } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { useUser } from '../../hook/authHooks';
import { setBreadcrumb } from '../../features/breadcrumbSlice';
import Breadcrumb from '../../components/Breadcrumb';
import ProfileUser from './components/ProfileUser';
import ChangePassword from './components/ChangePassword';

function Profile() {
  const { user: currentUser } = useUser();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const newBreadcrumb = [
      {
        icon: 'profile',
        label: currentUser?.name,
        path: '/profile',
      },
    ];
    dispatch(setBreadcrumb(newBreadcrumb));
  }, [dispatch, currentUser]);

  return (
    <div className="">
      <div className="mb-6">
        <Breadcrumb />
        <h5 className="font-semibold text-3xl mb-1.5">Profil</h5>
        <p className="text-gray-500">Lihat dan ubah profil pengguna.</p>
      </div>
      <div className="bg-white p-5 rounded-xl">
        <ProfileUser />
        <ChangePassword />
      </div>
    </div>
  );
}

export default Profile;
