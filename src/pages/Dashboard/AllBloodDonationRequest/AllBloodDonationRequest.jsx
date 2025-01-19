import React, { useState, useContext, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { AuthContext } from '../../../Providers/AuthProvider';
import { useNavigate } from 'react-router-dom';
import RoleRoute from '../../../Routers/RoleRoute';
import Swal from 'sweetalert2';

const fetchDonationRequests = async ({ queryKey }) => {
  const [_, page, statusFilter] = queryKey;
  const token = localStorage.getItem('access_token'); // Retrieve the token from local storage
  const response = await axios.get('https://y-nine-inky.vercel.app/donation-requests', {
    params: {
      page,
      status: statusFilter,
    },
    headers: {
      Authorization: `Bearer ${token}` // Include the token in the request headers
    }
  });
  return response.data;
};

const fetchUserRoleAndStatus = async (email) => {
  const token = localStorage.getItem('access_token'); // Retrieve the token from local storage
  const response = await axios.get('https://y-nine-inky.vercel.app/users', {
    params: {
      email,
    },
    headers: {
      Authorization: `Bearer ${token}` // Include the token in the request headers
    }
  });
  return response.data;
};

const updateDonationRequestStatus = async (id, status) => {
  const token = localStorage.getItem('access_token'); // Retrieve the token from local storage
  const response = await axios.patch(`https://y-nine-inky.vercel.app/donation-requests/${id}/status`, { status }, {
    headers: {
      Authorization: `Bearer ${token}` // Include the token in the request headers
    }
  });
  return response.data;
};

const AllBloodDonationRequest = () => {
  const { user, logout } = useContext(AuthContext);
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const limit = 10;
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserRoleAndStatus = async () => {
      if (user?.email) {
        const userData = await fetchUserRoleAndStatus(user.email);
        const currentUser = userData.find((u) => u.email === user.email);
        if (currentUser?.role === 'donor' || currentUser?.status === 'blocked') {
          logout();
          navigate('/login');
        }
      }
    };
    checkUserRoleAndStatus();
  }, [user, logout, navigate]);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['donationRequests', page, statusFilter],
    queryFn: fetchDonationRequests,
    keepPreviousData: true,
  });

  useEffect(() => {
    if (error) {
      console.error('Error loading donation requests:', error);
    }
  }, [error]);

  const handleStatusChange = async (id, status) => {
    try {
      await updateDonationRequestStatus(id, status);
      queryClient.invalidateQueries(['donationRequests', page, statusFilter]);
      queryClient.invalidateQueries(['donationRequests', user?.email]);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: `Donation request status updated to ${status}!`,
      });
    } catch (error) {
      console.error('Error updating donation request status:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to update donation request status.',
      });
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    refetch();
  };

  if (isLoading) return <div>Loading donation requests...</div>;
  if (error) return <div>Error loading donation requests: {error.message}</div>;

  const donationRequests = data?.donationRequests || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / limit);

  return (
    <RoleRoute>
      <div>
        <h2 className="text-2xl font-bold mb-4">All Blood Donation Requests ({donationRequests.length})</h2>
        <div className="mb-4">
          <label className="label">Filter by Status:</label>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="select select-bordered">
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Recipient Name</th>
                <th>District</th>
                <th>Upazila</th>
                <th>Hospital Name</th>
                <th>Full Address</th>
                <th>Blood Group</th>
                <th>Donation Date</th>
                <th>Donation Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {donationRequests.map((request) => (
                <tr key={request._id}>
                  <td>{request.recipientName}</td>
                  <td>{request.recipientDistrict}</td>
                  <td>{request.recipientUpazila}</td>
                  <td>{request.hospitalName}</td>
                  <td>{request.fullAddress}</td>
                  <td>{request.bloodGroup}</td>
                  <td>{request.donationDate}</td>
                  <td>{request.donationTime}</td>
                  <td>
                    <select
                      className="select select-bordered"
                      value={request.status}
                      onChange={(e) => handleStatusChange(request._id, e.target.value)}
                    >
                      <option value="pending">Pending</option>
                      <option value="inprogress">In Progress</option>
                      <option value="done">Done</option>
                      <option value="canceled">Canceled</option>
                    </select>
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
              className={`btn bg-slate-300 text-black ${page === index + 1 ? 'btn-active' : ''}`}
              onClick={() => handlePageChange(index + 1)}
              disabled={page === index + 1}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </RoleRoute>
  );
};

export default AllBloodDonationRequest;
