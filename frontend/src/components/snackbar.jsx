import React, { useContext, useEffect } from 'react';
import { AppContext } from '../lib/context';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

export default function Snackbar() {
  const timeout = 3000;
  const { snackbar, closeSnackbar } = useContext(AppContext);

  useEffect(() => {
    let timer = 0;
    if (snackbar.isOpen) {
      timer = window.setTimeout(() => {
        closeSnackbar();
      }, timeout);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [snackbar.isOpen, timeout]);

  return (
    snackbar.isOpen && (
      <div className='fixed z-90 top-4 right-8 bg-white-m w-[28rem] rounded-xl drop-shadow-snack flex transition-all duration-300 space-x-4 px-4 py-4 font-quick'>
        {snackbar.isSuccess ? (
          <CheckCircleIcon className='w-12 h-12 text-green-500' />
        ) : (
          <XCircleIcon className='w-12 h-12 text-red-500' />
        )}

        <div className='space-y-1'>
          {snackbar.isSuccess ? (
            <h1 className='text-base font-semibold text-green-500'>Success</h1>
          ) : (
            <h1 className='text-base font-semibold text-red-500'>Error</h1>
          )}

          <p className='text-sm'>{snackbar.message}</p>
        </div>
      </div>
    )
  );
}
