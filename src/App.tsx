import React, { useEffect } from 'react'
import Contacts from './app/Contacts';
import { useAppDispatch, useAppSelector } from './features/hooks'
import { getUser } from './features/userSlice';

export default function App() {
  const {user} = useAppSelector(state => state.userReducer)
  const dispatch = useAppDispatch()
  
  console.log(user);
  let arg = {'username':'', 'password':''}
  useEffect(() =>{
    // dispatch(getUser('admin'))
  }, [])
  
  return (
    <div>
      {user.length > 0 ? 
      <Contacts/>
      :
      <div>
        
        <input type="text" onChange={(e)=> arg.username = e.target.value}/>
        <input type="password" onChange={(e)=> arg.password = e.target.value}/>
        <button onClick={()=> dispatch(getUser(arg))}>Login</button>
      </div>
      }
    </div>
  )
}
