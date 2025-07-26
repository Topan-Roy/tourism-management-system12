import React, { useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { FcGoogle } from "react-icons/fc";
import Swal from 'sweetalert2';

import useAuth from '../hooks/useAuth';
import useAxios from '../hooks/useAxios';

const Login = () => {
    const emailRef = useRef();
    const [error, setError] = useState("");
    const { singIn, forgetPassword, googleSignIn } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxios();
    const handleLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        singIn(email, password)
            .then((result) => {
                const user = result.user;
                console.log(user);
                Swal.fire({
                    title: "LogIn successful!",
                    icon: "success",
                    draggable: true
                });
                navigate(`${location.state ? location.state : "/"}`);
            })
            .catch((error) => {
                setError(error.code);
            });
    };

    const handleForgotPassword = () => {
        const email = emailRef.current.value;

        if (!email) {
            alert("Please enter your email first.");
            return;
        }

        forgetPassword(email)
            .then(() => {
                Swal.fire({
                    title: "Password reset email sent!",
                    icon: "success",
                    draggable: true
                });
            })
            .catch((error) => {
                setError(error.code);
            });
    };

    const handleGoogleLogin = () => {
        googleSignIn()
            .then((result) => {
                const user = result.user;

                // ✅ Send user data to backend
                const userInfo = {
                    name: user.displayName,
                    email: user.email,
                    photo: user.photoURL,
                    role: 'user',
                    created_at: new Date().toISOString(),
                    last_log_in: new Date().toISOString()
                };

                axiosSecure.post('/users', userInfo)
                    .then(() => {
                        Swal.fire({
                            title: `Welcome, ${user.displayName}`,
                            icon: "success",
                            draggable: true
                        });
                        navigate("/");
                    })
                    .catch((error) => {
                        console.error("User save failed:", error);
                        Swal.fire("Oops!", "User save failed", "error");
                    });
            })
            .catch((error) => {
                console.error(error);
                alert("Google login failed");
            });
    };

    return (
        <div className="w-full mx-auto max-w-md p-4 rounded-md shadow sm:p-8 dark:bg-gray-50 dark:text-gray-800">
            <h2 className="mb-3 text-3xl font-semibold text-center">Login to your account</h2>

            <div className="my-6 space-y-4 bg-gray-300">
                <button onClick={handleGoogleLogin} aria-label="Login with Google" type="button" className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-600 focus:dark:ring-violet-600">
                    <FcGoogle size={24} />
                    <p>Login with Google</p>
                </button>
            </div>

            <div className="flex items-center w-full my-4">
                <hr className="w-full dark:text-gray-600" />
                <p className="px-3 dark:text-gray-600">OR</p>
                <hr className="w-full dark:text-gray-600" />
            </div>

            <form onSubmit={handleLogin} className="fieldset">
                <label className="label">Email</label>
                <input type="email" ref={emailRef} name='email' className="input bg-gray-200 w-full" placeholder="Email" required />

                <label className="label">Password</label>
                <input type="password" name='password' className="input bg-gray-200 w-full" placeholder="Password" required />

                {error && <p className='text-red-500 text-xs'>{error}</p>}

                <div onClick={handleForgotPassword}><a className="link link-hover">Forgot password?</a></div>

                <button className="btn btn-neutral mt-4">Login</button>

                <p className='font-bold text-center pt-5'>Don’t Have An Account? <Link className='text-secondary' to='/register'>Register</Link></p>
            </form>
        </div>
    );
};

export default Login;