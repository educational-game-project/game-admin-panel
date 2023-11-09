import { useEffect } from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import { useBreadcrumbs } from '../context/BreadcrumbsContext';
import { MousePointerClick } from 'lucide-react';

function Score() {
  const { setBreadcrumbs } = useBreadcrumbs();

  useEffect(() => {
    setBreadcrumbs([
      {
        icon: (
          <MousePointerClick
            size={16}
            className="mr-1.5"
          />
        ),
        label: 'Scores',
        path: '/score',
      },
    ]);
  }, [setBreadcrumbs]);
  return (
    <div className="">
      <div className="mb-6">
        <Breadcrumbs />
        <h5 className="font-semibold text-3xl">Scores</h5>
      </div>
      <div className="h-[1500px] bg-white py-4 px-5 rounded-xl"></div>
    </div>
  );
}

export default Score;
