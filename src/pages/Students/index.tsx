import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { PlusIcon } from 'lucide-react';
import StudentsTable from './components/StudentsTable';
import Breadcrumb from '../../components/Breadcrumb';
import { useAppDispatch } from '../../app/hooks';
import { setBreadcrumb } from '../../features/breadcrumbSlice';
import { useGetStudentMutation } from '../../services/studentApi';
import { showErrorToast } from '../../components/Toast';

function Students() {
  const refInitMount = useRef(true);
  const dispatch = useAppDispatch();
  const [getStudent, { isLoading, isSuccess, data: student }] =
    useGetStudentMutation();
  let content;

  const fetchStudent = async () => {
    try {
      await getStudent({
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
      <StudentsTable
        student={student.data}
        refetchStudent={fetchStudent}
      />
    );
  }

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

  useEffect(() => {
    if (refInitMount.current) {
      refInitMount.current = false;
      return;
    }
    fetchStudent();
  }, []);

  return (
    <div className="">
      <div className="mb-6">
        <Breadcrumb />
        <div className="flex justify-between">
          <div className="">
            <h5 className="font-semibold text-3xl mb-1.5">Siswa</h5>
            <p className="text-gray-500">Lihat daftar siswa yang terdaftar.</p>
          </div>
          <div className="">
            <Link
              type="button"
              className="leading-normal ml-4 inline-flex justify-center rounded-lg border border-transparent bg-violet-600 px-4 py-2.5 text-sm font-medium text-gray-100 hover:bg-violet-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-violet-500 disabled:focus-visible:ring-2 disabled:focus-visible:ring-violet-500 disabled:focus-visible:ring-offset-2"
              to="/student/add">
              <PlusIcon
                size={20}
                className="mr-1.5 stroke-current"
                strokeWidth={2}
              />
              Tambah Siswa
            </Link>
          </div>
        </div>
      </div>
      <div className="bg-white p-5 rounded-xl">{content}</div>
    </div>
  );
}

export default Students;
