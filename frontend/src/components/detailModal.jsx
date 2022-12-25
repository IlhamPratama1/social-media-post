import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { HeartIcon } from '@heroicons/react/24/solid';
import { AppContext } from '../lib/context';
import axiosInstance from '../lib/axios';

export default function DetailModal({ detailModal, data }) {
  const { openSnackbar } = useContext(AppContext);
  const [isLiked, setIsLiked] = useState(data.userLiked.length > 0);

  async function LikePost() {
    try {
      const url = isLiked ? `post/unlike/${data.id}` : `post/like/${data.id}`;
      const res = await axiosInstance.put(url);
      if (res.status == 200) {
        openSnackbar({
          isOpen: true,
          isSuccess: true,
          message: res.data.message,
        });
        setIsLiked(!isLiked);
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
    <div className='absolute'>
      <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
        <div className='relative w-auto my-6 mx-auto max-w-3xl'>
          <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
            <div className='relative p-6 flex-auto space-y-4'>
              <img
                src={data.image}
                className='rounded-xl w-full h-[32rem] max-h-[32rem] object-cover object-top'
                crossOrigin='anonymous'
              />
              <div className='flex space-x-2'>
                <button onClick={() => LikePost()}>
                  {isLiked == true ? (
                    <HeartIcon className='text-red-500 w-6 h-6' />
                  ) : (
                    <HeartIcon className='text-slate-500 w-6 h-6' />
                  )}
                </button>
                <h1 className='text-base font-quick text-slate-500'>{data.likes}</h1>
              </div>
              <div className='flex items-center space-x-2'>
                {data.user.photo === '' ? (
                  <div className='w-7 h-7 rounded-full bg-purple-m'></div>
                ) : (
                  <img
                    src={data.user.photo}
                    crossOrigin='anonymous'
                    className='w-7 h-7 rounded-full object-cover object-top'
                  />
                )}
                <h1 className='font-quick text-base font-semibold'>{data.user.username}</h1>
              </div>
              <h1 className='font-quick text-sm font-regular'>{data.caption}</h1>
              <h1 className='font-quick text-sm font-regular text-purple-m'>{data.tags}</h1>
              <button
                onClick={() => detailModal({ isOpen: false, data: null })}
                className='px-3 py-1 font-quick text-xs bg-red-600 text-white rounded-md font-semibold'
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='cursor-pointer opacity-25 fixed inset-0 z-40 bg-black'></div>
    </div>
  );
}

DetailModal.propTypes = {
  detailModal: PropTypes.func,
  data: PropTypes.object,
};
