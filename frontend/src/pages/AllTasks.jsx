import React, { useState, useEffect } from "react";
import Cards from "../components/Home/Cards";
import { IoAddCircle } from "react-icons/io5";
import InputData from "../components/Home/InputData";
import axios from "../config/axios";
import { useDispatch, useSelector } from "react-redux";
import { loaderAction } from "../store/loaderSlice";

const AllTasks = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.loader.loading);
  const [inputDiv, setInputDiv] = useState("hidden");
  const [myData, setData] = useState(null);
  const [foundData, setFoundData] = useState(null);

  useEffect(() => {
    (async () => {
      dispatch(loaderAction.setLoading(true));
      try {
        const res = await axios.get("/api/tasks/myTasks", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        console.log(res.data);
        setData(res.data);
        dispatch(loaderAction.setLoading(false));
      } catch (e) {
        console.log(e);
        dispatch(loaderAction.setLoading(false));
      }
    })();
  }, [dispatch]);

  const updateData = (id) => {
    const resTask = myData?.tasks?.find((el) => {
      return el._id === id;
    });
    setFoundData(resTask);
    setInputDiv("fixed");
  };

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        </div>
      ) : (
        <div>
          <div className="w-full flex justify-end px-4 py-2 ">
            <button
              onClick={() => {
                setFoundData(null);
                setInputDiv("fixed");
              }}
            >
              <IoAddCircle className="text-5xl text-gray-400  hover:text-gray-100 transition-all ease-linear duration-300 " />
            </button>
          </div>
          {myData && myData.tasks && myData.tasks.length > 0 ? (
            <Cards
              home={true}
              setInputDiv={setInputDiv}
              data={myData.tasks}
              setData={setData}
              updateData={updateData}
              setFoundData={setFoundData}
            />
          ) : (
            <div className="text-center text-xl mt-8">
              No-Task found, please add your task.
            </div>
          )}
        </div>
      )}

      <InputData
        inputDiv={inputDiv}
        setInputDiv={setInputDiv}
        setData={setData}
        updateData={updateData}
        foundData={foundData}
      />
    </>
  );
};

export default AllTasks;
