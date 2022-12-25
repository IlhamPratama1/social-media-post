import React, { useEffect, useState } from 'react';
import {
  MagnifyingGlassIcon,
  InformationCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';
import axiosInstance from '../../lib/axios';
import DetailModal from '../../components/detailModal';
import NonCard from '../../components/nonCard';

export default function DashboardHome() {
  const [postData, setPostData] = useState({ isLoading: true, data: [], pagination: {} });
  const [detailModal, setDetailModal] = useState({
    isOpen: false,
    data: null,
  });
  const [searchBy, setSearchBy] = useState({ page: 1, type: 'caption', data: '' });

  async function fetchPostData() {
    try {
      const res = await axiosInstance.get(
        `post?page=${searchBy.page}&searchBy=${searchBy.type}&search=${searchBy.data}`,
      );
      setPostData({
        isLoading: false,
        data: res.data.data,
        pagination: res.data.pagination,
      });
    } catch (err) {
      console.log(err);
    }
  }

  function handleSelect(e) {
    setSearchBy({ ...searchBy, type: e.target.value });
  }

  function OnSearchChange(e) {
    setSearchBy({ ...searchBy, data: e.target.value });
  }

  function ChangePage(page) {
    setSearchBy({ ...searchBy, page: page });
  }

  useEffect(() => {
    fetchPostData();
  }, [detailModal.isOpen, searchBy]);

  return (
    <div className='space-y-4 w-full h-full flex flex-col'>
      <div className='flex space-x-4'>
        <select
          value={searchBy.type}
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
            value={searchBy.data}
            onChange={(e) => OnSearchChange(e)}
          />
        </div>
      </div>

      {/*----- POSTS -----*/}
      {!postData.isLoading ? (
        postData.data.length <= 0 ? (
          <div className='grow h-full w-full flex items-center justify-center space-x-2'>
            <InformationCircleIcon className='w-12 h-12 text-red-500' />
            <p className='font-quick text-xl text-red-500'>No data available</p>
          </div>
        ) : (
          <div className='grow w-full grid gap-4 grid-cols-4 grid-rows-2'>
            {postData.data.map((data, index) => {
              return (
                <NonCard
                  key={index}
                  data={data}
                  detailModal={setDetailModal}
                  fetchPostData={fetchPostData}
                />
              );
            })}
          </div>
        )
      ) : (
        <div className='grow w-full grid gap-4 grid-cols-4 grid-rows-2'>
          <div className='bg-slate-100 rounded-xl drop-shadow-main animate-pulse'></div>
          <div className='bg-slate-100 rounded-xl drop-shadow-main animate-pulse'></div>
          <div className='bg-slate-100 rounded-xl drop-shadow-main animate-pulse'></div>
          <div className='bg-slate-100 rounded-xl drop-shadow-main animate-pulse'></div>
          <div className='bg-slate-100 rounded-xl drop-shadow-main animate-pulse'></div>
          <div className='bg-slate-100 rounded-xl drop-shadow-main animate-pulse'></div>
          <div className='bg-slate-100 rounded-xl drop-shadow-main animate-pulse'></div>
          <div className='bg-slate-100 rounded-xl drop-shadow-main animate-pulse'></div>
        </div>
      )}

      {/*----- PAGINATION -----*/}
      <div className='w-full flex justify-center space-x-3'>
        {!postData.isLoading && (
          <>
            {postData.pagination.hasPreviousPage && (
              <button
                onClick={() => ChangePage(searchBy.page - 1)}
                className='p-2 w-8 h-8 bg-slate-200 rounded-md text-purple-s font-quick text-xs font-bold'
              >
                <ChevronLeftIcon className='w-4 h-4 text-purple-m' />
              </button>
            )}
            {[...Array(postData.pagination.totalPage)].map((l, i) =>
              i + 1 == postData.pagination.page ? (
                <button
                  key={i}
                  onClick={() => ChangePage(i + 1)}
                  className='p-2 w-8 h-8 bg-purple-s rounded-md text-white font-quick text-xs font-bold'
                >
                  {i + 1}
                </button>
              ) : (
                <button
                  key={i}
                  onClick={() => ChangePage(i + 1)}
                  className='p-2 w-8 h-8 bg-slate-100 rounded-md text-purple-s font-quick text-xs font-bold'
                >
                  {i + 1}
                </button>
              ),
            )}
            {postData.pagination.hasNextPage && (
              <button
                onClick={() => ChangePage(searchBy.page + 1)}
                className='p-2 w-8 h-8 bg-slate-200 rounded-md text-purple-s font-quick text-xs font-bold'
              >
                <ChevronRightIcon className='w-4 h-4 text-purple-m' />
              </button>
            )}
          </>
        )}
      </div>

      {/*----- DETAIL POST MODAL -----*/}
      {detailModal.isOpen && <DetailModal detailModal={setDetailModal} data={detailModal.data} />}
    </div>
  );
}
