import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
      return (
            <div className='pt-10'>
                  <footer className="footer bg-base-200 text-base-content p-10">
                        <aside>
                              <img src="https://i.ibb.co.com/0y3TKf4/images-q-tbn-ANd9-Gc-QTFUPJ215o-Q9m-Bln91-MMv65-J4-IRMUi-JZXi-Dw-s.png" alt="" />

                        </aside>
                        <nav>
                              <li><Link to="searchPage">Search Page</Link></li>

                        </nav>
                        <nav>
                              <li><Link to="blood-donation-request">Blood Donation Request</Link></li>

                        </nav>
                        <nav>
                              <li><Link to="blog">Blog</Link></li>
                        </nav>
                        <div>
                              <p className='text-center'>All Right Reserved At Blood Bank</p>
                        </div>
                  </footer>
            </div>
      );
};

export default Footer;