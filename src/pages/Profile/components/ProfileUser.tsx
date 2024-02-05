import type { ProfileUserProps } from '../../../types';

function ProfileUser({ user }: ProfileUserProps) {
  return (
    <>
      {/* name */}
      <div className="py-4 border-y border-gray-300 dark:border-gray-600/80">
        <div className="grid grid-cols-12">
          <div className="col-span-4">
            <label
              htmlFor="name"
              className="text-sm font-medium">
              Full name
            </label>
          </div>
          <div className="col-span-8">
            <input
              type="text"
              className="px-3 py-2.5 rounded-lg border bg-gray-50 w-full max-w-xl border-gray-300 focus:bg-white focus:outline focus:outline-4 focus:outline-offset-0 focus:outline-indigo-500/30 focus:border-indigo-500/80 disabled:text-gray-600 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-200 dark:disabled:text-gray-300"
              id="name"
              name="name"
              disabled
              value={user?.name}
            />
          </div>
        </div>
      </div>
      {/* email */}
      <div className="py-4 border-b border-gray-300 dark:border-gray-600/80">
        <div className="grid grid-cols-12">
          <div className="col-span-4">
            <label
              htmlFor="email"
              className="text-sm font-medium">
              Email address
            </label>
          </div>
          <div className="col-span-8">
            <input
              type="email"
              className="px-3 py-2.5 rounded-lg border bg-gray-50 w-full max-w-xl border-gray-300 focus:bg-white focus:outline focus:outline-4 focus:outline-offset-0 focus:outline-indigo-500/30 focus:border-indigo-500/80 disabled:text-gray-600 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-200 dark:disabled:text-gray-300"
              id="email"
              name="email"
              disabled
              value={user?.email}
            />
          </div>
        </div>
      </div>
      <div className="py-4 border-b border-gray-300 dark:border-gray-600/80">
        <div className="grid grid-cols-12">
          <div className="col-span-4">
            <label
              htmlFor="phoneNumber"
              className="text-sm font-medium">
              Phone number
            </label>
          </div>
          <div className="col-span-8">
            <input
              type="text"
              className="px-3 py-2.5 rounded-lg border bg-gray-50 w-full max-w-xl border-gray-300 focus:bg-white focus:outline focus:outline-4 focus:outline-offset-0 focus:outline-indigo-500/30 focus:border-indigo-500/80 disabled:text-gray-600 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-200 dark:disabled:text-gray-300"
              id="phoneNumber"
              name="phoneNumber"
              disabled
              value={user?.phoneNumber}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileUser;
