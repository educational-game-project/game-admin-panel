import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useBreadcrumbs } from '../../context/BreadcrumbsContext';
import { AdminProps } from '../../interfaces/api';
import {
  ChevronDownIcon,
  Loader2Icon,
  PenBoxIcon,
  UploadCloudIcon,
  UserCogIcon,
} from 'lucide-react';
import adminData from '../../data/ADMIN_DATA.json';
import Breadcrumbs from '../../components/Breadcrumbs';

function EditAdmin() {
  const { adminId } = useParams();
  const { setBreadcrumbs } = useBreadcrumbs();
  const [admin, setAdmin] = useState<AdminProps | undefined>();
  const [isLoadingSave, setIsLoadingSave] = useState(false);

  const handleSubmit = () => {
    setIsLoadingSave(true);
    setTimeout(() => {
      setIsLoadingSave(false);
    }, 2000);
  };

  useEffect(() => {
    setBreadcrumbs([
      {
        icon: (
          <UserCogIcon
            size={16}
            className="mr-1.5"
          />
        ),
        label: 'Admin',
        path: '/admin',
      },
      {
        icon: (
          <PenBoxIcon
            size={16}
            className="mr-1.5"
          />
        ),
        label: 'Edit Admin',
        path: `/admin/edit/${adminId}`,
      },
    ]);
  }, [setBreadcrumbs, adminId]);
  useEffect(() => {
    const foundAdmin = adminData.find((user) => user._id === adminId);
    setAdmin(foundAdmin);
  }, [adminId]);

  return (
    <div>
      <div className="mb-6">
        <Breadcrumbs />
        <div className="flex items-center justify-between">
          <div className="">
            <h5 className="font-semibold text-3xl mb-1.5">Edit Admin</h5>
            <p className="text-gray-500">Edit data admin.</p>
          </div>
          <div className="flex justify-end">
            <Link
              type="button"
              className={`leading-normal inline-flex justify-center rounded-lg border border-gray-300 px-6 py-3 text-sm font-medium text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 ${
                isLoadingSave
                  ? 'opacity-50 cursor-not-allowed bg-gray-200'
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
              to="/admin">
              Kembali
            </Link>
            <button
              type="button"
              className="leading-normal ml-4 inline-flex justify-center rounded-lg border border-transparent bg-violet-600 px-6 py-3 text-sm font-medium text-gray-100 hover:bg-violet-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-violet-500 disabled:focus-visible:ring-2 disabled:focus-visible:ring-violet-500 disabled:focus-visible:ring-offset-2"
              disabled={isLoadingSave}
              onClick={handleSubmit}>
              {isLoadingSave ? (
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
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-full xl:col-span-8">
          <div className="bg-white rounded-xl">
            <div className="px-5 pt-4">
              <h4 className="font-semibold text-xl mb-0.5">Informasi Siswa</h4>
              <p className="text-gray-500">
                Informasi siswa yang akan ditambahkan ke dalam sistem.
              </p>
            </div>
            <div className="p-5">
              <form
                action=""
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
                    value={admin?.name}
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
                    value={admin?.email}
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
                    type="text"
                    className={`px-3 py-2.5 rounded-lg border bg-gray-50 border-gray-300 w-full focus:bg-white focus:outline focus:outline-4 focus:outline-offset-0 focus:outline-indigo-500/30 focus:border-indigo-500/80`}
                    value={admin?.phoneNumber}
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
                      // value={admin?.school?.name}
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
              </form>
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
                  <img
                    src={admin?.images[0]?.fileLink}
                    alt={`${admin?.name} Profile`}
                    className="w-full h-full object-cover object-center"
                  />
                </figure>
                <div className="">
                  <h5 className="font-medium text-base mb-0.5">
                    Ubah Foto Profil
                  </h5>
                  <div className="flex items-center space-x-3">
                    <p className="text-gray-400 hover:text-red-500 cursor-pointer">
                      Hapus
                    </p>
                    <p className="text-violet-600 hover:text-violet-500 cursor-pointer">
                      Update
                    </p>
                  </div>
                </div>
              </div>
              <form
                action=""
                className="block">
                <input
                  id="profileImg"
                  name="profileImg"
                  type="file"
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditAdmin;
