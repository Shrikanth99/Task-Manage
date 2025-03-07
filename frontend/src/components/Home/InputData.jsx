import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { data, useNavigate } from "react-router-dom";
import axios from "../../config/axios";
import toast, { Toaster } from "react-hot-toast";


const InputData = ({inputDiv,setInputDiv,foundData,setData}) => {
  const [taskData, setTaskData] = useState({title:  '', desc: ''})

  useEffect(()=>{
    setTaskData({
      title: foundData?.title || '',
      desc: foundData?.desc || '',
    });    
    return () => {
      setTaskData({title:'',desc:''})
    }
  },[foundData])

  const validateFormData = (data) => {
    if (!data.title.trim()) return "Title is required";
    if (!data.desc.trim()) return "Description is required";
    return null;
  }
  

  const handleChange = (e) => {
    const{name,value} = e.target
    setTaskData({...taskData, [name]:value})
  }

  const handleUpdate = async()=> {
    const errorMsg = validateFormData(taskData)
    if(errorMsg){
      toast.error(errorMsg)
    }
    try{
      const res = await axios.put(`/api/tasks/update-task/${foundData._id}`,taskData, {
        headers : {
          'Authorization' : localStorage.getItem('token'),
        },
      })
      setData((prevData) => ({
        ...prevData,
        tasks: prevData.tasks.map((el) => 
          el._id === foundData._id ? res.data : el
        ),
      }))
      toast.success("Task updated successfully!");
      setTaskData({title:'',desc:''})
      setInputDiv('hidden')
    }catch(e){
      console.log(e)
      toast.error("Failed to update task");

    }
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    const errorMsg = validateFormData(taskData)
    if(errorMsg){
      toast.error(errorMsg)
    }
    try {
      const res = await axios.post('/api/tasks/create-task',taskData,{
        headers : {
          'Authorization' : localStorage.getItem('token')
        }
      })
      setData((prevData) => ({
        ...prevData, 
        tasks:[res.data,...prevData.tasks],
      }))
      setTaskData({title:'',desc:''})
      setInputDiv('hidden')
      
    } catch (e) {
      console.log(e)
      toast.error("Failed to create task");

    }
  }

  return (
    <>
      <div className={ `${inputDiv} top-0 left-0 bg-gray-800 opacity-70 h-screen w-full `}></div>
      <div className={`${inputDiv} top-0 left-0  flex justify-center items-center h-screen w-full `}>
        <div className="w-3/7 bg-gray-900 h-[] p-4 rounded">
          <div className="flex justify-end my-3 " >
            <button className="text-2xl"
               onClick={() => {
                setInputDiv('hidden');
                setTaskData({title:'',desc:''})
               }

             }  > <RxCross2/> </button>
          </div>
          <input
            type="text"
            placeholder="Title"
            name="title"
            className="px-3 py-2 rounded w-full bg-gray-600"
            value={taskData.title}
            onChange={handleChange}
          />
          <textarea
            name="desc"
            cols="30"
            rowa="10"
            placeholder="Enter Description"
            id=""
            className="bg-gray-600 w-full px-3 py-2 rounded my-2"
            value={taskData.desc}
            onChange={handleChange}
          ></textarea>
          { foundData ? (
                      <button className="px-3 py-2 bg-sky-400 rounded text-black font-semibold "
                      onClick={handleUpdate}
                      >Update</button>
          ) : (
            <button className="px-3 py-2 bg-sky-400 rounded text-black font-semibold "
            onClick={handleSubmit}
            >Submit</button>
          ) }

        </div>
        <Toaster/>
      </div>
    </>
  );
};

export default InputData;
