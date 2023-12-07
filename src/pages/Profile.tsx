import { useEffect } from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import { useBreadcrumbs } from '../context/BreadcrumbsContext';
import { UserCircle2Icon } from 'lucide-react';

function Profile() {
  const { setBreadcrumbs } = useBreadcrumbs();

  useEffect(() => {
    setBreadcrumbs([
      {
        icon: (
          <UserCircle2Icon
            size={16}
            className="mr-1.5"
          />
        ),
        label: 'Iwan Suryaningrat',
        path: '/profile',
      },
    ]);
  }, [setBreadcrumbs]);
  return (
    <div className="">
      <div className="mb-6">
        <Breadcrumbs />
        <h5 className="font-semibold text-3xl mb-1.5">Profil</h5>
        <p className="text-gray-500">Lihat dan ubah profil pengguna.</p>
      </div>
      <div className="h-[1500px] bg-white p-5 rounded-xl"></div>
    </div>
  );
}

export default Profile;
