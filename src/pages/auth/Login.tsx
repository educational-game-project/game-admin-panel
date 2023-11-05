import { useState } from 'react';
import { Link } from 'react-router-dom';
import { appleIcon, googleIcon } from '../../assets/img';
import { CheckIcon, Eye, EyeOff } from 'lucide-react';
import regex from '../../utilities/regex';

type LoginFieldsProps = {
  email: string;
  password: string;
  remember: boolean;
};
type validationLoginFieldsProps = {
  email: {
    status: boolean;
    message: string;
  };
  password: {
    status: boolean;
    message: string;
  };
};

const { email: EMAIL_REGEX } = regex;

function Login() {
  const [loginFields, setLoginFields] = useState<LoginFieldsProps>({
    email: '',
    password: '',
    remember: false,
  });
  const [validationLoginFields, setValidationLoginFields] =
    useState<validationLoginFieldsProps>({
      email: {
        status: true,
        message: '',
      },
      password: {
        status: true,
        message: '',
      },
    });
  const [showPassword, setShowPassword] = useState(false);

  const updateField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginFields({ ...loginFields, [name]: value });
  };

  const validateFiled = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { name } = e.currentTarget;
    const { value } = e.currentTarget;
    switch (name) {
      case 'email':
        setValidationLoginFields({
          ...validationLoginFields,
          email: {
            status: value.length > 0 && EMAIL_REGEX.test(value),
            message:
              value.length === 0
                ? 'Missing email.'
                : EMAIL_REGEX.test(value)
                ? ''
                : 'Invalid email.',
          },
        });
        break;
      case 'password':
        setValidationLoginFields({
          ...validationLoginFields,
          password: {
            status: value.length > 0,
            message: value.length > 0 ? '' : 'Missing password.',
          },
        });
        break;
      default:
        break;
    }
  };

  const updateRemember = () => {
    setLoginFields({
      ...loginFields,
      remember: !loginFields.remember,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(loginFields);
  };

  return (
    <div className="w-full min-h-screen p-3 bg-white">
      <div className="grid grid-cols-12 gap-4 min-h-screen">
        <div className="col-span-6">
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
                Sign in to Gameon
              </h3>
              <p className="text-gray-400 text-center mb-8">
                Send, receive and organize your scores, analysis and
                preferences.
              </p>
              <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="col-span-2">
                  <button
                    className="flex items-center px-4 py-3 rounded-lg border border-gray-300 text-left w-full transition-all-200 hover:bg-indigo-50 hover:border-indigo-400 cursor-not-allowed"
                    title="with Google account">
                    <img
                      src={googleIcon}
                      alt="google logo"
                      className="h-5"
                    />
                    <p className="ml-2">Sign In with Google</p>
                  </button>
                </div>
                <div className="col-span-2">
                  <button
                    className="flex items-center px-4 py-3 rounded-lg border border-gray-300 text-left w-full transition-all-200 hover:bg-indigo-50 hover:border-indigo-400 cursor-not-allowed"
                    title="with Apple account">
                    <img
                      src={appleIcon}
                      alt="apple logo"
                      className="h-5"
                    />
                    <p className="ml-2">Sign In with Apple</p>
                  </button>
                </div>
              </div>
              <div className="text-center text-gray-400 relative mb-6">
                Or with email
                <span className="absolute w-1/3 left-0 h-px bg-gray-200 top-1/2" />
                <span className="absolute w-1/3 right-0 h-px bg-gray-200 top-1/2" />
              </div>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className={`p-4 rounded-xl border bg-gray-50 border-gray-300 w-full focus:bg-white focus:outline focus:outline-3 focus:outline-offset-0 focus:outline-indigo-500/30 focus:border-indigo-500/80 ${
                      !validationLoginFields.email.status
                        ? 'bg-red-50 border-red-400 focus:outline-red-500/30 focus:border-red-500'
                        : ''
                    }`}
                    placeholder="Enter your email"
                    value={loginFields.email}
                    required
                    onChange={updateField}
                    onKeyUp={validateFiled}
                  />
                  {!validationLoginFields.email.status && (
                    <p className="mt-1.5 text-red-500">
                      {validationLoginFields.email.message}
                    </p>
                  )}
                </div>
                <div className="mb-6">
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      className={`p-4 rounded-xl border bg-gray-50 border-gray-300 w-full focus:bg-white focus:outline focus:outline-3 focus:outline-offset-0 focus:outline-indigo-500/30 focus:border-indigo-500/80 ${
                        !validationLoginFields.password.status
                          ? 'bg-red-50 border-red-400 focus:outline-red-500/30 focus:border-red-500'
                          : ''
                      }`}
                      placeholder="Enter your password"
                      required
                      onChange={updateField}
                      onKeyUp={validateFiled}
                    />
                    {showPassword ? (
                      <Eye
                        size={18}
                        className="absolute top-0 right-0 mt-4 mr-4 text-gray-400 cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    ) : (
                      <EyeOff
                        size={18}
                        className="absolute top-0 right-0 mt-4 mr-4 text-gray-400 cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    )}
                  </div>
                  {!validationLoginFields.password.status && (
                    <p className="mt-1.5 text-red-500">
                      {validationLoginFields.password.message}
                    </p>
                  )}
                </div>
                <div className="flex items-center justify-between mb-7">
                  <div className="flex">
                    <div className="relative">
                      <input
                        type="checkbox"
                        name="remember"
                        id="remember"
                        className="w-4.5 h-4.5 opacity-0 invisible -z-10"
                        onChange={() => {
                          updateRemember;
                        }}
                      />
                      <div className="absolute left-0 top-px">
                        <div
                          className={`w-4.5 h-4.5 rounded-full flex items-center justify-center ${
                            loginFields.remember
                              ? 'bg-indigo-500'
                              : 'bg-gray-300'
                          }`}
                          role="checkbox"
                          aria-checked="false"
                          title="Remember me"
                          onClick={updateRemember}>
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
                      className="ml-2.5"
                      onClick={updateRemember}>
                      Remember me
                    </label>
                  </div>
                  <Link
                    to="/fogot-password"
                    className="text-sky-500 hover:text-indigo-500 hover:underline underline-offset-2">
                    Forgot Password?
                  </Link>
                </div>
                <button
                  title="Signin"
                  type="submit"
                  className="p-4 rounded-xl text-base w-full text-center bg-indigo-600 transition-all-200 text-white font-semibold hover:bg-indigo-700">
                  Sign In
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
        <div className="col-span-6">
          <div className="w-full h-full bg-gradient-to-br from-indigo-200 from-20% via-sky-200 via-40% to-emerald-200 to-90% rounded-2xl"></div>
        </div>
      </div>
    </div>
  );
}

export default Login;
