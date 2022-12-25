import { HeartIcon } from '@heroicons/react/24/solid';
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import axiosInstance from '../lib/axios';
import { AppContext } from '../lib/context';

export default function Card({ data, detailModal, editModal, confirmModal, fetchPostData }) {
  const { openSnackbar } = useContext(AppContext);
  const isLiked = data.userLiked.length > 0;

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
        fetchPostData();
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
    <div className='bg-white-m rounded-xl p-4 space-y-2 drop-shadow-main'>
      <div
        className='cursor-pointer'
        onClick={() =>
          detailModal({
            isOpen: true,
            data: data,
          })
        }
      >
        <img
          src={data.image}
          crossOrigin='anonymous'
          className='rounded-xl w-full h-56 max-h-56 object-cover object-top'
        />
      </div>
      <div className='flex items-center justify-between'>
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
        <div className='flex space-x-1'>
          <button
            onClick={() => confirmModal({ isOpen: true, data: data })}
            className='px-3 py-1 font-quick text-xs bg-slate-100 text-purple-s rounded-md font-semibold'
          >
            Delete
          </button>
          <button
            onClick={() =>
              editModal({
                isOpen: true,
                data: data,
              })
            }
            className='px-3 py-1 font-quick text-xs bg-purple-s text-white rounded-md font-semibold'
          >
            Edit
          </button>
        </div>
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
      <h1 className='font-quick text-sm font-regular'>
        {data.length > 100 ? `${data.caption.slice(0, 100)}...` : data.caption}
      </h1>
      <h1 className='font-quick text-sm font-regular text-purple-m'>{data.tags}</h1>
    </div>
  );
}

Card.propTypes = {
  data: PropTypes.object,
  detailModal: PropTypes.func,
  editModal: PropTypes.func,
  confirmModal: PropTypes.func,
  fetchPostData: PropTypes.func,
};
