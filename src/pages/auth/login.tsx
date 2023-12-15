import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useForm } from 'react-hook-form';
import { LoginAuth } from '@/interface/auth';
import { yupResolver } from '@hookform/resolvers/yup';
import { authService } from '@/service/auth';
import { useAuth } from '@/hook/useAuth';
import { Button } from '@mui/material';

const Login = () => {
  const router = useRouter();
  const { loginEmail } = useAuth();
  const queryClient = useQueryClient();
  const [forgotPassword, setForgotPassword] = useState<boolean>(false);

  const handleForgot = () => {
    setForgotPassword(!forgotPassword);
  };

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(LoginAuth),
    mode: 'onBlur',
    shouldFocusError: true,
  });

  const onSubmit = (data: any) => {
    loginEmail(data);
    console.log(data)
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="relative w-1/2 bg-cover" style={{ backgroundImage: 'url("https://www.bee.id/wp-content/uploads/2022/05/jenis-jenis-mesin-kasir-supermarket.jpg")' }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
          <h1 className="text-4xl font-bold mb-2 font-[titan]">Sistem Pos</h1>
          <h3 className="text-lg mx-5 text-justify">Tata kelola inventaris, pemrosesan transaksi, dan manajemen pelanggan yang efisien adalah inti dari sistem POS kami, memastikan pengalaman berbelanja yang mulus dan memuaskan bagi pelanggan kami di setiap transaksi.</h3>
        </div>
      </div>
      <div className="w-1/2 flex items-center justify-center p-10">
        <div className="p-8 rounded w-96">
          <h2 className="text-2xl font-semibold text-center mb-4">Sign In</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2 pt-2">Email:</label>
              <input
                type="text"
                {...register('email')}
                placeholder="Enter your email"
                className={`border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${errors.email ? 'border-red-500' : ''}`}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2 pt-2">Password:</label>
              <input
                type="password"
                {...register('password')}
                placeholder="Enter your password"
                className={`border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${errors.password ? 'border-red-500' : ''}`}
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>
            <div className="flex justify-center pt-3">
              <button
                type="submit"
                className="bg-blue-900 hover:bg-blue-700 text-white text-lg font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline mx-auto"
              >
                Login
              </button>
              <Button
              variant='outlined'
              href='/dashboard'
              color='success'
              >
                Auto Login
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
