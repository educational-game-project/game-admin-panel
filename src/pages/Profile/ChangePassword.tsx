import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, type SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { useChangePasswordMutation } from '../../services/authApi';
import { showErrorToast, showSuccessToast } from '../../components/Toast';
import HeaderProfile from './components/HeaderProfile';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

import type { ChangePasswordRequest } from '../../types';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
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
      navigate('/profile/account');
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
    <div className="bg-white rounded-xl dark:bg-gray-800">
      <HeaderProfile isProfilePage={false} />
      <div className="p-5">
        <div className="mb-2">
          <h3 className="mb-0.5 text-lg font-semibold">Ubah Password</h3>
          <p className="mb-4 text-gray-600 dark:text-gray-400">
            Ubah password akun Anda
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="py-4 border-y border-gray-200 dark:border-gray-700/80">
              <div className="grid grid-cols-12">
                <div className="col-span-4">
                  <label
                    htmlFor="oldPassword"
                    className="text-sm font-medium dark:text-gray-300">
                    Password Lama
                  </label>
                </div>
                <div className="col-span-8">
                  <div className="relative max-w-xl w-full">
                    <input
                      type={showPassword.oldPassword ? 'text' : 'password'}
                      id="oldPassword"
                      className={`pl-3 pr-10 py-2.5 rounded-lg border bg-gray-50 border-gray-300 w-full focus:bg-white focus:outline focus:outline-4 focus:outline-offset-0 focus:outline-indigo-500/30 focus:border-indigo-500/80 ${
                        errors.oldPassword
                          ? 'bg-red-50 border-red-400 focus:outline-red-500/30 focus:border-red-500 dark:border-gray-700 dark:focus:outline-red-500/30 dark:focus:border-red-500'
                          : ''
                      } dark:bg-gray-700 dark:border-gray-700 dark:text-gray-200 dark:disabled:text-gray-300 dark:focus:outline-indigo-500/30 dark:focus:border-indigo-600`}
                      placeholder="Masukkan password lama"
                      aria-required="true"
                      aria-invalid={errors.oldPassword ? 'true' : 'false'}
                      {...register('oldPassword')}
                    />
                    <div
                      className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                      aria-labelledby="oldPassword"
                      onClick={handleShowPassword}>
                      {showPassword.oldPassword ? (
                        <EyeOffIcon
                          size={18}
                          className="text-gray-400 cursor-pointer"
                        />
                      ) : (
                        <EyeIcon
                          size={18}
                          className="text-gray-400 cursor-pointer"
                        />
                      )}
                    </div>
                  </div>
                  {errors.oldPassword && (
                    <p className="mt-1 -mb-1.5 text-red-500">
                      {errors.oldPassword.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="py-4 border-b border-gray-200 dark:border-gray-700/80">
              <div className="grid grid-cols-12">
                <div className="col-span-4">
                  <label
                    htmlFor="newPassword"
                    className="text-sm font-medium dark:text-gray-300">
                    Password Baru
                  </label>
                </div>
                <div className="col-span-8">
                  <div className="relative max-w-xl w-full">
                    <input
                      type={showPassword.newPassword ? 'text' : 'password'}
                      id="newPassword"
                      className={`pl-3 pr-10 py-2.5 rounded-lg border bg-gray-50 border-gray-300 w-full focus:bg-white focus:outline focus:outline-4 focus:outline-offset-0 focus:outline-indigo-500/30 focus:border-indigo-500/80 ${
                        errors.newPassword
                          ? 'bg-red-50 border-red-400 focus:outline-red-500/30 focus:border-red-500 dark:border-gray-700 dark:focus:outline-red-500/30 dark:focus:border-red-500'
                          : ''
                      } dark:bg-gray-700 dark:border-gray-700 dark:text-gray-200 dark:disabled:text-gray-300 dark:focus:outline-indigo-500/30 dark:focus:border-indigo-600`}
                      placeholder="Masukkan password baru"
                      aria-required="true"
                      aria-invalid={errors.newPassword ? 'true' : 'false'}
                      {...register('newPassword')}
                    />
                    <div
                      className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                      aria-labelledby="newPassword"
                      onClick={handleShowPassword}>
                      {showPassword.newPassword ? (
                        <EyeOffIcon
                          size={18}
                          className="text-gray-400 cursor-pointer"
                        />
                      ) : (
                        <EyeIcon
                          size={18}
                          className="text-gray-400 cursor-pointer"
                        />
                      )}
                    </div>
                  </div>
                  {errors.newPassword && (
                    <p className="mt-1 -mb-1.5 text-red-500">
                      {errors.newPassword.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="py-4 border-b border-gray-200 dark:border-gray-700/80">
              <div className="grid grid-cols-12">
                <div className="col-span-4">
                  <label
                    htmlFor="confirmPassword"
                    className="text-sm font-medium dark:text-gray-300">
                    Konfirmasi Password Baru
                  </label>
                </div>
                <div className="col-span-8">
                  <div className="relative max-w-xl w-full">
                    <input
                      type={showPassword.confirmPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      className={`pl-3 pr-10 py-2.5 rounded-lg border bg-gray-50 border-gray-300 w-full focus:bg-white focus:outline focus:outline-4 focus:outline-offset-0 focus:outline-indigo-500/30 focus:border-indigo-500/80 ${
                        errors.confirmPassword
                          ? 'bg-red-50 border-red-400 focus:outline-red-500/30 focus:border-red-500 dark:border-gray-700 dark:focus:outline-red-500/30 dark:focus:border-red-500'
                          : ''
                      } dark:bg-gray-700 dark:border-gray-700 dark:text-gray-200 dark:disabled:text-gray-300 dark:focus:outline-indigo-500/30 dark:focus:border-indigo-600`}
                      placeholder="Masukkan konfirmasi password baru"
                      aria-required="true"
                      aria-invalid={errors.confirmPassword ? 'true' : 'false'}
                      {...register('confirmPassword')}
                    />
                    <div
                      className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                      aria-labelledby="confirmPassword"
                      onClick={handleShowPassword}>
                      {showPassword.confirmPassword ? (
                        <EyeOffIcon
                          size={18}
                          className="text-gray-400 cursor-pointer"
                        />
                      ) : (
                        <EyeIcon
                          size={18}
                          className="text-gray-400 cursor-pointer"
                        />
                      )}
                    </div>
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-1 -mb-1.5 text-red-500">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                className="leading-normal inline-flex items-center justify-center rounded-md border border-transparent bg-violet-600 px-3.5 py-2 text-sm font-medium text-gray-100 hover:bg-violet-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-violet-500 disabled:focus-visible:ring-2 disabled:focus-visible:ring-violet-500 disabled:focus-visible:ring-offset-2 transition-all dark:bg-violet-700 dark:hover:bg-violet-600"
                type="submit"
                disabled={isLoading}>
                {isLoading && (
                  <svg
                    className="animate-spin-fast -ml-1 mr-2 h-4.5 w-4.5 text-white inline-block"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                )}
                Perbarui Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
