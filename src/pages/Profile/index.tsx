import ProfileUser from './components/ProfileUser';
import { useGetProfileQuery } from '../../services/profileApi';
import HeaderProfile from './components/HeaderProfile';
import LoadingProfileUser from './components/LoadingProfileUser';

function Profile() {
  const { data: user, isLoading, isSuccess } = useGetProfileQuery();

  return (
    <div className="bg-white rounded-xl min-h-[calc(100vh-120.5px)] dark:bg-gray-800">
      <HeaderProfile isProfilePage={true} />
      <div className="p-5">
        <div className="mb-4">
          <h3 className="mb-0.5 text-lg font-semibold">Profil Saya</h3>
          <p className="mb-4 text-gray-600 dark:text-gray-400">
            Kelola informasi profil Anda
          </p>
          {/* <LoadingProfileUser /> */}
          {isLoading && <LoadingProfileUser />}
          {isSuccess && <ProfileUser user={user.data} />}
        </div>
      </div>
    </div>
  );
}

export default Profile;
