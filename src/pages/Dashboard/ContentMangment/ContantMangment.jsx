import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const ContantMangment = () => {
  return (
    <div className="relative">
      <h2 className="text-red-500 text-center">Contant Management</h2>
      <div className="absolute top-0 right-0 p-4">
        <Link to="add-blog"><button className="btn btn-info">Add Blog</button></Link>
      </div>
      <div>
            <Outlet></Outlet>
      </div>
    </div>
  );
};

export default ContantMangment;
