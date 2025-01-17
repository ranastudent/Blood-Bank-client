import React from 'react';
import useAuth from '../../../Hooks/useAuth';

const AdminHome = () => {
      const { user } = useAuth()
      return (
            <div>
                  Welcome {user.displayName} to Blood Bank
            </div>
      );
};

export default AdminHome;