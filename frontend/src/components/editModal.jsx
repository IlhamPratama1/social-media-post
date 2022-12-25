import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import axiosInstance from '../lib/axios';
import { AppContext } from '../lib/context';

export default function EditModal({ editModal, data }) {
  const { openSnackbar } = useContext(AppContext);
  const [formData, setFormData] = useState({
    image: data.image,
    caption: data.caption,
    tags: data.tags,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  function FormOnChange(e, key) {
    setFormData({ ...formData, [key]: e.target.value });
  }

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
          setFormData({ ...formData, ['image']: res.data.data.url });
        })
        .catch((err) => {
          setError(err.response.data.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }

  async function FormOnSubmit(e) {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await axiosInstance.put(`post/${data.id}`, formData);
      if (res.status == 200) {
        openSnackbar({
          isOpen: true,
          isSuccess: true,
          message: res.data.message,
        });
        setError('');
        editModal({ isOpen: false, data: {} });
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
    <div className='absolute'>
      <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
        <div className='relative w-auto my-6 mx-auto max-w-3xl'>
          <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
            <div className='relative p-6 flex-auto space-y-4'>
              <div className='flex justify-between'>
                <h1 className='font-quick text-xl font-bold'>Edit Post</h1>
                <button
                  onClick={() => editModal({ isOpen: false, data: {} })}
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
                  type='file'
                  onChange={handleImage}
                />
                <img
                  crossOrigin='anonymous'
                  src={formData.image}
                  className='rounded-xl w-full h-[26rem] max-h-[26rem] object-cover object-top'
                />
                <div className='space-y-2'>
                  <div className='text-sm'>Caption</div>
                  <input
                    className='w-full px-3 py-2 focus:outline-0 text-slate-800 bg-gray-100 text-sm rounded-r-lg'
                    placeholder='Caption'
                    value={formData.caption}
                    onChange={(e) => FormOnChange(e, 'caption')}
                    type='text'
                    required
                  />
                </div>
                <div className='space-y-2'>
                  <div className='text-sm'>Tags</div>
                  <input
                    className='w-full px-3 py-2 focus:outline-0 text-slate-800 bg-gray-100 text-sm rounded-r-lg'
                    placeholder='Tags'
                    value={formData.tags}
                    onChange={(e) => FormOnChange(e, 'tags')}
                    type='text'
                    required
                  />
                </div>
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

EditModal.propTypes = {
  editModal: PropTypes.func,
  data: PropTypes.object,
};
