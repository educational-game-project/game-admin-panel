import { useEffect } from 'react';
import { useAppDispatch } from '../app/hooks';
import { setBreadcrumb } from '../features/breadcrumbSlice';
import Breadcrumb from '../components/Breadcrumb';
import HeaderContainer from '../components/HeaderContainer';

function Activity() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const newBreadcrumb = [
      {
        icon: 'activity',
        label: 'Activity',
        path: '/activity',
      },
    ];
    dispatch(setBreadcrumb(newBreadcrumb));
  }, [dispatch]);

  return (
    <div className="">
      <div className="mb-6">
        <Breadcrumb />
        <HeaderContainer
          title="Activity"
          subtitle="Lihat aktivitas terbaru."
        />
      </div>
      <div className="bg-white p-5 rounded-xl dark:bg-gray-800"></div>
    </div>
  );
}

export default Activity;
