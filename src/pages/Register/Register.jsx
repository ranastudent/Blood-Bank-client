import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
      const [formData, setFormData] = useState({
            email: '',
            name: '',
            avatar: null,
            bloodGroup: '',
            district: '',
            upazila: '',
            password: '',
            confirmPassword: '',
      });
      const districts = ["Barguna", "Barishal", "Bhola", "Jhalokathi", "Patuakhali", "Pirojpur", "Bandarban", "Brahmanbaria", "Chandpur", "Chattogram", "Cumilla", "Cox's Bazar", "Feni", "Khagrachari", "Lakshmipur", "Noakhali", "Rangamati", "Dhaka", "Faridpur", "Gazipur", "Gopalganj", "Kishoreganj", "Madaripur", "Manikganj", "Munshiganj", "Narayanganj", "Narsingdi", "Rajbari", "Shariatpur", "Tangail", "Jamalpur", "Mymensingh", "Netrakona", "Sherpur", "Bagerhat", "Chuadanga", "Jashore", "Jhenaidah", "Khulna", "Kushtia", "Magura", "Meherpur", "Narail", "Satkhira", "Bogra", "Joypurhat", "Naogaon", "Natore", "Chapai Nawabganj", "Pabna", "Rajshahi", "Sirajganj", "Dinajpur", "Gaibandha", "Kurigram", "Lalmonirhat", "Nilphamari", "Panchagarh", "Rangpur", "Thakurgaon", "Habiganj", "Maulvibazar", "Sunamganj", "Sylhet"];

      const upazilas = {
            "Barguna": ["Amtali", "Bamna", "Barguna Sadar", "Betagi", "Patharghata", "Taltali"],
            "Barishal": ["Agailjhara", "Babuganj", "Bakerganj", "Banaripara", "Barishal Sadar", "Gournadi", "Hizla", "Mehendiganj", "Muladi", "Wazirpur"],
            "Bhola": ["Bhola Sadar", "Burhanuddin", "Char Fasson", "Daulatkhan", "Lalmohan", "Manpura", "Tazumuddin"],
            "Jhalokathi": ["Jhalokathi Sadar", "Kathalia", "Nalchity", "Rajapur"],
            "Patuakhali": ["Bauphal", "Dashmina", "Dumki", "Galachipa", "Kalapara", "Mirzaganj", "Patuakhali Sadar", "Rangabali"],
            "Pirojpur": ["Bhandaria", "Kawkhali", "Mathbaria", "Nazirpur", "Nesarabad", "Pirojpur Sadar", "Zianagar"],
            "Bandarban": ["Bandarban Sadar", "Lama", "Naikhongchhari", "Rowangchhari", "Ruma", "Thanchi"],
            "Brahmanbaria": ["Akhaura", "Bancharampur", "Brahmanbaria Sadar", "Kasba", "Nabinagar", "Nasirnagar", "Sarail"],
            "Chandpur": ["Chandpur Sadar", "Faridganj", "Haimchar", "Haziganj", "Kachua", "Matlab Dakshin", "Matlab Uttar", "Shahrasti"],
            "Chattogram": ["Anwara", "Banshkhali", "Boalkhali", "Chandanaish", "Chattogram Sadar", "Fatikchhari", "Hathazari", "Lohagara", "Mirsharai", "Patiya", "Rangunia", "Raozan", "Sandwip", "Satkania", "Sitakunda"],
            "Cumilla": ["Barura", "Brahmanpara", "Burichang", "Chandina", "Chauddagram", "Cumilla Sadar", "Cumilla Sadar Dakshin", "Daudkandi", "Debidwar", "Homna", "Laksam", "Monohorgonj", "Muradnagar", "Nangalkot", "Titas"],
            "Cox's Bazar": ["Chakaria", "Cox's Bazar Sadar", "Kutubdia", "Maheshkhali", "Pekua", "Ramu", "Teknaf", "Ukhia"],
            "Feni": ["Chhagalnaiya", "Daganbhuiyan", "Feni Sadar", "Parshuram", "Sonagazi"],
            "Khagrachari": ["Dighinala", "Khagrachari Sadar", "Lakshmichhari", "Mahalchhari", "Manikchhari", "Matiranga", "Panchhari", "Ramgarh"],
            "Lakshmipur": ["Lakshmipur Sadar", "Raipur", "Ramganj", "Ramgati"],
            "Noakhali": ["Begumganj", "Chatkhil", "Companiganj", "Hatiya", "Noakhali Sadar", "Senbagh", "Subarnachar"],
            "Rangamati": ["Baghaichhari", "Barkal", "Kaptai", "Kawkhali", "Langadu", "Naniarchar", "Rajasthali", "Rangamati Sadar"],
            "Dhaka": ["Dhamrai", "Dohar", "Keraniganj", "Nawabganj", "Savar"],
            "Faridpur": ["Alfadanga", "Bhanga", "Boalmari", "Charbhadrasan", "Faridpur Sadar", "Madhukhali", "Nagarkanda", "Sadarpur", "Saltha"],
            "Gazipur": ["Gazipur Sadar", "Kaliakair", "Kaliganj", "Kapasia", "Sreepur"],
            "Gopalganj": ["Gopalganj Sadar", "Kashiani", "Kotalipara", "Muksudpur", "Tungipara"],
            "Kishoreganj": ["Austagram", "Bajitpur", "Bhairab", "Hossainpur", "Itna", "Karimganj", "Katiadi", "Kishoreganj Sadar", "Kuliarchar", "Mithamain", "Nikli", "Pakundia", "Tarail"],
            "Madaripur": ["Kalkini", "Madaripur Sadar", "Rajoir", "Shibchar"],
            "Manikganj": ["Daulatpur", "Ghior", "Harirampur", "Manikganj Sadar", "Saturia", "Shivalaya", "Singair"],
            "Munshiganj": ["Gazaria", "Lohajang", "Munshiganj Sadar", "Sirajdikhan", "Sreenagar", "Tongibari"],
            "Narayanganj": ["Araihazar", "Bandar", "Narayanganj Sadar", "Rupganj", "Sonargaon"],
            "Narsingdi": ["Belabo", "Monohardi", "Narsingdi Sadar", "Palash", "Raipura", "Shibpur"],
            "Rajbari": ["Baliakandi", "Goalandaghat", "Pangsha", "Rajbari Sadar"],
            "Shariatpur": ["Bhedarganj", "Damudya", "Gosairhat", "Naria", "Shariatpur Sadar", "Zajira"],
            "Tangail": ["Basail", "Bhuapur", "Delduar", "Dhanbari", "Ghatail", "Gopalpur", "Kalihati", "Madhupur", "Mirzapur", "Nagarpur", "Sakhipur", "Tangail Sadar"],
            "Jamalpur": ["Baksiganj", "Dewanganj", "Islampur", "Jamalpur Sadar", "Madarganj", "Melandaha", "Sarishabari"],
            "Mymensingh": ["Bhaluka", "Dhobaura", "Fulbaria", "Gaffargaon", "Gauripur", "Haluaghat", "Ishwarganj", "Mymensingh Sadar", "Muktagachha", "Nandail", "Phulpur", "Trishal"],
            "Netrakona": ["Atpara", "Barhatta", "Durgapur", "Kalmakanda", "Kendua", "Khaliajuri", "Madan", "Mohanganj", "Netrakona Sadar", "Purbadhala"],
            "Sherpur": ["Jhenaigati", "Nakla", "Nalitabari", "Sherpur Sadar", "Sreebardi"],
            "Bagerhat": ["Bagerhat Sadar", "Chitalmari", "Fakirhat", "Kachua", "Mollahat", "Mongla", "Morrelganj", "Rampal", "Sarankhola"]
      }


      const handleChange = (e) => {
            const { name, value, files } = e.target;
            setFormData({
                  ...formData,
                  [name]: files ? files[0] : value,
            });
      };
      const handleDistrictChange = (e) => {
            const selectedDistrict = e.target.value;
            setFormData({
                  ...formData,
                  district: selectedDistrict,
                  upazila: '', // Reset upazila when district changes
            });
      };

      const handleSubmit = (e) => {
            e.preventDefault();
            // Add your form submission logic here
            console.log(formData);
      };

      return (
            <div className="container mx-auto p-4 bg-slate-200">
                  <h2 className="text-2xl font-bold mb-4">Register</h2>
                  <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                              <label htmlFor="email" className="block text-sm font-medium">Email:</label>
                              <input type="email" id="email" name="email" placeholder='Email' className="input input-bordered w-full" required onChange={handleChange} />
                        </div>
                        <div className="mb-4">
                              <label htmlFor="name" className="block text-sm font-medium">Name:</label>
                              <input type="text" id="name" name="name" placeholder='Name' className="input input-bordered w-full" required onChange={handleChange} />
                        </div>
                        <div className="mb-4">
                              <label htmlFor="avatar" className="block text-sm font-medium">Avatar:</label>
                              <input type="text" id="name" name="avatar" className="input input-bordered w-full" placeholder='Image URL' required onChange={handleChange} />
                        </div>
                        <div className="mb-4">
                              <label htmlFor="bloodGroup" className="block text-sm font-medium">Blood Group:</label>
                              <select id="bloodGroup" name="bloodGroup" className="select select-bordered w-full" required onChange={handleChange}>
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
                        <div className="mb-4">
                              <label htmlFor="district" className="block text-sm font-medium">District:</label>
                              <select id="district" name="district" className="select select-bordered w-full" required onChange={handleChange}>
                                    <option value="">Select District</option>
                                    {districts.map((district) => (
                                          <option key={district} value={district}>
                                                {district}
                                          </option>
                                    ))}
                              </select>
                        </div>
                        <div className="mb-4">
                              <label htmlFor="upazila" className="block text-sm font-medium">Upazila:</label>
                              <select id="upazila" name="upazila" className="select select-bordered w-full" required onChange={handleChange}>
                                    <option value="">Select Upazila</option>
                                    {formData.district &&
                                          upazilas[formData.district]?.map((upazila) => (
                                                <option key={upazila} value={upazila}>
                                                      {upazila}
                                                </option>
                                          ))}
                              </select>
                        </div>
                        <div className="mb-4">
                              <label htmlFor="password" className="block text-sm font-medium">Password:</label>
                              <input type="password" id="password" name="password" className="input input-bordered w-full" required onChange={handleChange} />
                        </div>
                        <div className="mb-4">
                              <label htmlFor="confirmPassword" className="block text-sm font-medium">Confirm Password:</label>
                              <input type="password" id="confirmPassword" name="confirmPassword" className="input input-bordered w-full" required onChange={handleChange} />
                        </div>
                        <button type="submit" className="btn btn-primary w-full">Register</button>
                  </form>
                  <p>Already Have a Account?<button type="" className=" btn-error w-full"><Link className='text-red-600 text-2xl' to="/login">Login here</Link></button></p>
            </div>
      );
};

export default Register;
