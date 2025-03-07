import React, { useEffect } from 'react'
import Home from './pages/Home'
import {  Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import AllTasks from './pages/AllTasks'
import ImportanTasks from './pages/ImportanTasks'
import CompletedTasks from './pages/CompletedTasks'
import Incompleted_Tasks from './pages/Incompleted_Tasks'
import Signup from './pages/Signup'
import Login from './pages/Login'
import { authActions } from './store/reduxSlice'

const App = () => { 
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const isLoggedIn = useSelector(state => state?.auth?.isLoggedIn)
  
  useEffect(() => {
    const token = localStorage.getItem('token')
    if(token){
      dispatch(authActions.login())
    }else{
      navigate('/signup')
    }
  },[])

  return (
    <div className='bg-gray-900 text-white h-screen p-2 relative ' >
        <Routes>
          <Route exact path='/' element={<Home/>} > 
            {/* Child-Routes */}
            <Route index  element={<AllTasks/>} />
            <Route path='/imptasks' element={<ImportanTasks/>} />
            <Route path='/completedtasks' element={<CompletedTasks/>} />
            <Route path='/incompletedtasks' element={<Incompleted_Tasks/>} />
          </Route>
          <Route path='/signup' element={<Signup/>} />
          <Route path='/login' element={<Login/>} />
        </Routes>
    </div>
  )
}

export default App
