import { useEffect } from 'react';
import { useBreadcrumbs } from '../context/BreadcrumbsContext';
import Breadcrumbs from '../components/Breadcrumbs';
import { Settings } from 'lucide-react';

function Preferences() {
  const { setBreadcrumbs } = useBreadcrumbs();

  useEffect(() => {
    setBreadcrumbs([
      {
        icon: (
          <Settings
            size={16}
            className="mr-1.5"
          />
        ),
        label: 'Preferences',
        path: '/preferences',
      },
    ]);
  }, [setBreadcrumbs]);
  return (
    <div className="">
      <div className="mb-5">
        <Breadcrumbs />
        <h5 className="font-semibold text-3xl">Preferences</h5>
      </div>
      <div className="h-[1500px] bg-white py-4 px-5 rounded-xl"></div>
    </div>
  );
}

export default Preferences;
