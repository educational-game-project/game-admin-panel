import { Link } from 'react-router-dom';
import { useUser } from '../../../hook/authHooks';
import { HeaderProfileProps } from '../../../types';
import { transformStringPlus } from '../../../utilities/stringUtils';
import images from '../../../assets/img';

function HeaderProfile({ isProfilePage }: HeaderProfileProps) {
  const { user: currentUser } = useUser();

  return (
    <>
      <div
        className="bg-gray-900 w-full h-48 bg-cover"
        style={{ backgroundImage: `url(${images.dominoBluePurpleImage})` }}
      />
      <div className="flex justify-between px-5 pt-4 pb-6">
        <div className="flex relative">
          <figure className="-top-10 absolute shadow-md w-28 h-28 rounded-full border-4 border-white overflow-hidden">
            <img
              src={
                currentUser?.images?.fileLink ??
                `https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true&name=${transformStringPlus(
                  currentUser?.name
                )}`
              }
              alt={`${currentUser?.name} profile`}
              className="w-full h-full object-cover object-center"
            />
          </figure>
          <div className="ml-[7.75rem]">
            <h4 className="text-2xl font-semibold">{currentUser?.name}</h4>
            <p className="text-gray-700">{currentUser?.role}</p>
          </div>
        </div>
        <div className="">
          {isProfilePage ? (
            <Link
              to="/profile/change-password"
              className="leading-normal ml-4 inline-flex justify-center rounded-md border border-neutral-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-800 hover:bg-neutral-100 hover:border-neutral-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-violet-500 disabled:focus-visible:ring-2 disabled:focus-visible:ring-violet-500 disabled:focus-visible:ring-offset-2">
              Change Password
            </Link>
          ) : (
            <Link
              to="/profile"
              className="leading-normal ml-4 inline-flex justify-center rounded-md border border-neutral-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-800 hover:bg-neutral-100 hover:border-neutral-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-violet-500 disabled:focus-visible:ring-2 disabled:focus-visible:ring-violet-500 disabled:focus-visible:ring-offset-2">
              Profile
            </Link>
          )}

          <Link
            to="/profile/activity"
            className="leading-normal ml-4 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-3 py-1.5 text-sm font-medium text-gray-100 hover:bg-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-indigo-500 disabled:focus-visible:ring-2 disabled:focus-visible:ring-indigo-500 disabled:focus-visible:ring-offset-2">
            Activity
          </Link>
        </div>
      </div>
    </>
  );
}

export default HeaderProfile;
