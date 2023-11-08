import { useEffect } from 'react';
import { useBreadcrumbs } from '../context/BreadcrumbsContext';
import Breadcrumbs from '../components/Breadcrumbs';
import { Headphones } from 'lucide-react';

function Support() {
  const { setBreadcrumbs } = useBreadcrumbs();

  useEffect(() => {
    setBreadcrumbs([
      {
        icon: (
          <Headphones
            size={16}
            className="mr-1.5"
          />
        ),
        label: 'Support',
        path: '/support',
      },
    ]);
  }, [setBreadcrumbs]);
  return (
    <div className="">
      <div className="mb-5">
        <Breadcrumbs />
        <h5 className="font-semibold text-3xl">Support</h5>
      </div>
      <div className="h-[1500px] bg-white py-4 px-5 rounded-xl"></div>
    </div>
  );
}

export default Support;
