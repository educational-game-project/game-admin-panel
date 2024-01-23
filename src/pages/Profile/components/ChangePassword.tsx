import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { ChangePasswordRequest } from '../../../types';
import { useChangePasswordMutation } from '../../../services/authApi';
import { showErrorToast, showSuccessToast } from '../../../components/Toast';

const schema = yup.object().shape({
  oldPassword: yup.string().required('Password lama harus diisi.'),
  newPassword: yup.string().required('Password baru harus diisi.'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword'), undefined], 'Password tidak sama.')
    .required('Konfirmasi password baru harus diisi.'),
});

interface ShowPasswordState {
  oldPassword: boolean;
  newPassword: boolean;
  confirmPassword: boolean;
}

function ChangePassword() {
  const [showPassword, setShowPassword] = useState<ShowPasswordState>({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<ChangePasswordRequest>({
    mode: 'onTouched',
    resolver: yupResolver(schema),
  });

  const handleShowPassword = (e: React.MouseEvent<HTMLDivElement>) => {
    const id = e.currentTarget.getAttribute('aria-labelledby');

    if (id && Object.keys(showPassword).includes(id)) {
      setShowPassword((prevState) => ({
        ...prevState,
        [id]: !prevState[id as keyof ShowPasswordState],
      }));
    }
  };

  const onSubmit: SubmitHandler<ChangePasswordRequest> = async (data) => {
    try {
      await changePassword(data).unwrap();
      showSuccessToast('Password berhasil diubah.');
      reset();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.data) {
        showErrorToast(error.data.message);
      } else {
        showErrorToast('Terjadi kesalahan. Silahkan coba lagi.');
      }
    }
  };

  return (
    <>
      <h3 className="mb-3 text-2xl font-semibold">Ubah Password</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-2">
          <label
            htmlFor="oldPassword"
            className="">
            Password Lama
          </label>
          <div className="relative">
            <input
              type={showPassword.oldPassword ? 'text' : 'password'}
              id="oldPassword"
              className={`px-3 py-2.5 rounded-lg border bg-gray-50 border-gray-300 w-full focus:bg-white focus:outline focus:outline-4 focus:outline-offset-0 focus:outline-indigo-500/30 focus:border-indigo-500/80 ${
                errors.oldPassword
                  ? 'bg-red-50 border-red-400 focus:outline-red-500/30 focus:border-red-500'
                  : ''
              }`}
              placeholder="Masukkan password lama"
              aria-required="true"
              aria-invalid={errors.oldPassword ? 'true' : 'false'}
              {...register('oldPassword')}
            />
            <div
              className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
              aria-labelledby="oldPassword"
              onClick={handleShowPassword}>
              {showPassword.oldPassword ? 'hide' : 'show'}
            </div>
          </div>
          {errors.oldPassword && (
            <p className="mt-1 -mb-1.5 text-red-500">
              {errors.oldPassword.message}
            </p>
          )}
        </div>
        <div className="mb-2">
          <label
            htmlFor="newPassword"
            className="">
            Password Baru
          </label>
          <div className="relative">
            <input
              type={showPassword.newPassword ? 'text' : 'password'}
              id="newPassword"
              className={`px-3 py-2.5 rounded-lg border bg-gray-50 border-gray-300 w-full focus:bg-white focus:outline focus:outline-4 focus:outline-offset-0 focus:outline-indigo-500/30 focus:border-indigo-500/80 ${
                errors.newPassword
                  ? 'bg-red-50 border-red-400 focus:outline-red-500/30 focus:border-red-500'
                  : ''
              }`}
              placeholder="Masukkan password baru"
              aria-required="true"
              aria-invalid={errors.newPassword ? 'true' : 'false'}
              {...register('newPassword')}
            />
            <div
              className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
              aria-labelledby="newPassword"
              onClick={handleShowPassword}>
              {showPassword.newPassword ? 'hide' : 'show'}
            </div>
          </div>
          {errors.newPassword && (
            <p className="mt-1 -mb-1.5 text-red-500">
              {errors.newPassword.message}
            </p>
          )}
        </div>
        <div className="mb-3">
          <label
            htmlFor="confirmPassword"
            className="">
            Konfirmasi Password Baru
          </label>
          <div className="relative">
            <input
              type={showPassword.confirmPassword ? 'text' : 'password'}
              id="newPassword"
              className={`px-3 py-2.5 rounded-lg border bg-gray-50 border-gray-300 w-full focus:bg-white focus:outline focus:outline-4 focus:outline-offset-0 focus:outline-indigo-500/30 focus:border-indigo-500/80 ${
                errors.confirmPassword
                  ? 'bg-red-50 border-red-400 focus:outline-red-500/30 focus:border-red-500'
                  : ''
              }`}
              placeholder="Masukkan konfirmasi password baru"
              aria-required="true"
              aria-invalid={errors.confirmPassword ? 'true' : 'false'}
              {...register('confirmPassword')}
            />
            <div
              className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
              aria-labelledby="confirmPassword"
              onClick={handleShowPassword}>
              {showPassword.confirmPassword ? 'hide' : 'show'}
            </div>
          </div>
          {errors.confirmPassword && (
            <p className="mt-1 -mb-1.5 text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        <div className="">
          <button
            className="bg-indigo-500 text-white py-2 px-4 rounded-lg w-full"
            type="submit"
            disabled={isLoading}>
            {isLoading && (
              <svg
                className="animate-spin-fast -ml-1 mr-3 h-5 w-5 text-white inline-block"
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
            )}
            Simpan
          </button>
        </div>
      </form>
    </>
  );
}

export default ChangePassword;
