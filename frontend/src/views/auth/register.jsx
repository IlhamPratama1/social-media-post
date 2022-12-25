import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PhotoIcon } from '@heroicons/react/24/outline';
import axiosInstance from '../../lib/axios';
import { AppContext } from '../../lib/context';

export default function Register() {
  const { openSnackbar } = useContext(AppContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    photo: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  function FormOnChange(e, key) {
    setFormData({ ...formData, [key]: e.target.value });
  }

  function handleImage(e) {
    if (e.target.files[0]) {
      setIsLoading(true);
      let form = new FormData();
      form.append('file', e.target.files[0]);
      axiosInstance
        .post(`file/register`, form, {
          'Content-Type': 'multipart/form-data',
        })
        .then((res) => {
          setFormData({ ...formData, ['photo']: res.data.data.url });
        })
        .catch((err) => {
          setError(err.response.data.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }

  async function FormOnSubmit(e) {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Password not match');
      return;
    }
    try {
      setIsLoading(true);
      // eslint-disable-next-line no-unused-vars
      const { confirmPassword, ...postData } = formData;
      const res = await axiosInstance.post('auth/register', postData);

      if (res.status == 201) {
        openSnackbar({
          isOpen: true,
          isSuccess: true,
          message: res.data.message,
        });
        setError('');
        navigate('/');
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
              <h1 className='font-bold text-3xl'>Create an account</h1>
            </div>
            <p className='text-base'>
              Already have an account ?{' '}
              <span className='underline text-purple-m'>
                <Link to='/'>Sign In</Link>
              </span>
            </p>
          </div>
          <form className='space-y-4'>
            {error && <p className='-mt-3 font-quick text-red-300 text-base'>{error}</p>}
            <div>
              <input
                onChange={(e) => FormOnChange(e, 'name')}
                className='w-[28rem] border-[1.5px] rounded-md border-purple-t px-3 py-3 focus:outline-0 focus:border-purple-m text-sm'
                placeholder='Name'
                type='text'
                required
              />
            </div>
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
                onChange={(e) => FormOnChange(e, 'email')}
                className='w-[28rem] border-[1.5px] rounded-md border-purple-t px-3 py-3 focus:outline-0 focus:border-purple-m text-sm'
                placeholder='Email'
                type='email'
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
            <div>
              <input
                onChange={(e) => FormOnChange(e, 'confirmPassword')}
                className='w-[28rem] border-[1.5px] rounded-md border-purple-t px-3 py-3 focus:outline-0 focus:border-purple-m text-sm'
                placeholder='Confirm Password'
                type='password'
                required
              />
            </div>
            <div>
              <input
                className='px-3 py-3 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400'
                id='file_input'
                type='file'
                onChange={handleImage}
              />
            </div>
            <div className='w-32 h-32 border-2 border-purple-s flex items-center justify-center'>
              {formData.photo !== undefined && formData.photo !== '' ? (
                <img
                  src={formData.photo}
                  className='w-full h-full object-cover'
                  crossOrigin='anonymous'
                />
              ) : (
                <PhotoIcon className='m-auto text-purple-m w-12 h-12 opacity-80' />
              )}
            </div>
            <button
              onClick={(e) => FormOnSubmit(e)}
              className='w-full py-3 p-auto bg-purple-m text-white font-bold font-quick rounded-lg text-base'
            >
              {isLoading ? 'Loading' : 'Submit'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
