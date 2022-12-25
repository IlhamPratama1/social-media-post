import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import axiosInstance from '../lib/axios';
import { AppContext } from '../lib/context';

export default function ConfirmModal({ confirmModal, data }) {
  const { openSnackbar } = useContext(AppContext);

  async function FormOnSubmit(e) {
    e.preventDefault();
    try {
      const res = await axiosInstance.delete(`post/${data.id}`);
      if (res.status == 200) {
        openSnackbar({
          isOpen: true,
          isSuccess: true,
          message: res.data.message,
        });
        confirmModal({ isOpen: false, data: {} });
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
              <h1 className='font-quick text-xl font-bold'>Delete Post</h1>
              <p className='font-quick text-base'>Are you sure want to delete this data</p>
              <div className='flex justify-between space-x-4'>
                <button
                  onClick={() => confirmModal({ isOpen: false, data: {} })}
                  className='px-4 py-2 w-full font-quick text-sm bg-white-m text-red-600 border border-red-600 rounded-md font-semibold'
                >
                  no
                </button>
                <button
                  onClick={(e) => FormOnSubmit(e)}
                  className='px-4 py-2 w-full font-quick text-sm bg-red-600 text-white rounded-md font-semibold'
                >
                  yes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='cursor-pointer opacity-25 fixed inset-0 z-40 bg-black'></div>
    </div>
  );
}

ConfirmModal.propTypes = {
  confirmModal: PropTypes.func,
  data: PropTypes.object,
};
