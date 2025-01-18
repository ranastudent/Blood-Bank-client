import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import useAxiosSecure from '../Hooks/useAxiosSecure';

const Dashboard = () => {
  const [user1, setUser] = useState(null); // Initialize with null
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure(); // Use the secure axios instance

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!user?.email) return; // Ensure user email is available before making the request
        const response = await axiosSecure.get(`/users/${user.email}`); // Use axiosSecure for the request
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [user, axiosSecure]);

  // Show a loading indicator while user1 is null
  if (!user1) return <div>Loading...</div>;

  return (
    <div className="flex">
      <div className="w-64 min-h-screen bg-orange-500">
        <ul className="space-y-4">
          <>
            <li className="pr-4">
              <Link to="/">Home</Link>
            </li>
            <li className="pr-4">
              <Link to="/dashboard">Dashboard Home</Link>
            </li>
            <div className="divider"></div>
            {user1.role === 'admin' && (
              <li className="pr-4">
                <Link to="allUser">All User</Link>
              </li>
            )}
            {(user1.role === 'admin' || user1.role === 'volunteer') && (
              <li className="pr-4">
                <Link to="all-blood-donation-request">All Blood Donation Request</Link>
              </li>
            )}
            <li className="pr-4">
              <Link to="profile">Profile</Link>
            </li>
            <li className="pr-4">
              <Link to="donationRequest">Create Donation Request</Link>
            </li>
            {user1.role === 'donor' && (
              <li className="pr-4">
                <Link to="myDonationRequest">My Donation Request</Link>
              </li>
            )}
          </>
        </ul>
      </div>
      <div className="flex-1 p-8">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
