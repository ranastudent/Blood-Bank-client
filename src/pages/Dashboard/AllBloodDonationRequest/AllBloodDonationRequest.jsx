import React, { useState, useContext } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { AuthContext } from '../../../Providers/AuthProvider';

const fetchDonationRequests = async ({ queryKey }) => {
  const [_, page, statusFilter] = queryKey;
  const response = await axios.get('http://localhost:5000/donation-requests', {
    params: {
      page,
      status: statusFilter,
    },
  });
  return response.data;
};

const updateDonationRequestStatus = async (id, status) => {
  const response = await axios.patch(`http://localhost:5000/donation-requests/${id}/status`, { status });
  return response.data;
};

const AllBloodDonationRequest = () => {
  const { user } = useContext(AuthContext);
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const limit = 10;
  const queryClient = useQueryClient();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['donationRequests', page, statusFilter],
    queryFn: fetchDonationRequests,
    keepPreviousData: true,
  });

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
  if (error) return <div>Error loading donation requests</div>;

  const { donationRequests, total } = data;
  const totalPages = Math.ceil(total / limit);

  return (
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
  );
};

export default AllBloodDonationRequest;
