import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../Hooks/useAuth';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';

const Profile = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm();
  const [isEditable, setIsEditable] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (user && user.email) {
      axiosPublic.get('/users')
        .then(response => {
          const userData = response.data.find(u => u.email === user.email);
          setUserInfo(userData);
          // Set form values
          setValue('name', userData.name);
          setValue('email', userData.email);
          setValue('avatar', userData.avatar);
          setValue('district', userData.district);
          setValue('upazila', userData.upazila);
          setValue('bloodGroup', userData.bloodGroup);
        })
        .catch(error => {
          console.error('Error fetching user info:', error);
        });
    }
  }, [user, axiosPublic, setValue]);

  const onSubmit = (data) => {
    // Check if the form data has changed
    const currentValues = getValues();
    const hasChanged = Object.keys(currentValues).some(key => currentValues[key] !== userInfo[key]);

    if (!hasChanged) {
      Swal.fire({
        icon: 'info',
        title: 'No Changes',
        text: 'No changes were made to the profile.',
      });
      return;
    }

    axiosPublic.patch(`/users/${userInfo._id}`, data)
      .then(response => {
        setUserInfo(response.data);
        setIsEditable(false);
        Swal.fire({
          icon: 'success',
          title: 'Profile Updated',
          text: 'Your profile has been updated successfully!',
        });
      })
      .catch(error => {
        console.error('Error updating profile:', error);
        Swal.fire({
          icon: 'error',
          title: 'Update Failed',
          text: 'There was an error updating your profile.',
        });
      });
  };

  return (
    <div>
      <h2>Profile</h2>

      {userInfo && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='top-0 right-0'>
            <img className='w-20 h-20 rounded-full' src={userInfo.avatar} alt="" />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input type="text" {...register("name", { required: true })} className="input input-bordered" disabled={!isEditable} />
            {errors.name && <span className='text-red-600'>Name is required</span>}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input type="email" {...register("email", { required: true })} className="input input-bordered" disabled />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Avatar URL</span>
            </label>
            <input type="text" {...register("avatar", { required: true })} className="input input-bordered" disabled={!isEditable} />
            {errors.avatar && <span className='text-red-600'>Avatar URL is required</span>}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Blood Group</span>
            </label>
            <select {...register("bloodGroup", { required: true })} className="select select-bordered" disabled={!isEditable}>
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
            {errors.bloodGroup && <span className='text-red-600'>Blood Group is required</span>}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">District</span>
            </label>
            <input type="text" {...register("district", { required: true })} className="input input-bordered" disabled={!isEditable} />
            {errors.district && <span className='text-red-600'>District is required</span>}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Upazila</span>
            </label>
            <input type="text" {...register("upazila", { required: true })} className="input input-bordered" disabled={!isEditable} />
            {errors.upazila && <span className='text-red-600'>Upazila is required</span>}
          </div>
          <div className="form-control mt-6">
            {isEditable ? (
              <button type="submit" className="btn btn-primary">Save</button>
            ) : (
              <button type="button" className="btn btn-secondary" onClick={() => setIsEditable(true)}>Edit</button>
            )}
          </div>
        </form>
      )}
    </div>
  );
};

export default Profile;
