import React from 'react';
import { Outlet } from 'react-router-dom';
import Snackbar from '../components/snackbar';

export default function Root() {
  return (
    <div className='bg-blue-s'>
      <Outlet />
      <Snackbar />
    </div>
  );
}
