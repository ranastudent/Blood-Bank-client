import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className='flex'>
      <div className='w-64 min-h-screen bg-orange-500'>
        <ul className='space-y-4'>
          <>
            <li className='pr-4'><Link to="/">Home</Link></li>
            <li className='pr-4'><Link to="profile">Profile</Link></li>
            <li className='pr-4'><Link to="donationRequest">Create Donation Request</Link></li>
            <li className='pr-4'><Link to="myDonationRequest">My Donation Request</Link></li>
            <li className='pr-4'></li>
            <li className='pr-4'></li>
          </>
        </ul>
      </div>
      <div className='flex-1 p-8'>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
