import { useEffect } from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import { useBreadcrumbs } from '../context/BreadcrumbsContext';
import { UserSquare2 } from 'lucide-react';

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
      <div className="mb-5">
        <Breadcrumbs />
        <h5 className="font-semibold text-3xl">Students</h5>
      </div>
      <div className="h-[1500px] bg-white py-4 px-5 rounded-xl"></div>
    </div>
  );
}

export default Students;
