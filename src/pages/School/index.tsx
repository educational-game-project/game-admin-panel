import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlusIcon, SchoolIcon } from 'lucide-react';
import { useBreadcrumbs } from '../../hook/breadcrumbHooks';
import Breadcrumbs from '../../components/Breadcrumbs';
import SchoolTable from './components/SchoolTable';

function School() {
  const { setBreadcrumbs } = useBreadcrumbs();

  useEffect(() => {
    setBreadcrumbs([
      {
        icon: (
          <SchoolIcon
            size={16}
            className="mr-1.5"
          />
        ),
        label: 'School',
        path: '/school',
      },
    ]);
  }, [setBreadcrumbs]);
  return (
    <div className="">
      <div className="mb-6">
        <Breadcrumbs />
        <div className="flex justify-between">
          <div className="">
            <h5 className="font-semibold text-3xl mb-1.5">Sekolah</h5>
            <p className="text-gray-500">
              Lihat daftar sekolah yang terdaftar.
            </p>
          </div>
          <div className="">
            <Link
              type="button"
              className="leading-normal ml-4 inline-flex justify-center rounded-lg border border-transparent bg-violet-600 px-4 py-2.5 text-sm font-medium text-gray-100 hover:bg-violet-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-violet-500 disabled:focus-visible:ring-2 disabled:focus-visible:ring-violet-500 disabled:focus-visible:ring-offset-2"
              to="/school/add">
              <PlusIcon
                size={20}
                className="mr-1.5 stroke-current"
                strokeWidth={2}
              />
              Tambah Sekolah
            </Link>
          </div>
        </div>
      </div>
      <div className="bg-white p-5 rounded-xl">
        <SchoolTable />
      </div>
    </div>
  );
}

export default School;
