import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronDownIcon, Loader2Icon, UploadCloudIcon } from 'lucide-react';
import Breadcrumb from '../../components/Breadcrumb';
import { useAppDispatch } from '../../app/hooks';
import { setBreadcrumb } from '../../features/breadcrumbSlice';

import { Student } from '../../types';
import RoundedLoader from '../../components/Loaders/RoundedLoader';
import useFetchHook from '../../hook/useFetchHook';

type TypeUpdateStudent = {
  name?: string;
  email?: string;
  media?: File | string;
  phoneNumber?: string;
}

function EditStudent() {
  const dispatch = useAppDispatch();
  const { studentId } = useParams();

  const [student, setStudent] = useState<Student | undefined>(undefined);
  const [studentUpdate, setStudentUpdate] = useState<TypeUpdateStudent>({});
  const [formData, setFormData] = useState<FormData>();

  const { setStartFetching, loading, data: dataStudent } = useFetchHook<IResponse<Student>>({ url: "/user/student/detail", payload: { id: studentId } });
  const { loading: loadingUpdateStudent, setStartFetching: setStartFetchingUpdate } = useFetchHook({ 
    url: "/user/student", 
    payload: formData, 
    options: { headers: { "Content-Type": "multipart/form-data" } } 
  });

  useMemo(() => {
    if(dataStudent?.data !== undefined) setStudent(dataStudent?.data)
  }, [dataStudent])

  const handleSubmit = () => {
    const formData = new FormData()
    formData.append("name", studentUpdate.name as string)
    formData.append("email", studentUpdate.name as string)
    formData.append("phoneNumber", studentUpdate.name as string)
    formData.append("media", studentUpdate.media as File)

    if(!formData.has("media")) formData.delete("media");

    setFormData(() => (formData));

    setStartFetchingUpdate(true)
  };

  useEffect(() => {
    const newBreadcrumb = [
      {
        icon: 'student',
        label: 'Students',
        path: '/student',
      },
      {
        icon: 'edit',
        label: 'Edit Student',
        path: `/student/edit/${studentId}`,
      },
    ];
    dispatch(setBreadcrumb(newBreadcrumb));

    setStartFetching(true)
  }, [studentId]);

  const handleForm = ({ type, value }: { type: string, value: string | File }): void => {
    switch(type) {
      case 'NAME': setStudentUpdate((e) => ({ ...e, name: value as string })); break;
      case 'EMAIL': setStudentUpdate((e) => ({ ...e, email: value as string })); break;
      case 'PHONE_NUMBER': setStudentUpdate((e) => ({ ...e, phoneNumber: value as string })); break;
      case 'MEDIA': setStudentUpdate((e) => ({ ...e, media: value })); break;
    }
  }

  useMemo(() => console.log(studentUpdate), [studentUpdate])

  
  return (
    <div>
      { loading ? <RoundedLoader /> : null }
      <div className="mb-6">
        <Breadcrumb />
        <div className="flex items-center justify-between">
          <div className="">
            <h5 className="font-semibold text-3xl mb-1.5">Edit Siswa</h5>
            <p className="text-gray-500">Edit data siswa.</p>
          </div>
          <div className="flex justify-end">
            <Link
              type="button"
              className={`leading-normal inline-flex justify-center rounded-lg border border-gray-300 px-6 py-3 text-sm font-medium text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 ${
                loadingUpdateStudent
                  ? 'opacity-50 cursor-not-allowed bg-gray-200'
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
              to="/student">
              Kembali
            </Link>
            <button
              type="button"
              className="leading-normal ml-4 inline-flex justify-center rounded-lg border border-transparent bg-violet-600 px-6 py-3 text-sm font-medium text-gray-100 hover:bg-violet-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-violet-500 disabled:focus-visible:ring-2 disabled:focus-visible:ring-violet-500 disabled:focus-visible:ring-offset-2"
              disabled={loadingUpdateStudent}
              onClick={handleSubmit}>
              {loadingUpdateStudent ? (
                <>
                  <span className="translate-y-[1px]">
                    <Loader2Icon
                      size={18}
                      className="mr-1.5 animate-spin-fast"
                    />
                  </span>
                  <span>Menyimpan...</span>
                </>
              ) : (
                'Simpan'
              )}
            </button>
          </div>
        </div>
      </div>
      <form className="grid grid-cols-12 gap-6">
        <div className="col-span-full xl:col-span-8">
          <div className="bg-white rounded-xl">
            <div className="px-5 pt-4">
              <h4 className="font-semibold text-xl mb-0.5">Informasi Siswa</h4>
              <p className="text-gray-500">
                Informasi siswa yang akan ditambahkan ke dalam sistem.
              </p>
            </div>
            <div className="p-5">
              <div
                className="block">
                {/* name */}
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block mb-2 font-medium text-gray-500">
                    Nama Lengkap
                  </label>
                  <input
                    id="name"
                    type="text"
                    className={`px-3 py-2.5 rounded-lg border bg-gray-50 border-gray-300 w-full focus:bg-white focus:outline focus:outline-4 focus:outline-offset-0 focus:outline-indigo-500/30 focus:border-indigo-500/80`}
                    value={studentUpdate?.name ?? student?.name}
                    onChange={(e) => handleForm({ type: 'NAME', value: e.target.value })}
                    placeholder="Masukkan nama siswa"
                    aria-required="true"
                    aria-invalid="false"
                  />
                </div>
                {/* email */}
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block mb-2 font-medium text-gray-500">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className={`px-3 py-2.5 rounded-lg border bg-gray-50 border-gray-300 w-full focus:bg-white focus:outline focus:outline-4 focus:outline-offset-0 focus:outline-indigo-500/30 focus:border-indigo-500/80`}
                    value={studentUpdate?.email ?? student?.email}
                    onChange={(e) => handleForm({ type: 'EMAIL', value: e.target.value })}
                    placeholder="Masukkan email siswa"
                    aria-required="true"
                    aria-invalid="false"
                  />
                </div>
                {/* phone number */}
                <div className="mb-4">
                  <label
                    htmlFor="phone"
                    className="block mb-2 font-medium text-gray-500">
                    Nomor Telepon
                  </label>
                  <input
                    id="phone"
                    type="number"
                    className={`px-3 py-2.5 rounded-lg border bg-gray-50 border-gray-300 w-full focus:bg-white focus:outline focus:outline-4 focus:outline-offset-0 focus:outline-indigo-500/30 focus:border-indigo-500/80`}
                    value={studentUpdate?.phoneNumber ?? student?.phoneNumber}
                    onChange={(e) => handleForm({ type: 'PHONE_NUMBER', value: e.target.value })}
                    placeholder="Masukkan nomor telepon siswa"
                    aria-required="true"
                    aria-invalid="false"
                  />
                </div>
                {/* school::select */}
                <div className="mb-1">
                  <label
                    htmlFor="school"
                    className="block mb-2 font-medium text-gray-500">
                    Sekolah
                  </label>
                  <div className="relative">
                    <select
                      id="school"
                      className={`h-[43.2px] px-3 py-2.5 rounded-lg border bg-gray-50 border-gray-300 w-full appearance-none focus:bg-white focus:outline focus:outline-4 focus:outline-offset-0 focus:outline-indigo-500/30 focus:border-indigo-500/80`}
                      // value={student?.school?.name}
                      aria-required="true"
                      aria-invalid="false">
                      <option value="">Pilih Sekolah</option>
                      <option value="SMA">SMA</option>
                      <option value="SMK">SMK</option>
                      <option value="MA">MA</option>
                    </select>
                    <div className="absolute inset-y-0 right-1 flex items-center px-2 pointer-events-none">
                      <ChevronDownIcon
                        size={18}
                        className="text-gray-400"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-full xl:col-span-4">
          <div className="bg-white rounded-xl">
            <div className="px-5 pt-4">
              <h4 className="font-semibold text-xl mb-0.5">Foto Profil</h4>
              <p className="text-gray-500">
                Foto profil siswa yang akan ditambahkan ke dalam sistem.
              </p>
            </div>
            <div className="p-5">
              <div className="flex items-center mb-4">
                <figure className="flex items-center justify-center overflow-hidden w-14 h-14 rounded-full mr-3">
                  { student?.image?.fileLink ? (
                    <img
                      src={student?.image?.fileLink}
                      alt={`${student?.name} Profile`}
                      className="w-full h-full object-cover object-center"
                    />
                  ) : null }
                </figure>
                <div className="">
                  <h5 className="font-medium text-base mb-0.5">
                    Ubah Foto Profil
                  </h5>
                  <div className="flex items-center space-x-3">
                    <p onClick={() => {}} className="text-gray-400 hover:text-red-500 cursor-pointer">
                      Hapus
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="block">
                <input
                  id="profileImg"
                  name="profileImg"
                  type="file"
                  onChange={(e) => handleForm({ type: "MEDIA", value: e.target?.files?.[0] as File })}
                  className="hidden opacity-0 invisible"
                />
                <div className="cursor-pointer w-full p-4 border-2 border-dashed border-gray-300 rounded-md flex flex-col justify-center items-center">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-violet-50 mt-1 mb-4">
                    <UploadCloudIcon
                      size={24}
                      className="text-gray-500"
                    />
                  </div>
                  <p className="text-gray-500">
                    <label
                      className="inline-block text-violet-500 cursor-pointer hover:underline underline-offset-2"
                      htmlFor="profileImg">
                      Click to upload
                    </label>{' '}
                    or drag and drop
                  </p>
                  <p className="text-gray-500">
                    SVG, PNG, or JPG (max. 3.00 MB)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditStudent;
