import { HeartIcon } from '@heroicons/react/24/outline';
import React from 'react';
import PropTypes from 'prop-types';

export default function Card({ data, detailModal, editModal, confirmModal }) {
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
          className='rounded-xl w-full h-56 object-cover object-top'
        />
      </div>
      <div className='flex items-center justify-between'>
        <div className='flex space-x-2'>
          <HeartIcon className='text-slate-500 w-6 h-6' />
          <h1 className='text-base font-quick text-slate-500'>{data.likes}</h1>
        </div>
        <div className='flex space-x-1'>
          <button
            onClick={() => confirmModal(true)}
            className='px-3 py-1 font-quick text-xs bg-slate-100 text-purple-s rounded-md font-semibold'
          >
            Delete
          </button>
          <button
            onClick={() => editModal(true)}
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
      <h1 className='font-quick text-sm font-regular'>{data.caption.slice(0, 100)}...</h1>
      <h1 className='font-quick text-sm font-regular text-purple-m'>{data.tags}</h1>
    </div>
  );
}

Card.propTypes = {
  data: PropTypes.object,
  detailModal: PropTypes.func,
  editModal: PropTypes.func,
  confirmModal: PropTypes.func,
};
