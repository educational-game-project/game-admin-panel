import { useEffect } from 'react';
import Breadcrumbs from '../../components/Breadcrumbs';
import { useBreadcrumbs } from '../../context/BreadcrumbsContext';
import { SchoolIcon } from 'lucide-react';

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
        <h5 className="font-semibold text-3xl mb-1.5">Sekolah</h5>
        <p className="text-gray-500">Lihat daftar sekolah yang terdaftar.</p>
      </div>
      <div className="h-[1500px] bg-white p-5 rounded-xl"></div>
    </div>
  );
}

export default School;
