import { useEffect } from 'react';
import ScoreTable from './components/ScoreTable';
import Breadcrumb from '../../components/Breadcrumb';
import { useAppDispatch } from '../../app/hooks';
import { setBreadcrumb } from '../../features/breadcrumbSlice';

function Score() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const newBreadcrumb = [
      {
        icon: 'score',
        label: 'Skor',
        path: '/score',
      },
    ];
    dispatch(setBreadcrumb(newBreadcrumb));
  }, [dispatch]);

  return (
    <div className="">
      <div className="mb-6">
        <Breadcrumb />
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
