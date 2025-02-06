
<img height="800" src="https://i.ibb.co/8gQHtjfj/Blood-Donation.png" alt="Blood Bank Website Screenshot" />

# Blood Bank Website

## Live Site Link
[Blood Bank Website](https://blood-donation-client-d128e.web.app)

## Description
A web application for managing blood donations and transfusions. Users can register as donors, volunteers, or admins to help manage and facilitate blood donations.

## Features
- User roles: Admin, Volunteer, Donor (default)
- Manage blood donation requests
- Track blood inventory
- Schedule donation appointments
- Notifications for upcoming donation drives

## Technologies Used

### Frontend
- React
- Tailwind CSS

### Backend
- Node.js
- Express.js

## How to Run the Project Locally

To run this project locally, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-repo/blood-bank-website.git
   cd blood-bank-website
   ```

2. **Install Dependencies**:
   Navigate to both the frontend and backend directories and install the required dependencies.
   
   Frontend:
   ```bash
   cd frontend
   npm install
   ```

   Backend:
   ```bash
   cd backend
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the `backend` directory and add the following environment variables:
   ```plaintext
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   JWT_SECRET=your_jwt_secret
   ```

4. **Run the Backend Server**:
   ```bash
   cd backend
   npm start
   ```

   The backend server will start running on `http://localhost:5000`.

5. **Run the Frontend Server**:
   Open a new terminal window and navigate to the `frontend` directory:
   ```bash
   cd frontend
   npm start
   ```

   The frontend server will start running on `http://localhost:3000`.

6. **Access the Application**:
   Open your web browser and go to `http://localhost:3000` to see the application in action.
