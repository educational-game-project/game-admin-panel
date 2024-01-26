import { useEffect } from 'react';
import StudentsTable from './components/StudentsTable';
import Breadcrumb from '../../components/Breadcrumb';
import { setBreadcrumb } from '../../features/breadcrumbSlice';
import { useAppDispatch } from '../../app/hooks';
import HeaderContainer from '../../components/HeaderContainer';

function Students() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const newBreadcrumb = [
      {
        icon: 'student',
        label: 'Students',
        path: '/student',
      },
    ];
    dispatch(setBreadcrumb(newBreadcrumb));
  }, [dispatch]);

  return (
    <div className="">
      <div className="mb-6">
        <Breadcrumb />
        <HeaderContainer
          title="Siswa"
          subtitle="Lihat daftar siswa yang terdaftar."
          btnHref="/student/add"
          btnText="Tambah Siswa"
        />
      </div>
      <div className="bg-white p-5 rounded-xl">
        <StudentsTable />
      </div>
    </div>
  );
}

export default Students;
