import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "../config/axios";
import { authActions } from "../store/reduxSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch();
  const[formData,setFormData] = useState({ 
    username : '',
    password : ''
   })
  const [serverErr,setServerErr] = useState([])

  useEffect(() =>{
    if(location?.state?.message){
      toast.success(`${location?.state?.message}`)
    }
  },[location])

   const handleInp = (e) => {
    const {name,value} = e.target
    setFormData({ ...formData, [name] : value })
   }



   const handleSubmitLogin = async(e) => {
    e.preventDefault()

    if(!formData?.username?.trim() || !formData?.password.trim()){
      toast.error('UserName/Password is Required')
      return;
    }
    try {
      const rs = await axios.post('/api/users/login',formData)
      localStorage.setItem('token',rs?.data?.token)
      dispatch(authActions.login())
      toast.success('Login Successfully', {duration : 3000})
      setFormData({username:'',password:''})
      setServerErr([])git 
      navigate('/')
    } catch (e) {
      console.log('AE',e.response.data)
      setServerErr(e.response.data.errors || [{message : e.messgae}] )
    }
   }

  useEffect(()=>{
    if(serverErr?.length > 0 ){
      serverErr.forEach((el) => {
        const msg = el?.message?.trim()
        if(msg){
          toast.error(msg)
        }
      });
      // setServerErr([])
    }
  },[serverErr])


  return (
    <div className="h-[98vh] flex justify-center items-center ">
      <div className=" bg-gray-700 p-4 w-2/6 rounded  ">
        <div className="text-2xl font-semibold ">Login</div>
        <input
          name="username"
          type="username"
          placeholder="username"
          className="bg-gray-600 px-3 py-2 w-full rounded my-2"
          value={formData.username}
          onChange={handleInp}
        />
        {/* <input
          name="email"
          type="email"
          placeholder="Enter Email"
          className="bg-gray-600 px-3 py-2 w-full rounded my-2"
        /> */}
        <input
          name="password"
          type="password"
          placeholder="Ener Password"
          className="bg-gray-600 px-3 py-2 w-full rounded my-2 "
          value={formData.password}
          onChange={handleInp}
        />
        <div className="w-full flex items-center justify-between ">
          <button 
          className="bg-sky-400 text-black text-xl font-semibold px-5 py-2  rounded-lg"
          onClick={handleSubmitLogin}
          >
            Login
          </button>
          <Link to='/signup' className="text-gray-400 hover:text-gray-200" >Not having an account? Sign-Up Here </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
