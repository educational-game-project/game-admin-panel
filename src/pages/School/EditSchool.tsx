import { useCallback, useEffect, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';
import { Loader2Icon, TrashIcon, UploadCloudIcon } from 'lucide-react';
import Breadcrumb from '../../components/Breadcrumb';
import { useAppDispatch } from '../../app/hooks';
import { setBreadcrumb } from '../../features/breadcrumbSlice';
import {
  useGetSchoolByIdMutation,
  useUpdateSchoolMutation,
} from '../../services/schoolApi';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDropzone } from 'react-dropzone';
import { setAllowedToast } from '../../features/toastSlice';
import { showErrorToast, showSuccessToast } from '../../components/Toast';

import { SchoolUpdateRequest } from '../../types';

const MAX_FILE_SIZE = 3 * 1024 * 1024;
const schema = yup.object().shape({
  name: yup.string().required('Nama sekolah harus diisi'),
  address: yup.string().required('Alamat sekolah harus diisi'),
  media: yup.mixed().test({
    name: 'fileSize',
    message: 'File terlalu besar',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    test: (value: any) => {
      if (!value?.length) return true;
      return value[0]?.size <= MAX_FILE_SIZE;
    },
  }),
});

function EditSchool() {
  const refInitMount = useRef(true);
  const navigate = useNavigate();
  const { schoolId } = useParams();
  const dispatch = useAppDispatch();
  const [getSchoolById, { data: school }] = useGetSchoolByIdMutation();
  const [updateSchool, { isLoading: isLoadingUpdate }] =
    useUpdateSchoolMutation();

  const {
    formState: { errors },
    handleSubmit,
    register,
    setValue,
    watch,
  } = useForm<SchoolUpdateRequest>({
    mode: 'onTouched',
    resolver: yupResolver(schema),
  });

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setValue('media', acceptedFiles);
    },
    [setValue]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.svg'] },
    multiple: false,
  });

  const watchMedia = watch('media');

  const fetchSchoolById = async (id: string) => {
    try {
      const response = await getSchoolById({ id }).unwrap();
      if (response.success) {
        setValue('name', response.data.name);
        setValue('address', response.data.address);
        setValue('media', null);
      }
    } catch (error) {
      showErrorToast('Gagal mengambil data sekolah');
    }
  };

  const onSubmit: SubmitHandler<SchoolUpdateRequest> = async (data) => {
    try {
      await updateSchool({ ...data, id: schoolId }).unwrap();
      dispatch(setAllowedToast());
      showSuccessToast('Data sekolah berhasil diperbarui!');
      navigate('/school');
    } catch (error) {
      showErrorToast('Data sekolah gagal disimpan');
    }
  };
  const handleDeletePhoto = (id: string) => {
    console.log(id);
  };

  useEffect(() => {
    const newBreadcrumb = [
      {
        icon: 'school',
        label: 'School',
        path: '/school',
      },
      {
        icon: 'edit',
        label: 'Edit School',
        path: `/school/edit/${schoolId}`,
      },
    ];
    dispatch(setBreadcrumb(newBreadcrumb));
  }, [dispatch, schoolId]);
  useEffect(() => {
    if (refInitMount.current) {
      refInitMount.current = false;
      return;
    }
    if (!schoolId) {
      navigate('/school');
      return;
    } else {
      fetchSchoolById(schoolId);
    }
  }, [schoolId]);

  return (
    <div>
      <div className="mb-6">
        <Breadcrumb />
        <div className="flex items-center justify-between">
          <div className="">
            <h5 className="font-semibold text-3xl mb-1.5">Edit Sekolah</h5>
            <p className="text-gray-500">Edit data sekolah.</p>
          </div>
          <div className="flex justify-end">
            <Link
              type="button"
              className={`leading-normal inline-flex justify-center rounded-lg border border-gray-300 px-6 py-3 text-sm font-medium text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 ${
                isLoadingUpdate
                  ? 'opacity-50 cursor-not-allowed bg-gray-200'
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
              to="/school">
              Kembali
            </Link>
            <button
              type="button"
              className="leading-normal ml-4 inline-flex justify-center rounded-lg border border-transparent bg-violet-600 px-6 py-3 text-sm font-medium text-gray-100 hover:bg-violet-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-violet-500 disabled:focus-visible:ring-2 disabled:focus-visible:ring-violet-500 disabled:focus-visible:ring-offset-2"
              disabled={isLoadingUpdate}
              onClick={handleSubmit(onSubmit)}>
              {isLoadingUpdate ? (
                <>
                  <span className="translate-y-[.0625rem]">
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
              <h4 className="font-semibold text-xl mb-0.5">
                Informasi Sekolah
              </h4>
              <p className="text-gray-500">
                Informasi sekolah yang akan ditambahkan ke dalam sistem.
              </p>
            </div>
            <div className="p-5">
              <div>
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
                    className={`px-3 py-2.5 rounded-lg border bg-gray-50 border-gray-300 w-full focus:bg-white focus:outline focus:outline-4 focus:outline-offset-0 focus:outline-indigo-500/30 focus:border-indigo-500/80 ${
                      errors.name
                        ? 'bg-red-50 border-red-400 focus:outline-red-500/30 focus:border-red-500'
                        : ''
                    }`}
                    placeholder="Masukkan nama sekolah"
                    aria-required="true"
                    aria-invalid={errors.name ? 'true' : 'false'}
                    {...register('name')}
                  />
                  {errors.name && (
                    <p className="mt-1 -mb-1.5 text-red-500">
                      {errors.name.message}
                    </p>
                  )}
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
                    className={`px-3 py-2.5 rounded-lg border bg-gray-50 border-gray-300 w-full focus:bg-white focus:outline focus:outline-4 focus:outline-offset-0 focus:outline-indigo-500/30 focus:border-indigo-500/80 ${
                      errors.address
                        ? 'bg-red-50 border-red-400 focus:outline-red-500/30 focus:border-red-500'
                        : ''
                    }`}
                    placeholder="Masukkan alamat sekolah"
                    aria-required="true"
                    aria-invalid={errors.address ? 'true' : 'false'}
                    {...register('address')}
                  />
                  {errors.address && (
                    <p className="mt-1 -mb-1.5 text-red-500">
                      {errors.address.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-full xl:col-span-4">
          <div className="bg-white rounded-xl">
            <div className="px-5 pt-4">
              <h4 className="font-semibold text-xl mb-0.5">Foto Sekolah</h4>
              <p className="text-gray-500">
                Foto sekolah yang akan ditambahkan ke dalam sistem.
              </p>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-6 gap-4 mb-4">
                {school?.data?.images.map((image, index) => (
                  <div
                    className="col-span-2 xl:col-span-3"
                    key={image?._id}>
                    <figure className="group overflow-hidden w-full h-32 rounded-md mr-3 relative">
                      <img
                        src={image?.fileLink}
                        alt={`${school?.data?.name}-${index} Profile`}
                        className="w-full h-full object-cover object-center"
                      />
                      <div className="-z-10 group-hover:z-10 absolute inset-0 flex items-center justify-center backdrop-blur-sm bg-gray-900/30 transition-all ease-in-out duration-300">
                        <button
                          className="scale-75 group-hover:scale-100 flex items-center justify-center w-9 h-9 rounded-full bg-red-500 transition-all duration-200 ease-in-out hover:bg-red-600"
                          onClick={() => handleDeletePhoto(image._id)}>
                          <TrashIcon
                            size={18}
                            className="stroke-white"
                          />
                        </button>
                      </div>
                    </figure>
                  </div>
                ))}
              </div>
              <div className="">
                <div
                  {...getRootProps({ className: 'dropzone' })}
                  className={`group drop-media cursor-pointer w-full p-4 border-2 border-dashed rounded-md flex flex-col justify-center items-center ${
                    isDragActive
                      ? 'border-gray-600 bg-neutral-200'
                      : 'border-gray-300'
                  }`}>
                  <input
                    {...getInputProps()}
                    name="media"
                    id="media"
                    accept="image/*"
                  />
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-violet-50 mt-1 mb-4">
                    <UploadCloudIcon
                      size={24}
                      className="text-gray-500"
                    />
                  </div>
                  <p className="text-gray-500">
                    <span className="inline-block text-violet-500 cursor-pointer hover:underline underline-offset-2">
                      Click to upload
                    </span>{' '}
                    or drag and drop
                  </p>
                  <p className="text-gray-500">
                    SVG, PNG, or JPG (max. 3.00 MB)
                  </p>
                </div>
              </div>
              {watchMedia?.length > 0 && errors.media && (
                <p className="mt-1 text-red-500">
                  {errors.media.message?.toString()}
                </p>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditSchool;
