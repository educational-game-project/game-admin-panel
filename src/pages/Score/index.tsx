import { useEffect } from 'react';
import ScoreTable from './components/ScoreTable';
import Breadcrumb from '../../components/Breadcrumb';
import { useAppDispatch } from '../../app/hooks';
import { setBreadcrumb } from '../../features/breadcrumbSlice';
import HeaderContainer from '../../components/HeaderContainer';

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
        <HeaderContainer
          title="Skor"
          subtitle="Lihat poin yang didapat oleh setiap pemain."
        />
      </div>
      <div className="bg-white p-5 rounded-xl">
        <ScoreTable />
      </div>
    </div>
  );
}

export default Score;
