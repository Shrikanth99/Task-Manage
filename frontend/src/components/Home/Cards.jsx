import React from "react";
import { CiHeart } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoAddCircle } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";

import axios from "../../config/axios";

const Cards = ({ home, setInputDiv, data ,setData, updateData, setFoundData }) => {
  console.log(home)
  const handleCompleteTask = async(id) => {
    try {
      const res = await axios.put(`/api/tasks/update-completeTask/${id}`,{},{
        headers : {
          'Authorization':localStorage.getItem('token')
        }
      });
      setData((prevData)=> ({
        ...prevData,
        tasks : prevData.tasks.map((el) => 
        el._id === id ? {...el,complete:res.data.complete} : el ),
      }));

    } catch (e) {
      console.log(e)
    }
  }

  const handleImp = async(id)=> {
    try {
      const res = await axios.put(`/api/tasks/update-imp-task/${id}`,{},{
      headers : {
        'Authorization':localStorage.getItem('token')
      }
    })

    setData((prevData)=> ({
      ...prevData,
      tasks : prevData.tasks.map((el) => 
      el._id === id ? {...el,important:res.data.important} : el ),
    }))

  } catch (e) {
    console.log(e)
  }
  }

  const handleEdit = (id,el) => {
    setInputDiv('fixed')
    updateData(id)
  }

  const handleDel = async(id) => {
    try {
      const res = await axios.delete(`/api/tasks/delete-task/${id}`,{
        headers : {
          'Authorization' : localStorage.getItem('token')
        }
      })

      setData((prevData) => ({
        ...prevData,
        tasks : prevData.tasks.filter( el => el._id !== id )
      }))
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 overflow-y-auto max-h-[calc(100vh-200px)] w-full ">
      {data &&
        data?.map((el, i) => (
          <div
            key={i}
            className="bg-gray-700 rounded p-3 flex flex-col justify-between w-full max-w-full transition-transform duration-200 ease-in-out hover:scale-102 "
          >
            <div>
              <h3 className="text-xl font-semibold">{el.title}</h3>
              <p className="text-gray-300 my-2 ">{el.desc}</p>
            </div>
            <div className="mt-4 w-full flex items-center justify-between">
            
              <button
                className={` ${
                  el?.complete === false ? "bg-red-500" : "bg-green-500"
                }  px-2 py-1 rounded-md`}
                onClick={ home ?  () => handleCompleteTask(el._id) : undefined}
                disabled={!home}
              >
                {el.complete === true ? "Completed" : "InComplete"}
              </button>
              <div className="text-white text-2xl  flex gap-4">
                <button onClick={() => handleImp(el._id) } disabled={!home}  >
                  { el.important === false ? <CiHeart /> : <FaHeart className="text-red-500" /> }
                </button>
                { home && (
                <button onClick={() => handleEdit(el._id,el)} >
                  <FaEdit  />
                </button>

                ) }
                { home && (
                <button onClick={() => handleDel(el._id) } >
                  <MdDelete />
                </button>
                ) }
              </div>
        
            </div>
          </div>
        ))}
      {home && (
        <button
          onClick={() => {
            setFoundData(null)
            setInputDiv("fixed");
          }}
          className=" flex flex-col justify-center items-center bg-gray-700 rounded p-3 text-gray-300 hover:scale-105 hover:cursor-pointer transition-all ease-linear duration-300 "
        >
          <IoAddCircle className="text-5xl" />
          <h2 className="text-2xl text-gray-300"> Add-Task</h2>
        </button>
      )}
    </div>
  );
};

export default Cards;
