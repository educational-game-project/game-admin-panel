import { useEffect } from 'react';
import { useBreadcrumbs } from '../context/BreadcrumbsContext';
import Breadcrumbs from '../components/Breadcrumbs';
import { LineChart } from 'lucide-react';

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
      <div className="mb-5">
        <Breadcrumbs />
        <h5 className="font-semibold text-3xl">Analysis</h5>
      </div>
      <div className="h-[1500px] bg-white py-4 px-5 rounded-xl"></div>
    </div>
  );
}

export default Analysis;
