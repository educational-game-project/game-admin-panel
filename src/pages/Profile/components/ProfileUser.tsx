import { useGetProfileQuery } from '../../../services/profileApi';
import { transformStringPlus } from '../../../utilities/stringUtils';

function ProfileUser() {
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
    content = (
      <>
        <figure className="flex items-center justify-center overflow-hidden w-14 h-14 rounded-full mb-2">
          <img
            src={
              user?.data?.image !== null
                ? user?.data?.image.fileLink
                : `https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true&name=${transformStringPlus(
                    user?.data?.name
                  )}`
            }
            alt={`${user?.data?.name} profile`}
            className="w-full h-full object-cover object-center"
          />
        </figure>
        <p className="mb-2">Nama: {user?.data?.name}</p>
        <p className="mb-2">Role: {user?.data?.role}</p>
        <p className="mb-2">Email: {user?.data?.email}</p>
        <p className="mb-2">Phone: {user?.data?.phoneNumber}</p>
      </>
    );
  } else if (isError) {
    content = <div>error</div>;
  }
  return (
    <div className="mb-4">
      <h3 className="mb-3 text-2xl font-semibold">Profil Saya</h3>
      {content}
    </div>
  );
}

export default ProfileUser;
