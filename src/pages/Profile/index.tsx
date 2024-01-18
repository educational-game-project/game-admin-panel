import { useEffect } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { useUser } from '../../hook/authHooks';
import { setBreadcrumb } from '../../features/breadcrumbSlice';
import Breadcrumb from '../../components/Breadcrumb';
import { useGetProfileQuery } from '../../services/userApi';

function Profile() {
  const { user: currentUser } = useUser();
  const dispatch = useAppDispatch();
  const { data: user, isLoading } = useGetProfileQuery();

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
        {isLoading ? (
          <div>
            <svg
              className="animate-spin-fast -ml-1 mr-3 h-5 w-5 text-neutral-800 inline-block"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ) : (
          <div className="">
            <p className="mb-2">Nama: {user?.data?.name}</p>
            <p className="mb-2">Role: {user?.data?.role}</p>
            <p className="mb-2">Email: {user?.data?.email}</p>
            <p className="mb-2">Phone: {user?.data?.phoneNumber}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
