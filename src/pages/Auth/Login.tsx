import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { CheckIcon, Eye, EyeOff, MoonIcon, SunIcon } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useLoginMutation } from '../../services/authApi';
import { setAuth } from '../../features/authSlice';
import { setAllowedToast } from '../../features/toastSlice';
import { selectTheme, toggleTheme } from '../../features/themeSlice';
import { showDefaultToast, showErrorToast } from '../../components/Toast';

import type { LoginRequest } from '../../types';

const schema = yup.object().shape({
  email: yup.string().required('Email harus diisi').email('Email tidak valid'),
  password: yup.string().required('Password harus diisi'),
});

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [login, { isLoading }] = useLoginMutation();
  const theme = useAppSelector(selectTheme);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm<LoginRequest>({
    mode: 'onTouched',
    resolver: yupResolver(schema),
  });

  const rememberVal = watch('remember', false);

  const onLogin: SubmitHandler<LoginRequest> = async (data) => {
    try {
      const result = await login(data).unwrap();
      const prevPath = location.state?.from || '/';
      dispatch(setAuth(result?.data));
      navigate(prevPath);
      dispatch(setAllowedToast());
      showDefaultToast('Login berhasil!');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.data.message) {
        showErrorToast(error.data.message);
      } else {
        showErrorToast('Login gagal!');
      }
    }
  };

  return (
    <main className="w-full min-h-screen p-3 bg-white relative dark:bg-gray-900">
      <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-4 min-h-screen">
        <div className="col-span-full lg:col-span-6">
          <div className="">
            <div className="mx-10 mt-10">
              <div>
                <img
                  src="https://res.cloudinary.com/sningratt/image/upload/v1709561256/assets/kognitif_game_logo.svg"
                  className="w-36"
                  alt="logo admin panel"
                />
              </div>
            </div>
            <div className="w-106 mx-auto mt-24 mb-40">
              <h3 className="font-bold text-8 mb-6 text-center">
                Masuk ke Dashboard
              </h3>
              <p className="text-gray-400 text-center mb-8">
                Masuk dengan akun yang telah terdaftar. Kelola siswa dan
                permainan dengan mudah.
              </p>
              <form onSubmit={handleSubmit(onLogin)}>
                <div className="mb-4">
                  <input
                    id="email"
                    type="email"
                    className={`p-4 rounded-xl border bg-gray-50 border-gray-300 w-full focus:bg-white focus:outline focus:outline-4 focus:outline-offset-0 focus:outline-indigo-500/30 focus:border-indigo-500/80 dark:bg-gray-700 dark:border-gray-700 dark:focus:outline-indigo-500/30 dark:focus:border-indigo-600 ${
                      errors.email
                        ? 'bg-red-50 border-red-400 focus:outline-red-500/30 focus:border-red-500 dark:border-gray-700 dark:focus:outline-red-500/30 dark:focus:border-red-500'
                        : ''
                    }`}
                    placeholder="Masukkan email Anda"
                    aria-required="true"
                    aria-invalid={errors.email ? 'true' : 'false'}
                    {...register('email')}
                  />
                  {errors.email && (
                    <p className="mt-1 -mb-1.5 text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="mb-6">
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      className={`p-4 rounded-xl border bg-gray-50 border-gray-300 w-full focus:bg-white focus:outline focus:outline-4 focus:outline-offset-0 focus:outline-indigo-500/30 focus:border-indigo-500/80 dark:bg-gray-700 dark:border-gray-700 dark:focus:outline-indigo-500/30 dark:focus:border-indigo-600 ${
                        errors.password
                          ? 'bg-red-50 border-red-400 focus:outline-red-500/30 focus:border-red-500 dark:border-gray-700 dark:focus:outline-red-500/30 dark:focus:border-red-500'
                          : ''
                      }`}
                      placeholder="Masukkan password Anda"
                      aria-required="true"
                      aria-invalid={errors.password ? 'true' : 'false'}
                      {...register('password')}
                    />
                    {showPassword ? (
                      <EyeOff
                        size={18}
                        className="absolute top-0 right-0 mt-4.5 mr-4 text-gray-400 cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    ) : (
                      <Eye
                        size={18}
                        className="absolute top-0 right-0 mt-4.5 mr-4 text-gray-400 cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    )}
                  </div>
                  {errors.password && (
                    <p className="mt-1 -mb-1.5 text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <div className="flex items-center justify-between mb-7">
                  <div className="flex">
                    <div className="relative">
                      <input
                        type="checkbox"
                        id="remember"
                        className="w-4.5 h-4.5 opacity-0 invisible -z-10"
                        {...register('remember')}
                      />
                      <div className="absolute left-0 top-px">
                        <div
                          className={`w-4.5 h-4.5 rounded-full flex items-center justify-center ${
                            rememberVal
                              ? 'bg-indigo-500'
                              : 'bg-gray-300 dark:bg-gray-600'
                          }`}
                          role="checkbox"
                          aria-checked="false"
                          title="Remember me"
                          onClick={() => setValue('remember', !rememberVal)}>
                          <CheckIcon
                            size={10}
                            strokeWidth={4}
                            className="text-white"
                          />
                        </div>
                      </div>
                    </div>
                    <label
                      htmlFor="remember"
                      className="ml-2.5 dark:text-gray-300">
                      Ingat saya
                    </label>
                  </div>
                </div>
                <button
                  title="Signin"
                  type="submit"
                  className="p-4 rounded-xl text-base w-full text-center bg-indigo-600 transition-all-200 text-white font-semibold hover:bg-indigo-700 flex items-center justify-center disabled:bg-indigo-300 disabled:text-white/70 disabled:cursor-not-allowed dark:bg-indigo-700 dark:hover:bg-indigo-600 dark:disabled:bg-gray-700 dark:disabled:text-gray-500"
                  disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin-fast -ml-1 mr-3 h-5 w-5 text-white inline-block dark:text-gray-300"
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
                      Checking...
                    </>
                  ) : (
                    'Masuk'
                  )}
                </button>
              </form>
            </div>
            <div className="flex items-center justify-between mx-10 mb-8">
              <Link
                to="/privacy"
                className="text-gray-400 hover:underline underline-offset-2">
                Privacy Policy
              </Link>
              <p className="text-gray-400">Copyright 2023</p>
            </div>
          </div>
        </div>
        <div className="lg:col-span-6 hidden lg:block">
          <div className="w-full h-full bg-gradient-to-br from-indigo-200 from-20% via-sky-200 via-40% to-emerald-200 to-90% rounded-2xl dark:from-indigo-500 dark:via-sky-500 dark:to-emerald-500" />
        </div>
      </div>
      {/* theme */}
      <div className="absolute top-10 right-10">
        <button
          className="bg-white w-12 h-12 bg-opacity-80 border border-gray-100 border-opacity-40 shadow-lg lg:shadow-2xl rounded-full flex items-center justify-center transition-all hover:bg-white/60 dark:bg-gray-950 dark:border-gray-800 dark:hover:bg-gray-950/80"
          onClick={() => dispatch(toggleTheme())}
          type="button"
          title="Theme Toggler">
          {theme === 'light' ? (
            <SunIcon />
          ) : (
            <MoonIcon className="stroke-gray-200" />
          )}
        </button>
      </div>
    </main>
  );
}

export default Login;
