import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import useAuth from '../../../Hooks/useAuth';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const Navbar = () => {
  const { user, logOut } = useAuth();
  const axiosPublic = useAxiosPublic();

  const { data: userInfo, isLoading, isError, error } = useQuery({
    queryKey: ['userInfo', user?.email],
    queryFn: async () => {
      if (user && user.email) {
        const response = await axiosPublic.get('/users');
        console.log('Response data:', response.data);
        return response.data.find(u => u.email === user.email) || null;
      }
      return null;
    },
    enabled: !!user?.email, // Only run the query if the user is logged in
  });

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log out!'
    }).then((result) => {
      if (result.isConfirmed) {
        logOut()
          .then(() => {
            Swal.fire(
              'Logged Out!',
              'You have been logged out successfully.',
              'success'
            );
          })
          .catch(error => {
            console.log(error);
            Swal.fire(
              'Error!',
              'There was an error logging out.',
              'error'
            );
          });
      }
    });
  };

  const navOption = <>
    <li><Link to="/">Home</Link></li>
    <li><Link to="founding">Found Blood</Link></li>
    <li><a>Item 3</a></li>
  </>;

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            {navOption}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl"><img className='w-8 h-8' src="https://i.ibb.co.com/0y3TKf4/images-q-tbn-ANd9-Gc-QTFUPJ215o-Q9m-Bln91-MMv65-J4-IRMUi-JZXi-Dw-s.png" alt="blood logo" /></a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className='menu menu-horizontal px-1'>
          {navOption}
        </ul>
      </div>
      {
        isLoading ? (
          <div>Loading...</div>
        ) : isError ? (
          <div>Error: {error.message}</div>
        ) : userInfo ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={userInfo.avatar} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <li>
                <Link to="dashboard">Dashboard</Link>
              </li>
              <li><button onClick={handleLogout} className='btn'>Logout</button></li>
            </ul>
          </div>
        ) : (
          <div className="navbar-end">
            <div className="btn"><Link to="login">Login</Link></div>
          </div>
        )
      }
    </div>
  );
};

export default Navbar;
