import { useEffect } from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import { useBreadcrumbs } from '../context/BreadcrumbsContext';
import ScoreTable from '../components/Table/ScoreTable';
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
        label: 'Skor',
        path: '/score',
      },
    ]);
  }, [setBreadcrumbs]);
  return (
    <div className="">
      <div className="mb-6">
        <Breadcrumbs />
        <h5 className="font-semibold text-3xl mb-1.5">Skor</h5>
        <p className="text-gray-500">
          Lihat poin yang didapat oleh setiap pemain.
        </p>
      </div>
      <div className="bg-white p-5 rounded-xl">
        <ScoreTable />
      </div>
    </div>
  );
}

export default Score;
