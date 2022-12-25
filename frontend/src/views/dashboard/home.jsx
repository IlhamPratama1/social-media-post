import React, { useEffect, useState } from 'react';
import { MagnifyingGlassIcon, PlusIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import axiosInstance from '../../lib/axios';
import CreatePostModal from '../../components/createModal';
import Card from '../../components/card';
import DetailModal from '../../components/detailModal';

export default function DashboardHome() {
  const [postData, setPostData] = useState({ isLoading: true, data: [] });
  const [detailModal, setDetailModal] = useState({
    isOpen: false,
    data: null,
  });
  const [editModal, setEditModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [searchBy, setSearchBy] = useState('caption');

  async function fetchPostData() {
    try {
      const res = await axiosInstance.get('post');
      setPostData({
        isLoading: false,
        data: res.data.data,
      });
    } catch (err) {
      console.log(err);
    }
  }

  function handleSelect(e) {
    setSearchBy(e.target.value);
  }

  useEffect(() => {
    fetchPostData();
  }, [createModal]);

  return (
    <div className='space-y-4 w-full h-full flex flex-col'>
      <div className='flex space-x-4'>
        <select
          value={searchBy}
          onChange={(e) => handleSelect(e)}
          className='px-3 py-2 focus:outline-0 bg-gray-100 text-purple-m text-sm rounded-lg font-quick'
        >
          <option value='caption'>Caption</option>
          <option value='tags'>Tags</option>
        </select>
        <div className='flex'>
          <button className='rounded-l-lg py-3 px-4 bg-gray-100'>
            <MagnifyingGlassIcon className='text-purple-m w-5 h-5' />
          </button>
          <input
            className='w-[28rem] px-3 py-2 focus:outline-0 bg-gray-100 text-purple-m text-sm rounded-r-lg font-quick'
            placeholder='Search here...'
            type='text'
            required
          />
        </div>
      </div>

      {postData.data.length <= 0 ? (
        <div className='grow h-full w-full flex items-center justify-center space-x-2'>
          <InformationCircleIcon className='w-12 h-12 text-red-500' />
          <p className='font-quick text-xl text-red-500'>No data available</p>
        </div>
      ) : (
        <div className='grow w-full grid gap-4 grid-cols-4 grid-rows-2'>
          {postData.data.map((data, index) => {
            return (
              <Card
                key={index}
                data={data}
                detailModal={setDetailModal}
                editModal={setEditModal}
                confirmModal={setConfirmModal}
              />
            );
          })}
        </div>
      )}

      {/*----- PAGINATION -----*/}
      <div className='w-full flex justify-center space-x-3'>
        <button className='p-2 w-8 h-8 bg-purple-s rounded-md text-white font-quick text-xs font-bold'>
          1
        </button>
        <button className='p-2 w-8 h-8 bg-slate-100 rounded-md text-purple-s font-quick text-xs font-bold'>
          2
        </button>
        <button className='p-2 w-8 h-8 bg-slate-100 rounded-md text-purple-s font-quick text-xs font-bold'>
          3
        </button>
        <button className='p-2 w-8 h-8 bg-slate-100 rounded-md text-purple-s font-quick text-xs font-bold'>
          4
        </button>
      </div>

      {/*----- DETAIL POST MODAL -----*/}
      {detailModal.isOpen && <DetailModal detailModal={setDetailModal} data={detailModal.data} />}

      {/*----- EDIT POST MODAL -----*/}
      {editModal ? (
        <div className='absolute'>
          <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
            <div className='relative w-auto my-6 mx-auto max-w-3xl'>
              <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                <div className='relative p-6 flex-auto space-y-4'>
                  <h1 className='font-quick text-xl font-bold'>Edit Post</h1>
                  <input
                    className='px-3 py-2 block w-full text-sm text-gray-900 border border-purple-t rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400'
                    id='file_input'
                    type='file'
                  />
                  <img
                    src='/images/km1.jpg'
                    className='rounded-xl w-full h-[32rem] object-cover object-top'
                  />
                  <input
                    className='w-full px-3 py-2 focus:outline-0 bg-gray-100 text-purple-m text-sm rounded-r-lg'
                    placeholder='Caption'
                    type='text'
                    required
                  />
                  <input
                    className='w-full px-3 py-2 focus:outline-0 bg-gray-100 text-purple-m text-sm rounded-r-lg'
                    placeholder='Tags'
                    type='text'
                    required
                  />
                  <br />
                  <button
                    onClick={() => setEditModal(false)}
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
      ) : null}

      {/*----- CREATE POST MODAL -----*/}
      {createModal && <CreatePostModal setIsOpen={setCreateModal} />}

      {/*----- DELETE POST MODAL -----*/}
      {confirmModal ? (
        <div className='absolute'>
          <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
            <div className='relative w-auto my-6 mx-auto max-w-3xl'>
              <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                <div className='relative p-6 flex-auto space-y-4'>
                  <h1 className='font-quick text-xl font-bold'>Delete Post</h1>
                  <p className='font-quick text-base'>Are you sure want to delete this data</p>
                  <div className='flex justify-between space-x-4'>
                    <button
                      onClick={() => setConfirmModal(false)}
                      className='px-4 py-2 w-full font-quick text-sm bg-white-m text-red-600 border border-red-600 rounded-md font-semibold'
                    >
                      no
                    </button>
                    <button
                      onClick={() => setConfirmModal(false)}
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
      ) : null}

      <button
        onClick={() => setCreateModal(true)}
        className='fixed z-90 bottom-10 right-8 bg-gradient-to-r from-purple-m to-purple-s w-20 h-20 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl hover:drop-shadow-2xl'
      >
        <PlusIcon className='text-white-m w-8 h-8' />
      </button>
    </div>
  );
}
