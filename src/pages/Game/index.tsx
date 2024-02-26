import { useEffect } from 'react';
import { useAppDispatch } from '../../app/hooks';
import Breadcrumb from '../../components/Breadcrumb';
import HeaderContainer from '../../components/HeaderContainer';
import { setBreadcrumb } from '../../features/breadcrumbSlice';
import GameTable from './components/GameTable';

function Game() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const newBreadcrumb = [
      {
        icon: 'game',
        label: 'Game',
        path: '/game',
      },
    ];
    dispatch(setBreadcrumb(newBreadcrumb));
  }, [dispatch]);

  return (
    <div className="">
      <div className="mb-6">
        <Breadcrumb />
        <HeaderContainer
          title="Game"
          subtitle="Lihat daftar permainan yang terdaftar."
          btnHref="/game/add"
          btnText="Tambah Game"
        />
      </div>
      <div className="bg-white p-5 rounded-xl dark:bg-gray-800">
        <GameTable />
      </div>
    </div>
  );
}

export default Game;
