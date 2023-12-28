import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { MousePointerSquareIcon, SchoolIcon } from 'lucide-react';
import { useBreadcrumbs } from '../../hook/breadcrumbHooks';
import Breadcrumbs from '../../components/Breadcrumbs';
import { SchoolProps } from '../../types/api';

import schoolData from '../../data/SCHOOL_DATA.json';

function DetailSchool() {
  const { schoolId } = useParams();
  const { setBreadcrumbs } = useBreadcrumbs();
  const [school, setSchool] = useState<SchoolProps | undefined>();

  useEffect(() => {
    setBreadcrumbs([
      {
        icon: (
          <SchoolIcon
            size={16}
            className="mr-1.5"
          />
        ),
        label: 'School',
        path: '/school',
      },
      {
        icon: (
          <MousePointerSquareIcon
            size={16}
            className="mr-1.5"
          />
        ),
        label: 'Detail School',
        path: `/school/${schoolId}`,
      },
    ]);
  }, [setBreadcrumbs, schoolId]);
  useEffect(() => {
    const foundSchool = schoolData.find((item) => item._id === schoolId);
    setSchool(foundSchool);
  }, [schoolId]);

  return (
    <div>
      <div className="mb-6">
        <Breadcrumbs />
        <div className="flex items-center justify-between">
          <div className="">
            <h5 className="font-semibold text-3xl mb-1.5">Edit Sekolah</h5>
            <p className="text-gray-500">Edit data sekolah.</p>
          </div>
          <div className="flex justify-end">
            <Link
              type="button"
              className={`leading-normal inline-flex justify-center rounded-lg border border-gray-300 px-6 py-3 text-sm font-medium text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 `}
              to="/school">
              Kembali
            </Link>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-full xl:col-span-8">
          <div className="bg-white rounded-xl">
            <div className="px-5 pt-4">
              <h4 className="font-semibold text-xl mb-0.5">
                Informasi Sekolah
              </h4>
              <p className="text-gray-500">
                Informasi sekolah yang terdaftar dalam sistem.
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
                    Nama Sekolah
                  </label>
                  <input
                    id="name"
                    type="text"
                    className={`px-3 py-2.5 rounded-lg border bg-gray-50 border-gray-300 w-full focus:bg-white focus:outline focus:outline-4 focus:outline-offset-0 focus:outline-indigo-500/30 focus:border-indigo-500/80`}
                    value={school?.name}
                    placeholder="Masukkan nama sekolah"
                    aria-required="true"
                    aria-invalid="false"
                    disabled
                  />
                </div>
                {/* address */}
                <div className="mb-4">
                  <label
                    htmlFor="address"
                    className="block mb-2 font-medium text-gray-500">
                    Alamat
                  </label>
                  <textarea
                    id="address"
                    className={`px-3 py-2.5 rounded-lg border bg-gray-50 border-gray-300 w-full focus:bg-white focus:outline focus:outline-4 focus:outline-offset-0 focus:outline-indigo-500/30 focus:border-indigo-500/80`}
                    value={school?.address}
                    placeholder="Masukkan alamat sekolah"
                    aria-required="true"
                    aria-invalid="false"
                    disabled
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-span-full xl:col-span-4">
          <div className="bg-white rounded-xl">
            <div className="px-5 pt-4">
              <h4 className="font-semibold text-xl mb-0.5">Admin Sekolah</h4>
              <p className="text-gray-500">
                Admin {school?.name} yang terdaftar dalam sistem.
              </p>
            </div>
            <div className="p-5">
              <div className="w-full flex flex-col gap-3">
                {school?.admins.map((admin) => (
                  <div className="w-full flex items-center p-3 rounded-md bg-gray-100">
                    <figure className="w-9 h-9 rounded-full overflow-hidden mr-2">
                      <img
                        src={admin.images[0].fileLink}
                        alt={`${admin.name} Profile`}
                        className="w-full h-full object-cover object-center"
                      />
                    </figure>
                    <div className="">
                      <p className="font-medium">{admin.name}</p>
                      <p className="text-xs text-gray-500">{admin.email}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-full">
          <div className="bg-white rounded-xl">
            <div className="px-5 pt-4">
              <h4 className="font-semibold text-xl mb-0.5">Foto Sekolah</h4>
              <p className="text-gray-500">
                Foto sekolah yang terdaftar dalam sistem.
              </p>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-12 xl:grid-cols-10 gap-4 mb-4">
                {school?.images.map((image, index) => (
                  <div className="col-span-4 lg:col-span-3 xl:col-span-2">
                    <figure className="group overflow-hidden w-full h-32 rounded-md mr-3">
                      <img
                        src={image.fileLink}
                        alt={`${school?.name}-${index} Profile`}
                        className="w-full h-full object-cover object-center"
                      />
                    </figure>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailSchool;
