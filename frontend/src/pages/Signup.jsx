import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import axios from "../config/axios";



const Signup = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(state => state?.auth?.isLoggedIn)

  const [formData, setFormData] = useState({ username:'', email:'', password:'' });
  const [serverErr,setServerErr] = useState(null)

  const validateFormData = (data) => {
    if (!data.username.trim()) return "Username is required";
    if (!data.email.trim()) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) return "Invalid email address";
    if (!data.password) return "Password is required";
    return null;
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if( token ){
      navigate('/');
    }
  },[navigate])

  // handle change
  const handleChange = (e) => {
    const {name,value} = e.target;
    setFormData({
      ...formData,[name]:value
    })
  }

  // for SignUp function

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorMsg = validateFormData(formData);
    if(errorMsg){
      toast.error(errorMsg)
      return;
    }
    try {
      const res = await axios.post('/api/users/register',formData);
      console.log('res',res)
      toast.success(res?.data?.message)
      setFormData({ username:'', email:'', password:'' })
      setServerErr([])
      navigate('/login',{  state : res?.data.message })
    } catch (e) {
      setServerErr(e.response?.data?.errors)
    }

  }


  useEffect(()=>{
    if(serverErr?.length > 0){
      serverErr?.forEach((el) => {
        const msg = el?.msg?.trim();
        if(msg){
          toast.error(msg)
        }
      })
      setServerErr(null)

    }
  },[serverErr])
  

  return (
    <div className="h-[98vh] flex justify-center items-center ">
      <div className=" bg-gray-700 p-4 w-3/6 rounded  ">
        <div className="text-2xl font-semibold " >Signup</div>
        <input
          className="bg-gray-600 px-3 py-2 w-full rounded my-2"
          name="username"
          type="username"
          placeholder="username"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          className="bg-gray-600 px-3 py-2 w-full rounded my-2"
          name="email"
          type="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}

        />
        <input
          className="bg-gray-600 px-3 py-2 w-full rounded my-2 "
          name="password"
          type="password"
          placeholder="Ener Password"
          value={formData.password}
          onChange={handleChange}

        />
        <div className="w-full flex items-center justify-between ">
          <button
            className="bg-sky-400 text-black text-xl font-semibold px-5 py-2  rounded-lg" 
            onClick={handleSubmit}
          >
            Sign-Up
          </button>
          <Link to='/login' className="text-gray-400 hover:text-gray-200" >Already having an account? Login Here </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
