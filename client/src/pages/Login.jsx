import React, { useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Loader, FormField } from '../components';
import config from '../config.js';
import { login } from '../redux/auth/authAction'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState({
        email: '', 
        password: ''
    })
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleUserDataChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })
    }

    const loginUser = async (e) => {
        e.preventDefault(); 
        if(userData.email && userData.password){
            try {
                setLoading(true);
                let response = await axios.post(`${config.API_URL}/auth/login`, { ...userData });
                if(response.data.success){
                    const notify = () => toast.success(response.data.message, {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                    notify();
                    setTimeout(()=> {
                        dispatch(login(response.data.name, response.data.token));
                        navigate('/');
                    }, 1000)
                }
            } catch (err) {
                console.log(err);
                const notify = () => toast.error(err.response.data.message, {
                    position: "top-center",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                notify();
            } finally {
                setLoading(false);
            }
        }
    }
  return (
    <section className="max-w-7xl mx-auto mt-20">

        <ToastContainer />
        <div>
            <h1 className="font-extrabold text-[32px] text-[#222328]">Login</h1>
            <p className="mt-2 text-[#666e75] text-[16px] max-w-[600px]">Login and create images using your imaginary thoughts and share them with your friends</p>
        </div>

        <form className="mt-12 max-w-3xl" onSubmit={ loginUser }>
            <div className="flex flex-col gap-5">
                <FormField 
                    LabelName="Email"
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={userData.email}
                    handleChange={ handleUserDataChange }
                />

                <FormField 
                    LabelName="Password"
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={userData.password}
                    handleChange={handleUserDataChange}
                />
                <p>Don't have any account? <Link to='/signup' className="text-[blue]">Signup</Link></p>
                <div className="mt-5">
                    <button type="submit"
                        className="text-white bg-blue-700 font-medium  rounded-md text-sm w-full 
                        px-10 py-3 text-center"
                    >
                        Login
                    </button>
                </div>
            </div>
        </form>
            
    </section>
  )
}

export default Login
