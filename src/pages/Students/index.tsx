import { useEffect } from 'react';
import Breadcrumbs from '../../components/Breadcrumbs';
import { useBreadcrumbs } from '../../context/BreadcrumbsContext';
import { UserSquare2 } from 'lucide-react';
import StudentsTable from '../../components/Table/StudentsTable';

function Students() {
  const { setBreadcrumbs } = useBreadcrumbs();

  useEffect(() => {
    setBreadcrumbs([
      {
        icon: (
          <UserSquare2
            size={16}
            className="mr-1.5"
          />
        ),
        label: 'Students',
        path: '/student',
      },
    ]);
  }, [setBreadcrumbs]);
  return (
    <div className="">
      <div className="mb-6">
        <Breadcrumbs />
        <h5 className="font-semibold text-3xl mb-1.5">Siswa</h5>
        <p className="text-gray-500">Lihat daftar siswa yang terdaftar.</p>
      </div>
      <div className="bg-white p-5 rounded-xl">
        <StudentsTable />
      </div>
    </div>
  );
}

export default Students;
