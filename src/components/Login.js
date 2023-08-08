import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = ({ setLoggedInUsername, setIsLoggedIn, setShowModal }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    isChecked: false,
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

 
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      setError(null); // Reset error state
      const response = await axios.post('http://localhost:5000/login', formData);
      console.log("Response data: ", response.data); 
  
      // Show success toast notification
      toast.success("Login successful!");
  
      
      setLoggedInUsername(response.data?.user?.username || "Unknown User");
      setIsLoggedIn(true);
  
      setFormData({
        email: "",
        password: "",
        isChecked: false,
      });
      setShowModal(false);
  
      
  
    } catch (error) {
      console.error("Error during user login: ", error.response?.data);
      setError(error.response?.data?.message || "Unknown error occurred");
  
      // Show error toast notification
      toast.error("Error during login");
    }
  };
  
  

  return (
    <>
      {/* Button trigger modal */}
      <button type="button" className="btn btn-outline-primary ms-auto" data-bs-toggle="modal" data-bs-target="#loginModal">
        <span className="fa fa-sign-in me-1"></span> Login
      </button>

      {/* Modal */}
      <div className="modal fade" id="loginModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title text-center w-100" id="exampleModalLabel">Login</h3>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    aria-describedby="emailHelp"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3 form-check">
                  <input type="checkbox" className="form-check-input" id="exampleCheck1" name="isChecked" checked={formData.isChecked} onChange={handleChange}
                    value={formData.isChecked} />
                  <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" className="btn btn-outline-primary w-100 mt-5">Submit</button>
                {error && <p className="text-danger mt-3">{error}</p>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;