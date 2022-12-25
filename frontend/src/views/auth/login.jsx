import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../lib/axios';
import { AppContext } from '../../lib/context';

export default function Login() {
  const { openSnackbar } = useContext(AppContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function FormOnChange(e, key) {
    setFormData({ ...formData, [key]: e.target.value });
  }

  async function FormOnSubmit(e) {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await axiosInstance.post('auth/login', formData);

      if (res.status == 200) {
        openSnackbar({
          isOpen: true,
          isSuccess: true,
          message: res.data.message,
        });
        localStorage.setItem('token', res.data.data.token);
        setError('');
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response.data.message);
      openSnackbar({
        isOpen: true,
        isSuccess: false,
        message: err.response.data.message,
      });
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <div className='bg-white-m px-20 py-14 rounded-xl drop-shadow-main'>
        <div className='space-y-8'>
          <div className='space-y-3 font-quick'>
            <div className='space-y-1'>
              <p className='opacity-60 font-light text-base'>Welcome to Social Media Post</p>
              <h1 className='font-bold text-3xl'>Sign In</h1>
            </div>
            <p className='text-base'>
              Don&apos;t have an account ?{' '}
              <span className='underline text-purple-m'>
                <Link to='/register'>Sign Up</Link>
              </span>
            </p>
          </div>
          <form className='space-y-4'>
            {error && <p className='-mt-4 font-quick text-red-300 text-base'>{error}</p>}
            <div>
              <input
                onChange={(e) => FormOnChange(e, 'username')}
                className='w-[28rem] border-[1.5px] rounded-md border-purple-t px-3 py-3 focus:outline-0 focus:border-purple-m text-sm'
                placeholder='Username'
                type='text'
                required
              />
            </div>
            <div>
              <input
                onChange={(e) => FormOnChange(e, 'password')}
                className='w-[28rem] border-[1.5px] rounded-md border-purple-t px-3 py-3 focus:outline-0 focus:border-purple-m text-sm'
                placeholder='Password'
                type='password'
                required
              />
            </div>
            <button
              onClick={(e) => FormOnSubmit(e)}
              className='w-full py-3 p-auto bg-purple-m text-white font-bold font-quick rounded-md text-base'
            >
              {isLoading ? 'Loading' : 'Submit'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
