import ProfileUser from './components/ProfileUser';
import { useGetProfileQuery } from '../../services/profileApi';
import HeaderProfile from './components/HeaderProfile';

function Profile() {
  const { data: user, isLoading, isSuccess, isError } = useGetProfileQuery();
  let content;

  if (isLoading) {
    content = (
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
    );
  } else if (isSuccess) {
    content = <ProfileUser user={user?.data} />;
  } else if (isError) {
    content = <div>error</div>;
  }

  return (
    <div className="bg-white rounded-xl min-h-[calc(100vh-120.5px)] dark:bg-gray-800">
      <HeaderProfile isProfilePage={true} />
      <div className="p-5">
        <div className="mb-4">
          <h3 className="mb-0.5 text-lg font-semibold">Profil Saya</h3>
          <p className="mb-4 text-gray-600 dark:text-gray-400">
            Kelola informasi profil Anda
          </p>
          {content}
        </div>
      </div>
    </div>
  );
}

export default Profile;
