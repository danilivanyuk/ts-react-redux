import React from 'react'
import Contacts from './app/Contacts';
import { useAppDispatch, useAppSelector } from './features/hooks'
import { getUser } from './features/userSlice';

export default function App() {
  const {user} = useAppSelector(state => state.userReducer)
  const dispatch = useAppDispatch()
  
  console.log(user[0]);
  let arg = {'username':'', 'password':''}

  
  return (
    <div>
      {user.length > 0 ? 
      <Contacts userId = {user[0].id}/>
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
