import React, { useContext } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { HandRaisedIcon } from '@heroicons/react/24/outline';
import {
  HomeIcon,
  UserIcon,
  PowerIcon,
  LockClosedIcon,
  NewspaperIcon,
} from '@heroicons/react/24/solid';
import { Link, useLocation } from 'react-router-dom';
import Snackbar from '../../components/snackbar';
import axiosInstance from '../../lib/axios';
import { AppContext } from '../../lib/context';

export default function DashboardRoot() {
  const { openSnackbar } = useContext(AppContext);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const homeRoute = '/dashboard';
  const userRoute = '/dashboard/user';
  const passRoute = '/dashboard/change-password';
  const postRoute = '/dashboard/posts';

  const btnMainStyle =
    'px-3 py-2 w-[15rem] bg-gradient-to-r from-purple-m to-purple-s flex items-center space-x-4 rounded-md drop-shadow-purple';
  const btnSecStyle =
    'group px-3 py-2 w-[15rem] bg-white-m hover:bg-slate-100 flex items-center space-x-4 rounded-md';

  async function Logout(e) {
    e.preventDefault();
    try {
      const res = await axiosInstance.post('auth/logout');

      if (res.status == 200) {
        openSnackbar({
          isOpen: true,
          isSuccess: true,
          message: res.data.message,
        });
        localStorage.removeItem('token');
        navigate('/');
      }
    } catch (err) {
      openSnackbar({
        isOpen: true,
        isSuccess: false,
        message: err.response.data.message,
      });
    }
  }

  return (
    <div className='bg-blue-s w-full h-screen flex'>
      <div id='sidebar' className='h-full bg-white flex flex-col py-8 px-8 '>
        <div className='grow space-y-10'>
          <div className='space-y-4'>
            <div className='flex items-center space-x-3'>
              <div className='p-2 bg-purple-m rounded-lg'>
                <HandRaisedIcon className='w-5 h-5 text-white-m' />
              </div>
              <h1 className='font-quick font-semibold text-xl'>Social Media</h1>
            </div>
          </div>
          <div className='space-y-2 font-quick'>
            {pathname === homeRoute ? (
              <Link to={homeRoute} className={btnMainStyle}>
                <HomeIcon className='w-5 h-5 text-purple-m text-white-m' />
                <h1 className='font-semibold text-white-m'>Home</h1>
              </Link>
            ) : (
              <Link to={homeRoute} className={btnSecStyle}>
                <HomeIcon className='w-5 h-5 text-slate-600 group-hover:text-purple-m' />
                <h1 className='font-medium text-slate-700 group-hover:text-purple-m'>Home</h1>
              </Link>
            )}
            {pathname === userRoute ? (
              <Link to={userRoute} className={btnMainStyle}>
                <UserIcon className='w-5 h-5 text-purple-m text-white-m' />
                <h1 className='font-semibold text-white-m'>User</h1>
              </Link>
            ) : (
              <Link to={userRoute} className={btnSecStyle}>
                <UserIcon className='w-5 h-5 group-hover:text-purple-m' />
                <h1 className='font-medium group-hover:text-purple-m'>User</h1>
              </Link>
            )}
            {pathname === passRoute ? (
              <Link to={passRoute} className={btnMainStyle}>
                <LockClosedIcon className='w-5 h-5 text-purple-m text-white-m' />
                <h1 className='font-semibold text-white-m'>Change Password</h1>
              </Link>
            ) : (
              <Link to={passRoute} className={btnSecStyle}>
                <LockClosedIcon className='w-5 h-5 group-hover:text-purple-m' />
                <h1 className='font-medium group-hover:text-purple-m'>Change Password</h1>
              </Link>
            )}
            {pathname === postRoute ? (
              <Link to={postRoute} className={btnMainStyle}>
                <NewspaperIcon className='w-5 h-5 text-purple-m text-white-m' />
                <h1 className='font-semibold text-white-m'>Posts</h1>
              </Link>
            ) : (
              <Link to={postRoute} className={btnSecStyle}>
                <NewspaperIcon className='w-5 h-5 group-hover:text-purple-m' />
                <h1 className='font-medium group-hover:text-purple-m'>Posts</h1>
              </Link>
            )}
          </div>
        </div>
        <button
          onClick={(e) => Logout(e)}
          className='py-2 w-[15rem] bg-slate-100 flex items-center rounded-md justify-center space-x-3'
        >
          <PowerIcon className='w-5 h-5 text-purple-m' />
          <h1 className='font-bold text-purple-m font-quick'>Logout</h1>
        </button>
      </div>
      <div id='detail' className='py-8 px-8 h-full w-full'>
        <Outlet />
      </div>
      <Snackbar />
    </div>
  );
}
