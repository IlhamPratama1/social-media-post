import React, { useContext, useState } from 'react';
import axiosInstance from '../../lib/axios';
import { AppContext } from '../../lib/context';

export default function ChangePassword() {
  const { openSnackbar } = useContext(AppContext);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  function FormOnChange(e, key) {
    setFormData({ ...formData, [key]: e.target.value });
  }

  async function FormOnSubmit(e) {
    e.preventDefault();
    try {
      const res = await axiosInstance.put('user/change-password', formData);
      if (res.status == 200) {
        openSnackbar({
          isOpen: true,
          isSuccess: true,
          message: res.data.message,
        });
        setError('');
        setFormData({
          oldPassword: '',
          newPassword: '',
          confirmNewPassword: '',
        });
      }
    } catch (err) {
      setError(err.response.data.message);
      openSnackbar({
        isOpen: true,
        isSuccess: false,
        message: err.response.data.message,
      });
    }
  }

  return (
    <div className='space-y-4 w-full bg-white-m rounded-xl font-quick p-8'>
      <div className='text-xl font-bold'>Change Password</div>
      <form className='grow space-y-4'>
        <div className='space-y-2'>
          <div className='text-sm'>Old Password</div>
          <input
            value={formData.oldPassword}
            onChange={(e) => FormOnChange(e, 'oldPassword')}
            className='w-full px-3 py-3 focus:outline-0 bg-slate-100 disabled:bg-slate-200 disabled:text-white-m text-purple-m text-sm rounded-lg'
            placeholder='Old Password'
            type='password'
            required
          />
        </div>
        <div className='space-y-2'>
          <div className='text-sm'>New Password</div>
          <input
            value={formData.newPassword}
            onChange={(e) => FormOnChange(e, 'newPassword')}
            className='w-full px-3 py-3 focus:outline-0 bg-slate-100 disabled:bg-slate-200 disabled:text-white-m text-purple-m text-sm rounded-lg'
            placeholder='New Password'
            type='password'
            required
          />
        </div>
        <div className='space-y-2'>
          <div className='text-sm'>Confirm New Password</div>
          <input
            value={formData.confirmNewPassword}
            onChange={(e) => FormOnChange(e, 'confirmNewPassword')}
            className='w-full px-3 py-3 focus:outline-0 bg-slate-100 disabled:bg-slate-200 disabled:text-white-m text-purple-m text-sm rounded-lg'
            placeholder='Confirm New Password'
            type='password'
            required
          />
        </div>
        {error && <p className='font-quick text-red-300 text-base'>{error}</p>}
        <div className='w-full'>
          <button
            onClick={(e) => {
              FormOnSubmit(e);
            }}
            className='w-20 px-4 py-3 w-full font-quick text-sm bg-purple-s text-white rounded-lg font-semibold'
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
