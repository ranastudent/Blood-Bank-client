import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
      const navOption = <>
            <li><NavLink>Home</NavLink></li>
            <li><a>Item 2</a></li>
            <li><a>Item 3</a></li>
      </>
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
                  <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                              <div className="w-10 rounded-full">
                                    <img
                                          alt="Tailwind CSS Navbar component"
                                          src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                              </div>
                        </div>
                        <ul
                              tabIndex={0}
                              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                              <li>
                                    <a className="justify-between">
                                          Profile
                                          <span className="badge">New</span>
                                    </a>
                              </li>
                              <li><a>Settings</a></li>
                              <li><a>Logout</a></li>
                        </ul>
                  </div>
                  <div className="navbar-end">
                        <a className="btn">Button</a>
                  </div>
            </div>
      );
};

export default Navbar;