import { PhotoIcon } from '@heroicons/react/24/outline';
import React, { useContext, useEffect, useState } from 'react';
import axiosInstance from '../../lib/axios';
import { AppContext } from '../../lib/context';

export default function DashboardUser() {
  const { openSnackbar } = useContext(AppContext);
  const [isEditable, setIsEditable] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    username: '',
    email: '',
    photo: '',
  });

  function HandleIsEditable(e, value) {
    e.preventDefault();
    setIsEditable(value);
  }

  function FormOnChange(e, key) {
    setUserData({ ...userData, [key]: e.target.value });
  }

  function handleImage(e) {
    if (e.target.files[0]) {
      setIsLoading(true);
      let form = new FormData();
      form.append('file', e.target.files[0]);
      axiosInstance
        .post(`file`, form, {
          'Content-Type': 'multipart/form-data',
        })
        .then((res) => {
          setUserData({ ...userData, photo: res.data.data.url });
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
    try {
      setIsLoading(true);
      const res = await axiosInstance.put('user', userData);
      console.log(res.data);
      if (res.status == 200) {
        openSnackbar({
          isOpen: true,
          isSuccess: true,
          message: res.data.message,
        });
        setError('');
        setIsEditable(false);
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

  async function FetchUserData() {
    try {
      const res = await axiosInstance.get('user');
      const user = res.data.data;
      setUserData({
        name: user.name,
        email: user.email,
        username: user.username,
        photo: user.photo,
      });
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    FetchUserData();
  }, []);

  return (
    <div className='space-y-4 w-full bg-white-m font-quick p-8'>
      <div className='text-xl font-bold'>Detail User</div>
      <div className='flex space-x-8'>
        <div className='space-y-3'>
          {userData.photo !== '' ? (
            <img
              src={userData.photo}
              crossOrigin='anonymous'
              className='rounded-xl h-64 w-full object-cover object-top'
            />
          ) : (
            <div className='rounded-xl h-64 w-full bg-purple-t flex items-center justify-center'>
              <PhotoIcon className='m-auto text-purple-m w-12 h-12 opacity-80' />
            </div>
          )}
          <input
            className='px-3 py-2 block w-full text-sm text-gray-900 border border-purple-t rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400'
            id='file_input'
            type='file'
            onChange={handleImage}
            disabled={!isEditable}
          />
        </div>
        <form className='grow space-y-4'>
          <div className='space-y-2'>
            <div className='text-sm'>Name</div>
            <input
              className='w-full px-3 py-3 focus:outline-0 bg-slate-100 disabled:bg-slate-200 disabled:text-black text-purple-m text-sm rounded-lg'
              placeholder='Name'
              type='text'
              disabled={!isEditable}
              onChange={(e) => FormOnChange(e, 'name')}
              value={userData.name}
              required
            />
          </div>
          <div className='space-y-2'>
            <div className='text-sm'>Username</div>
            <input
              className='w-full px-3 py-3 focus:outline-0 bg-slate-100 disabled:bg-slate-200 disabled:text-black text-purple-m text-sm rounded-lg'
              placeholder='Username'
              type='text'
              disabled={!isEditable}
              onChange={(e) => FormOnChange(e, 'username')}
              value={userData.username}
              required
            />
          </div>
          <div className='space-y-2'>
            <div className='text-sm'>Email</div>
            <input
              className='w-full px-3 py-3 focus:outline-0 bg-slate-100 disabled:bg-slate-200 disabled:text-black text-purple-m text-sm rounded-lg'
              placeholder='Email'
              disabled={!isEditable}
              onChange={(e) => FormOnChange(e, 'email')}
              value={userData.email}
              type='text'
              required
            />
          </div>
          {error && <p className='font-quick text-red-300 text-base'>{error}</p>}
          {isEditable ? (
            <div className='w-full flex space-x-4'>
              <button
                onClick={(e) => HandleIsEditable(e, false)}
                className='w-20 px-4 py-3 w-full font-quick text-sm bg-white-m text-purple-m border border-purple-m rounded-lg font-semibold'
              >
                Cancel
              </button>
              <button
                onClick={(e) => {
                  FormOnSubmit(e);
                }}
                className='w-20 px-4 py-3 w-full font-quick text-sm bg-purple-s text-white rounded-lg font-semibold'
              >
                {isLoading ? 'Loading' : 'Submit'}
              </button>
            </div>
          ) : (
            <div className='w-full'>
              <button
                onClick={(e) => HandleIsEditable(e, true)}
                className='w-20 px-4 py-3 w-full font-quick text-sm bg-purple-s text-white rounded-lg font-semibold'
              >
                Edit
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
