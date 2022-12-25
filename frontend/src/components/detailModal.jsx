import React from 'react';
import PropTypes from 'prop-types';
import { HeartIcon } from '@heroicons/react/24/outline';

export default function DetailModal({ detailModal, data }) {
  return (
    <div className='absolute'>
      <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
        <div className='relative w-auto my-6 mx-auto max-w-3xl'>
          <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
            <div className='relative p-6 flex-auto space-y-4'>
              <img
                src={data.image}
                className='rounded-xl w-full h-[40rem] object-cover object-top'
                crossOrigin='anonymous'
              />
              <div className='flex space-x-2'>
                <HeartIcon className='text-slate-500 w-6 h-6' />
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
