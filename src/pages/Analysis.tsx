import { useEffect } from 'react';
import { LineChart } from 'lucide-react';
import { useBreadcrumbs } from '../hook/breadcrumbHooks';
import Breadcrumbs from '../components/Breadcrumbs';

function Analysis() {
  const { setBreadcrumbs } = useBreadcrumbs();

  useEffect(() => {
    setBreadcrumbs([
      {
        icon: (
          <LineChart
            size={16}
            className="mr-1.5"
          />
        ),
        label: 'Analysis',
        path: '/analysis',
      },
    ]);
  }, [setBreadcrumbs]);
  return (
    <div className="">
      <div className="mb-6">
        <Breadcrumbs />
        <h5 className="font-semibold text-3xl mb-1.5">Analisis</h5>
        <p className="text-gray-500">Lihat analisis data.</p>
      </div>
      <div className="h-[1500px] bg-white p-5 rounded-xl"></div>
    </div>
  );
}

export default Analysis;
