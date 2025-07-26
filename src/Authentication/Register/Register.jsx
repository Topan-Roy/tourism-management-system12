import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router'; 
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from 'sweetalert2';

import useAuth from '../../hooks/useAuth';
import useAxios from '../../hooks/useAxios';


const Register = () => {
  const { createUser, setUser } = useAuth();
  const [showpassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const axiosSecure = useAxios();

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    // Password validation
    const passwordRegExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!passwordRegExp.test(password)) {
      setErrorMessage('Password must be at least 6 characters, include 1 number, 1 lowercase, and 1 uppercase letter.');
      return;
    }

    try {
      const result = await createUser(email, password);
      const user = result.user;
      setUser(user);

      // Save user info to DB
      const userInfo = {
        name,
        email,
        photo,
        role: 'user',
        created_at: new Date(),
        last_log_in: new Date()
      };

      const res = await axiosSecure.post('/users', userInfo);

      if (res.data.insertedId || res.data.message === 'User already exists') {
        Swal.fire({
          title: "Register successful!",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        navigate('/');
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="card dark:bg-gray-50 dark:text-gray-800 w-full max-w-sm shadow-2xl">
        <h2 className='bg-gray-200 font-semibold mt-5 text-3xl text-center'>Register your account</h2>
        <div className="card-body bg-gray-100 dark:bg-gray-100 dark:text-gray-800">
          <form onSubmit={handleRegister}>
            <label className="label">Your name</label>
            <input type="text" name='name' className="input text-black bg-gray-200" placeholder="Your name" required />

            <label className="label">Photo URL</label>
            <input type="text" name='photo' className="input text-black bg-gray-200" placeholder="Photo URL" required />

            <label className="label">Email</label>
            <input type="email" name='email' className="input text-black bg-gray-200" placeholder="Email" required />

            <label className="label">Password</label>
            <div className="relative">
              <input
                type={showpassword ? 'text' : 'password'}
                name='password'
                className="input text-black bg-gray-200 w-full"
                placeholder="Password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showpassword)}
                className='btn btn-xs p-3 absolute top-1/2 right-3 transform -translate-y-1/2'>
                {showpassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {errorMessage && <p className='text-red-500 mt-2'>{errorMessage}</p>}

            <button type="submit" className="btn btn-neutral mt-4">Register</button>
            <p className='font-bold text-center pt-5'>Already Have An Account? <Link className='text-secondary' to='/login'>Login</Link></p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
