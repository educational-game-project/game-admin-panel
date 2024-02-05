import { useEffect } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import { useAppDispatch } from '../app/hooks';
import { setBreadcrumb } from '../features/breadcrumbSlice';
import HeaderContainer from '../components/HeaderContainer';

function Support() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const newBreadcrumb = [
      {
        icon: 'support',
        label: 'Support',
        path: '/support',
      },
    ];
    dispatch(setBreadcrumb(newBreadcrumb));
  }, [dispatch]);

  return (
    <div className="">
      <div className="mb-6">
        <Breadcrumb />
        <HeaderContainer
          title="Support"
          subtitle="Hubungi kami untuk bantuan lebih lanjut."
        />
      </div>
      <div className="bg-white p-5 rounded-xl dark:bg-gray-800"></div>
    </div>
  );
}

export default Support;
