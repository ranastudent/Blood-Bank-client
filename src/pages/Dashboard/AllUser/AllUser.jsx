import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Swal from 'sweetalert2';

const fetchUsers = async ({ queryKey }) => {
  const [_, page, statusFilter] = queryKey;
  const response = await axios.get('http://localhost:5000/users', {
    params: {
      page,
      status: statusFilter,
    },
  });
  return response.data;
};

const updateUserStatus = async (id, status) => {
  const response = await axios.patch(`http://localhost:5000/users/${id}/status`, { status });
  return response.data;
};

const updateUserRole = async (id, role) => {
  const response = await axios.patch(`http://localhost:5000/users/${id}/role`, { role });
  return response.data;
};

const AllUser = () => {
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['users', page, statusFilter],
    queryFn: fetchUsers,
    keepPreviousData: true,
  });

  const handleStatusChange = async (id, status) => {
    try {
      await updateUserStatus(id, status);
      queryClient.invalidateQueries(['users', page, statusFilter]);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: `User status updated to ${status}!`,
      });
    } catch (error) {
      console.error('Error updating user status:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to update user status.',
      });
    }
  };

  const handleRoleChange = async (id, role) => {
    try {
      await updateUserRole(id, role);
      queryClient.invalidateQueries(['users', page, statusFilter]);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: `User role updated to ${role}!`,
      });
    } catch (error) {
      console.error('Error updating user role:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to update user role.',
      });
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading users</div>;

  console.log('Data:', data);

  if (!data || !Array.isArray(data)) return <div>No users found</div>;

  const users = data;
  const totalPages = Math.ceil(users.length / 10);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">All Users</h2>
      <div className="mb-4">
        <label className="label">Filter by Status:</label>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="select select-bordered">
          <option value="">All</option>
          <option value="active">Active</option>
          <option value="blocked">Blocked</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Email</th>
              <th>Name</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>
                  <div className="avatar">
                    <div className="w-12 rounded-full">
                      <img src={user.avatar} alt="User Avatar" />
                    </div>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>{user.name}</td>
                <td>{user.role === 'user' ? 'donor' : user.role}</td>
                <td>{user.status}</td>
                <td>
                  <div className="dropdown dropdown-left">
                    <label tabIndex={0} className="btn m-1">...</label>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                      {user.status === 'active' ? (
                        <li>
                          <button onClick={() => handleStatusChange(user._id, 'blocked')}>Block</button>
                        </li>
                      ) : (
                        <li>
                          <button onClick={() => handleStatusChange(user._id, 'active')}>Unblock</button>
                        </li>
                      )}
                      <li>
                        <button onClick={() => handleRoleChange(user._id, 'volunteer')} disabled={user.status === 'blocked'}>Make Volunteer</button>
                      </li>
                      <li>
                        <button onClick={() => handleRoleChange(user._id, 'admin')} disabled={user.status === 'blocked'}>Make Admin</button>
                      </li>
                      <li>
                        <button onClick={() => handleRoleChange(user._id, 'donor')} disabled={user.status === 'blocked'}>Make Donor</button>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`btn ${page === index + 1 ? 'btn-active' : ''}`}
            onClick={() => setPage(index + 1)}
            disabled={page === index + 1}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AllUser;
