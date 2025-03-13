import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import photo1 from '../assets/photo1.png';
import logo from '../assets/logo.svg';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen w-full">
      <img src={photo1} alt="Campus" className="absolute inset-0 w-full h-full object-cover" />

      <nav className="absolute top-0 w-full d-flex justify-content-between align-items-center p-3 bg-transparent">
        <div>
          <img src={logo} alt="Logo" className="h-10" />
        </div>
        <div className="d-flex gap-4">
          <a href="#" className="text-danger fw-semibold text-decoration-none">HOME</a>
          <a href="#" className="text-danger fw-semibold text-decoration-none">ABOUT</a>
          <a href="#" className="text-danger fw-semibold text-decoration-none">CONTACT US</a>
        </div>
      </nav>

      <div className="absolute inset-0 d-flex align-items-center justify-content-center bg-dark bg-opacity-50">
        <div className="text-center text-white p-4 bg-dark bg-opacity-75 rounded">
          <h1>Welcome to the Lab Space Allocation Portal!</h1>
          <p>Empowering researchers and students to find the perfect workspace with ease.</p>
          <div className="d-flex gap-3 justify-content-center">
            <button className="btn btn-light">Sign up for free</button>
            <button className="btn btn-danger">For Researchers →</button>
          </div>
          <div className='mt-3'>
          <button className="btn btn-outline-primary" onClick={() => navigate('/login')}>Login</button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
