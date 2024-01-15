import { useEffect } from 'react';
import { UserCircle2Icon } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import { useBreadcrumbs } from '../hook/breadcrumbHooks';
import { useAuth } from '../hook/authHooks';

function Profile() {
  const { setBreadcrumbs } = useBreadcrumbs();
  const { user } = useAuth();

  useEffect(() => {
    setBreadcrumbs([
      {
        icon: (
          <UserCircle2Icon
            size={16}
            className="mr-1.5"
          />
        ),
        label: user?.name,
        path: '/profile',
      },
    ]);
  }, [setBreadcrumbs, user]);
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
