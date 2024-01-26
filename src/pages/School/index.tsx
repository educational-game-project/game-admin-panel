import { useEffect, useRef } from 'react';
import SchoolTable from './components/SchoolTable';
import Breadcrumb from '../../components/Breadcrumb';
import { useAppDispatch } from '../../app/hooks';
import { setBreadcrumb } from '../../features/breadcrumbSlice';
import HeaderContainer from '../../components/HeaderContainer';
import { useGetSchoolMutation } from '../../services/schoolApi';
import { showErrorToast } from '../../components/Toast';

function School() {
  const refInitMount = useRef(true);
  const dispatch = useAppDispatch();
  const [getSchool, { isLoading, isSuccess, isError, data: school }] =
    useGetSchoolMutation();
  let content;

  const fetchSchool = async () => {
    try {
      await getSchool({
        search: '',
        page: 1,
        limit: 100,
      });
    } catch (error) {
      showErrorToast('Gagal mengambil data siswa');
    }
  };

  if (isLoading) {
    content = (
      <div>
        <svg
          className="animate-spin-fast -ml-1 mr-3 h-5 w-5 text-neutral-800 inline-block"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    );
  } else if (isSuccess) {
    content = (
      <SchoolTable
        school={school.data}
        refetchSchool={fetchSchool}
      />
    );
  } else if (isError) {
    content = (
      <div className="text-center">
        <p className="text-neutral-500 text-sm">Gagal memuat data sekolah</p>
        <button
          onClick={fetchSchool}
          className="mt-2 px-4 py-2 rounded-lg bg-primary-600 text-white">
          Coba Lagi
        </button>
      </div>
    );
  }

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

  useEffect(() => {
    if (refInitMount.current) {
      refInitMount.current = false;
      return;
    }
    fetchSchool();
  }, []);

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
      <div className="bg-white p-5 rounded-xl">{content}</div>
    </div>
  );
}

export default School;
