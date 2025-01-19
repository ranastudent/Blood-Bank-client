import React, { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import '../CSS/Dashboard/Dashboard.css';

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
              <NavLink to="/">Home</NavLink>
            </li>
            <li className="pr-4">
              <NavLink to="/dashboard">Dashboard Home</NavLink>
            </li>
            <div className="divider"></div>
            {user1.role === 'admin' && (
              <li className="pr-4">
                <NavLink to="allUser">All User</NavLink>
              </li>
            )}
            {(user1.role === 'admin' || user1.role === 'volunteer') && (
              <>
                <li className="pr-4">
                  <NavLink to="all-blood-donation-request">All Blood Donation Request</NavLink>
                </li>
                <li className="pr-4">
                  <NavLink to="content-Management">Content Management</NavLink>
                </li>
              </>
            )}
            <li className="pr-4">
              <NavLink to="profile">Profile</NavLink>
            </li>
            <li className="pr-4">
              <NavLink to="donationRequest">Create Donation Request</NavLink>
            </li>
            {user1.role === 'donor' && (
              <li className="pr-4">
                <NavLink to="myDonationRequest">My Donation Request</NavLink>
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
