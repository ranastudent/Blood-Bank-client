import React, { useState, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { AuthContext } from '../../../Providers/AuthProvider';

const MyDonationRequest = () => {
  const { user } = useContext(AuthContext);
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const limit = 10;

  const axiosPublic = useAxiosPublic();

  const { data, isLoading, error } = useQuery({
    queryKey: ['donationRequests', user?.email, statusFilter, page],
    queryFn: async () => {
      if (!user?.email) {
        throw new Error('User email is not available');
      }
      const response = await axiosPublic.get(`/donation-requests/${user.email}`, {
        params: {
          status: statusFilter,
          page,
          limit,
        },
      });
      return response.data;
    },
    enabled: !!user?.email, // Only run the query if user email is available
  });

  console.log('data:', data);
  console.log('isLoading:', isLoading);
  console.log('error:', error);

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
    setPage(1); // Reset to first page when filter changes
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  if (!user) return <div>Loading user data...</div>;
  if (isLoading) return <div>Loading donation requests...</div>;
  if (error) return <div>Error loading donation requests</div>;

  const { donationRequests, total } = data;
  const totalPages = Math.ceil(total / limit);
  console.log(donationRequests);

  return (
    <div>
      <h2>My Donation Requests {donationRequests.length}</h2>
      <div>
        <label>Status Filter:</label>
        <select value={statusFilter} onChange={handleStatusFilterChange}>
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>
      <table>
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
              <td>{request.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
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

export default MyDonationRequest;
