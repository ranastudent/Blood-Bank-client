import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import districts from '../../../assets/districts.json';
import upazilas from '../../../assets/upazilas.json';

const DonationRequest = () => {
  const [recipientName, setRecipientName] = useState('');
  const [recipientDistrict, setRecipientDistrict] = useState('');
  const [recipientUpazila, setRecipientUpazila] = useState('');
  const [hospitalName, setHospitalName] = useState('');
  const [fullAddress, setFullAddress] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [donationDate, setDonationDate] = useState('');
  const [donationTime, setDonationTime] = useState('');
  const [requestMessage, setRequestMessage] = useState('');

  const axiosPublic = useAxiosPublic();

  const { data: users, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await axiosPublic.get('/users');
      return response.data;
    },
  });

  const user = users && users.length > 0 ? users[0] : null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || user.status !== 'active') {
      Swal.fire({
        icon: 'error',
        title: 'Blocked User',
        text: 'Blocked users cannot create donation requests.',
      });
      return;
    }
    const newRequest = {
      requesterName: user.name,
      requesterEmail: user.email,
      recipientName,
      recipientDistrict,
      recipientUpazila,
      hospitalName,
      fullAddress,
      bloodGroup,
      donationDate,
      donationTime,
      requestMessage,
      status: 'pending',
    };
    try {
      const response = await axiosPublic.post('/donation-requests', newRequest);
      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Donation request created successfully!',
        });
      }
    } catch (error) {
      console.error('Error creating donation request:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to create donation request.',
      });
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading user data</div>;

  console.log('User data:', user);

  return (
    <div>
      <h3>Donation Request</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Requester Name:</label>
          <input type="text" value={user.name} readOnly />
        </div>
        <div>
          <label>Requester Email:</label>
          <input type="email" value={user.email} readOnly />
        </div>
        <div>
          <label>Recipient Name:</label>
          <input type="text" value={recipientName} onChange={(e) => setRecipientName(e.target.value)} required />
        </div>
        <div>
          <label>Recipient District:</label>
          <select value={recipientDistrict} onChange={(e) => setRecipientDistrict(e.target.value)} required>
            <option value="">Select District</option>
            {districts.map((district) => (
              <option key={district.id} value={district.id}>
                {district.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Recipient Upazila:</label>
          <select value={recipientUpazila} onChange={(e) => setRecipientUpazila(e.target.value)} required>
            <option value="">Select Upazila</option>
            {upazilas
              .filter((upazila) => upazila.district_id === recipientDistrict)
              .map((upazila) => (
                <option key={upazila.id} value={upazila.id}>
                  {upazila.name}
                </option>
              ))}
          </select>
        </div>
        <div>
          <label>Hospital Name:</label>
          <input type="text" value={hospitalName} onChange={(e) => setHospitalName(e.target.value)} required />
        </div>
        <div>
          <label>Full Address:</label>
          <input type="text" value={fullAddress} onChange={(e) => setFullAddress(e.target.value)} required />
        </div>
        <div>
          <label>Blood Group:</label>
          <select value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)} required>
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>
        <div>
          <label>Donation Date:</label>
          <input type="date" value={donationDate} onChange={(e) => setDonationDate(e.target.value)} required />
        </div>
        <div>
          <label>Donation Time:</label>
          <input type="time" value={donationTime} onChange={(e) => setDonationTime(e.target.value)} required />
        </div>
        <div>
          <label>Request Message:</label>
          <textarea value={requestMessage} onChange={(e) => setRequestMessage(e.target.value)} required />
        </div>
        <button type="submit">Request</button>
      </form>
    </div>
  );
};

export default DonationRequest;
