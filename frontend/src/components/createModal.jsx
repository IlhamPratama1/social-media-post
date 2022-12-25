import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import axiosInstance from '../lib/axios';
import { AppContext } from '../lib/context';

export default function CreatePostModal({ setIsOpen }) {
  const { openSnackbar } = useContext(AppContext);
  const [postData, setPostData] = useState({
    image: '',
    caption: '',
    tags: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

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
          setPostData({ ...postData, ['image']: res.data.data.url });
        })
        .catch((err) => {
          setError(err.response.data.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }

  function FormOnChange(e, key) {
    setPostData({ ...postData, [key]: e.target.value });
  }

  async function FormOnSubmit(e) {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await axiosInstance.post('post', postData);
      if (res.status == 201) {
        openSnackbar({
          isOpen: true,
          isSuccess: true,
          message: res.data.message,
        });
        setError('');
        setIsOpen(false);
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

  return (
    <div className='fixed'>
      <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
        <div className='relative w-auto my-6 mx-auto max-w-3xl'>
          <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
            <div className='relative p-6 flex-auto space-y-4'>
              <div className='flex justify-between'>
                <h1 className='font-quick text-xl font-bold'>Create Post</h1>
                <button
                  onClick={() => setIsOpen(false)}
                  className='px-3 py-1 font-quick text-xs bg-red-600 text-white rounded-md font-semibold'
                >
                  Close
                </button>
              </div>
              <form className='space-y-4'>
                {error && <p className='font-quick text-red-300 text-base'>{error}</p>}
                <input
                  className='px-3 py-2 block w-full text-sm text-gray-900 border border-purple-t rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400'
                  id='file_input'
                  onChange={handleImage}
                  type='file'
                />
                {postData.image !== '' ? (
                  <img
                    src={postData.image}
                    className='rounded-xl w-[28rem] h-[28rem] max-h-[28rem] object-cover object-top'
                    crossOrigin='anonymous'
                  />
                ) : (
                  <div className='bg-slate-100 rounded-xl w-[28rem] h-[28rem] max-h-[28rem]'></div>
                )}
                <input
                  className='w-full px-3 py-2 focus:outline-0 bg-gray-100 text-slate-800 text-sm rounded-r-lg'
                  placeholder='Caption'
                  type='text'
                  onChange={(e) => FormOnChange(e, 'caption')}
                  required
                />
                <input
                  className='w-full px-3 py-2 focus:outline-0 bg-gray-100 text-slate-800 text-sm rounded-r-lg'
                  placeholder='Tags'
                  type='text'
                  onChange={(e) => FormOnChange(e, 'tags')}
                  required
                />
                <br />
                <button
                  disabled={isLoading}
                  onClick={(e) => FormOnSubmit(e)}
                  className='w-20 px-4 py-3 w-full font-quick text-sm bg-purple-s text-white rounded-lg font-semibold'
                >
                  {isLoading ? 'Loading' : 'Submit'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className='cursor-pointer opacity-25 fixed inset-0 z-40 bg-black'></div>
    </div>
  );
}

CreatePostModal.propTypes = {
  setIsOpen: PropTypes.func,
};
