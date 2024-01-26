import { useEffect } from 'react';
import SchoolTable from './components/SchoolTable';
import Breadcrumb from '../../components/Breadcrumb';
import { useAppDispatch } from '../../app/hooks';
import { setBreadcrumb } from '../../features/breadcrumbSlice';
import HeaderContainer from '../../components/HeaderContainer';

function School() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const newBreadcrumb = [
      {
        icon: 'school',
        label: 'School',
        path: '/school',
      },
    ];
    dispatch(setBreadcrumb(newBreadcrumb));
  }, [dispatch]);

  return (
    <div className="">
      <div className="mb-6">
        <Breadcrumb />
        <HeaderContainer
          title="Sekolah"
          subtitle="Lihat daftar sekolah yang terdaftar."
          btnHref="/school/add"
          btnText="Tambah Sekolah"
        />
      </div>
      <div className="bg-white p-5 rounded-xl">
        <SchoolTable />
      </div>
    </div>
  );
}

export default School;
