import React, { useEffect, useState } from 'react';
import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiUser } from "react-icons/hi";
import { Link, useLocation } from 'react-router-dom';
import { signOutSuccess } from '../Redux/Slice/UserSlice';
import { useDispatch } from 'react-redux';


const DashboardSidebar = () => {
  const dispatch = useDispatch()
  const location = useLocation();
  const [tab, setTab] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabUrl = urlParams.get('tab'); // tab = profile
    if (tabUrl) {
      setTab(tabUrl); // profile
    }
  }, [location.search]);

  const handleSignout =()=>{
    dispatch(signOutSuccess())
    localStorage.removeItem("Token")

  }

  return (
    <Sidebar className='w-full md:w-58'>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Link to='/dashboard?tab=profile'>
            <Sidebar.Item active={tab === 'profile'} icon={HiUser} label={'User'} labelColor='dark' as='div' >Profile</Sidebar.Item>
          </Link>
          <Sidebar.Item icon={HiArrowSmRight} className='cursor-pointer'  onClick={handleSignout} >Sign Out</Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default DashboardSidebar;
