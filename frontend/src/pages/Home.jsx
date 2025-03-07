import React from 'react'
import SideBar from '../components/Home/SideBar'
import { Outlet } from 'react-router-dom'

const Home = () => {
  return (
    <div className='flex h-[98vh] gap-4'>
      <div className='w-1/6 border border-gray-500 rounded-xl p-4 flex flex-col justify-between'>
        <SideBar />
      </div>
      <div className='w-5/6 border border-gray-500 rounded-xl p-4 overflow-auto'>
        <Outlet />
      </div>
    </div>
  )
}

export default Home
