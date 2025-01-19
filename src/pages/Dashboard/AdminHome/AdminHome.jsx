import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../Hooks/useAuth';
import useAxiosPublic from '../../../hooks/useAxiosPublic';

const AdminHome = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  const fetchAdminState = async () => {
    const response = await axiosPublic.get('/admin-state');
    return response.data;
  };

  const { data: adminState, isLoading, error } = useQuery({
    queryKey: ['adminState'],
    queryFn: fetchAdminState
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching admin state</div>;
  }

  return (
    <div>
      <div>
      <h2 className='text-center text-2xl'>Admin Home</h2>
            <p className='text-center text-xl'> Welcome {user.displayName} to Blood Bank</p>
      </div>
      <div className="stats shadow flex items-center justify-center">
        <div className="stat">
          <div className="stat-title">Total Users</div>
          <div className="stat-value">{adminState.users}</div>
        </div>
        <div className="stat">
          <div className="stat-title">Total Donation Requests</div>
          <div className="stat-value">{adminState.donationRequest}</div>
        </div>
        <div className="stat">
          <div className="stat-title">Total Revenue</div>
          <div className="stat-value">${adminState.revenue}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
