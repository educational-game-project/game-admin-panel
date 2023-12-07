import { useEffect } from 'react';
import Breadcrumbs from '../../components/Breadcrumbs';
import { UserCogIcon } from 'lucide-react';
import { useBreadcrumbs } from '../../context/BreadcrumbsContext';

function Admin() {
  const { setBreadcrumbs } = useBreadcrumbs();

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
    ]);
  }, [setBreadcrumbs]);
  return (
    <div className="">
      <div className="mb-6">
        <Breadcrumbs />
        <h5 className="font-semibold text-3xl mb-1.5">Admin</h5>
        <p className="text-gray-500">
          Kelola admin yang dapat mengakses dashboard.
        </p>
      </div>
      <div className="h-[1500px] bg-white p-5 rounded-xl"></div>
    </div>
  );
}

export default Admin;
