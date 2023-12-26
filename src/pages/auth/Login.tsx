import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { appleIcon, googleIcon } from "../../assets/img";
import { CheckIcon, Eye, EyeOff } from "lucide-react";
import { showDefaultToast } from "../../utilities/toastUtils";

interface LoginFormProps {
  email: string;
  password: string;
  remember?: boolean;
}

const schema = yup.object().shape({
  email: yup.string().required("Email harus diisi").email("Email tidak valid"),
  password: yup.string().required("Password harus diisi"),
});

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm<LoginFormProps>({
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  const rememberVal = watch("remember", false);

  const onLogin: SubmitHandler<LoginFormProps> = async (data) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log(data);
    setIsLoading(false);
    showDefaultToast("Login success!");
  };

  return (
    <main className="w-full min-h-screen p-3 bg-white">
      <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-4 min-h-screen">
        <div className="col-span-full lg:col-span-6">
          <div className="">
            <div className="mx-10 mt-10">
              <Link to="/">
                <img
                  src="https://img.logoipsum.com/243.svg"
                  className="w-36"
                  alt="logo admin panel"
                />
              </Link>
            </div>
            <div className="w-[26.5rem] mx-auto mt-24 mb-40">
              <h3 className="font-bold text-8 mb-6 text-center">
                Masuk ke Gameon
              </h3>
              <p className="text-gray-400 text-center mb-8">
                Masuk dengan akun yang telah terdaftar. Kelola siswa dan
                permainan dengan mudah.
              </p>
              <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="col-span-2">
                  <button
                    className="flex items-center px-4 py-3 rounded-lg border border-gray-300 text-left w-full transition-all-200 hover:bg-indigo-50 hover:border-indigo-400 cursor-not-allowed"
                    title="with Google account"
                  >
                    <img src={googleIcon} alt="google logo" className="h-5" />
                    <p className="ml-2">Sign In with Google</p>
                  </button>
                </div>
                <div className="col-span-2">
                  <button
                    className="flex items-center px-4 py-3 rounded-lg border border-gray-300 text-left w-full transition-all-200 hover:bg-indigo-50 hover:border-indigo-400 cursor-not-allowed"
                    title="with Apple account"
                  >
                    <img src={appleIcon} alt="apple logo" className="h-5" />
                    <p className="ml-2">Sign In with Apple</p>
                  </button>
                </div>
              </div>
              <div className="text-center text-gray-400 relative mb-6">
                Atau dengan email
                <span className="absolute w-1/3 left-0 h-px bg-gray-200 top-1/2" />
                <span className="absolute w-1/3 right-0 h-px bg-gray-200 top-1/2" />
              </div>
              <form onSubmit={handleSubmit(onLogin)}>
                <div className="mb-4">
                  <input
                    id="email"
                    type="email"
                    className={`p-4 rounded-xl border bg-gray-50 border-gray-300 w-full focus:bg-white focus:outline focus:outline-4 focus:outline-offset-0 focus:outline-indigo-500/30 focus:border-indigo-500/80 ${
                      errors.email
                        ? "bg-red-50 border-red-400 focus:outline-red-500/30 focus:border-red-500"
                        : ""
                    }`}
                    placeholder="Masukkan email Anda"
                    aria-required="true"
                    aria-invalid={errors.email ? "true" : "false"}
                    {...register("email")}
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
                      type={showPassword ? "text" : "password"}
                      className={`p-4 rounded-xl border bg-gray-50 border-gray-300 w-full focus:bg-white focus:outline focus:outline-4 focus:outline-offset-0 focus:outline-indigo-500/30 focus:border-indigo-500/80 ${
                        errors.password
                          ? "bg-red-50 border-red-400 focus:outline-red-500/30 focus:border-red-500"
                          : ""
                      }`}
                      placeholder="Masukkan password Anda"
                      aria-required="true"
                      aria-invalid={errors.password ? "true" : "false"}
                      {...register("password")}
                    />
                    {showPassword ? (
                      <Eye
                        size={18}
                        className="absolute top-0 right-0 mt-4.5 mr-4 text-gray-400 cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    ) : (
                      <EyeOff
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
                        {...register("remember")}
                      />
                      <div className="absolute left-0 top-px">
                        <div
                          className={`w-4.5 h-4.5 rounded-full flex items-center justify-center ${
                            rememberVal ? "bg-indigo-500" : "bg-gray-300"
                          }`}
                          role="checkbox"
                          aria-checked="false"
                          title="Remember me"
                          onClick={() => setValue("remember", !rememberVal)}
                        >
                          <CheckIcon
                            size={10}
                            strokeWidth={4}
                            className="text-white"
                          />
                        </div>
                      </div>
                    </div>
                    <label htmlFor="remember" className="ml-2.5">
                      Ingat saya
                    </label>
                  </div>
                  <Link
                    to="/fogot-password"
                    className="text-sky-500 hover:text-indigo-500 hover:underline underline-offset-2"
                  >
                    Lupa Password?
                  </Link>
                </div>
                <button
                  title="Signin"
                  type="submit"
                  className="p-4 rounded-xl text-base w-full text-center bg-indigo-600 transition-all-200 text-white font-semibold hover:bg-indigo-700 flex items-center justify-center disabled:bg-indigo-300 disabled:text-white/70 disabled:cursor-not-allowed"
                  disabled={isLoading}
                >
                  {isLoading && (
                    <svg
                      className="animate-spin-fast -ml-1 mr-3 h-5 w-5 text-white inline-block"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  )}
                  Masuk
                </button>
              </form>
            </div>
            <div className="flex items-center justify-between mx-10 mb-8">
              <Link
                to="/privacy"
                className="text-gray-400 hover:underline underline-offset-2"
              >
                Privacy Policy
              </Link>
              <p className="text-gray-400">Copyright 2023</p>
            </div>
          </div>
        </div>
        <div className="lg:col-span-6 hidden lg:block">
          <div className="w-full h-full bg-gradient-to-br from-indigo-200 from-20% via-sky-200 via-40% to-emerald-200 to-90% rounded-2xl"></div>
        </div>
      </div>
    </main>
  );
}

export default Login;
