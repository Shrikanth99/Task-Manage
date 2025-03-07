import React, { useEffect, useState } from "react";
import { CgNotes } from "react-icons/cg";
import { MdLabelImportant } from "react-icons/md";
import { FaCalendarCheck } from "react-icons/fa";
import { FaCalendarXmark } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/reduxSlice";
import axios from "../../config/axios";

const SideBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [myData, setMyData] = useState([]);
  const data = [
    { title: "All Tasks", icon: <CgNotes />, link: "/" },
    {
      title: "Imp Tasks",
      icon: <MdLabelImportant />,
      link: "/imptasks",
    },
    {
      title: "Completed Task",
      icon: <FaCalendarCheck />,
      link: "/completedtasks",
    },
    {
      title: "Incompleted Tasks",
      icon: <FaCalendarXmark />,
      link: "/incompletedtasks",
    },
  ];

  const handleLogOut = () => {
    localStorage.removeItem("token");
    dispatch(authActions.logout());
    navigate("/login");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/tasks/myTasks", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        setMyData(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {myData && (
        <div>
          <h2 className="text-xl font-semibold">{myData?.username}</h2>
          <h4 className="mb-1 text-gray-400">{myData?.email}</h4>
          <hr />
        </div>
      )}
      <div>
        {data.map((el, i) => (
          <Link
            to={el.link}
            key={i}
            className="my-2 flex items-center gap-2 p-2 hover:bg-gray-800 rounded-md transition-all ease-linear duration-300 "
          >
            <span className="text-xl">{el.icon}</span> {el?.title}
          </Link>
        ))}
      </div>
      <div>
        <button
          className="bg-gray-500 w-full p-2 rounded-lg "
          onClick={handleLogOut}
        >
          Log-Out
        </button>
      </div>
    </>
  );
};

export default SideBar;
