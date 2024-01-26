import { useEffect } from 'react';
import AdminTable from './components/AdminTable';
import Breadcrumb from '../../components/Breadcrumb';
import { useAppDispatch } from '../../app/hooks';
import { setBreadcrumb } from '../../features/breadcrumbSlice';
import HeaderContainer from '../../components/HeaderContainer';

function Admin() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const newBreadcrumb = [
      {
        icon: 'admin',
        label: 'Admin',
        path: '/admin',
      },
    ];
    dispatch(setBreadcrumb(newBreadcrumb));
  }, [dispatch]);

  return (
    <div className="">
      <div className="mb-6">
        <Breadcrumb />
        <HeaderContainer
          title="Admin"
          subtitle="Kelola admin yang dapat mengakses dashboard."
          btnHref="/admin/add"
          btnText="Tambah Admin"
        />
      </div>
      <div className="bg-white p-5 rounded-xl">
        <AdminTable />
      </div>
    </div>
  );
}

export default Admin;
