import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loaderAction } from '../store/loaderSlice'
import Cards from '../components/Home/Cards'
import axios from '../config/axios'

const CompletedTasks = () => {
  const dispatch = useDispatch()
  const loading = useSelector(state => state.loader.loading );
  const [myData,setData] = useState()
  
      useEffect(() => {
        (async() => {
          dispatch(loaderAction.setLoading(true))
          try {
            const res = await axios.get('/api/tasks/complete-tasks',{
              headers : {
                'Authorization' : localStorage.getItem('token')
              }
            })
            console.log(res.data.data  )
            setData(res.data.data)
            dispatch(loaderAction.setLoading(false))

          } catch (e) {
            console.log(e)
            dispatch(loaderAction.setLoading(false))

          }
        })()
      }, [ dispatch ])

      if(loading){
        return (
          <div className='flex justify-center items-center h-screen ' >
            <div className='animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 ' ></div>
          </div>
        )
      }
  

  return (
    <div>
      {myData ? (
        <Cards home={false} data={myData} />
      ) : (
        <p className="text-center mt-4">No tasks found.</p>
      )}
    </div>
  )
}

export default CompletedTasks
