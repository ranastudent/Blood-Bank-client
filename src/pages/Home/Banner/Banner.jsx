import React from 'react';
import { Link } from 'react-router-dom';

const Banner = () => {
      return (
            <div
                  className="hero min-h-screen bg-cover bg-center "
                  style={{
                        backgroundImage: "url(https://i.ibb.co.com/TLmFY3n/banner-mobile.jpg)",
                  }}>
                  <div className="hero-overlay bg-opacity-60"></div>
                  <div className="hero-content text-neutral-content text-center">
                        <div className="max-w-md space-x-28 flex justify-between">
                              <button className="btn btn-md btn-error "><Link to="register">Join as a donor</Link></button>
                              <Link to="searchPage"><button className="btn btn-md btn-error ">Search Donors</button></Link>
                        </div>
                  </div>
            </div>
      );
};

export default Banner;