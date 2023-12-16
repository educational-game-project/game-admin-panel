import React, { useEffect, useState } from 'react';
import { useBreadcrumbs } from '../../context/BreadcrumbsContext';
import { Loader2Icon, UserCogIcon, UserPlusIcon } from 'lucide-react';
import Breadcrumbs from '../../components/Breadcrumbs';
import { Link } from 'react-router-dom';

function AddAdmin() {
  const { setBreadcrumbs } = useBreadcrumbs();
  const [isLoadingSave, setIsLoadingSave] = useState(false);

  const handleSubmit = () => {
    setIsLoadingSave(true);
    setTimeout(() => {
      setIsLoadingSave(false);
    }, 2000);
  };

  useEffect(() => {
    setBreadcrumbs([
      {
        icon: (
          <UserCogIcon
            size={16}
            className="mr-1.5"
          />
        ),
        label: 'Admin',
        path: '/admin',
      },
      {
        icon: (
          <UserPlusIcon
            size={16}
            className="mr-1.5"
          />
        ),
        label: 'Add Admin',
        path: '/admin/add',
      },
    ]);
  }, [setBreadcrumbs]);

  return (
    <div>
      <div className="mb-6">
        <Breadcrumbs />
        <div className="flex items-center justify-between">
          <div className="">
            <h5 className="font-semibold text-3xl mb-1.5">Tambah Admin</h5>
            <p className="text-gray-500">
              Tambahkan admin baru ke dalam sistem.
            </p>
          </div>
          <div className="flex justify-end">
            <Link
              type="button"
              className={`leading-normal inline-flex justify-center rounded-lg border border-gray-300 px-6 py-3 text-sm font-medium text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 ${
                isLoadingSave
                  ? 'opacity-50 cursor-not-allowed bg-gray-200'
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
              to="/admin">
              Kembali
            </Link>
            <button
              type="button"
              className="leading-normal ml-4 inline-flex justify-center rounded-lg border border-transparent bg-violet-600 px-6 py-3 text-sm font-medium text-gray-100 hover:bg-violet-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-violet-500 disabled:focus-visible:ring-2 disabled:focus-visible:ring-violet-500 disabled:focus-visible:ring-offset-2"
              disabled={isLoadingSave}
              onClick={handleSubmit}>
              {isLoadingSave ? (
                <>
                  <span className="translate-y-[1px]">
                    <Loader2Icon
                      size={18}
                      className="mr-1.5 animate-spin-fast"
                    />
                  </span>
                  <span>Menyimpan...</span>
                </>
              ) : (
                'Simpan'
              )}
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-6"></div>
    </div>
  );
}

export default AddAdmin;
